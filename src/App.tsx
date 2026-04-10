import FloatingMeetingButton from "./components/FloatingMeetingButton";
import { Suspense, lazy, useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  Layers,
  Globe,
  TrendingUp,
  Users,
  BarChart3,
  Target,
  Zap,
  Clock,
  Award,
  Star,
  HelpCircle,
  Instagram,
} from "lucide-react";
import { useBlogs } from "./hooks/useBlogs";
import { useContent } from "./hooks/useContent";
import { useServiceCards } from "./hooks/useServiceCards";
import { usePricingCards } from "./hooks/usePricingCards";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import StatsSection from "./components/StatsSection";
import AboutSection from "./components/AboutSection";
import ProcessSection from "./components/ProcessSection";
import BlogSection from "./components/BlogSection";
import PricingSection from "./components/PricingSection";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import TestimonialsSection from "./components/TestimonialsSection";
import FaqSection from "./components/FaqSection";
import Seo from "./components/Seo";
import { getAbsoluteUrl, SITE_NAME } from "./lib/seo";
import type { ClientRecord } from "./types/site";

const ContactPage = lazy(() => import("./pages/ContactPage"));
const WebTasarim = lazy(() => import("./pages/WebTasarim"));
const DijitalPazarlama = lazy(() => import("./pages/DijitalPazarlama"));
const SeoAnalitik = lazy(() => import("./pages/SeoAnalitik"));
const SosyalMedyaTasarim = lazy(() => import("./pages/SosyalMedyaTasarim"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Messages = lazy(() => import("./pages/Messages"));
const AdminLayout = lazy(() => import("./components/AdminLayout"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminBlogs = lazy(() => import("./pages/AdminBlogs"));
const AdminBlogForm = lazy(() => import("./pages/AdminBlogForm"));
const AdminContent = lazy(() => import("./pages/AdminContent"));
const AdminClients = lazy(() => import("./AdminClients"));
const AdminServices = lazy(() => import("./pages/AdminServices"));
const AdminPricing = lazy(() => import("./pages/AdminPricing"));

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

type HomeService = {
  icon: JSX.Element;
  title: string;
  description: string;
  features: string[];
  color: string;
  slug: string;
  featured: boolean;
};

function RouteFallback() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
    </div>
  );
}

function HomePage() {
  const { blogs, loading } = useBlogs();
  const { content } = useContent("homepage");
  const { services: dbServices, loading: servicesLoading } = useServiceCards();
  const { packages: dbPackages, loading: packagesLoading } = usePricingCards();
  const [isMobile, setIsMobile] = useState(false);
  const [clients, setClients] = useState<ClientRecord[]>([]);

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
    const fetchClients = async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (error) {
        console.error(error);
        return;
      }

      setClients((data as ClientRecord[]) || []);
    };

    fetchClients();
  }, []);

  const getBlogBadgeColor = (category: string) => {
    const colors: Record<string, string> = {
      "Sosyal Medya YÃ¶netimi": "bg-pink-500",
      "Web TasarÄ±m": "bg-blue-500",
      "Dijital Pazarlama": "bg-purple-500",
      SEO: "bg-green-500",
      Analitik: "bg-cyan-500",
      "Ä°Ã§erik Ãœretimi": "bg-orange-500",
      Genel: "bg-gray-500",
    };

    return colors[category] || colors["Genel"];
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
      label: content.stat_1_label || "Mutlu MÃ¼ÅŸteri",
    },
    {
      number: content.stat_2_number || "%300",
      label: content.stat_2_label || "Ortalama ROI ArtÄ±ÅŸÄ±",
    },
    {
      number: content.stat_3_number || "50+",
      label: content.stat_3_label || "Aktif Proje",
    },
    {
      number: content.stat_4_number || "5+",
      label: content.stat_4_label || "YÄ±llÄ±k Deneyim",
    },
  ];

  const process = [
    {
      title: "KeÅŸif & Analiz",
      description:
        "Ä°ÅŸ hedeflerinizi ve hedef kitlenizi derinlemesine analiz ediyoruz.",
    },
    {
      title: "Strateji GeliÅŸtirme",
      description:
        "Size Ã¶zel, veri odaklÄ± dijital pazarlama stratejisi oluÅŸturuyoruz.",
    },
    {
      title: "Uygulama",
      description:
        "PlanÄ± hayata geÃ§iriyoruz. Her katmanÄ± Ã¶zenle inÅŸa ediyoruz.",
    },
    {
      title: "Optimizasyon",
      description:
        "SÃ¼rekli izleme ve iyileÅŸtirme ile en iyi sonuÃ§larÄ± garanti ediyoruz.",
    },
  ];

  const faqs = [
    {
      question: "KatmanlÄ± yaklaÅŸÄ±m nedir?",
      answer:
        "Web tasarÄ±m, dijital pazarlama ve SEO'yu birbirinden baÄŸÄ±msÄ±z deÄŸil, birbiriyle entegre katmanlar olarak gÃ¶rÃ¼yoruz. Her katman bir Ã¶ncekini gÃ¼Ã§lendirir ve birlikte saÄŸlam bir dijital varlÄ±k oluÅŸturur.",
      icon: Layers,
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500",
    },
    {
      question: "Proje teslim sÃ¼resi ne kadar?",
      answer:
        "BaÅŸlangÄ±Ã§ paketi iÃ§in 2-3 hafta, Profesyonel paket iÃ§in 4-6 hafta sÃ¼rer. Kurumsal projeler iÃ§in Ã¶zel timeline oluÅŸturulur.",
      icon: Clock,
      gradient: "from-orange-500/20 to-red-500/20",
      iconColor: "text-orange-500",
    },
    {
      question: "Hangi sektÃ¶rlerde Ã§alÄ±ÅŸÄ±yorsunuz?",
      answer:
        "E-ticaret, SaaS, eÄŸitim, saÄŸlÄ±k, finans ve daha birÃ§ok sektÃ¶rde deneyimimiz var. Her sektÃ¶re Ã¶zel stratejiler geliÅŸtiriyoruz.",
      icon: Target,
      gradient: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-500",
    },
    {
      question: "SonuÃ§larÄ± ne zaman gÃ¶rmeye baÅŸlarÄ±m?",
      answer:
        "Web sitesi tesliminden hemen sonra gÃ¶rsel sonuÃ§larÄ± gÃ¶rÃ¼rsÃ¼nÃ¼z. SEO ve pazarlama sonuÃ§larÄ± genellikle 2-3 ay iÃ§inde belirgin hale gelir.",
      icon: Zap,
      gradient: "from-yellow-500/20 to-amber-500/20",
      iconColor: "text-yellow-500",
    },
    {
      question: "Destek hizmeti sunuyor musunuz?",
      answer:
        "Evet, tÃ¼m paketlerimizde destek hizmeti bulunur. SÃ¼re pakete gÃ¶re deÄŸiÅŸir. AyrÄ±ca aylÄ±k bakÄ±m paketleri de sunuyoruz.",
      icon: Award,
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-500",
    },
    {
      question: "FiyatlandÄ±rma nasÄ±l Ã§alÄ±ÅŸÄ±yor?",
      answer:
        "Her projenin ihtiyaÃ§larÄ± farklÄ±dÄ±r. BaÅŸlangÄ±Ã§ paketi 5.000â‚º'den baÅŸlar. DetaylÄ± fiyatlandÄ±rma iÃ§in paketlerimizi inceleyebilir veya Ã¶zel teklif alabilirsiniz.",
      icon: HelpCircle,
      gradient: "from-teal-500/20 to-cyan-500/20",
      iconColor: "text-teal-500",
    },
    {
      question: "Ã–deme yÃ¶ntemleri nelerdir?",
      answer:
        "Banka havalesi, kredi kartÄ± ve PayPal ile Ã¶deme kabul ediyoruz. Kurumsal mÃ¼ÅŸteriler iÃ§in Ã¶zel Ã¶deme planlarÄ± sunuyoruz.",
      icon: Users,
      gradient: "from-pink-500/20 to-rose-500/20",
      iconColor: "text-pink-500",
    },
    {
      question: "Revizyon hakkÄ± var mÄ±?",
      answer:
        "TÃ¼m paketlerimizde revizyon hakkÄ± bulunur. BaÅŸlangÄ±Ã§ paketinde 2, Profesyonel paketinde 4, Kurumsal pakette sÄ±nÄ±rsÄ±z revizyon hakkÄ±nÄ±z vardÄ±r.",
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
        servicesLoading={servicesLoading}
      />
      <AboutSection content={content} />
      <ProcessSection process={process} />
      <BlogSection
        content={content}
        blogs={blogs}
        loading={loading}
        isMobile={isMobile}
        getBlogBadgeColor={getBlogBadgeColor}
      />
      <PricingSection
        content={content}
        packages={dbPackages}
        packagesLoading={packagesLoading}
        scrollToSection={scrollToSection}
      />
      <TestimonialsSection content={content} clients={sortedClients} />
      <FaqSection content={content} faqs={faqs} />
      <ContactSection content={content} />
      <Footer />
    </div>
  );
}

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js",
    });

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtm.js?id=GTM-KGLVZXQG";

    document.head.appendChild(script);
  }, []);

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/hizmet/sosyal-medya-tasarim"
            element={<SosyalMedyaTasarim onBack={() => navigate("/")} />}
          />
          <Route
            path="/hizmet/web-tasarim"
            element={<WebTasarim onBack={() => navigate("/")} />}
          />
          <Route
            path="/hizmet/dijital-pazarlama"
            element={<DijitalPazarlama onBack={() => navigate("/")} />}
          />
          <Route
            path="/hizmet/seo-analitik"
            element={<SeoAnalitik onBack={() => navigate("/")} />}
          />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/kategori/:categorySlug" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/iletisim" element={<ContactPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="blogs/new" element={<AdminBlogForm />} />
            <Route path="blogs/edit/:id" element={<AdminBlogForm />} />
            <Route path="content" element={<AdminContent />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="pricing" element={<AdminPricing />} />
            <Route path="messages" element={<Messages />} />
            <Route path="clients" element={<AdminClients />} />
          </Route>
          <Route
            path="/admin-v2"
            element={
              <ProtectedRoute>
                <div>Admin V2 Layout</div>
              </ProtectedRoute>
            }
          >
            <Route index element={<div>Admin V2 Dashboard</div>} />
          </Route>
        </Routes>
      </Suspense>
      <FloatingMeetingButton />
    </>
  );
}

export default App;
