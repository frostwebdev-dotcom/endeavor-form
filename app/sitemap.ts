import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const runtime = "edge";

const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "yearly" },
  { path: "/process", priority: 0.9, changeFrequency: "yearly" },
  { path: "/about", priority: 0.8, changeFrequency: "yearly" },
  { path: "/faq", priority: 0.7, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.9, changeFrequency: "yearly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
