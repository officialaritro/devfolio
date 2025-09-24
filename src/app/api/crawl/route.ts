import { NextResponse } from "next/server";

import axios from 'axios';

import * as cheerio from "cheerio";
import { marked } from "marked";
import { parseStringPromise } from "xml2js";

import { initGCPAuth } from "@/lib/auth/gcp-auth";
import { generateEmbedding } from "@/lib/embedding";
import { serverEnv } from "@/lib/env/server";
import { getCrawlingMetaDataCollection, getDbClient, getEmbeddingsCollection } from "@/lib/mongo";

import { Sitemap } from "@/types/sitemap.types";

export async function GET() {
  try {
    const crawlingMetaDataCollection = await getCrawlingMetaDataCollection();
    const crawlingMeta = await crawlingMetaDataCollection.findOne();

    if (!crawlingMeta) {
      return NextResponse.json({ error: "Data not found" }, { status: 404 });
    }

    return NextResponse.json({ data: crawlingMeta });
  } catch (error) {
    console.error("Failed to get chat: ", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST() {
  initGCPAuth();

  const client = await getDbClient()
  const session = client.startSession();
  const embeddingsCollection = await getEmbeddingsCollection();
  const crawlingMetaDataCollection = await getCrawlingMetaDataCollection();

  try {
    await session.withTransaction(async () => {
      // Fetch and parse sitemap
      const siteToCrawl = serverEnv().SITE_TO_CRAWL;

      if (!siteToCrawl) {
        throw new Error("SITE_TO_CRAWL environment variable is not defined.");
      }

      const sitemapResponse = await axios.get(siteToCrawl);
      const parsed = await parseStringPromise(sitemapResponse.data) as Sitemap;
      const urls = parsed.urlset.url.map((u) => u.loc[0]);

      // Process and embed each page
      for (const pageUrl of urls) {
        try {
          const response = await fetch(pageUrl); // Fetch HTML
          const html = await response.text();

          const $ = cheerio.load(html); // Parse HTML

          $("script, style, nav, footer, header").remove(); // Remove unnecessary elements
          const content = $("main, article, .content").text() || $("body").text(); // Get main content

          const markdown = await marked(content); // Convert to markdown
          const cleanedMarkdown = markdown.replace(/\s+/g, ' ').trim(); // Clean markdown output

          // Extract metadata
          const pageTitle = $('title').text().trim();
          const metaDescription = $('meta[name="description"]').attr('content') || '';

          const embedding = await generateEmbedding(cleanedMarkdown);

          await embeddingsCollection.updateOne(
            { url: pageUrl },
            {
              $set: {
                url: pageUrl,
                title: pageTitle,
                description: metaDescription,
                content: cleanedMarkdown,
                embedding,
              },
            },
            { upsert: true, session }
          );
        } catch (err) {
          console.warn(`Failed to process or embed URL: ${pageUrl}`, err);
          throw err; // This will trigger rollback
        }
      }

      // After embedding is done, store the last crawl timestamp
      await crawlingMetaDataCollection.updateOne(
        {},
        { $set: { lastCrawledAt: new Date() } },
        { upsert: true, session }
      )
    })

    return NextResponse.json({
      success: true,
      message: 'Website processed successfully!',
    })
  } catch (error) {
    console.error("Crawling error: ", error);

    return NextResponse.json(
      { error: "Failed to process website" },
      { status: 500 }
    );
  }
}