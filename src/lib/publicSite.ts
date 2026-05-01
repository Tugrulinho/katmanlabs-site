import publicSiteSnapshot from "../generated/publicSiteSnapshot";
import { generateSlug } from "./blogUtils";
import { getBlogBySlug } from "./blogContent";

export const SERVICE_ROUTE_PATHS = [
  "/hizmet/sosyal-medya-tasarim",
  "/hizmet/web-tasarim",
  "/hizmet/dijital-pazarlama",
  "/hizmet/seo-analitik",
] as const;

export function getPublicSiteSnapshot() {
  return publicSiteSnapshot;
}

export function getHomepageContent() {
  return publicSiteSnapshot.homepageContent;
}

export function getServiceCards() {
  return [...publicSiteSnapshot.serviceCards].sort(
    (leftCard, rightCard) => leftCard.display_order - rightCard.display_order,
  );
}

export function getPricingCards() {
  return [...publicSiteSnapshot.pricingCards].sort(
    (leftCard, rightCard) => leftCard.display_order - rightCard.display_order,
  );
}

export function getActiveClients() {
  return [...publicSiteSnapshot.clients]
    .filter((client) => client.is_active)
    .sort((leftClient, rightClient) => leftClient.sort_order - rightClient.sort_order);
}

export function getPublishedBlogIndex() {
  return publicSiteSnapshot.blogIndex.filter((blog) => blog.status === "published");
}

export function getPublishedBlogCategories() {
  const categoryEntries = new Map<string, { name: string; slug: string }>();

  for (const blog of getPublishedBlogIndex()) {
    if (!blog.category) {
      continue;
    }

    const slug = generateSlug(blog.category);

    if (!categoryEntries.has(slug)) {
      categoryEntries.set(slug, {
        name: blog.category,
        slug,
      });
    }
  }

  return Array.from(categoryEntries.values());
}

export function getPublicPrerenderRoutes() {
  const blogCategories = getPublishedBlogCategories().map(
    (category) => `/blog/kategori/${category.slug}`,
  );
  const blogRoutes = getPublishedBlogIndex().map((blog) => `/blog/${blog.slug}`);

  return [
    "/",
    "/blog",
    "/iletisim",
    ...SERVICE_ROUTE_PATHS,
    ...blogCategories,
    ...blogRoutes,
  ];
}

export function getPublishedBlogsByCategory(category: string) {
  const normalizedCategory = category.trim().toLocaleLowerCase("tr-TR");

  return getPublishedBlogIndex().filter((blog) =>
    blog.category.toLocaleLowerCase("tr-TR").includes(normalizedCategory),
  );
}

export { getBlogBySlug };
