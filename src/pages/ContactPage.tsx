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
      <section className="pt-32 pb-20 bg-gradient-to-b from-[#0f172a] via-[#233e68] to-[#6f5aa6]" />

      {/* BAŞLIK */}
      <section className="py-16 bg-[#0f172a]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            İletişim
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
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
