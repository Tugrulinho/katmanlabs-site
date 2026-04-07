import { Check } from "lucide-react";

type PricingSectionProps = {
  content: any;
  packages: Array<any>;
  packagesLoading: boolean;
  scrollToSection: (id: string) => void;
};

export default function PricingSection({
  content,
  packages,
  packagesLoading,
  scrollToSection,
}: PricingSectionProps) {
  return (
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
                  {pkg.features.map((feature: string, idx: number) => (
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
  );
}
