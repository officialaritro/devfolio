import { MetadataRoute } from "next";

export default async function sitemaps(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: 'https://www.shivamtaneja.com/',
      lastModified: new Date(),
      priority: 1.0
    },
    {
      url: 'https://www.shivamtaneja.com/contact',
      lastModified: new Date(),
    },
    {
      url: 'https://www.shivamtaneja.com/project/career-guidance',
      lastModified: new Date(),
    },
    {
      url: 'https://www.shivamtaneja.com/project/chat-bot',
      lastModified: new Date(),
    },
    {
      url: 'https://www.shivamtaneja.com/project/chat-mingle',
      lastModified: new Date(),
    },
    {
      url: 'https://www.shivamtaneja.com/project/circle-catcher',
      lastModified: new Date(),
    },
    {
      url: 'https://www.shivamtaneja.com/project/tilt-bot',
      lastModified: new Date(),
    },
  ]
}