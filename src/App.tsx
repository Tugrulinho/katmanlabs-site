import FloatingMeetingButton from "./components/FloatingMeetingButton";
import { Suspense, lazy, useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
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
      "Sosyal Medya Yönetimi": "bg-pink-500",
      "Web Tasarım": "bg-blue-500",
      "Dijital Pazarlama": "bg-purple-500",
      SEO: "bg-green-500",
      Analitik: "bg-cyan-500",
      "İçerik Üretimi": "bg-orange-500",
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
      label: content.stat_1_label || "Mutlu Müşteri",
    },
    {
      number: content.stat_2_number || "%300",
      label: content.stat_2_label || "Ortalama ROI Artışı",
    },
    {
      number: content.stat_3_number || "50+",
      label: content.stat_3_label || "Aktif Proje",
    },
    {
      number: content.stat_4_number || "5+",
      label: content.stat_4_label || "Yıllık Deneyim",
    },
  ];

  const process = [
    {
      title: "Keşif & Analiz",
      description:
        "İş hedeflerinizi ve hedef kitlenizi derinlemesine analiz ediyoruz.",
    },
    {
      title: "Strateji Geliştirme",
      description:
        "Size özel, veri odaklı dijital pazarlama stratejisi oluşturuyoruz.",
    },
    {
      title: "Uygulama",
      description:
        "Planı hayata geçiriyoruz. Her katmanı özenle inşa ediyoruz.",
    },
    {
      title: "Optimizasyon",
      description:
        "Sürekli izleme ve iyileştirme ile en iyi sonuçları garanti ediyoruz.",
    },
  ];

  const faqs = [
    {
      question: "Katmanlı yaklaşım nedir?",
      answer:
        "Web tasarım, dijital pazarlama ve SEO'yu birbirinden bağımsız değil, birbiriyle entegre katmanlar olarak görüyoruz. Her katman bir öncekini güçlendirir ve birlikte sağlam bir dijital varlık oluşturur.",
      icon: Layers,
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500",
    },
    {
      question: "Proje teslim süresi ne kadar?",
      answer:
        "Başlangıç paketi için 2-3 hafta, Profesyonel paket için 4-6 hafta sürer. Kurumsal projeler için özel timeline oluşturulur.",
      icon: Clock,
      gradient: "from-orange-500/20 to-red-500/20",
      iconColor: "text-orange-500",
    },
    {
      question: "Hangi sektörlerde çalışıyorsunuz?",
      answer:
        "E-ticaret, SaaS, eğitim, sağlık, finans ve daha birçok sektörde deneyimimiz var. Her sektöre özel stratejiler geliştiriyoruz.",
      icon: Target,
      gradient: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-500",
    },
    {
      question: "Sonuçları ne zaman görmeye başlarım?",
      answer:
        "Web sitesi tesliminden hemen sonra görsel sonuçları görürsünüz. SEO ve pazarlama sonuçları genellikle 2-3 ay içinde belirgin hale gelir.",
      icon: Zap,
      gradient: "from-yellow-500/20 to-amber-500/20",
      iconColor: "text-yellow-500",
    },
    {
      question: "Destek hizmeti sunuyor musunuz?",
      answer:
        "Evet, tüm paketlerimizde destek hizmeti bulunur. Süre pakete göre değişir. Ayrıca aylık bakım paketleri de sunuyoruz.",
      icon: Award,
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-500",
    },
    {
      question: "Fiyatlandırma nasıl çalışıyor?",
      answer:
        "Her projenin ihtiyaçları farklıdır. Başlangıç paketi 5.000€'den başlar. Detaylı fiyatlandırma için paketlerimizi inceleyebilir veya özel teklif alabilirsiniz.",
      icon: HelpCircle,
      gradient: "from-teal-500/20 to-cyan-500/20",
      iconColor: "text-teal-500",
    },
    {
      question: "Ödeme yöntemleri nelerdir?",
      answer:
        "Banka havalesi, kredi kartı ve PayPal ile ödeme kabul ediyoruz. Kurumsal müşteriler için özel ödeme planları sunuyoruz.",
      icon: Users,
      gradient: "from-pink-500/20 to-rose-500/20",
      iconColor: "text-pink-500",
    },
    {
      question: "Revizyon hakkı var mı?",
      answer:
        "Tüm paketlerimizde revizyon hakkı bulunur. Başlangıç paketinde 2, Profesyonel paketinde 4, Kurumsal pakette sınırsız revizyon hakkınız vardır.",
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
