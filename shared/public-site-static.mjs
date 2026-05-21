export const BASE_URL = "https://www.katmanlabs.com";

export const SERVICE_ROUTE_PATHS = [
  "/hizmet/sosyal-medya-tasarim",
  "/hizmet/web-tasarim",
  "/hizmet/dijital-pazarlama",
  "/hizmet/seo-analitik",
];

export function generateSlug(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u0131/g, "i")
    .replace(/\u0130/g, "i")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getPublishedBlogIndex(snapshot) {
  return (snapshot?.blogIndex ?? []).filter((blog) => blog.status === "published");
}

export function getPublishedBlogCategories(snapshot) {
  const categoryEntries = new Map();

  for (const blog of getPublishedBlogIndex(snapshot)) {
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

export function getPublicPrerenderRoutes(snapshot) {
  const categoryRoutes = getPublishedBlogCategories(snapshot).map(
    (category) => `/blog/kategori/${category.slug}`,
  );
  const blogRoutes = getPublishedBlogIndex(snapshot).map((blog) => `/blog/${blog.slug}`);

  return [
    "/",
    "/blog",
    "/iletisim",
    ...SERVICE_ROUTE_PATHS,
    ...categoryRoutes,
    ...blogRoutes,
  ];
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function createSitemapXml(snapshot, baseUrl = BASE_URL) {
  const publishedBlogs = getPublishedBlogIndex(snapshot);
  const categoryRoutes = getPublishedBlogCategories(snapshot).map(
    (category) => `/blog/kategori/${category.slug}`,
  );
  const now = snapshot.generatedAt
    ? new Date(snapshot.generatedAt).toISOString()
    : new Date().toISOString();

  const urls = [
    ...["", "/blog", "/iletisim", ...SERVICE_ROUTE_PATHS].map(
      (routePath) => `  <url>
    <loc>${escapeXml(`${baseUrl}${routePath}`)}</loc>
    <lastmod>${escapeXml(now)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${routePath === "" ? "1.0" : "0.8"}</priority>
  </url>`,
    ),
    ...categoryRoutes.map(
      (routePath) => `  <url>
    <loc>${escapeXml(`${baseUrl}${routePath}`)}</loc>
    <lastmod>${escapeXml(now)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`,
    ),
    ...publishedBlogs.map(
      (blog) => {
        const imageTag = blog.image_url
          ? `\n    <image:image>\n      <image:loc>${escapeXml(blog.image_url)}</image:loc>\n    </image:image>`
          : "";

        return `  <url>
    <loc>${escapeXml(`${baseUrl}/blog/${blog.slug}`)}</loc>
    <lastmod>${escapeXml(blog.updated_at)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>${imageTag}
  </url>`;
      },
    ),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join("\n")}
</urlset>
`;
}
