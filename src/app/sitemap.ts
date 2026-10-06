import { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/constants/site";
import { sideProjects } from "@/lib/constants/side-projects";

const pages = [
  { path: '/', priority: 1.0 },
  { path: '/projects', priority: 0.9 },
  { path: '/contact', priority: 0.8 },
  { path: '/uses', priority: 0.6 },
  { path: '/now', priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = sideProjects.map((project) => ({ path: project.descLink, priority: 0.6 }));

  return [...pages, ...projectPages].map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    priority,
  }));
}
