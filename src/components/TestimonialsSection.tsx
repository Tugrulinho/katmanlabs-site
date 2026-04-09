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
        <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused] w-max md:flex-nowrap">
          {[...clients, ...clients].map((brand, index) => (
            <div
              key={index}
              className="shrink-0 w-[90px] md:w-[280px] px-1 py-3 flex items-center justify-center"
            >
              <div className="flex items-center justify-center">
                <div className="h-14 md:h-20 flex items-center justify-center group">
                  {brand.website_url ? (
                    <a
                      href={brand.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={brand.logo_url}
                        alt={brand.name}
                        className="marquee-item h-16 md:h-20 max-w-full object-contain"
                      />
                    </a>
                  ) : (
                    <img
                      src={brand.logo_url}
                      alt={brand.name}
                      className="marquee-item h-16 md:h-20 max-w-full object-contain"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
