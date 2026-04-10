import fs from "node:fs/promises";
import path from "node:path";
import dotenv from "dotenv";
import matter from "gray-matter";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: ".env", quiet: true });

const outputDirectory = path.join(process.cwd(), "src", "content", "blog");
const placeholderBody = `<p>Bu yazi icin icerik aktarimi tamamlanmadi. Lutfen govde icerigini manuel olarak guncelleyin.</p>`;

function isExternalHref(href) {
  if (!href) {
    return false;
  }

  try {
    const parsedUrl = new URL(href);
    return !["katmanlabs.com", "www.katmanlabs.com"].includes(
      parsedUrl.hostname,
    );
  } catch {
    return false;
  }
}

function normalizeAnchorTag(match, attributes) {
  const hrefMatch = attributes.match(/\shref="([^"]*)"/i);
  const relMatch = attributes.match(/\srel="([^"]*)"/i);
  const targetMatch = attributes.match(/\starget="([^"]*)"/i);
  const href = hrefMatch?.[1] || "";

  if (!isExternalHref(href)) {
    return `<a${attributes}>`;
  }

  const relTokens = new Set(
    (relMatch?.[1] || "")
      .split(/\s+/)
      .map((token) => token.trim())
      .filter(Boolean),
  );

  const target = targetMatch?.[1] || "_blank";
  relTokens.add("noopener");
  relTokens.add("noreferrer");

  const cleanedAttributes = attributes
    .replace(/\srel="[^"]*"/i, "")
    .replace(/\starget="[^"]*"/i, "");

  return `<a${cleanedAttributes} target="${target}" rel="${Array.from(relTokens).join(" ")}">`;
}

function normalizeHtmlForMdx(html) {
  if (!html || !html.trim()) {
    return placeholderBody;
  }

  return html
    .trim()
    .replace(/<br>/gi, "<br />")
    .replace(/<hr>/gi, "<hr />")
    .replace(/<img([^>]*?)(?<!\/)>/gi, "<img$1 />")
    .replace(/<a([^>]*)>/gi, normalizeAnchorTag);
}

function toFrontmatter(blog) {
  const coverImage =
    blog.featured_image_url || blog.image_url || "/blog/placeholder-grid.svg";
  const ogImage = blog.og_image_url || coverImage;
  const publishedAt = blog.published_at || blog.created_at;
  const updatedAt = blog.updated_at || publishedAt;

  return {
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt || blog.title,
    category: blog.category || "Genel",
    publishedAt,
    updatedAt,
    coverImage,
    metaTitle: blog.meta_title || blog.title,
    metaDescription: blog.meta_description || blog.excerpt || blog.title,
    ogImage,
    status:
      blog.status === "published" || blog.published_at ? "published" : "draft",
  };
}

async function main() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase env bilgileri bulunamadi.");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: blogs, error } = await supabase
    .from("blogs")
    .select(
      "title, slug, excerpt, category, published_at, created_at, updated_at, image_url, featured_image_url, meta_title, meta_description, og_image_url, status, content",
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  await fs.mkdir(outputDirectory, { recursive: true });

  for (const blog of blogs || []) {
    const frontmatterData = toFrontmatter(blog);
    const normalizedBody = normalizeHtmlForMdx(blog.content);
    const fileContent = matter.stringify(normalizedBody, frontmatterData);
    const outputFile = path.join(outputDirectory, `${blog.slug}.mdx`);

    await fs.writeFile(outputFile, fileContent, "utf8");
  }

  console.log(`MDX migration tamamlandi. Toplam dosya: ${(blogs || []).length}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
