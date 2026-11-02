import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

// Rastreio liberado de propósito: a meta noindex de cada página só funciona se o robô puder lê-la.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
