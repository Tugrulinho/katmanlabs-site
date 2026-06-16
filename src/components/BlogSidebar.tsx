import type { ContentBlog } from "../lib/blogContent";

type BlogSidebarProps = {
  blogs: ContentBlog[];
  currentCategory?: string | null;
  embedded?: boolean;
  onCategorySelect: (category: string | null) => void;
};

function normalizeCategory(category: string) {
  const aliases: Record<string, string> = {
    "Web TasarÃ„Â±m": "Web Tasarım",
    "Web TasarÄ±m": "Web Tasarım",
    "Sosyal Medya YÃ¶netimi": "Sosyal Medya Yönetimi",
    "Sosyal Medya YÃƒÂ¶netimi": "Sosyal Medya Yönetimi",
  };

  return aliases[category] || category;
}

export default function BlogSidebar({
  blogs,
  currentCategory,
  embedded = false,
  onCategorySelect,
}: BlogSidebarProps) {
  const categories = Array.from(
    new Set((blogs || []).map((blog) => normalizeCategory(blog.category)).filter(Boolean)),
  );
  const normalizedCurrentCategory = currentCategory
    ? normalizeCategory(currentCategory)
    : null;

  const content = (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_42px_-32px_rgba(15,23,42,0.35)]">
      <div className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
        Diğer Blog Kategorileri
      </div>
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => onCategorySelect(null)}
          className={`block w-full rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
            normalizedCurrentCategory
              ? "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              : "border-slate-900 bg-slate-900 text-white"
          }`}
        >
          Tüm Bloglar
        </button>

        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onCategorySelect(category)}
            className={`block w-full rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
              normalizedCurrentCategory === category
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );

  if (embedded) {
    return content;
  }

  return <div className="sticky top-24">{content}</div>;
}
