import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { SITE_NAME } from "../lib/seo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Seo
        title={`Sayfa Bulunamadı | ${SITE_NAME}`}
        description="Aradığınız sayfa bulunamadı. Ana sayfaya dönerek diğer içeriklerimize göz atabilirsiniz."
        noindex={true}
      />
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="text-center">
          <h1 className="mb-2 text-8xl font-bold text-primary">404</h1>
          <h2 className="mb-4 text-2xl font-semibold text-primary-dark">
            Sayfa Bulunamadı
          </h2>
          <p className="mb-8 max-w-md text-gray-600">
            Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Geri Dön
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-white transition-colors hover:bg-primary-dark"
            >
              <Home className="h-4 w-4" />
              Ana Sayfa
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
