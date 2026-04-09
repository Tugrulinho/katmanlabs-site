import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactSection from "../components/ContactSection";
import { useContent } from "../hooks/useContent";

export default function ContactPage() {
  const { content } = useContent("homepage");

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#17385f] via-[#2f4f8f] to-[#5c6fc4]" />
        <div className="relative h-[200px]" />
      </section>
      {/* BAŞLIK */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-dark mb-4">
            İletişim
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Projeniz hakkında konuşalım. Size en uygun çözümü birlikte
            planlayalım.
          </p>
        </div>
      </section>

      {/* CONTACT (MEVCUT SİSTEMİN) */}
      <div className="bg-gradient-to-b from-[#0f172a] to-[#111827]">
        <ContactSection content={content} />
      </div>

      <Footer />
    </div>
  );
}
