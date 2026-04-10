import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, FolderOpen, FileCode2, GitCommitHorizontal } from "lucide-react";

export default function AdminBlogForm() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Blog Yonetimi Degisti
          </h1>
          <p className="text-slate-600">
            Blog govdesi artik panel yerine MDX dosyalarindan geliyor.
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/blogs")}
          className="inline-flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Listeye Don
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <FolderOpen className="w-5 h-5 mt-1 text-blue-600" />
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Yeni blog ekleme akisi
            </h2>
            <p className="text-slate-600 leading-7">
              Yeni bloglar <code>src/content/blog</code> klasorundeki{" "}
              <code>.mdx</code> dosyalari ile yonetiliyor. Bu sayede yazi
              govdesi, inline gorseller, callout kutulari, CTA bloklari ve dis
              link davranisi tek yerden daha guvenli sekilde kontrol ediliyor.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <FileCode2 className="w-5 h-5 text-slate-700 mb-3" />
          <h3 className="font-semibold text-slate-900 mb-2">1. MDX dosyasi ac</h3>
          <p className="text-sm text-slate-600 leading-6">
            Ornek veya mevcut dosyalari baz alip yeni bir{" "}
            <code>slug.mdx</code> dosyasi olustur.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <FolderOpen className="w-5 h-5 text-slate-700 mb-3" />
          <h3 className="font-semibold text-slate-900 mb-2">
            2. Frontmatter doldur
          </h3>
          <p className="text-sm text-slate-600 leading-6">
            Baslik, slug, kategori, kapak gorseli ve SEO alanlari frontmatter
            icinde tanimlanir.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <GitCommitHorizontal className="w-5 h-5 text-slate-700 mb-3" />
          <h3 className="font-semibold text-slate-900 mb-2">
            3. Commit ve deploy et
          </h3>
          <p className="text-sm text-slate-600 leading-6">
            Dosya eklendikten sonra commit ve push ile Vercel deploy akisi
            normal sekilde devam eder.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm text-blue-950 leading-7">
        <p className="font-semibold mb-2">Kisa not</p>
        <p>
          Dis linkler icin normal editorial linkler otomatik olarak{" "}
          <code>noopener noreferrer</code> alir. Sponsor veya affiliate
          linklerde ise MDX icinde <code>{"<SmartLink kind=\"sponsored\" />"}</code>{" "}
          kullanarak <code>sponsored nofollow</code> ekleyebilirsin.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/admin/blogs"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          Blog Listesine Don
        </Link>
        <a
          href="/blog"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
        >
          Public Blogu Ac
        </a>
      </div>
    </div>
  );
}
