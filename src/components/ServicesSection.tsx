import { ChevronRight, Check, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import RotatingText from "./RotatingText";
import type { ContentMap } from "../types/site";

type Service = {
  icon: JSX.Element;
  title: string;
  description: string;
  features: string[];
  slug: string;
  featured: boolean;
};

type ServicesSectionProps = {
  content: ContentMap;
  services: Service[];
  servicesLoading: boolean;
};

function ServicesSection({
  content,
  services,
  servicesLoading,
}: ServicesSectionProps) {
  return (
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
            <span>{content.services_title_part1 || "Dijital sürecinizi"}</span>
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
  );
}

export default ServicesSection;
