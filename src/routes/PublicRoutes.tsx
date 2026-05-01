import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  BarChart3,
  Globe,
  Instagram,
  Layers,
  TrendingUp,
  Users,
  Clock,
  Award,
  Star,
  HelpCircle,
  Target,
  Zap,
} from "lucide-react";
import AboutSection from "../components/AboutSection";
import BlogSection from "../components/BlogSection";
import ContactSection from "../components/ContactSection";
import FaqSection from "../components/FaqSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import PricingSection from "../components/PricingSection";
import ProcessSection from "../components/ProcessSection";
import Seo from "../components/Seo";
import ServicesSection from "../components/ServicesSection";
import StatsSection from "../components/StatsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import Blog from "../pages/Blog";
import BlogDetail from "../pages/BlogDetail";
import ContactPage from "../pages/ContactPage";
import DijitalPazarlama from "../pages/DijitalPazarlama";
import SeoAnalitik from "../pages/SeoAnalitik";
import SosyalMedyaTasarim from "../pages/SosyalMedyaTasarim";
import WebTasarim from "../pages/WebTasarim";
import { getAbsoluteUrl, SITE_NAME } from "../lib/seo";
import {
  getActiveClients,
  getHomepageContent,
  getPricingCards,
  getPublishedBlogIndex,
  getServiceCards,
} from "../lib/publicSite";
import { generateSlug } from "../lib/blogUtils";
import type { ClientRecord } from "../types/site";

type HomeService = {
  icon: JSX.Element;
  title: string;
  description: string;
  features: string[];
  color: string;
  slug: string;
  featured: boolean;
};

function HomePage() {
  const blogs = getPublishedBlogIndex();
  const content = getHomepageContent();
  const dbServices = getServiceCards();
  const dbPackages = getPricingCards();
  const [isMobile, setIsMobile] = useState(false);
  const [clients, setClients] = useState<ClientRecord[]>(getActiveClients());

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setClients(getActiveClients());
  }, []);

  const getBlogBadgeColor = (category: string) => {
    const normalizedCategory = generateSlug(category);

    if (normalizedCategory.includes("sosyal-medya")) {
      return "bg-pink-500";
    }
    if (normalizedCategory.includes("web-tasarim")) {
      return "bg-blue-500";
    }
    if (normalizedCategory.includes("dijital-pazarlama")) {
      return "bg-purple-500";
    }
    if (normalizedCategory.includes("seo")) {
      return "bg-green-500";
    }
    if (normalizedCategory.includes("analitik")) {
      return "bg-cyan-500";
    }

    return "bg-gray-500";
  };

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, JSX.Element> = {
      instagram: <Instagram className="w-12 h-12" />,
      globe: <Globe className="w-12 h-12" />,
      trendingup: <TrendingUp className="w-12 h-12" />,
      barchart3: <BarChart3 className="w-12 h-12" />,
    };
    return icons[iconName.toLowerCase()] || <Layers className="w-12 h-12" />;
  };

  const services: HomeService[] = dbServices.map((service) => ({
    icon: getIconComponent(service.icon_name),
    title: service.title,
    description: service.description,
    features: service.features,
    color: service.color,
    slug: service.slug,
    featured: service.featured,
  }));

  const stats = [
    {
      number: content.stat_1_number || "150+",
      label: content.stat_1_label || "Mutlu Musteri",
    },
    {
      number: content.stat_2_number || "%300",
      label: content.stat_2_label || "Ortalama ROI Artisi",
    },
    {
      number: content.stat_3_number || "50+",
      label: content.stat_3_label || "Aktif Proje",
    },
    {
      number: content.stat_4_number || "5+",
      label: content.stat_4_label || "Yillik Deneyim",
    },
  ];

  const process = [
    {
      title: "Kesif & Analiz",
      description:
        "Is hedeflerinizi ve hedef kitlenizi derinlemesine analiz ediyoruz.",
    },
    {
      title: "Strateji Gelistirme",
      description:
        "Size ozel, veri odakli dijital pazarlama stratejisi olusturuyoruz.",
    },
    {
      title: "Uygulama",
      description:
        "Plani hayata geciriyoruz. Her katmani ozenle insa ediyoruz.",
    },
    {
      title: "Optimizasyon",
      description:
        "Surekli izleme ve iyilestirme ile en iyi sonuclari garanti ediyoruz.",
    },
  ];

  const faqs = [
    {
      question: "Katmanli yaklasim nedir?",
      answer:
        "Web tasarim, dijital pazarlama ve SEO'yu birbirinden bagimsiz degil, birbiriyle entegre katmanlar olarak goruyoruz. Her katman bir oncekini guclendirir ve birlikte saglam bir dijital varlik olusturur.",
      icon: Layers,
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500",
    },
    {
      question: "Proje teslim suresi ne kadar?",
      answer:
        "Baslangic paketi icin 2-3 hafta, Profesyonel paket icin 4-6 hafta surer. Kurumsal projeler icin ozel timeline olusturulur.",
      icon: Clock,
      gradient: "from-orange-500/20 to-red-500/20",
      iconColor: "text-orange-500",
    },
    {
      question: "Hangi sektorlerde calisiyorsunuz?",
      answer:
        "E-ticaret, SaaS, egitim, saglik, finans ve daha bircok sektorde deneyimimiz var. Her sektore ozel stratejiler gelistiriyoruz.",
      icon: Target,
      gradient: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-500",
    },
    {
      question: "Sonuclari ne zaman gormeye baslarim?",
      answer:
        "Web sitesi tesliminden hemen sonra gorsel sonuclari gorursunuz. SEO ve pazarlama sonuclari genellikle 2-3 ay icinde belirgin hale gelir.",
      icon: Zap,
      gradient: "from-yellow-500/20 to-amber-500/20",
      iconColor: "text-yellow-500",
    },
    {
      question: "Destek hizmeti sunuyor musunuz?",
      answer:
        "Evet, tum paketlerimizde destek hizmeti bulunur. Sure pakete gore degisir. Ayrica aylik bakim paketleri de sunuyoruz.",
      icon: Award,
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-500",
    },
    {
      question: "Fiyatlandirma nasil calisiyor?",
      answer:
        "Her projenin ihtiyaclari farklidir. Baslangic paketi 5.000 EUR'dan baslar. Detayli fiyatlandirma icin paketlerimizi inceleyebilir veya ozel teklif alabilirsiniz.",
      icon: HelpCircle,
      gradient: "from-teal-500/20 to-cyan-500/20",
      iconColor: "text-teal-500",
    },
    {
      question: "Odeme yontemleri nelerdir?",
      answer:
        "Banka havalesi, kredi karti ve PayPal ile odeme kabul ediyoruz. Kurumsal musteriler icin ozel odeme planlari sunuyoruz.",
      icon: Users,
      gradient: "from-pink-500/20 to-rose-500/20",
      iconColor: "text-pink-500",
    },
    {
      question: "Revizyon hakki var mi?",
      answer:
        "Tum paketlerimizde revizyon hakki bulunur. Baslangic paketinde 2, Profesyonel paketinde 4, Kurumsal pakette sinirsiz revizyon hakkiniz vardir.",
      icon: Star,
      gradient: "from-cyan-500/20 to-blue-500/20",
      iconColor: "text-cyan-500",
    },
  ];

  const sortedClients = [...clients].sort(
    (leftClient, rightClient) => leftClient.sort_order - rightClient.sort_order,
  );

  const seoTitle = `${SITE_NAME} | Sosyal Medya, Web Tasarim ve Dijital Buyume`;
  const seoDescription =
    "Katman Labs; sosyal medya yonetimi, web tasarim, SEO ve dijital pazarlama ile markalarin daha net ve olculebilir buyumesine yardimci olur.";
  const homeSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: getAbsoluteUrl("/"),
      logo: getAbsoluteUrl("/favicon.png"),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: getAbsoluteUrl("/"),
      inLanguage: "tr-TR",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title={seoTitle}
        description={seoDescription}
        path="/"
        schema={homeSchema}
      />
      <Navbar />

      <HeroSection content={content} scrollToSection={scrollToSection} />
      <StatsSection stats={stats} />
      <ServicesSection
        content={content}
        services={services}
        servicesLoading={false}
      />
      <AboutSection content={content} />
      <ProcessSection process={process} />
      <BlogSection
        content={content}
        blogs={blogs}
        loading={false}
        isMobile={isMobile}
        getBlogBadgeColor={getBlogBadgeColor}
      />
      <PricingSection
        content={content}
        packages={dbPackages}
        packagesLoading={false}
        scrollToSection={scrollToSection}
      />
      <TestimonialsSection content={content} clients={sortedClients} />
      <FaqSection content={content} faqs={faqs} />
      <ContactSection content={content} />
      <Footer />
    </div>
  );
}

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/dijital-pazarlama"
        element={<Navigate to="/hizmet/dijital-pazarlama" replace />}
      />
      <Route
        path="/web-tasarim"
        element={<Navigate to="/hizmet/web-tasarim" replace />}
      />
      <Route
        path="/seo-analitik"
        element={<Navigate to="/hizmet/seo-analitik" replace />}
      />
      <Route
        path="/sosyal-medya-tasarim"
        element={<Navigate to="/hizmet/sosyal-medya-tasarim" replace />}
      />
      <Route
        path="/sosyal-medya-yonetimi"
        element={<Navigate to="/hizmet/sosyal-medya-tasarim" replace />}
      />
      <Route
        path="/hizmet/sosyal-medya-tasarim"
        element={<SosyalMedyaTasarim />}
      />
      <Route path="/hizmet/web-tasarim" element={<WebTasarim />} />
      <Route
        path="/hizmet/dijital-pazarlama"
        element={<DijitalPazarlama />}
      />
      <Route path="/hizmet/seo-analitik" element={<SeoAnalitik />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/kategori/:categorySlug" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogDetail />} />
      <Route path="/iletisim" element={<ContactPage />} />
    </Routes>
  );
}
