import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowRight, Mail, Phone, MessageCircle } from "lucide-react";

type ContactSectionProps = {
  content: any;
};

function ContactSection({ content }: ContactSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Sosyal Medya & Tasarım");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [cfToken, setCfToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const turnstileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const win = window as any;
    const callbackName = "onTurnstileSuccessContact";
    const siteKey = "0x4AAAAAACt8xcbnaubosl1H";

    const onSuccess = (token: string) => {
      setCfToken(token);
    };

    win[callbackName] = onSuccess;

    const renderTurnstile = () => {
      if (win.turnstile && turnstileRef.current) {
        win.turnstile.render(turnstileRef.current, {
          sitekey: siteKey,
          callback: onSuccess,
        });
      }
    };

    const scriptSrc = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${scriptSrc}"]`,
    );

    if (win.turnstile) {
      renderTurnstile();
    } else if (existingScript) {
      existingScript.addEventListener("load", renderTurnstile, { once: true });
    } else {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      script.defer = true;
      script.addEventListener("load", renderTurnstile, { once: true });
      document.body.appendChild(script);
    }

    return () => {
      if (win[callbackName] === onSuccess) {
        delete win[callbackName];
      }
    };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!cfToken) {
      alert("Doğrulama başarısız");
      return;
    }

    if (!name || !email || !message) {
      alert("Lütfen ad, email ve mesaj alanlarını doldurun.");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          service,
          message,
          website,
          cfToken,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("Mesajınız gönderildi.");
        setName("");
        setEmail("");
        setPhone("");
        setService("Sosyal Medya & Tasarım");
        setMessage("");
      } else {
        alert(data.error || "Mesaj gönderilemedi.");
      }
    } catch (error) {
      console.error("FORM HATASI:", error);
      alert("Bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-6">
              {content.contact_title || "Projenizi Konuşalım"}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {content.contact_description ||
                "Dijital dönüşümünüze bugün başlayın. Size özel bir strateji geliştirmek için heyecanlıyız."}
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-primary-dark mb-1">
                    Email
                  </div>
                  <a
                    href={`mailto:${content.contact_email || "info@katmanlabs.com"}`}
                    className="text-primary hover:text-secondary transition-colors"
                  >
                    {content.contact_email || "info@katmanlabs.com"}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <div className="font-semibold text-primary-dark mb-1">
                    Telefon
                  </div>
                  <a
                    href={`tel:${content.contact_phone || "+905428445570"}`}
                    className="text-primary hover:text-secondary transition-colors"
                  >
                    {content.contact_phone || "+90 542 844 55 70"}
                  </a>
                </div>
              </div>

              <div id="contact-anchor" className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="font-semibold text-primary-dark mb-1">
                    WhatsApp
                  </div>
                  <a
                    href={`https://wa.me/${content.contact_whatsapp || "905428445570"}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-secondary transition-colors"
                  >
                    Hemen Mesaj Gönder
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-cta rounded-xl text-white">
              <h3 className="font-bold text-xl mb-2">
                {content.contact_consultation_title || "Ücretsiz Danışmanlık"}
              </h3>
              <p className="mb-4">
                {content.contact_consultation_text ||
                  "İlk görüşme tamamen ücretsiz. Projeniz hakkında konuşalım ve size özel bir yol haritası çıkaralım."}
              </p>
              <a
                href={`https://wa.me/${content.contact_whatsapp || "905428445570"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:scale-105 transition-transform"
              >
                <MessageCircle className="w-5 h-5" />
                {content.contact_consultation_button ||
                  "WhatsApp ile İletişime Geç"}
              </a>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  İsim Soyisim
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-accent-light/50 rounded-lg focus:border-secondary focus:outline-none transition-colors"
                  placeholder="Adınız"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-accent-light/50 rounded-lg focus:border-secondary focus:outline-none transition-colors"
                  placeholder="email@ornek.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-accent-light/50 rounded-lg focus:border-secondary focus:outline-none transition-colors"
                  placeholder="+90 500 000 00 00"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Hangi hizmetlerle ilgileniyorsunuz?
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-accent-light/50 rounded-lg focus:border-secondary focus:outline-none transition-colors"
                >
                  <option>Sosyal Medya & Tasarım</option>
                  <option>Web Tasarım & Geliştirme</option>
                  <option>Dijital Pazarlama</option>
                  <option>SEO & Analitik</option>
                  <option>Tüm Hizmetler (Full Paket)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Mesajınız
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-accent-light/50 rounded-lg focus:border-secondary focus:outline-none transition-colors"
                  placeholder="Projeniz hakkında bize biraz bilgi verin..."
                ></textarea>
              </div>

              <div style={{ display: "none" }}>
                <label>Website</label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  autoComplete="off"
                  tabIndex={-1}
                />
              </div>

              <div
                ref={turnstileRef}
                className="cf-turnstile"
                data-sitekey="0x4AAAAAACt8xcbnaubosl1H"
              ></div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-cta text-white rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? "Gönderiliyor..." : "Gönder"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
