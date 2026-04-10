import type { ComponentType } from "react";
import type { MDXComponents } from "mdx/types";
import BlogImage from "../components/blog/BlogImage";
import Callout from "../components/blog/Callout";
import MdxBlogCTA from "../components/blog/MdxBlogCTA";
import SmartLink from "../components/blog/SmartLink";

type BlogFrontmatter = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  coverImage: string;
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  status: "draft" | "published";
};

type BlogModule = {
  default: ComponentType<{ components?: MDXComponents }>;
  frontmatter: BlogFrontmatter;
};

export interface ContentBlog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  featured_image_url: string;
  meta_title: string;
  meta_description: string;
  og_image_url: string;
  status: "draft" | "published";
  category: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  readingMinutes: number;
  Content: ComponentType<{ components?: MDXComponents }>;
  filePath: string;
}

const blogModules = import.meta.glob("../content/blog/*.mdx", {
  eager: true,
}) as Record<string, BlogModule>;

const blogRawModules = import.meta.glob("../content/blog/*.mdx", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, unknown>;

function normalizeRawFile(rawModule: unknown) {
  if (typeof rawModule === "string") {
    return rawModule;
  }

  if (
    rawModule &&
    typeof rawModule === "object" &&
    "default" in rawModule &&
    typeof (rawModule as { default?: unknown }).default === "string"
  ) {
    return (rawModule as { default: string }).default;
  }

  return "";
}

function stripFrontmatter(rawContent: string) {
  return rawContent.replace(/^---[\s\S]*?---\s*/, "").trim();
}

function getReadingMinutes(rawContent: string) {
  const plainText = rawContent
    .replace(/<[^>]+>/g, " ")
    .replace(/\{[^}]+\}/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const wordCount = plainText ? plainText.split(" ").length : 0;
  return Math.max(1, Math.ceil(wordCount / 200));
}

const allBlogs = Object.entries(blogModules)
  .map(([filePath, module]) => {
    const rawFile = normalizeRawFile(blogRawModules[filePath]);
    const contentBody = stripFrontmatter(rawFile);

    return {
      id: module.frontmatter.slug,
      title: module.frontmatter.title,
      slug: module.frontmatter.slug,
      excerpt: module.frontmatter.excerpt,
      content: contentBody,
      image_url: module.frontmatter.coverImage,
      featured_image_url: module.frontmatter.coverImage,
      meta_title: module.frontmatter.metaTitle,
      meta_description: module.frontmatter.metaDescription,
      og_image_url: module.frontmatter.ogImage,
      status: module.frontmatter.status,
      category: module.frontmatter.category,
      published_at: module.frontmatter.publishedAt,
      created_at: module.frontmatter.publishedAt,
      updated_at: module.frontmatter.updatedAt,
      readingMinutes: getReadingMinutes(contentBody),
      Content: module.default,
      filePath,
    } satisfies ContentBlog;
  })
  .sort((leftBlog, rightBlog) => {
    return (
      new Date(rightBlog.updated_at).getTime() -
      new Date(leftBlog.updated_at).getTime()
    );
  });

export const BLOG_MDX_COMPONENTS: MDXComponents = {
  a: SmartLink,
  img: BlogImage,
  SmartLink,
  BlogImage,
  Callout,
  BlogCTA: MdxBlogCTA,
};

export function getAllBlogs() {
  return allBlogs;
}

export function getPublishedBlogs() {
  return allBlogs.filter((blog) => blog.status === "published");
}

export function getBlogBySlug(slug: string) {
  return getPublishedBlogs().find((blog) => blog.slug === slug) || null;
}
