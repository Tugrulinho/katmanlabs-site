type AboutSectionProps = {
  content: any;
};

export default function AboutSection({ content }: AboutSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center" style={{ minHeight: "300px" }}>
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
  );
}
