import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import matter from "gray-matter";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const projectRoot = process.cwd();
const outputFilePath = path.join(
  projectRoot,
  "src",
  "generated",
  "publicSiteSnapshot.ts",
);
const outputJsonFilePath = path.join(
  projectRoot,
  "src",
  "generated",
  "publicSiteSnapshot.json",
);
const blogDirectory = path.join(projectRoot, "src", "content", "blog");

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

function stripFrontmatter(rawContent) {
  return rawContent.replace(/^---[\s\S]*?---\s*/, "").trim();
}

function getReadingMinutes(rawContent) {
  const plainText = rawContent
    .replace(/<[^>]+>/g, " ")
    .replace(/\{[^}]+\}/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const wordCount = plainText ? plainText.split(" ").length : 0;
  return Math.max(1, Math.ceil(wordCount / 200));
}

function getPublishedBlogIndex() {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  return fs
    .readdirSync(blogDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const filePath = path.join(blogDirectory, fileName);
      const rawContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(rawContent);
      const contentBody = stripFrontmatter(rawContent);

      return {
        id: String(data.slug),
        title: String(data.title),
        slug: String(data.slug),
        file_path: `../content/blog/${fileName}`,
        excerpt: String(data.excerpt),
        image_url: String(data.coverImage),
        featured_image_url: String(data.coverImage),
        meta_title: String(data.metaTitle),
        meta_description: String(data.metaDescription),
        og_image_url: String(data.ogImage),
        status: data.status === "draft" ? "draft" : "published",
        category: String(data.category),
        published_at: String(data.publishedAt),
        created_at: String(data.publishedAt),
        updated_at: String(data.updatedAt),
        readingMinutes: getReadingMinutes(contentBody),
      };
    })
    .filter((blog) => blog.status === "published")
    .sort(
      (leftBlog, rightBlog) =>
        new Date(rightBlog.updated_at).getTime() -
        new Date(leftBlog.updated_at).getTime(),
    );
}

async function fetchTable(query, label) {
  const { data, error } = await query;

  if (error) {
    throw new Error(`${label} fetch failed: ${error.message}`);
  }

  return data ?? [];
}

async function buildSnapshot() {
  const [homepageContentRows, serviceCards, pricingCards, clients] =
    await Promise.all([
      fetchTable(
        supabase.from("site_content").select("*").eq("page", "homepage"),
        "site_content",
      ),
      fetchTable(
        supabase.from("service_cards").select("*").order("display_order", {
          ascending: true,
        }),
        "service_cards",
      ),
      fetchTable(
        supabase.from("pricing_cards").select("*").order("display_order", {
          ascending: true,
        }),
        "pricing_cards",
      ),
      fetchTable(
        supabase.from("clients").select("*").eq("is_active", true).order("sort_order", {
          ascending: true,
        }),
        "clients",
      ),
    ]);

  const homepageContent = homepageContentRows.reduce((accumulator, item) => {
    accumulator[item.key] = item.value;
    return accumulator;
  }, {});

  return {
    generatedAt: new Date().toISOString(),
    homepageContent,
    serviceCards,
    pricingCards,
    clients,
    blogIndex: getPublishedBlogIndex(),
  };
}

function writeSnapshotModule(snapshot) {
  const fileContents = `import type { PublicSiteSnapshot } from "../types/publicSite";

const publicSiteSnapshot: PublicSiteSnapshot = ${JSON.stringify(snapshot, null, 2)} as PublicSiteSnapshot;

export default publicSiteSnapshot;
`;

  fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });
  fs.writeFileSync(outputFilePath, fileContents);
  fs.writeFileSync(outputJsonFilePath, `${JSON.stringify(snapshot, null, 2)}\n`);
}

const snapshot = await buildSnapshot();
writeSnapshotModule(snapshot);
console.log(
  `Generated public site snapshot at ${outputFilePath} (${snapshot.blogIndex.length} published blogs).`,
);
