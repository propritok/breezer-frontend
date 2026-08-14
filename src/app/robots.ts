import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://propritok.ru";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/test-amocrm/", "/consent"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
