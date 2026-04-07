import { HelpCircle, Minus, Plus, MessageCircle } from "lucide-react";
import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
  icon: any;
  gradient: string;
  iconColor: string;
};

type FaqSectionProps = {
  content: any;
  faqs: FaqItem[];
  scrollToSection: (id: string) => void;
};

export default function FaqSection({ content, faqs, scrollToSection }: FaqSectionProps) {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  return (
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
            {content.faq_description || "Size yardımcı olmak için en çok sorulan soruları yanıtladık"}
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
                    setActiveAccordion(activeAccordion === index ? null : index);
                  }}
                  className="w-full p-4 flex items-center gap-4 text-left transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div
                      className={`relative w-10 h-10 rounded-lg bg-gradient-to-br ${faq.gradient} flex items-center justify-center border border-white/20 transition-all duration-300 ${
                        isActive ? "scale-110 shadow-lg" : "group-hover:scale-105"
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
                      isActive ? "bg-accent-light/20 rotate-180" : "group-hover:bg-white/20"
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
  );
}
