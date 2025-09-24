import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/dashboard", "/auth/*", "/chat/*"]
    },
    sitemap: 'https://www.shivamtaneja.com/sitemap.xml'
  }
}