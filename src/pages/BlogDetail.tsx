import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import Seo from "../components/Seo";
import SectionIntro from "../components/blog/SectionIntro";
import { BLOG_MDX_COMPONENTS } from "../lib/blogContent";
import { generateSlug } from "../lib/blogUtils";
import { getAbsoluteUrl, SITE_NAME } from "../lib/seo";

type HeadingItem = {
  level: 2 | 3;
  text: string;
  id: string;
};

const CATEGORY_ALIASES: Record<string, string> = {
  "Web TasarÄ±m": "Web Tasarım",
  "Web TasarÃ„Â±m": "Web Tasarım",
  "Sosyal Medya YÃ¶netimi": "Sosyal Medya Yönetimi",
  "Sosyal Medya YÃƒÂ¶netimi": "Sosyal Medya Yönetimi",
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

function getNavigationLabel(text: string) {
  const cleanedText = text
    .replace(/^\d+\.\s*/, "")
    .replace(/[?!.:,;]/g, "")
    .trim();

  const words = cleanedText.split(/\s+/).filter(Boolean);
  const compactWords = words.filter(
    (word) =>
      ![
        "ve",
        "ama",
        "ile",
        "mi",
        "mı",
        "mu",
        "mü",
        "için",
        "daha",
        "nasıl",
        "neden",
        "hangi",
      ].includes(word.toLowerCase()),
  );

  const preferredWords = compactWords.length > 1 ? compactWords : words;
  const shortLabel = preferredWords.slice(0, 3).join(" ");

  return shortLabel || cleanedText;
}

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { blog, loading, error } = useBlogBySlug(slug);
  const { blogs } = useBlogs();
  const [activeHeadingId, setActiveHeadingId] = useState<string | null>(null);
  const [navigationHeadings, setNavigationHeadings] = useState<HeadingItem[]>([]);

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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) {
      return;
    }

    const offset = 96;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;

    window.scrollTo({
      top: elementPosition - offset,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!blog) {
      return;
    }

    const headingElements = Array.from(
      document.querySelectorAll<HTMLElement>(".blog-content h2, .blog-content h3"),
    );

    const collectedHeadings: HeadingItem[] = [];

    headingElements.forEach((element) => {
      const text = normalizeHeadingText(element.textContent || "");
      if (!text) {
        return;
      }

      const id = generateSlug(text);
      const level = Number(element.tagName.replace("H", "")) as 2 | 3;

      element.id = id;
      collectedHeadings.push({
        level,
        text,
        id,
      });
    });

    setNavigationHeadings(
      collectedHeadings
        .filter(
          (heading, index, list) =>
            heading.level === 2 &&
            list.findIndex((item) => item.id === heading.id) === index,
        )
        .slice(0, 6),
    );
  }, [blog]);

  useEffect(() => {
    if (!blog) {
      return;
    }

    const headingElements = Array.from(
      document.querySelectorAll<HTMLElement>(".blog-content h2"),
    );

    if (!headingElements.length) {
      setActiveHeadingId(null);
      return;
    }

    setActiveHeadingId(headingElements[0]?.id || null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (leftEntry, rightEntry) =>
              leftEntry.boundingClientRect.top - rightEntry.boundingClientRect.top,
          );

        const currentEntry = visibleEntries[0];
        if (currentEntry?.target instanceof HTMLElement) {
          setActiveHeadingId(currentEntry.target.id);
        }
      },
      {
        rootMargin: "-18% 0px -62% 0px",
        threshold: 0.12,
      },
    );

    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [blog]);

  const normalizedCategory = normalizeCategory(blog?.category || "Genel");

  const colors = useMemo(() => {
    const colorSchemes: Record<
      string,
      {
        gradient: string;
        border: string;
        tag: string;
        text: string;
        navActive: string;
        navHover: string;
      }
    > = {
      "Web Tasarım": {
        gradient: "from-primary via-primary-dark to-zinc-900",
        border: "border-primary",
        tag: "bg-primary/20 text-primary border-primary/30",
        text: "text-primary",
        navActive: "border-primary bg-primary text-white shadow-lg shadow-primary/20",
        navHover: "hover:border-primary/30 hover:bg-primary/5",
      },
      "Dijital Pazarlama": {
        gradient: "from-secondary via-purple-800 to-zinc-900",
        border: "border-secondary",
        tag: "bg-secondary/20 text-secondary border-secondary/30",
        text: "text-secondary",
        navActive:
          "border-secondary bg-secondary text-white shadow-lg shadow-secondary/20",
        navHover: "hover:border-secondary/30 hover:bg-secondary/5",
      },
      SEO: {
        gradient: "from-accent via-purple-700 to-zinc-900",
        border: "border-accent",
        tag: "bg-accent/20 text-accent border-accent/30",
        text: "text-accent",
        navActive:
          "border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-500/20",
        navHover: "hover:border-emerald-200 hover:bg-emerald-50",
      },
      "Sosyal Medya Yönetimi": {
        gradient: "from-pink-500 via-purple-700 to-zinc-900",
        border: "border-pink-400",
        tag: "bg-pink-500/20 text-pink-200 border-pink-400/30",
        text: "text-pink-400",
        navActive:
          "border-pink-500 bg-pink-500 text-white shadow-lg shadow-pink-500/20",
        navHover: "hover:border-pink-200 hover:bg-pink-50",
      },
      Genel: {
        gradient: "from-gray-700 via-gray-800 to-zinc-900",
        border: "border-gray-600",
        tag: "bg-gray-500/20 text-gray-300 border-gray-500/30",
        text: "text-gray-600",
        navActive:
          "border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-900/10",
        navHover: "hover:border-slate-300 hover:bg-slate-50",
      },
    };

    return colorSchemes[normalizedCategory] || colorSchemes.Genel;
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
          title={`Blog Yazısı Bulunamadı | ${SITE_NAME}`}
          description="Aradığınız blog yazısı bulunamadı."
          path={slug ? `/blog/${slug}` : "/blog"}
          noindex={true}
        />
        <Navbar />
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
          <h1 className="mb-4 text-4xl font-bold text-primary-dark">
            Blog yazısı bulunamadı
          </h1>
          <p className="mb-8 text-gray-600">
            {error || "Bu blog yazısı mevcut değil."}
          </p>
          <button
            onClick={() => navigate("/")}
            className="rounded-lg bg-primary px-6 py-3 text-white transition-colors hover:bg-primary-dark"
          >
            Ana sayfaya dön
          </button>
        </div>
      </div>
    );
  }

  const seoTitle = blog.meta_title || blog.title;
  const seoDescription = blog.meta_description || blog.excerpt || "";
  const seoImage = blog.og_image_url || blog.featured_image_url || "";
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
        "Bu yazıdaki konuları gerçek bir SEO sistemi içinde nasıl kurduğumuzu detaylı inceleyin.",
    },
    "Web Tasarım": {
      href: "/hizmet/web-tasarim",
      label: "Web Tasarım ve Geliştirme",
      description:
        "Performans, deneyim ve dönüşüm odaklı web yapısını hizmet sayfasında görün.",
    },
    "Dijital Pazarlama": {
      href: "/hizmet/dijital-pazarlama",
      label: "Dijital Pazarlama ve Reklam Yönetimi",
      description:
        "Reklam ve dönüşüm tarafında nasıl bir sistem kurduğumuzu hizmet sayfasında okuyun.",
    },
    "Sosyal Medya Yönetimi": {
      href: "/hizmet/sosyal-medya-tasarim",
      label: "Sosyal Medya Yönetimi ve Tasarım",
      description:
        "İçerik düzeni, tasarım dili ve süreç yönetimini hizmet sayfasında inceleyin.",
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
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/blog")}
            className="mb-8 flex items-center gap-2 text-accent-light transition-colors hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
            Bloga dön
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
                <span>{blog.readingMinutes} dk okuma süresi</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers3 className="h-4 w-4" />
                <span>{navigationHeadings.length || 1} ana bölüm</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {blog.image_url ? (
        <div className="mx-auto -mt-12 max-w-[1440px] px-4 sm:px-6 lg:px-8">
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

      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Yazının Çekirdeği"
          title="Bu yazı ne anlatıyor?"
          description={blog.excerpt || "Bu yazının ana fikrini hızlı tarama için özetler."}
        >
          <p className="max-w-4xl text-base leading-8 text-slate-600">
            Bu sayfada içeriği gereksiz kutularla bölmek yerine, ana akışı daha
            rahat taranabilir hale getiriyoruz. Aşağıdaki önemli başlıklar ve
            sağdaki kısa geçiş alanı sayesinde istersen tüm yazıyı okuyabilir,
            istersen doğrudan ihtiyacın olan bölüme geçebilirsin.
          </p>
        </SectionIntro>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">
            <article className="max-w-none">
              <div className="blog-content leading-relaxed text-gray-700">
                <Content components={BLOG_MDX_COMPONENTS} />
              </div>
            </article>

            <div
              className={`mt-12 grid gap-6 ${
                relatedService ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]" : ""
              }`}
            >
              <section
                className={`rounded-[28px] bg-gradient-to-br ${colors.gradient} p-8 text-white shadow-[0_24px_60px_-34px_rgba(15,23,42,0.45)]`}
              >
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-white/65">
                  İletişim
                </div>
                <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
                  Bu içerik işine yaradıysa beraber netleştirelim
                </h3>
                <p className="mt-4 max-w-xl text-base leading-7 text-white/80">
                  Kendi markanda benzer bir yapının nasıl kurulacağını birlikte
                  değerlendirebiliriz.
                </p>
                <Link
                  to="/iletisim"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-transform hover:scale-[1.02]"
                >
                  Bizimle iletişime geç
                </Link>
              </section>

              {relatedService ? (
                <section className="rounded-[28px] border border-slate-200 bg-slate-50 p-8 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.25)]">
                  <div className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                    İlgili Hizmet
                  </div>
                  <h3 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
                    {relatedService.label}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                    {relatedService.description}
                  </p>
                  <Link
                    to={relatedService.href}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                  >
                    Hizmet sayfasına git
                  </Link>
                </section>
              ) : null}
            </div>
          </div>

          <div className="min-w-0">
            <div className="sticky top-24 space-y-6">
              {relatedBlogs.length > 0 ? (
                <div className="rounded-[28px] bg-gray-50 p-6">
                  <h3 className={`mb-6 text-xl font-bold ${colors.text}`}>
                    İlgili Yazılar
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
                  Kategori geçişi
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

      {navigationHeadings.length > 0 ? (
        <div className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-40">
          <nav className="w-[176px] rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl">
            <div className="space-y-2">
                  {navigationHeadings.map((heading) => (
                    <button
                      key={heading.id}
                      onClick={() => scrollToSection(heading.id)}
                      className={`block w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-all ${
                        activeHeadingId === heading.id
                      ? colors.navActive
                      : `text-gray-600 hover:bg-gray-100 ${colors.navHover}`
                  }`}
                >
                      {getNavigationLabel(heading.text)}
                    </button>
                  ))}
                </div>
          </nav>
        </div>
      ) : null}

      <Footer />
    </div>
  );
}
