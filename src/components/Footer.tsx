import { Layers } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#contact";
    }
  };

  return (
    <footer className="bg-primary-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-8 h-8 text-accent-light" />
              <span className="text-2xl font-bold">
                katman<span className="text-accent-light">labs</span>
              </span>
            </div>
            <p className="text-gray-300">
              Dijital başarı için 4 güçlü hizmet: Sosyal Medya, Web, Pazarlama,
              SEO
            </p>
          </div>

          <div>
            <h4 className="text-accent-light font-semibold mb-4">Hizmetler</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/hizmet/sosyal-medya-tasarim"
                  className="text-gray-300 hover:text-accent transition-colors"
                >
                  Sosyal Medya & Tasarım
                </Link>
              </li>
              <li>
                <Link
                  to="/hizmet/web-tasarim"
                  className="text-gray-300 hover:text-accent transition-colors"
                >
                  Web Tasarım
                </Link>
              </li>
              <li>
                <Link
                  to="/hizmet/dijital-pazarlama"
                  className="text-gray-300 hover:text-accent transition-colors"
                >
                  Dijital Pazarlama
                </Link>
              </li>
              <li>
                <Link
                  to="/hizmet/seo-analitik"
                  className="text-gray-300 hover:text-accent transition-colors"
                >
                  SEO & Analitik
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-accent-light font-semibold mb-4">Şirket</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/#process"
                  className="text-gray-300 hover:text-accent transition-colors"
                >
                  Hakkımızda
                </a>
              </li>
              <li>
                <a
                  href="/#pricing"
                  className="text-gray-300 hover:text-accent transition-colors"
                >
                  Fiyatlar
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  className="text-gray-300 hover:text-accent transition-colors"
                >
                  İletişim
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-accent-light font-semibold mb-4">İletişim</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">info@katmanlabs.com</li>
              <li className="text-gray-300">+90 542 844 55 70</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/50 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2024 katmanlabs. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
