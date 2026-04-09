import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactSection from "../components/ContactSection";
import { useContent } from "../hooks/useContent";

export default function ContactPage() {
  const { content } = useContent("homepage");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-16 text-center bg-gradient-to-b from-[#0f172a] to-transparent">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            İletişim
          </h1>
          <p className="text-gray-300">
            Projeniz hakkında konuşalım. Size en uygun çözümü birlikte
            planlayalım.
          </p>
        </div>
      </section>

      <ContactSection content={content} />

      <Footer />
    </div>
  );
}
