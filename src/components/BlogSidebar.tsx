import type { ContentBlog } from "../lib/blogContent";

type BlogSidebarProps = {
  blogs: ContentBlog[];
  currentCategory: string | null;
  onCategorySelect?: (category: string | null) => void;
};

const CATEGORY_LABELS: Record<string, string> = {
  "Web TasarÄ±m": "Web Tasarım",
  "Sosyal Medya YÃ¶netimi": "Sosyal Medya Yönetimi",
};

function normalizeCategory(category: string) {
  return CATEGORY_LABELS[category] || category;
}

export default function BlogSidebar({
  blogs,
  currentCategory,
  onCategorySelect,
}: BlogSidebarProps) {
  const categories = Array.from(
    new Set((blogs || []).map((blog) => normalizeCategory(blog.category)).filter(Boolean)),
  ) as string[];

  return (
    <div className="sticky top-24 space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-bold text-primary-dark">Kategoriler</h3>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => onCategorySelect?.(null)}
            className={`block w-full rounded-lg px-4 py-2 text-left transition-colors ${
              currentCategory === null
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Tüm Yazılar
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onCategorySelect?.(cat)}
              className={`block w-full rounded-lg px-4 py-2 text-left transition-colors ${
                cat === currentCategory
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
