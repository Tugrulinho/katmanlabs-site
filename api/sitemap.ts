import fs from "node:fs";
import path from "node:path";
import type { ApiRequest, ApiResponse } from "./_types";

type BlogFrontmatter = {
  slug: string;
  updatedAt: string;
  category: string;
  status: "draft" | "published";
};

function generateSlug(title: string): string {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u0131/g, "i")
    .replace(/\u0130/g, "i")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cleanFrontmatterValue(value: string): string {
  return value.trim().replace(/^["']|["']$/g, "");
}

function parseBlogFrontmatter(fileContent: string): Partial<BlogFrontmatter> {
  const frontmatterMatch = fileContent.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);

  if (!frontmatterMatch) {
    return {};
  }

  return frontmatterMatch[1].split(/\r?\n/).reduce<Partial<BlogFrontmatter>>(
    (blog, line) => {
      const fieldMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);

      if (!fieldMatch) {
        return blog;
      }

      const [, key, rawValue] = fieldMatch;

      if (
        key === "slug" ||
        key === "updatedAt" ||
        key === "category" ||
        key === "status"
      ) {
        return {
          ...blog,
          [key]: cleanFrontmatterValue(rawValue),
        };
      }

      return blog;
    },
    {},
  );
}

function getPublishedBlogs(): BlogFrontmatter[] {
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
      return parseBlogFrontmatter(fileContent);
    })
    .filter(
      (blog): blog is BlogFrontmatter =>
        blog.status === "published" &&
        Boolean(blog.slug) &&
        Boolean(blog.updatedAt),
    );
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export default async function handler(_req: ApiRequest, res: ApiResponse) {
  const baseUrl = "https://www.katmanlabs.com";
  const blogs = getPublishedBlogs();

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
        <loc>${escapeXml(`${baseUrl}${pagePath}`)}</loc>
        <changefreq>weekly</changefreq>
        <priority>${pagePath === "" ? "1.0" : "0.8"}</priority>
      </url>
    `,
    ),
    ...categoryPages.map(
      (pagePath) => `
      <url>
        <loc>${escapeXml(`${baseUrl}${pagePath}`)}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>
    `,
    ),
    ...blogs.map(
      (blog) => `
      <url>
        <loc>${escapeXml(`${baseUrl}/blog/${blog.slug}`)}</loc>
        <lastmod>${escapeXml(blog.updatedAt)}</lastmod>
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

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.status(200).end(sitemap);
}
