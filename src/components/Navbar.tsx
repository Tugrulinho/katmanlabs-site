import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Layers,
  BookOpen,
  Globe,
  TrendingUp,
  BarChart3,
  Instagram,
} from "lucide-react";
import { useBlogs } from "../hooks/useBlogs";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBlogMenuOpen, setIsBlogMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const blogMenuRef = useRef<HTMLDivElement>(null);
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const blogTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { blogs, loading } = useBlogs();
  useEffect(() => {
    const shouldScrollToContact = sessionStorage.getItem("scrollToContact");

    if (shouldScrollToContact === "true" && location.pathname === "/") {
      sessionStorage.removeItem("scrollToContact");

      setTimeout(() => {
        const element = document.getElementById("contact-form");
        if (element) {
          const navbar = document.querySelector("nav");
          const navbarHeight = navbar ? navbar.offsetHeight : 100;

          const y =
            element.getBoundingClientRect().top +
            window.pageYOffset -
            navbarHeight +
            40;
          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
        }
      }, 300);
    }
  }, [location.pathname]);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        blogMenuRef.current &&
        !blogMenuRef.current.contains(event.target as Node)
      ) {
        setIsBlogMenuOpen(false);
      }
      if (
        servicesMenuRef.current &&
        !servicesMenuRef.current.contains(event.target as Node)
      ) {
        setIsServicesMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (servicesTimeoutRef.current) {
        clearTimeout(servicesTimeoutRef.current);
      }
      if (blogTimeoutRef.current) {
        clearTimeout(blogTimeoutRef.current);
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Sosyal Medya Yönetimi":
        "bg-pink-500/30 text-pink-200 border-pink-400/50",
      "Web Tasarım": "bg-blue-500/30 text-blue-200 border-blue-400/50",
      "Dijital Pazarlama":
        "bg-purple-500/30 text-purple-200 border-purple-400/50",
      SEO: "bg-green-500/30 text-green-200 border-green-400/50",
      Genel: "bg-gray-500/30 text-gray-200 border-gray-400/50",
    };
    return colors[category] || colors["Genel"];
  };

  const services = [
    {
      icon: <Instagram className="w-10 h-10" />,
      title: "Sosyal Medya & Tasarım",
      slug: "sosyal-medya-tasarim",
      featured: true,
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: "Web Tasarım & Geliştirme",
      slug: "web-tasarim",
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: "Dijital Pazarlama",
      slug: "dijital-pazarlama",
    },
    {
      icon: <BarChart3 className="w-10 h-10" />,
      title: "SEO & Analitik",
      slug: "seo-analitik",
    },
  ];

  return (
    <nav className="fixed w-full z-50 flex justify-center pt-6 px-4">
      <div
        className={`relative w-full max-w-5xl transition-all duration-300 rounded-2xl border ${isScrolled ? "bg-zinc-900 border-zinc-800/50 shadow-2xl shadow-primary/10" : "bg-zinc-900 border-zinc-800/30 shadow-xl shadow-primary/5"}`}
      >
        <div className="flex justify-between items-center h-16 px-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <Layers className="w-8 h-8 text-accent-light" />
            <span className="text-2xl font-bold text-white">
              katman<span className="text-accent-light">labs</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-6">
            <div ref={servicesMenuRef} className="relative">
              <button
                onMouseEnter={() => {
                  if (servicesTimeoutRef.current) {
                    clearTimeout(servicesTimeoutRef.current);
                    servicesTimeoutRef.current = null;
                  }
                  setIsServicesMenuOpen(true);
                  setIsBlogMenuOpen(false);
                }}
                onMouseLeave={() => {
                  servicesTimeoutRef.current = setTimeout(() => {
                    setIsServicesMenuOpen(false);
                  }, 150);
                }}
                onClick={() => scrollToSection("services")}
                className="nav-link-hover flex items-center gap-1 px-3 py-2 text-gray-300 text-sm font-medium"
              >
                Hizmetler
                <ChevronDown className="w-4 h-4" />
              </button>

              {isServicesMenuOpen && (
                <div
                  className="absolute left-0 top-full mt-2 animate-fadeInUp"
                  style={{ minWidth: "600px", left: "-200px" }}
                  onMouseEnter={() => {
                    if (servicesTimeoutRef.current) {
                      clearTimeout(servicesTimeoutRef.current);
                      servicesTimeoutRef.current = null;
                    }
                  }}
                  onMouseLeave={() => setIsServicesMenuOpen(false)}
                >
                  <div className="bg-zinc-950/95 backdrop-blur-xl border border-zinc-700/80 rounded-2xl shadow-2xl p-6">
                    <div className="grid grid-cols-4 gap-4">
                      {services.map((service, index) => (
                        <Link
                          key={index}
                          to={`/hizmet/${service.slug}`}
                          onClick={() => setIsServicesMenuOpen(false)}
                          className={`group relative flex flex-col items-center p-4 rounded-xl border transition-all duration-300 hover:scale-105 cursor-pointer animate-fadeInUp ${
                            service.featured
                              ? "bg-gradient-to-br from-pink-600/20 to-orange-600/20 border-pink-500/50 hover:border-pink-400"
                              : "bg-zinc-900/60 border-zinc-800/50 hover:bg-zinc-800/80 hover:border-accent-light/50"
                          }`}
                          style={{
                            animationDelay: `${index * 75}ms`,
                          }}
                        >
                          {service.featured && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-xs">
                              ⭐
                            </div>
                          )}
                          <div
                            className={`mb-2 transition-transform duration-700 ${
                              service.featured
                                ? "text-pink-400 group-hover:rotate-360"
                                : "text-accent-light group-hover:rotate-360"
                            }`}
                          >
                            {service.icon}
                          </div>
                          <h4
                            className={`text-sm font-semibold text-center transition-colors ${
                              service.featured
                                ? "text-pink-100 group-hover:text-pink-300"
                                : "text-white group-hover:text-accent-light"
                            }`}
                          >
                            {service.title}
                          </h4>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection("process")}
              className="nav-link-hover px-3 py-2 text-gray-300 text-sm font-medium"
            >
              Süreç
            </button>

            <div ref={blogMenuRef} className="relative">
              <button
                onMouseEnter={() => {
                  if (blogTimeoutRef.current) {
                    clearTimeout(blogTimeoutRef.current);
                    blogTimeoutRef.current = null;
                  }
                  setIsBlogMenuOpen(true);
                  setIsServicesMenuOpen(false);
                }}
                onMouseLeave={() => {
                  blogTimeoutRef.current = setTimeout(() => {
                    setIsBlogMenuOpen(false);
                  }, 150);
                }}
                onClick={() => navigate("/blog")}
                className="nav-link-hover flex items-center gap-1 px-3 py-2 text-gray-300 text-sm font-medium"
              >
                Blog
                <ChevronDown className="w-4 h-4" />
              </button>

              {isBlogMenuOpen && !loading && blogs.length > 0 && (
                <div
                  className="absolute left-0 top-full mt-2"
                  style={{ minWidth: "900px", left: "-400px" }}
                  onMouseEnter={() => {
                    if (blogTimeoutRef.current) {
                      clearTimeout(blogTimeoutRef.current);
                      blogTimeoutRef.current = null;
                    }
                  }}
                  onMouseLeave={() => setIsBlogMenuOpen(false)}
                >
                  <div className="bg-zinc-950/95 backdrop-blur-xl border border-zinc-700/80 rounded-2xl shadow-2xl p-6">
                    <div className="space-y-4">
                      {[0, 1, 2].map((rowIndex) => {
                        const startIdx = rowIndex * 4;
                        const rowBlogs = blogs.slice(startIdx, startIdx + 4);

                        if (rowBlogs.length === 0) return null;

                        return (
                          <div
                            key={rowIndex}
                            className="grid grid-cols-1 lg:grid-cols-4 gap-4 animate-fadeInUp"
                            style={{ animationDelay: `${rowIndex * 75}ms` }}
                          >
                            {rowBlogs.map((blog) => (
                              <Link
                                key={blog.id}
                                to={`/blog/${blog.slug}`}
                                className="group flex gap-3 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/50 hover:bg-zinc-800/80 hover:border-zinc-700 transition-all duration-200 shadow-sm hover:shadow-lg"
                                onClick={() => setIsBlogMenuOpen(false)}
                              >
                                <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-zinc-800 ring-1 ring-zinc-700/50">
                                  <img
                                    src={blog.image_url}
                                    alt={blog.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-semibold text-white line-clamp-2 mb-2 group-hover:text-accent-light transition-colors">
                                    {blog.title}
                                  </h4>
                                  <span
                                    className={`inline-block text-xs px-2.5 py-1 rounded-full border font-medium ${getCategoryColor(blog.category)}`}
                                  >
                                    {blog.category}
                                  </span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection("fiyatlar")}
              className="nav-link-hover px-3 py-2 text-gray-300 text-sm font-medium"
            >
              Fiyatlar
            </button>
            <button
              onClick={() => scrollToSection("contact-form")}
              className="px-6 py-2 bg-gradient-to-r from-accent-light to-accent text-white rounded-lg hover:shadow-lg hover:shadow-accent/50 hover:scale-105 transition-all duration-300 text-sm font-semibold"
            >
              İletişim
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-zinc-900/95 border-t border-zinc-800/50 rounded-b-2xl">
            <div className="px-4 py-4 space-y-3">
              <div className="space-y-2">
                <div className="px-4 py-2 text-gray-400 text-sm font-semibold">
                  Hizmetler
                </div>
                {services.map((service, index) => (
                  <Link
                    key={index}
                    to={`/hizmet/${service.slug}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-white hover:bg-gradient-to-r hover:from-accent-light/20 hover:to-accent/20 rounded-lg transition-all duration-300"
                  >
                    <div className="text-accent-light">{service.icon}</div>
                    <span className="text-sm">{service.title}</span>
                  </Link>
                ))}
              </div>
              <div className="border-t border-zinc-800/50 pt-3 space-y-3">
                <button
                  onClick={() => scrollToSection("process")}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-gradient-to-r hover:from-accent-light/20 hover:to-accent/20 rounded-lg transition-all duration-300"
                >
                  Süreç
                </button>
                <button
                  onClick={() => scrollToSection("blog-gallery")}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-gradient-to-r hover:from-accent-light/20 hover:to-accent/20 rounded-lg transition-all duration-300"
                >
                  Blog
                </button>
                <button
                  onClick={() => scrollToSection("fiyatlar")}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-gradient-to-r hover:from-accent-light/20 hover:to-accent/20 rounded-lg transition-all duration-300"
                >
                  Fiyatlar
                </button>
                <button
                  onClick={() => scrollToSection("contact-form")}
                  className="block w-full px-4 py-2 bg-gradient-to-r from-accent-light to-accent text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300"
                >
                  İletişim
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
