import {
  ArrowRight,
  ChevronDown,
  Layers,
  Instagram,
  Facebook,
  Linkedin,
  Search,
  Youtube,
  MessageCircle,
} from "lucide-react";
import SplineScene from "./SplineScene";

type HeroSectionProps = {
  content: any;
  scrollToSection: (id: string) => void;
};

function HeroSection({ content, scrollToSection }: HeroSectionProps) {
  return (
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
              {content.hero_badge_text || "Dijital Başarı İçin 4 Güçlü Hizmet"}
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
  );
}

export default HeroSection;
