import { createClient } from "@supabase/supabase-js";
import { generateSlug } from "../src/lib/blogUtils";

export default async function handler(req: any, res: any) {
  const supabase = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  // blogları çek
  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("slug, updated_at, category")
    .eq("status", "published");

  if (error) {
    return res.status(500).send("Error generating sitemap");
  }

  const baseUrl = "https://www.katmanlabs.com";

  const staticPages = [
    "",
    "/blog",
    "/iletisim",
    "/hizmet/web-tasarim",
    "/hizmet/dijital-pazarlama",
    "/hizmet/seo-analitik",
    "/hizmet/sosyal-medya-tasarim",
  ];
  const categoryPages = Array.from(
    new Set(
      (blogs || [])
        .map((blog) => blog.category)
        .filter(Boolean)
        .map((category) => `/blog/kategori/${generateSlug(category)}`),
    ),
  );

  const urls = [
    ...staticPages.map(
      (path) => `
      <url>
        <loc>${baseUrl}${path}</loc>
        <changefreq>weekly</changefreq>
        <priority>${path === "" ? "1.0" : "0.8"}</priority>
      </url>
    `,
    ),
    ...categoryPages.map(
      (path) => `
      <url>
        <loc>${baseUrl}${path}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>
    `,
    ),
    ...(blogs || []).map(
      (blog) => `
      <url>
        <loc>${baseUrl}/blog/${blog.slug}</loc>
        <lastmod>${blog.updated_at}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
    `,
    ),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.join("")}
  </urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
}
