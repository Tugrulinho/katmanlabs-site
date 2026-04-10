import { useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink,
  Layers3,
  Tag,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useBlogBySlug } from "../hooks/useBlogBySlug";
import { useBlogs } from "../hooks/useBlogs";
import BlogSidebar from "../components/BlogSidebar";
import BlogCTA from "../components/BlogCTA";
import { generateSlug } from "../lib/blogUtils";
import Seo from "../components/Seo";
import { BLOG_MDX_COMPONENTS } from "../lib/blogContent";
import { getAbsoluteUrl, SITE_NAME } from "../lib/seo";
import SectionIntro from "../components/blog/SectionIntro";
import StatGrid from "../components/blog/StatGrid";
import MiniChart from "../components/blog/MiniChart";
import KeyTakeaways from "../components/blog/KeyTakeaways";

type HeadingItem = {
  level: 2 | 3;
  text: string;
  id: string;
};

const CATEGORY_ALIASES: Record<string, string> = {
  "Web TasarÄ±m": "Web Tasarım",
  "Sosyal Medya YÃ¶netimi": "Sosyal Medya Yönetimi",
};

function normalizeCategory(category: string) {
  return CATEGORY_ALIASES[category] || category;
}

function normalizeHeadingText(text: string) {
  return text
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function extractHeadings(rawContent: string) {
  const headings: HeadingItem[] = [];
  const htmlHeadingPattern = /<h([23])[^>]*>([\s\S]*?)<\/h\1>/gi;
  const markdownHeadingPattern = /^(##|###)\s+(.+)$/gm;

  let htmlMatch: RegExpExecArray | null;
  while ((htmlMatch = htmlHeadingPattern.exec(rawContent))) {
    const text = normalizeHeadingText(htmlMatch[2] || "");
    if (!text) {
      continue;
    }

    headings.push({
      level: Number(htmlMatch[1]) as 2 | 3,
      text,
      id: generateSlug(text),
    });
  }

  let markdownMatch: RegExpExecArray | null;
  while ((markdownMatch = markdownHeadingPattern.exec(rawContent))) {
    const text = normalizeHeadingText(markdownMatch[2] || "");
    if (!text || headings.some((heading) => heading.text === text)) {
      continue;
    }

    headings.push({
      level: markdownMatch[1] === "##" ? 2 : 3,
      text,
      id: generateSlug(text),
    });
  }

  return headings;
}

function countExternalLinks(rawContent: string) {
  const urlPattern = /href=["'](https?:\/\/[^"']+)["']/gi;
  const urls = new Set<string>();

  let match: RegExpExecArray | null;
  while ((match = urlPattern.exec(rawContent))) {
    try {
      const parsedUrl = new URL(match[1]);
      if (!["katmanlabs.com", "www.katmanlabs.com"].includes(parsedUrl.hostname)) {
        urls.add(match[1]);
      }
    } catch {
      continue;
    }
  }

  return urls.size;
}

function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { blog, loading, error } = useBlogBySlug(slug);
  const { blogs } = useBlogs();

  const formatDate = (dateString: string | null) => {
    if (!dateString) {
      return "Tarih belirtilmedi";
    }

    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    if (!blog) {
      return;
    }

    const headingElements = Array.from(
      document.querySelectorAll<HTMLElement>(".blog-content h2, .blog-content h3"),
    );

    headingElements.forEach((element) => {
      const text = normalizeHeadingText(element.textContent || "");
      if (!text) {
        return;
      }

      element.id = generateSlug(text);
    });
  }, [blog]);

  const normalizedCategory = normalizeCategory(blog?.category || "Genel");

  const colors = useMemo(() => {
    const colorSchemes: Record<
      string,
      { gradient: string; border: string; tag: string; text: string }
    > = {
      "Web Tasarım": {
        gradient: "from-primary via-primary-dark to-zinc-900",
        border: "border-primary",
        tag: "bg-primary/20 text-primary border-primary/30",
        text: "text-primary",
      },
      "Dijital Pazarlama": {
        gradient: "from-secondary via-purple-800 to-zinc-900",
        border: "border-secondary",
        tag: "bg-secondary/20 text-secondary border-secondary/30",
        text: "text-secondary",
      },
      SEO: {
        gradient: "from-accent via-purple-700 to-zinc-900",
        border: "border-accent",
        tag: "bg-accent/20 text-accent border-accent/30",
        text: "text-accent",
      },
      "Sosyal Medya Yönetimi": {
        gradient: "from-pink-500 via-purple-700 to-zinc-900",
        border: "border-pink-400",
        tag: "bg-pink-500/20 text-pink-200 border-pink-400/30",
        text: "text-pink-400",
      },
      Genel: {
        gradient: "from-gray-700 via-gray-800 to-zinc-900",
        border: "border-gray-600",
        tag: "bg-gray-500/20 text-gray-300 border-gray-500/30",
        text: "text-gray-600",
      },
    };

    return colorSchemes[normalizedCategory] || colorSchemes["Genel"];
  }, [normalizedCategory]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary" />
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-white">
        <Seo
          title={`Blog Yazisi Bulunamadi | ${SITE_NAME}`}
          description="Aradiginiz blog yazisi bulunamadi."
          path={slug ? `/blog/${slug}` : "/blog"}
          noindex={true}
        />
        <Navbar />
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
          <h1 className="mb-4 text-4xl font-bold text-primary-dark">
            Blog yazisi bulunamadi
          </h1>
          <p className="mb-8 text-gray-600">
            {error || "Bu blog yazisi mevcut degil."}
          </p>
          <button
            onClick={() => navigate("/")}
            className="rounded-lg bg-primary px-6 py-3 text-white transition-colors hover:bg-primary-dark"
          >
            Ana Sayfaya Don
          </button>
        </div>
      </div>
    );
  }

  const seoTitle = blog.meta_title || blog.title;
  const seoDescription = blog.meta_description || blog.excerpt || "";
  const seoImage = blog.og_image_url || blog.featured_image_url || "";
  const headings = extractHeadings(blog.content);
  const externalLinkCount = countExternalLinks(blog.content);
  const takeawayItems = headings.filter((item) => item.level === 2).slice(0, 4);
  const relatedBlogs = blogs
    .filter(
      (item) =>
        item.id !== blog.id &&
        normalizeCategory(item.category) === normalizedCategory,
    )
    .slice(0, 3);

  const relatedServiceMap: Record<
    string,
    { href: string; label: string; description: string }
  > = {
    SEO: {
      href: "/hizmet/seo-analitik",
      label: "SEO ve Analitik Hizmeti",
      description:
        "Bu yazidaki konu basliklarini hizmete donusturen sureci detayli inceleyin.",
    },
    "Web Tasarım": {
      href: "/hizmet/web-tasarim",
      label: "Web Tasarim ve Gelistirme",
      description:
        "Performans, deneyim ve donusum odakli web yapisini hizmet sayfasinda gorun.",
    },
    "Dijital Pazarlama": {
      href: "/hizmet/dijital-pazarlama",
      label: "Dijital Pazarlama ve Reklam Yonetimi",
      description:
        "Reklam ve donusum tarafinda nasil bir sistem kurdugumuzu detayli okuyun.",
    },
    "Sosyal Medya Yönetimi": {
      href: "/hizmet/sosyal-medya-tasarim",
      label: "Sosyal Medya Yonetimi ve Tasarim",
      description:
        "Icerik duzeni, tasarim dili ve surec yonetimini hizmet sayfasinda inceleyin.",
    },
  };
  const relatedService = relatedServiceMap[normalizedCategory] || null;
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: seoTitle,
      description: seoDescription,
      image: seoImage ? [getAbsoluteUrl(seoImage)] : undefined,
      datePublished: blog.published_at || blog.created_at,
      dateModified: blog.updated_at,
      mainEntityOfPage: getAbsoluteUrl(`/blog/${blog.slug}`),
      author: {
        "@type": "Organization",
        name: SITE_NAME,
      },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: getAbsoluteUrl("/"),
      },
      articleSection: normalizedCategory,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Ana Sayfa",
          item: getAbsoluteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: getAbsoluteUrl("/blog"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: blog.title,
          item: getAbsoluteUrl(`/blog/${blog.slug}`),
        },
      ],
    },
  ];

  const Content = blog.Content;

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title={seoTitle}
        description={seoDescription}
        path={`/blog/${blog.slug}`}
        image={seoImage}
        type="article"
        schema={schema}
      />
      <Navbar />

      <div className={`bg-gradient-to-br ${colors.gradient} py-20 pt-32 text-white`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/blog")}
            className="mb-8 flex items-center gap-2 text-accent-light transition-colors hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
            Bloga Don
          </button>

          <div className="max-w-4xl">
            <div
              className={`mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm ${colors.tag}`}
            >
              <Tag className="h-4 w-4" />
              <span className="text-sm font-medium">{normalizedCategory}</span>
            </div>

            <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              {blog.title}
            </h1>

            {blog.excerpt ? (
              <p className="mb-8 mt-6 text-xl leading-relaxed text-gray-200">
                {blog.excerpt}
              </p>
            ) : null}

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(blog.published_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{blog.readingMinutes} dk okuma suresi</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers3 className="h-4 w-4" />
                <span>{headings.length || 1} bolumluk yapi</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {blog.image_url ? (
        <div className="mx-auto -mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`overflow-hidden rounded-[28px] border-4 shadow-2xl ${colors.border}`}
          >
            <img
              src={blog.image_url}
              alt={blog.title}
              className="h-[26rem] w-full object-cover"
            />
          </div>
        </div>
      ) : null}

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
          <SectionIntro
            eyebrow="Yazinin Cekirdegi"
            title="Bu yazi ne anlatiyor?"
            description={blog.excerpt || "Bu yazinin ana fikrini hizli tarama icin ozetler."}
          >
            <p className="max-w-3xl text-base leading-8 text-slate-600">
              Bu yazi, konuyu uzun bir metin duvari gibi degil; karar almaya
              yardimci olacak ana bolumler halinde ele aliyor. Asagidaki ozet
              ve bolum yapisi sayesinde yaziyi tarayarak da takip edebilirsin.
            </p>
          </SectionIntro>

          <StatGrid
            title="Hizli Bakis"
            items={[
              {
                label: "Okuma",
                value: blog.readingMinutes,
                suffix: " dk",
                note: "Yazinin tahmini okuma suresi",
              },
              {
                label: "Bolum",
                value: headings.length || 1,
                note: "Ana anlatim basliklarinin sayisi",
              },
              {
                label: "Kaynak",
                value: externalLinkCount,
                note: "Yazida gecen harici kaynak sayisi",
              },
            ]}
          />
        </div>

        {takeawayItems.length > 0 ? (
          <KeyTakeaways
            title="Yazida Neler Var?"
            items={takeawayItems.map((item) => item.text)}
          />
        ) : null}

        <MiniChart
          title="Yazi Ritmi"
          items={[
            {
              label: "Bolum Yogunlugu",
              value: headings.length || 1,
              helper: "Basliklarin parcali yapisini gosterir.",
              colorClass: "from-[#17385f] to-[#2f4f8f]",
            },
            {
              label: "Kaynak Kullanimi",
              value: Math.max(externalLinkCount, 1),
              helper: "Harici referans sayisina gore olculur.",
              colorClass: "from-[#9062ae] to-[#cf99fa]",
            },
            {
              label: "Okuma Derinligi",
              value: blog.readingMinutes,
              helper: "Tahmini okuma suresi ile olculur.",
              colorClass: "from-[#0ea5e9] to-[#22c55e]",
            },
          ]}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <article className="max-w-3xl">
              <div className="blog-content text-gray-700 leading-relaxed">
                <Content components={BLOG_MDX_COMPONENTS} />
              </div>
            </article>

            <BlogCTA gradient={colors.gradient} />

            {relatedService ? (
              <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.25)]">
                <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Ilgili Hizmet
                </div>
                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  {relatedService.label}
                </h3>
                <p className="mt-3 max-w-2xl text-slate-600">
                  {relatedService.description}
                </p>
                <Link
                  to={relatedService.href}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
                >
                  Hizmet Sayfasina Git
                </Link>
              </div>
            ) : null}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {headings.length > 0 ? (
                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.35)]">
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Bu Yazida
                  </div>
                  <div className="mt-5 space-y-3">
                    {headings.map((heading) => (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className={`block rounded-2xl border border-slate-200 px-4 py-3 transition-colors hover:border-slate-300 hover:bg-slate-50 ${
                          heading.level === 3 ? "ml-4" : ""
                        }`}
                      >
                        <div className="text-sm font-medium text-slate-700">
                          {heading.text}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}

              {relatedBlogs.length > 0 ? (
                <div className="rounded-[28px] bg-gray-50 p-6">
                  <h3 className={`mb-6 text-xl font-bold ${colors.text}`}>
                    Ilgili Yazilar
                  </h3>
                  <div className="space-y-4">
                    {relatedBlogs.map((relatedBlog) => (
                      <Link
                        key={relatedBlog.id}
                        to={`/blog/${relatedBlog.slug}`}
                        className="group block"
                      >
                        <div className="flex gap-4 rounded-2xl p-3 transition-colors hover:bg-white">
                          <img
                            src={relatedBlog.image_url}
                            alt={relatedBlog.title}
                            className="h-20 w-20 flex-shrink-0 rounded-xl object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="mb-1 line-clamp-2 text-sm font-semibold text-primary-dark transition-colors group-hover:text-primary">
                              {relatedBlog.title}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {formatDate(relatedBlog.published_at)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.35)]">
                <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                  <ExternalLink className="h-4 w-4" />
                  Kategori Gecisi
                </div>
                <BlogSidebar
                  blogs={blogs}
                  currentCategory={normalizedCategory}
                  onCategorySelect={(category: string | null) => {
                    if (category) {
                      navigate(`/blog/kategori/${generateSlug(category)}`);
                    } else {
                      navigate("/blog");
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default BlogDetail;
