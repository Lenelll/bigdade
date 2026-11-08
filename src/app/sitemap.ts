import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const url = (path: string) => new URL(path, base).toString();

  return [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    { url: url("/murals"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/dade-tse"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/shop"), changeFrequency: "weekly", priority: 0.6 },
  ];
}
