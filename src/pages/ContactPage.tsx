import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactSection from "../components/ContactSection";
import { useContent } from "../hooks/useContent";

export default function ContactPage() {
  const { content } = useContent("homepage");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-dark mb-4">
            İletişim
          </h1>
          <p className="text-lg text-gray-600">
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
