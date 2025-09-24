type SitemapUrl = {
  loc: string[];
  lastmod?: string[];
  [key: string]: string[] | undefined;
};

export type Sitemap = {
  urlset: {
    url: SitemapUrl[];
  };
};

export type ProcessedPage = {
  url: string;
  title: string,
  description: string,
  content: string;
};