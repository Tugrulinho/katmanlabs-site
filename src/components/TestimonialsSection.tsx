import type { CSSProperties } from "react";
import { Star } from "lucide-react";

type TestimonialsSectionProps = {
  content: any;
  clients: Array<any>;
};

const getGlowColor = (brandName: string): string => {
  const glowMap: Record<string, string> = {
    "Actisilk": "#FFD700",
    "Atasehir Bilişim": "#00CED1",
    "Proatak": "#0047AB",
    "Wiqo": "#8B0000",
    "Ekson Farma": "#A0223E",
    "Forlled Türkiye": "#C0C0C0",
    "Alphascience": "#0066CC",
  };
  return glowMap[brandName] || "#94a3b8";
};

export default function TestimonialsSection({
  content,
  clients,
}: TestimonialsSectionProps) {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-primary mb-4">
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
        <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused] w-max">
          {[...clients, ...clients].map((brand, index) => (
            <div
              key={index}
              className="shrink-0 w-[160px] md:w-[280px] px-2 py-3 flex items-center justify-center"
            >
              <div
                className="marquee-card w-[160px] md:w-[280px] bg-white rounded-2xl p-4 shadow-md justify-center gap-2 relative group"
                style={
                  {
                    "--glow-color": getGlowColor(brand.name),
                    boxShadow: `0 0 30px ${getGlowColor(brand.name)}20, 0 0 60px ${getGlowColor(brand.name)}15`,
                  } as CSSProperties
                }
              >
                <div className="h-16 flex items-center justify-center group">
                  {brand.website_url ? (
                    <a
                      href={brand.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={brand.logo_url}
                        alt={brand.name}
                        className="marquee-item h-12 max-w-[120px] object-contain"
                      />
                    </a>
                  ) : (
                    <img
                      src={brand.logo_url}
                      alt={brand.name}
                      className="marquee-item h-12 max-w-[120px] object-contain"
                    />
                  )}
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
  );
}
