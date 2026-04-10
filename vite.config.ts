import fs from "node:fs";
import path from "node:path";
import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import matter from "gray-matter";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig, Plugin } from "vite";

const BLOG_CONTENT_DIR = path.resolve(__dirname, "src/content/blog");
const REQUIRED_FRONTMATTER_FIELDS = [
  "title",
  "slug",
  "excerpt",
  "category",
  "publishedAt",
  "updatedAt",
  "coverImage",
  "metaTitle",
  "metaDescription",
  "ogImage",
  "status",
];

function validatePublicAssetPath(
  assetPath: unknown,
  fileName: string,
  fieldName: string,
) {
  if (typeof assetPath !== "string" || assetPath.trim() === "") {
    throw new Error(`[blog-content] ${fileName} -> "${fieldName}" bos olamaz.`);
  }

  if (
    assetPath.startsWith("http://") ||
    assetPath.startsWith("https://") ||
    assetPath.startsWith("data:")
  ) {
    return;
  }

  if (!assetPath.startsWith("/")) {
    throw new Error(
      `[blog-content] ${fileName} -> "${fieldName}" yerel ise "/" ile baslamali.`,
    );
  }

  const resolvedAsset = path.resolve(__dirname, `public${assetPath}`);

  if (!fs.existsSync(resolvedAsset)) {
    throw new Error(
      `[blog-content] ${fileName} -> "${fieldName}" icin dosya bulunamadi: ${assetPath}`,
    );
  }
}

function validateBlogContentFiles() {
  if (!fs.existsSync(BLOG_CONTENT_DIR)) {
    return;
  }

  const slugRegistry = new Map<string, string>();
  const files = fs
    .readdirSync(BLOG_CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"));

  for (const fileName of files) {
    const fullPath = path.join(BLOG_CONTENT_DIR, fileName);
    const fileContent = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContent);

    for (const fieldName of REQUIRED_FRONTMATTER_FIELDS) {
      const value = data[fieldName];

      if (value === undefined || value === null || value === "") {
        throw new Error(
          `[blog-content] ${fileName} -> gerekli frontmatter alani eksik: ${fieldName}`,
        );
      }
    }

    if (data.status !== "draft" && data.status !== "published") {
      throw new Error(
        `[blog-content] ${fileName} -> "status" alani draft veya published olmali.`,
      );
    }

    if (slugRegistry.has(String(data.slug))) {
      throw new Error(
        `[blog-content] Tekrarlanan slug bulundu: "${data.slug}" (${slugRegistry.get(String(data.slug))} ve ${fileName})`,
      );
    }

    slugRegistry.set(String(data.slug), fileName);
    validatePublicAssetPath(data.coverImage, fileName, "coverImage");
    validatePublicAssetPath(data.ogImage, fileName, "ogImage");
  }
}

function blogContentValidator(): Plugin {
  return {
    name: "blog-content-validator",
    buildStart() {
      validateBlogContentFiles();
    },
    configureServer(server) {
      validateBlogContentFiles();
      server.watcher.add(BLOG_CONTENT_DIR);
    },
  };
}

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [
        remarkFrontmatter,
        [remarkMdxFrontmatter, { name: "frontmatter" }],
      ],
    }),
    react(),
    blogContentValidator(),
  ],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
