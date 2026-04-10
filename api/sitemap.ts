import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { generateSlug } from "../src/lib/blogUtils";

type BlogFrontmatter = {
  slug: string;
  updatedAt: string;
  category: string;
  status: "draft" | "published";
};

function getPublishedBlogs() {
  const contentDirectory = path.resolve(process.cwd(), "src/content/blog");

  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  return fs
    .readdirSync(contentDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const fullPath = path.join(contentDirectory, fileName);
      const fileContent = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContent);
      return data as BlogFrontmatter;
    })
    .filter((blog) => blog.status === "published");
}

export default async function handler(req: any, res: any) {
  const blogs = getPublishedBlogs();
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
      blogs
        .map((blog) => blog.category)
        .filter(Boolean)
        .map((category) => `/blog/kategori/${generateSlug(category)}`),
    ),
  );

  const urls = [
    ...staticPages.map(
      (pagePath) => `
      <url>
        <loc>${baseUrl}${pagePath}</loc>
        <changefreq>weekly</changefreq>
        <priority>${pagePath === "" ? "1.0" : "0.8"}</priority>
      </url>
    `,
    ),
    ...categoryPages.map(
      (pagePath) => `
      <url>
        <loc>${baseUrl}${pagePath}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>
    `,
    ),
    ...blogs.map(
      (blog) => `
      <url>
        <loc>${baseUrl}/blog/${blog.slug}</loc>
        <lastmod>${blog.updatedAt}</lastmod>
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
