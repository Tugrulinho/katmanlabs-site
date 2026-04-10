import Navbar from "../components/Navbar";
import BlogSection from "../components/BlogSection";
import { useBlogs } from "../hooks/useBlogs";
import BlogSidebar from "../components/BlogSidebar";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import BlogCTA from "../components/BlogCTA";
import { Helmet } from "react-helmet-async";
export default function Blog() {
  const { categorySlug } = useParams();
  const { blogs, loading } = useBlogs();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 4;
  const navigate = useNavigate();
  const slugifyCategory = (value: string) =>
    value
      .toLowerCase()
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/\s+/g, "-");

  const categoryHeroMap: Record<
    string,
    {
      title: string;
      description: string;
      gradient: string;
      icons: { src: string; className: string }[];
    }
  > = {
    seo: {
      title: "SEO Üzerine Net ve Uygulanabilir İçerikler",
      description:
        "Teknik SEO, içerik kurgusu ve arama niyeti üzerine pratik ve ölçülebilir yaklaşımlar.\nSıralama yerine sürdürülebilir görünürlük ve trafik kalitesine odaklanır.",
      gradient: "from-[#17385f] via-[#494880] to-[#9062ae]",
      icons: [
        {
          src: "/icons/lucide--line-chart.svg",
          className:
            "absolute left-[5%] top-[170px] w-[100px] opacity-10 blur-[2px] scale-90",
        },
        {
          src: "/icons/lucide--monitor-play.svg",
          className:
            "absolute left-[15%] top-[130px] w-[110px] opacity-15 blur-[1px] scale-100",
        },
        {
          src: "/icons/lucide--layout-grid.svg",
          className:
            "absolute right-[20%] top-[150px] w-[90px] opacity-20 scale-110",
        },
        {
          src: "/icons/lucide--mouse-pointer-click.svg",
          className:
            "absolute right-[5%] top-[110px] w-[90px] opacity-15 blur-[1px] scale-100",
        },
      ],
    },

    "dijital-pazarlama": {
      title: "Dijital Pazarlamada İşe Yarayan Yaklaşımlar",
      description:
        "Reklam bütçesini daha verimli kullanmak için strateji, hedefleme ve dönüşüm odaklı içerikler.\nDeneme-yanılma yerine ölçülebilir sonuçlara dayalı yaklaşımlar sunar.",
      gradient: "from-[#f97316] via-[#fb7185] to-[#f43f5e]",
      icons: [
        {
          src: "/icons/lucide--target.svg",
          className:
            "absolute left-[6%] top-[180px] w-[100px] opacity-10 blur-[2px] scale-90",
        },
        {
          src: "/icons/lucide--badge-dollar-sign.svg",
          className:
            "absolute left-[18%] top-[130px] w-[95px] opacity-15 blur-[1px] scale-100",
        },
        {
          src: "/icons/lucide--megaphone.svg",
          className:
            "absolute right-[20%] top-[150px] w-[95px] opacity-20 scale-110",
        },
        {
          src: "/icons/lucide--mouse-pointer-click.svg",
          className:
            "absolute right-[6%] top-[110px] w-[90px] opacity-15 blur-[1px] scale-100",
        },
      ],
    },

    "web-tasarim": {
      title: "Web Tasarımda Kullanıcı Odaklı Yaklaşımlar",
      description:
        "Kullanıcı deneyimi, performans ve sade arayüz kurgusu üzerine pratik bilgiler.\nZiyaretçiyi müşteriye dönüştüren yapıların nasıl kurulacağını ele alır.",
      gradient: "from-[#1e3a8a] via-[#3b82f6] to-[#93c5fd]",
      icons: [
        {
          src: "/icons/lucide--monitor.svg",
          className:
            "absolute left-[5%] top-[180px] w-[105px] opacity-10 blur-[2px] scale-90",
        },
        {
          src: "/icons/lucide--panels-top-left.svg",
          className:
            "absolute left-[17%] top-[130px] w-[95px] opacity-15 blur-[1px] scale-100",
        },
        {
          src: "/icons/lucide--layout-template.svg",
          className:
            "absolute right-[20%] top-[150px] w-[95px] opacity-20 scale-110",
        },
        {
          src: "/icons/lucide--pen-tool.svg",
          className:
            "absolute right-[6%] top-[110px] w-[90px] opacity-15 blur-[1px] scale-100",
        },
      ],
    },

    "sosyal-medya-yonetimi": {
      title: "Sosyal Medyada Düzenli ve Tutarlı Üretim",
      description:
        "İçerik planlama, görsel dil ve paylaşım düzeni üzerine sürdürülebilir sistemler.\nMarkanın dijitalde güven veren bir görünüm kazanmasına odaklanır.",
      gradient: "from-[#7e22ce] via-[#a855f7] to-[#e9d5ff]",
      icons: [
        {
          src: "/icons/lucide--instagram.svg",
          className:
            "absolute left-[5%] top-[180px] w-[100px] opacity-10 blur-[2px] scale-90",
        },
        {
          src: "/icons/lucide--image.svg",
          className:
            "absolute left-[17%] top-[130px] w-[95px] opacity-15 blur-[1px] scale-100",
        },
        {
          src: "/icons/lucide--clapperboard.svg",
          className:
            "absolute right-[20%] top-[150px] w-[95px] opacity-20 scale-110",
        },
        {
          src: "/icons/lucide--sparkles.svg",
          className:
            "absolute right-[6%] top-[110px] w-[90px] opacity-15 blur-[1px] scale-100",
        },
      ],
    },

    default: {
      title: "Tasarım ve Büyüme Üzerine Notlar",
      description:
        "Sosyal medya, web ve dijital reklam süreçlerini daha düzenli yürütmek isteyenler için içerikler.\nGerçek kullanım senaryoları, hatalar ve uygulanabilir çözümler üzerine odaklanır.",
      gradient: "from-[#17385f] via-[#494880] to-[#9062ae]",
      icons: [
        {
          src: "/icons/lucide--line-chart.svg",
          className:
            "absolute left-[5%] top-[170px] w-[100px] opacity-10 blur-[2px] scale-90",
        },
        {
          src: "/icons/lucide--monitor-play.svg",
          className:
            "absolute left-[15%] top-[130px] w-[110px] opacity-15 blur-[1px] scale-100",
        },
        {
          src: "/icons/lucide--layout-grid.svg",
          className:
            "absolute right-[20%] top-[150px] w-[90px] opacity-20 scale-110",
        },
        {
          src: "/icons/lucide--mouse-pointer-click.svg",
          className:
            "absolute right-[5%] top-[110px] w-[90px] opacity-15 blur-[1px] scale-100",
        },
      ],
    },
  };

  const currentHero =
    categorySlug && categoryHeroMap[categorySlug]
      ? categoryHeroMap[categorySlug]
      : categoryHeroMap["default"];

  const activeCategory = categorySlug
    ? blogs.find(
        (blog: any) =>
          slugifyCategory(blog.category) === decodeURIComponent(categorySlug),
      )?.category || null
    : null;
  const categorySeoDescriptionMap: Record<string, string> = {
    seo: "SEO stratejileri, teknik iyilestirmeler ve organik buyumeyi destekleyen pratik blog yazilarini inceleyin.",
    "dijital-pazarlama":
      "Dijital pazarlama stratejileri, reklam yonetimi ve donusum odakli blog yazilarina goz atin.",
    "web-tasarim":
      "Web tasarim, kullanici deneyimi ve performans odakli blog yazilarini bu kategoride kesfedin.",
    "sosyal-medya-yonetimi":
      "Sosyal medya yonetimi, icerik plani ve gorsel iletisim uzerine kisa ve faydali yazilar burada.",
  };
  const fallbackCategoryName = categorySlug
    ? decodeURIComponent(categorySlug)
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : null;
  const seoCategoryName = activeCategory || fallbackCategoryName;
  const seoTitle = seoCategoryName
    ? `${seoCategoryName} Blog Yazilari | Katman Labs`
    : null;
  const seoDescription = categorySlug
    ? categorySeoDescriptionMap[decodeURIComponent(categorySlug)] ||
      `${seoCategoryName || "Bu kategori"} icin hazirlanan blog yazilarini kesfedin.`
    : null;
  const filteredBlogs = categorySlug
    ? blogs.filter(
        (blog: any) =>
          slugifyCategory(blog.category) === decodeURIComponent(categorySlug),
      )
    : blogs;
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + postsPerPage,
  );
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);
  useEffect(() => {
    if (categorySlug) {
      const decoded = decodeURIComponent(categorySlug);
      setSelectedCategory(decoded);
    } else {
      setSelectedCategory(null);
    }
  }, [categorySlug]);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);
  useEffect(() => {
    window.scrollTo({
      top: 300,
      behavior: "smooth",
    });
  }, [currentPage]);

  const floatStyle = {
    animation: "float 8s ease-in-out infinite",
  };

  return (
    <>
      {categorySlug && seoTitle && seoDescription ? (
        <Helmet>
          <title>{seoTitle}</title>
          <meta name="description" content={seoDescription} />
          <meta property="og:title" content={seoTitle} />
          <meta property="og:description" content={seoDescription} />
        </Helmet>
      ) : null}
      <Navbar />

      <section className="relative pb-16 overflow-hidden">
        {/* Hero background */}
        <div
          className={`absolute inset-0 top-0 h-[340px] bg-gradient-to-br ${currentHero.gradient}`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(242,131,228,0.18),transparent_24%),radial-gradient(circle_at_bottom_center,rgba(255,255,255,0.08),transparent_30%)]" />
        </div>

        <div className="relative z-10">
          <div className="container mx-auto px-4">
            <section className="relative h-[340px] overflow-hidden">
              {currentHero.icons.map((icon, index) => (
                <img
                  key={index}
                  src={icon.src}
                  className={icon.className}
                  alt=""
                />
              ))}

              <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center text-center">
                <div className="max-w-3xl px-4 pb-12">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {currentHero.title}
                  </h1>

                  <p className="mt-4 text-white/80">
                    {currentHero.description}
                  </p>
                </div>
              </div>
            </section>

            {/* ALT İÇERİK */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-16">
              <div className="lg:col-span-8">
                <BlogSection
                  content={{}}
                  blogs={paginatedBlogs}
                  loading={loading}
                  isMobile={false}
                  getBlogBadgeColor={() => "bg-primary"}
                  hideHeader={true}
                />

                <div className="flex justify-center mt-10 gap-2 items-center">
                  <button
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className={`px-3 py-2 rounded-lg text-sm ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    ←
                  </button>

                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`px-4 py-2 rounded-lg text-sm ${
                        currentPage === index + 1
                          ? "bg-primary text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className={`px-3 py-2 rounded-lg text-sm ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    →
                  </button>
                </div>

                <BlogCTA gradient="from-[#17385f] to-[#9062ae]" />
              </div>

              <aside className="lg:col-span-4 self-start">
                <BlogSidebar
                  blogs={blogs}
                  currentCategory={activeCategory}
                  onCategorySelect={(category: string | null) => {
                    if (category) {
                      navigate(`/blog/kategori/${slugifyCategory(category)}`);
                    } else {
                      navigate("/blog");
                    }
                  }}
                />
              </aside>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
