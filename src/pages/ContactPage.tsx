import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactSection from "../components/ContactSection";
import { useContent } from "../hooks/useContent";

export default function ContactPage() {
  const { content } = useContent("homepage");

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Navbar />
      <section className="relative overflow-hidden pt-32 pb-20">
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#17385f] via-[#2f4f8f] to-[#5c6fc4]" />

        {/* Icon layer */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/icons/lucide--mail.svg"
            className="absolute left-[8%] top-[120px] w-[55px] opacity-20 blur-[1px]"
          />
          <img
            src="/icons/lucide--phone.svg"
            className="absolute left-[20%] top-[80px] w-[50px] opacity-15"
          />
          <img
            src="/icons/lucide--map-pin.svg"
            className="absolute right-[18%] top-[100px] w-[55px] opacity-20"
          />
          <img
            src="/icons/lucide--message-circle.svg"
            className="absolute right-[8%] top-[140px] w-[50px] opacity-15 blur-[1px]"
          />
        </div>

        {/* Light blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-[10%] h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-10 right-[12%] h-52 w-52 rounded-full bg-pink-300/10 blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            İletişim
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/85 md:text-lg">
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
