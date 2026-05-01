import type { ComponentType } from "react";
import type { MDXComponents } from "mdx/types";
import BlogImage from "../components/blog/BlogImage";
import Callout from "../components/blog/Callout";
import MdxBlogCTA from "../components/blog/MdxBlogCTA";
import SmartLink from "../components/blog/SmartLink";
import SectionIntro from "../components/blog/SectionIntro";
import StatGrid from "../components/blog/StatGrid";
import MiniChart from "../components/blog/MiniChart";
import SplitShowcase from "../components/blog/SplitShowcase";
import QuoteHighlight from "../components/blog/QuoteHighlight";
import KeyTakeaways from "../components/blog/KeyTakeaways";
import MediaFeature from "../components/blog/MediaFeature";
import FeatureCards from "../components/blog/FeatureCards";
import StepCards from "../components/blog/StepCards";
import BulletPanel from "../components/blog/BulletPanel";
import PullQuote from "../components/blog/PullQuote";
import publicSiteSnapshot from "../generated/publicSiteSnapshot";
import type { BlogIndexEntry } from "../types/publicSite";

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

export interface ContentBlog extends BlogIndexEntry {
  content: string;
  filePath: string;
  Content: ComponentType<{ components?: MDXComponents }>;
}

const eagerBlogModules = import.meta.env.SSR
  ? (import.meta.glob("../content/blog/*.mdx", {
      eager: true,
    }) as Record<string, BlogModule>)
  : {};

const eagerRawBlogModules = import.meta.env.SSR
  ? (import.meta.glob("../content/blog/*.mdx", {
      eager: true,
      query: "?raw",
      import: "default",
    }) as Record<string, string>)
  : {};

const lazyBlogModules = import.meta.glob("../content/blog/*.mdx") as Record<
  string,
  () => Promise<BlogModule>
>;

const lazyRawBlogModules = import.meta.glob("../content/blog/*.mdx", {
  query: "?raw",
  import: "default",
}) as Record<string, () => Promise<string>>;

const blogSummaryBySlug = new Map(
  publicSiteSnapshot.blogIndex.map((blog) => [blog.slug, blog]),
);
const blogCache = new Map<string, ContentBlog>();

function findModulePathBySlug<T>(registry: Record<string, T>, slug: string) {
  const expectedSuffix = `/${slug}.mdx`;
  return Object.keys(registry).find((filePath) => filePath.endsWith(expectedSuffix)) || null;
}

function normalizeRawBlogModule(rawModule: unknown) {
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

function createContentBlog(
  summary: BlogIndexEntry,
  filePath: string,
  module: BlogModule,
  rawContent: string,
) {
  return {
    ...summary,
    content: rawContent ? stripFrontmatter(rawContent) : "",
    filePath,
    Content: module.default,
  } satisfies ContentBlog;
}

function createSummaryFallback(summary: BlogIndexEntry) {
  return {
    ...summary,
    content: "",
    filePath: summary.file_path,
    Content: () => null,
  } satisfies ContentBlog;
}

function getServerBlogBySlug(slug: string) {
  if (blogCache.has(slug)) {
    return blogCache.get(slug) || null;
  }

  const summary = blogSummaryBySlug.get(slug);
  if (!summary) {
    return null;
  }

  const modulePath = findModulePathBySlug(eagerBlogModules, slug) || summary.file_path;
  const module = eagerBlogModules[modulePath];
  const rawContent = normalizeRawBlogModule(eagerRawBlogModules[modulePath]);

  if (!module) {
    return createSummaryFallback(summary);
  }

  const blog = createContentBlog(summary, modulePath, module, rawContent);
  blogCache.set(slug, blog);
  return blog;
}

export const BLOG_MDX_COMPONENTS: MDXComponents = {
  a: SmartLink,
  img: BlogImage,
  SmartLink,
  BlogImage,
  Callout,
  BlogCTA: MdxBlogCTA,
  SectionIntro,
  StatGrid,
  MiniChart,
  SplitShowcase,
  QuoteHighlight,
  KeyTakeaways,
  MediaFeature,
  FeatureCards,
  StepCards,
  BulletPanel,
  PullQuote,
};

export function getAllBlogs() {
  return publicSiteSnapshot.blogIndex;
}

export function getPublishedBlogs() {
  return publicSiteSnapshot.blogIndex.filter((blog) => blog.status === "published");
}

export function getBlogBySlug(slug: string) {
  if (import.meta.env.SSR) {
    return getServerBlogBySlug(slug);
  }

  return blogCache.get(slug) || null;
}

export async function loadBlogBySlug(slug: string) {
  if (blogCache.has(slug)) {
    return blogCache.get(slug) || null;
  }

  const summary = blogSummaryBySlug.get(slug);
  if (!summary) {
    return null;
  }

  if (import.meta.env.SSR) {
    return getServerBlogBySlug(slug);
  }

  const modulePath = findModulePathBySlug(lazyBlogModules, slug) || summary.file_path;
  const loadModule = lazyBlogModules[modulePath];
  const loadRawModule = lazyRawBlogModules[modulePath];

  if (!loadModule) {
    return createSummaryFallback(summary);
  }

  const [module, rawContent] = await Promise.all([
    loadModule(),
    loadRawModule ? loadRawModule() : Promise.resolve(""),
  ]);
  const blog = createContentBlog(summary, modulePath, module, rawContent);
  blogCache.set(slug, blog);
  return blog;
}
