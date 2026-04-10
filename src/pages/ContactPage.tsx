import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactSection from "../components/ContactSection";
import { useContent } from "../hooks/useContent";
import Seo from "../components/Seo";
import { getAbsoluteUrl, SITE_NAME } from "../lib/seo";

export default function ContactPage() {
  const { content } = useContent("homepage");
  const title = `Iletisim | ${SITE_NAME}`;
  const description =
    "Projeniz icin sosyal medya, web tasarim, SEO veya dijital pazarlama surecini birlikte planlayalim.";
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: getAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Iletisim",
        item: getAbsoluteUrl("/iletisim"),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Seo
        title={title}
        description={description}
        path="/iletisim"
        schema={schema}
      />
      <Navbar />
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-[#17385f] via-[#2f4f8f] to-[#5c6fc4]" />

        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/icons/contact-hero/contact-email.svg"
            alt=""
            aria-hidden="true"
            className="absolute left-[7%] top-[132px] w-[72px] opacity-15 blur-[1px]"
          />
          <img
            src="/icons/contact-hero/contact-phone.svg"
            alt=""
            aria-hidden="true"
            className="absolute left-[19%] top-[88px] w-[70px] opacity-15"
          />
          <img
            src="/icons/contact-hero/contact-map.svg"
            alt=""
            aria-hidden="true"
            className="absolute right-[18%] top-[96px] w-[70px] opacity-15"
          />
          <img
            src="/icons/contact-hero/contact-message.svg"
            alt=""
            aria-hidden="true"
            className="absolute right-[7%] top-[142px] w-[72px] opacity-15 blur-[1px]"
          />
        </div>

        <div className="absolute inset-0">
          <div className="absolute top-20 left-[10%] h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-10 right-[12%] h-52 w-52 rounded-full bg-pink-300/10 blur-3xl" />
        </div>

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

      <div className="bg-gradient-to-b from-[#0f172a] to-[#111827]">
        <ContactSection content={content} />
      </div>

      <Footer />
    </div>
  );
}
