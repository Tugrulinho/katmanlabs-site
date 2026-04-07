type ProcessStep = {
  title: string;
  description: string;
};

type ProcessSectionProps = {
  process: ProcessStep[];
};

export default function ProcessSection({ process }: ProcessSectionProps) {
  return (
    <section id="process" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-4">
            Çalışma Sürecimiz
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Başarılı projeler için kanıtlanmış 4 adımlık metodolojimiz
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
  );
}
