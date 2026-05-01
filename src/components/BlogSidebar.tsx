import { Link } from "react-router-dom";
import { generateSlug } from "../lib/blogUtils";
import type { BlogIndexEntry } from "../types/publicSite";

type BlogSidebarProps = {
  blogs: BlogIndexEntry[];
  currentCategory: string | null;
};

const CATEGORY_LABELS: Record<string, string> = {
  "Web TasarÃ„Â±m": "Web TasarÄ±m",
  "Sosyal Medya YÃƒÂ¶netimi": "Sosyal Medya YÃ¶netimi",
};

function normalizeCategory(category: string) {
  return CATEGORY_LABELS[category] || category;
}

export default function BlogSidebar({
  blogs,
  currentCategory,
}: BlogSidebarProps) {
  const categories = Array.from(
    new Set(
      (blogs || []).map((blog) => normalizeCategory(blog.category)).filter(Boolean),
    ),
  ) as string[];

  return (
    <div className="sticky top-24 space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-bold text-primary-dark">Kategoriler</h3>

        <div className="space-y-2">
          <Link
            to="/blog"
            className={`block w-full rounded-lg px-4 py-2 text-left transition-colors ${
              currentCategory === null
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            TÃ¼m YazÄ±lar
          </Link>

          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/blog/kategori/${generateSlug(cat)}`}
              className={`block w-full rounded-lg px-4 py-2 text-left transition-colors ${
                cat === currentCategory
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
