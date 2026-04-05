import FloatingMeetingButton from "./components/FloatingMeetingButton";
import Messages from "./pages/Messages";
import { useState, useEffect, useRef } from "react";
import { supabase } from "./lib/supabase";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
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
  Mail,
  Phone,
  MessageCircle,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Plus,
  Minus,
  HelpCircle,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Search,
} from "lucide-react";
import { useBlogs } from "./hooks/useBlogs";
import { useContent } from "./hooks/useContent";
import { useServiceCards } from "./hooks/useServiceCards";
import { usePricingCards } from "./hooks/usePricingCards";
import StatCard from "./components/StatCard";
import RotatingText from "./components/RotatingText";
import Navbar from "./components/Navbar";
import SplineScene from "./components/SplineScene";
import Footer from "./components/Footer";
import WebTasarim from "./pages/WebTasarim";
import DijitalPazarlama from "./pages/DijitalPazarlama";
import SeoAnalitik from "./pages/SeoAnalitik";
import SosyalMedyaTasarim from "./pages/SosyalMedyaTasarim";
import BlogDetail from "./pages/BlogDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBlogs from "./pages/AdminBlogs";
import AdminBlogForm from "./pages/AdminBlogForm";
import AdminContent from "./pages/AdminContent";
import AdminServices from "./pages/AdminServices";
import AdminPricing from "./pages/AdminPricing";
import ScrollToTop from "./components/ScrollToTop";
function HomePage() {
  const navigate = useNavigate();
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const { blogs, loading } = useBlogs();
  const { content, loading: contentLoading } = useContent("homepage");
  const { services: dbServices, loading: servicesLoading } = useServiceCards();
  const { packages: dbPackages, loading: packagesLoading } = usePricingCards();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Sosyal Medya & Tasarım");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [cfToken, setCfToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clients, setClients] = useState<any[]>([]);
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
    window.onTurnstileSuccess = (token) => {
      setCfToken(token);
    };
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    document.body.appendChild(script);
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

      setClients(data || []);
    };

    fetchClients();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cfToken) {
      alert("Doğrulama başarısız");
      return;
    }
    console.log("FORM SUBMIT ÇALIŞTI");

    if (!name || !email || !message) {
      alert("Lütfen ad, email ve mesaj alanlarını doldurun.");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          service,
          message,
          website,
          cfToken,
        }),
      });

      const data = await res.json();

      console.log("API RESPONSE:", data);

      if (res.ok && data.success) {
        alert("Mesajınız gönderildi.");
        setName("");
        setEmail("");
        setPhone("");
        setService("Sosyal Medya & Tasarım");
        setMessage("");
      } else {
        alert(data.error || "Mesaj gönderilemedi.");
      }
    } catch (error) {
      console.error("FORM HATASI:", error);
      alert("Bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };
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

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.pageX);
    setStartY(e.pageY);
    setScrollLeftPos(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovering(false);
    setHasMoved(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setHasMoved(false), 100);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;

    const deltaX = Math.abs(e.pageX - startX);
    const deltaY = Math.abs(e.pageY - startY);

    if (deltaX > 5 || deltaY > 5) {
      setHasMoved(true);
    }

    e.preventDefault();
    const walk = (e.pageX - startX) * 1.0;
    scrollContainerRef.current.scrollLeft = scrollLeftPos - walk;
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const setupScroll = () => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      container.scrollLeft = maxScroll / 3;
    };

    if (blogs.length > 0) {
      setupScroll();
    }

    const handleScroll = () => {
      if (!container) return;

      const maxScroll = container.scrollWidth - container.clientWidth;
      const middlePoint = maxScroll / 3;
      const itemWidth = 288 + 24;

      if (container.scrollLeft <= itemWidth) {
        container.scrollLeft = middlePoint + (container.scrollLeft - itemWidth);
      } else if (container.scrollLeft >= maxScroll - itemWidth) {
        container.scrollLeft =
          middlePoint + (container.scrollLeft - (maxScroll - itemWidth));
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [blogs]);

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, JSX.Element> = {
      instagram: <Instagram className="w-12 h-12" />,
      globe: <Globe className="w-12 h-12" />,
      trendingup: <TrendingUp className="w-12 h-12" />,
      barchart3: <BarChart3 className="w-12 h-12" />,
    };
    return icons[iconName.toLowerCase()] || <Layers className="w-12 h-12" />;
  };

  const services = dbServices.map((service) => ({
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

  const testimonials = [
    {
      name: "Ahmet Yılmaz",
      role: "CEO, E-ticaret Şirketi",
      content:
        "katmanlabs ile çalışmaya başladıktan sonra online satışlarımız %200 arttı. Profesyonel yaklaşımları ve sonuç odaklı çalışmaları için teşekkür ederiz.",
      rating: 5,
    },
    {
      name: "Ayşe Demir",
      role: "Kurucu, SaaS Startup",
      content:
        "Web sitemiz sadece görsel olarak değil, teknik açıdan da mükemmel. SEO çalışmaları sayesinde organik trafiğimiz 4 katına çıktı.",
      rating: 5,
    },
    {
      name: "Mehmet Kaya",
      role: "Pazarlama Müdürü",
      content:
        "Katmanlı yaklaşımları sayesinde dijital varlığımızı adım adım inşa ettik. Her katman bir öncekini güçlendirdi.",
      rating: 5,
    },
  ];

  const packages = dbPackages;

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
        "Her projenin ihtiyaçları farklıdır. Başlangıç paketi 5.000₺'den başlar. Detaylı fiyatlandırma için paketlerimizi inceleyebilir veya özel teklif alabilirsiniz.",
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent-light rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="absolute inset-0 pointer-events-none z-5 overflow-hidden">
          <div
            className="absolute top-[25%] right-[15%] animate-float-slow"
            style={{ animationDelay: "1s" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600 rounded-2xl opacity-30 blur-xl animate-pulse-glow"></div>
              <div className="relative bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                <Facebook className="w-12 h-12 text-blue-600" />
              </div>
            </div>
          </div>

          <div
            className="absolute bottom-[8%] left-[25%] animate-float-medium"
            style={{ animationDelay: "2s" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl opacity-30 blur-xl animate-pulse-glow"></div>
              <div className="relative bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/20">
                <Layers className="w-8 h-8 text-blue-400" />
              </div>
            </div>
          </div>

          <div
            className="absolute bottom-[25%] left-[3%] animate-float"
            style={{ animationDelay: "3s" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-yellow-500 to-green-500 rounded-full opacity-30 blur-xl animate-pulse-glow"></div>
              <div className="relative bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/20">
                <Search className="w-9 h-9 text-blue-500" />
              </div>
            </div>
          </div>

          <div
            className="absolute bottom-[20%] right-[10%] animate-float-slow"
            style={{ animationDelay: "1.5s" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-700 rounded-2xl opacity-30 blur-xl animate-pulse-glow"></div>
              <div className="relative bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                <Linkedin className="w-10 h-10 text-blue-700" />
              </div>
            </div>
          </div>

          <div
            className="absolute top-[60%] right-[8%] animate-float-medium"
            style={{ animationDelay: "2.5s" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-red-600 rounded-2xl opacity-30 blur-xl animate-pulse-glow"></div>
              <div className="relative bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/20">
                <Youtube className="w-11 h-11 text-red-600" />
              </div>
            </div>
          </div>

          <div
            className="absolute bottom-[35%] right-[20%] animate-float"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 rounded-2xl opacity-30 blur-xl animate-pulse-glow"></div>
              <div className="relative bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/20">
                <MessageCircle className="w-9 h-9 text-green-500" />
              </div>
            </div>
          </div>

          <div
            className="absolute bottom-[10%] left-[15%] animate-float-slow opacity-60"
            style={{ animationDelay: "3.5s" }}
          >
            <div className="relative bg-white/5 backdrop-blur-sm p-2 rounded-xl border border-white/10">
              <Instagram className="w-6 h-6 text-pink-400" />
            </div>
          </div>

          <div
            className="absolute bottom-[5%] left-[35%] animate-float-medium opacity-60"
            style={{ animationDelay: "4s" }}
          >
            <div className="relative bg-white/5 backdrop-blur-sm p-2 rounded-xl border border-white/10">
              <Facebook className="w-7 h-7 text-blue-500" />
            </div>
          </div>

          <div
            className="absolute bottom-[12%] right-[30%] animate-float opacity-60"
            style={{ animationDelay: "4.5s" }}
          >
            <div className="relative bg-white/5 backdrop-blur-sm p-2 rounded-xl border border-white/10">
              <Youtube className="w-6 h-6 text-red-500" />
            </div>
          </div>

          <div
            className="absolute bottom-[8%] right-[15%] animate-float-medium opacity-60"
            style={{ animationDelay: "5s" }}
          >
            <div className="relative bg-white/5 backdrop-blur-sm p-2 rounded-xl border border-white/10">
              <Linkedin className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <SplineScene className="hidden md:block" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full pointer-events-none">
          <div className="max-w-xl lg:max-w-2xl text-center lg:text-left pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-accent-light mb-8">
              <Layers className="w-4 h-4" />
              <span className="text-sm font-medium">
                {content.hero_badge_text ||
                  "Dijital Başarı İçin 4 Güçlü Hizmet"}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              {content.hero_title_line1 || "Dijital Dünyada"}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-accent">
                {content.hero_title_line2 || "Markanızı Büyütün"}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-accent-light/90 mb-12 max-w-2xl mx-auto lg:mx-0">
              {content.hero_description ||
                "Sosyal medya, web tasarım, dijital pazarlama ve SEO hizmetleriyle markanızın dijital varlığını güçlendiriyoruz."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pointer-events-auto">
              <button
                onClick={() => scrollToSection("contact")}
                className="px-8 py-4 bg-gradient-cta text-white rounded-full font-semibold hover:scale-105 transition-transform shadow-lg flex items-center justify-center gap-2"
              >
                {content.hero_cta_primary || "Hemen Başla"}{" "}
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-primary transition-colors"
              >
                {content.hero_cta_secondary || "Hizmetleri Keşfet"}
              </button>
              <div
                className="hidden lg:block animate-float"
                style={{ marginLeft: "100px", animationDelay: "0s" }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl opacity-30 blur-xl animate-pulse-glow"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                    <Instagram className="w-10 h-10 text-pink-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 flex justify-center lg:justify-start">
            <ChevronDown className="w-8 h-8 text-accent-light animate-bounce" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                number={stat.number}
                label={stat.label}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-light/20 rounded-full text-primary mb-4">
              <Layers className="w-4 h-4" />
              <span className="text-sm font-medium">
                {content.services_badge || "Profesyonel Hizmetler"}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-4 flex flex-wrap items-center justify-center gap-3">
              <span>
                {content.services_title_part1 || "Dijital sürecinizi"}
              </span>
              <RotatingText
                words={[
                  { text: "planlı", color: "#ec4899" },
                  { text: "düzenli", color: "#215080" },
                  { text: "kontrollü", color: "#676fbc" },
                  { text: "etkili", color: "#cf99fa" },
                ]}
                interval={2000}
              />
              <span>{content.services_title_part2 || "ilerletiyoruz."}</span>
            </h2>
          </div>

          {servicesLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => {
                const borderColor = service.featured
                  ? "#ec4899"
                  : index === 1
                    ? "#215080"
                    : index === 2
                      ? "#676fbc"
                      : "#cf99fa";
                const iconColor = service.featured
                  ? "#ec4899"
                  : index === 1
                    ? "#215080"
                    : index === 2
                      ? "#676fbc"
                      : "#cf99fa";

                return (
                  <Link
                    key={index}
                    to={`/hizmet/${service.slug}`}
                    className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 cursor-pointer ${service.featured ? "ring-2 ring-pink-500/20" : ""}`}
                    style={{ borderTopColor: borderColor }}
                  >
                    {service.featured && (
                      <div className="absolute -top-3 right-4 px-3 py-1 bg-gradient-to-r from-pink-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                        ⭐ EN POPÜLER
                      </div>
                    )}
                    <div
                      className="mb-6 service-icon"
                      style={{ color: iconColor }}
                    >
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-primary-dark mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-gray-700"
                        >
                          <Check
                            className={`w-5 h-5 ${service.featured ? "text-pink-500" : "text-secondary"}`}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div
                      className={`flex items-center gap-2 font-semibold transition-colors ${service.featured ? "text-pink-600 group-hover:text-pink-700" : "text-primary group-hover:text-secondary"}`}
                    >
                      Detaylı Bilgi <ChevronRight className="w-4 h-4" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="grid md:grid-cols-2 gap-8 items-center"
            style={{ minHeight: "300px" }}
          >
            <div className="flex flex-col justify-center h-full py-8">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-6">
                {content.about_title || "Biz ne yapıyoruz ?"}
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-4 text-base">
                <p>
                  {content.about_text_1 ||
                    "Bugün sosyal medya, işletmeler için sadece bir paylaşım alanı değil; çoğu zaman ilk temas noktası."}
                </p>
                <p>
                  {content.about_text_2 ||
                    "Katman Labs olarak amacımız; küçük işletmeler için bu alanı rastgele değil, düzenli, anlaşılır ve markayı doğru yansıtan bir yapıya kavuşturmak."}
                </p>
                <p>
                  {content.about_text_3 ||
                    "Ürün de satsanız, hizmet de verseniz; sosyal medya profiliniz çoğu zaman satıştan önceki son durak."}
                </p>
                <p className="font-semibold text-primary-dark">
                  {content.about_text_4 ||
                    "Biz bu bütünlüğü kuruyor, sosyal medya hesaplarının sahipsiz kalmadan, düzenli bir şekilde devam etmesini sağlıyoruz."}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center h-full">
              <div className="relative w-full h-[300px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={
                    content.about_image_url ||
                    "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800"
                  }
                  alt="Sosyal Medya ve İşletme Yönetimi"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-4">
              {content.process_title || "Çalışma Sürecimiz"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {content.process_description ||
                "Başarılı projeler için kanıtlanmış 4 adımlık metodolojimiz"}
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-layer transform -translate-x-1/2 hidden md:block"></div>

            <div className="space-y-12">
              {process.map((step, index) => (
                <div
                  key={index}
                  className={`group flex items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div
                    className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                  >
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                      <h3 className="text-2xl font-bold text-primary-dark mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-cta rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg z-10 relative transition-all duration-300 group-hover:scale-150 group-hover:shadow-2xl">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="blog-gallery"
        className="py-20 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-light/20 rounded-full text-primary mb-4">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-medium">
                {content.blog_badge || "Blog & İçerikler"}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.blog_title || "Son Blog Yazılarımız"}
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {content.blog_description ||
                "Dijital dünyadan güncel içerikler, trendler ve ipuçları"}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : blogs.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {blogs.slice(0, isMobile ? 2 : 4).map((blog) => (
                <Link
                  key={blog.id}
                  to={`/blog/${blog.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={blog.image_url}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                    <span
                      className={`absolute bottom-4 left-4 px-3 py-1 text-white text-xs font-semibold rounded-full ${getBlogBadgeColor(blog.category)}`}
                    >
                      {blog.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center text-primary font-semibold">
                      Devamını Oku
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <p>Henüz blog yazısı bulunmamaktadır.</p>
            </div>
          )}
        </div>
      </section>

      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-4">
              {content.pricing_title || "Paketlerimiz"}
            </h2>
            <p className="text-xl text-gray-600">
              {content.pricing_description || "Her bütçeye uygun çözümler"}
            </p>
          </div>

          {packagesLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 ${pkg.popular ? "border-2 border-transparent bg-gradient-to-br from-pink-50 to-orange-50 scale-105 ring-2 ring-pink-500/20" : "border border-gray-200"}`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="px-4 py-1 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full text-sm font-semibold shadow-lg">
                        ⭐ En Popüler
                      </span>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-primary-dark mb-2">
                    {pkg.name}
                  </h3>
                  <div className="mb-6">
                    <span
                      className={`text-4xl font-bold ${pkg.popular ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-600" : "text-transparent bg-clip-text bg-gradient-cta"}`}
                    >
                      {pkg.price}
                    </span>
                    <span className="text-gray-600 ml-2">/ {pkg.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check
                          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${pkg.popular ? "text-pink-500" : "text-secondary"}`}
                        />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className={`w-full py-3 rounded-lg font-semibold transition-all ${pkg.popular ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:scale-105 shadow-lg" : "border-2 border-primary text-primary hover:bg-primary hover:text-white"}`}
                  >
                    Hemen Başla
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full text-pink-600 mb-4">
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">
                {content.testimonials_badge || "Referanslarımız"}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-4">
              {content.testimonials_title ||
                "Katmanlabs'ı Tercih Eden Mutlu Müşterilerimiz"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {content.testimonials_description ||
                "Birçok başarılı markayla çalışma fırsatı bulduk"}
            </p>
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="flex gap-8 animate-marquee w-max">
            {[...clients, ...clients].map((brand, index) => (
              <div
                key={index}
                className="min-w-[80%] md:min-w-[240px] px-4 py-6 flex items-center justify-center"
              >
                <div className="w-[160px] md:w-[200px] bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col items-center justify-center gap-2">
                  <div className="h-16 flex items-center justify-center">
                    <img
                      src={brand.logo_url}
                      alt={brand.name}
                      className="h-16 object-contain"
                    />
                  </div>

                  <div className="text-sm font-semibold text-primary-dark text-center">
                    {brand.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-zinc-900 via-primary-dark to-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-accent-light/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-accent-light mb-4">
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm font-medium">
                {content.faq_badge || "Sıkça Sorulan Sorular"}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {content.faq_title || "Merak Ettikleriniz"}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {content.faq_description ||
                "Size yardımcı olmak için en çok sorulan soruları yanıtladık"}
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
            {faqs.map((faq, index) => {
              const isActive = activeAccordion === index;
              const Icon = faq.icon;
              const isMobileHidden = index >= 4;

              return (
                <div
                  key={index}
                  className={`group relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border-2 transition-all duration-300 self-start ${
                    isActive
                      ? "border-accent-light/50 shadow-2xl shadow-accent-light/20"
                      : "border-white/10 hover:border-white/20 hover:shadow-lg"
                  } ${isMobileHidden ? "hidden md:block" : ""}`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                    <div
                      className={`w-full h-full bg-gradient-to-br ${faq.gradient} rounded-full blur-2xl`}
                    ></div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveAccordion(
                        activeAccordion === index ? null : index,
                      );
                    }}
                    className="w-full p-4 flex items-center gap-4 text-left transition-all duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div
                        className={`relative w-10 h-10 rounded-lg bg-gradient-to-br ${faq.gradient} flex items-center justify-center border border-white/20 transition-all duration-300 ${
                          isActive
                            ? "scale-110 shadow-lg"
                            : "group-hover:scale-105"
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${faq.iconColor}`} />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-base font-semibold transition-colors duration-300 ${
                          isActive
                            ? "text-accent-light"
                            : "text-white group-hover:text-accent-light"
                        }`}
                      >
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-accent-light/20 rotate-180"
                          : "group-hover:bg-white/20"
                      }`}
                    >
                      {isActive ? (
                        <Minus className="w-4 h-4 text-accent-light" />
                      ) : (
                        <Plus className="w-4 h-4 text-gray-300 group-hover:text-white" />
                      )}
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-4 pb-4">
                      <div
                        className={`ml-14 p-4 rounded-lg bg-gradient-to-br ${faq.gradient} border border-white/10`}
                      >
                        <p className="text-gray-200 text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>

                  {isActive && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-light/10 to-accent/10 pointer-events-none"></div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-300 mb-6">
              {content.faq_cta_text || "Başka sorularınız mı var?"}
            </p>
            <button
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-light to-accent text-white rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-accent-light/50"
            >
              <MessageCircle className="w-5 h-5" />
              {content.faq_button_text || "Bize Ulaşın"}
            </button>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-6">
                {content.contact_title || "Projenizi Konuşalım"}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {content.contact_description ||
                  "Dijital dönüşümünüze bugün başlayın. Size özel bir strateji geliştirmek için heyecanlıyız."}
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-primary-dark mb-1">
                      Email
                    </div>
                    <a
                      href={`mailto:${content.contact_email || "info@katmanlabs.com"}`}
                      className="text-primary hover:text-secondary transition-colors"
                    >
                      {content.contact_email || "info@katmanlabs.com"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <div className="font-semibold text-primary-dark mb-1">
                      Telefon
                    </div>
                    <a
                      href={`tel:${content.contact_phone || "+905428445570"}`}
                      className="text-primary hover:text-secondary transition-colors"
                    >
                      {content.contact_phone || "+90 542 844 55 70"}
                    </a>
                  </div>
                </div>

                <div id="contact-anchor" className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-primary-dark mb-1">
                      WhatsApp
                    </div>
                    <a
                      href={`https://wa.me/${content.contact_whatsapp || "905428445570"}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-secondary transition-colors"
                    >
                      Hemen Mesaj Gönder
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-cta rounded-xl text-white">
                <h3 className="font-bold text-xl mb-2">
                  {content.contact_consultation_title || "Ücretsiz Danışmanlık"}
                </h3>
                <p className="mb-4">
                  {content.contact_consultation_text ||
                    "İlk görüşme tamamen ücretsiz. Projeniz hakkında konuşalım ve size özel bir yol haritası çıkaralım."}
                </p>
                <a
                  href={`https://wa.me/${content.contact_whatsapp || "905428445570"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:scale-105 transition-transform"
                >
                  <MessageCircle className="w-5 h-5" />
                  {content.contact_consultation_button ||
                    "WhatsApp ile İletişime Geç"}
                </a>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    İsim Soyisim
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-accent-light/50 rounded-lg focus:border-secondary focus:outline-none transition-colors"
                    placeholder="Adınız"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-accent-light/50 rounded-lg focus:border-secondary focus:outline-none transition-colors"
                    placeholder="email@ornek.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-accent-light/50 rounded-lg focus:border-secondary focus:outline-none transition-colors"
                    placeholder="+90 500 000 00 00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Hangi hizmetlerle ilgileniyorsunuz?
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-accent-light/50 rounded-lg focus:border-secondary focus:outline-none transition-colors"
                  >
                    <option>Sosyal Medya & Tasarım</option>
                    <option>Web Tasarım & Geliştirme</option>
                    <option>Dijital Pazarlama</option>
                    <option>SEO & Analitik</option>
                    <option>Tüm Hizmetler (Full Paket)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Mesajınız
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-accent-light/50 rounded-lg focus:border-secondary focus:outline-none transition-colors"
                    placeholder="Projeniz hakkında bize biraz bilgi verin..."
                  ></textarea>
                </div>
                <div style={{ display: "none" }}>
                  <label>Website</label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    autoComplete="off"
                    tabIndex={-1}
                  />
                </div>
                <div
                  className="cf-turnstile"
                  data-sitekey="0x4AAAAAACt8xcbnaubosl1H"
                  data-callback="onTurnstileSuccess"
                ></div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-cta text-white rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? "Gönderiliyor..." : "Gönder"}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function App() {
  const navigate = useNavigate();

  return (
    <>
      <ScrollToTop />
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
        <Route path="/blog/:slug" element={<BlogDetail />} />

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
      <FloatingMeetingButton />
    </>
  );
}
export default App;
