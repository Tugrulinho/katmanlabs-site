import type { CSSProperties } from "react";
import { Star } from "lucide-react";

type TestimonialsSectionProps = {
  content: any;
  clients: Array<any>;
};

export default function TestimonialsSection({
  content,
  clients,
}: TestimonialsSectionProps) {
  return (
    <section className="py-24 bg-gradient-to-br from-zinc-900 via-primary-dark to-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-accent-light/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-accent-light mb-4">
            <Star className="w-4 h-4" />
            <span className="text-sm font-medium">
              {content.testimonials_badge || "Referanslarımız"}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {content.testimonials_title ||
              "Katmanlabs'ı Tercih Eden Mutlu Müşterilerimiz"}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
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
                className="marquee-card w-[160px] md:w-[280px] bg-white rounded-2xl p-4 shadow-md justify-center gap-2 relative"
                style={
                  {
                    "--glow-color": brand.glow_color || "#94a3b8",
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
