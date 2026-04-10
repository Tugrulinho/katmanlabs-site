import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileCode2,
  FolderOpen,
  GitCommitHorizontal,
  Sparkles,
} from "lucide-react";

const frontmatterTemplate = `---
title: Baslik
slug: benzersiz-slug
excerpt: Kisa ozet
category: SEO
publishedAt: 2026-04-10T12:00:00+03:00
updatedAt: 2026-04-10T12:00:00+03:00
coverImage: /blog/ornek-kapak.webp
metaTitle: Google sonucunda gorunecek baslik
metaDescription: Kisa ve dogal aciklama
ogImage: /blog/ornek-kapak.webp
status: draft
---`;

const mdxExample = `<Callout title="Mini Not" tone="info">
Bu alanda dikkat cekmek istedigin kisa bir not yazabilirsin.
</Callout>

<BlogImage
  src="/blog/ornek-gorsel.webp"
  alt="Ornek gorsel"
  caption="Yazi icindeki aciklayici gorsel"
/>

<SmartLink href="https://www.semrush.com/" kind="editorial">
  Semrush kaynagi
</SmartLink>`;

export default function AdminBlogForm() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-slate-900">
            Yeni Yazi Olusturma Akisi
          </h1>
          <p className="text-slate-600">
            Blog govdesi panel yerine MDX dosyalarindan geliyor. Buradaki rehber
            ile yeni yaziyi hizli ve tutarli sekilde ekleyebilirsin.
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/blogs")}
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-slate-600 transition-colors hover:bg-slate-100"
        >
          <ArrowLeft className="h-5 w-5" />
          Listeye Don
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <FolderOpen className="mt-1 h-5 w-5 text-blue-600" />
          <div>
            <h2 className="mb-2 text-xl font-semibold text-slate-900">
              Klasor ve dosya standardi
            </h2>
            <p className="leading-7 text-slate-600">
              Yeni bloglari <code>src/content/blog</code> klasorunde{" "}
              <code>slug.mdx</code> formatinda tutuyoruz. Gorseller icin yeni
              standardimiz <code>public/blog/</code>. Mevcut Supabase gorselleri
              ise geriye donuk uyumluluk icin calismaya devam eder.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <FileCode2 className="mb-3 h-5 w-5 text-slate-700" />
          <h3 className="mb-2 font-semibold text-slate-900">1. Dosyayi olustur</h3>
          <p className="text-sm leading-6 text-slate-600">
            Kategoriye uygun bir slug belirle ve ayni isimle yeni bir{" "}
            <code>.mdx</code> dosyasi olustur.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <Sparkles className="mb-3 h-5 w-5 text-slate-700" />
          <h3 className="mb-2 font-semibold text-slate-900">
            2. Frontmatter doldur
          </h3>
          <p className="text-sm leading-6 text-slate-600">
            Baslik, slug, kategori, SEO alanlari ve status degerlerini ustteki
            sabit alan yapisina gore doldur.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <GitCommitHorizontal className="mb-3 h-5 w-5 text-slate-700" />
          <h3 className="mb-2 font-semibold text-slate-900">3. Test ve deploy</h3>
          <p className="text-sm leading-6 text-slate-600">
            Yaziyi localde kontrol et, sonra commit ve push ile Vercel deploy
            akisina gonder.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            Frontmatter sablonu
          </h2>
          <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm leading-6 text-slate-100">
            <code>{frontmatterTemplate}</code>
          </pre>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            MDX bilesen ornegi
          </h2>
          <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm leading-6 text-slate-100">
            <code>{mdxExample}</code>
          </pre>
        </div>
      </div>

      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-7 text-blue-950">
        <p className="mb-2 font-semibold">Dis link kurali</p>
        <p>
          Normal editorial dis linkler otomatik olarak{" "}
          <code>noopener noreferrer</code> alir. Sponsor veya affiliate
          linklerde ise <code>{"<SmartLink kind=\"sponsored\" />"}</code>{" "}
          kullanarak <code>sponsored nofollow</code> ekleyebilirsin.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/admin/blogs"
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-white transition-colors hover:bg-slate-800"
        >
          Blog Listesine Don
        </Link>
        <a
          href="/blog"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 transition-colors hover:bg-slate-50"
        >
          Public Blogu Ac
        </a>
      </div>
    </div>
  );
}
