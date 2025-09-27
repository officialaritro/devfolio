import { MetadataRoute } from "next";
import { sideProjects } from "@/lib/constants/side-projects";  // Adjust path if different

// Helper to build project URLs from your descLink (strips leading /project/)
const getProjectUrls = () => sideProjects.map(project => ({
  url: `https://aritroroy.tech${project.descLink}`,
  lastModified: new Date(),
  priority: 0.6,
}));

export default async function sitemaps(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://aritroroy.tech';
  const commonUrls = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: new Date(),
      priority: 0.8,
    },
  ];

  return [
    ...commonUrls,
    ...getProjectUrls(),  // Dynamically adds your projects
  ];
}