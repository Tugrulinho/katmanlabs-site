import { useState, useEffect } from 'react';
import { ArrowLeft, Globe, Check, Palette, Code, BarChart, ClipboardList, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MeetingScheduler from '../components/MeetingScheduler';
import { useBlogsByCategory } from '../hooks/useBlogsByCategory';

interface WebTasarimProps {
  onBack: () => void;
}

function WebTasarim({ onBack }: WebTasarimProps) {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { blogs, loading } = useBlogsByCategory('Web Tasarım');

  const sections = [
    { id: 'web-tasarim-neden', label: 'Web Tasarım Neden Önemli' },
    { id: 'mevcut-site', label: 'Mevcut Web Siteniz' },
    { id: 'calisma-seklimiz', label: 'Çalışma Şeklimiz' },
    { id: 'blog-yazilari', label: 'Blog Yazıları' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="bg-gradient-to-br from-primary via-primary-dark to-zinc-900 text-white py-20 pt-32 min-h-[500px] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-accent-light hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Ana Sayfaya Dön
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Globe className="w-10 h-10 text-accent-light" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Web Tasarım & Geliştirme</h1>
            </div>
          </div>

          <div className="text-lg text-gray-200 max-w-4xl space-y-4 leading-relaxed">
            <p>
              Bugün bir web sitesi, şirketler için yalnızca "var olmak" anlamına gelmiyor.
              Potansiyel müşteriler, bir ürün ya da hizmetle ilgilenmeden önce çoğu zaman
              işletmenin web sitesine bakarak ilk izlenimini oluşturuyor.
            </p>
            <p>
              Küçük ya da büyük fark etmeksizin, web sitesi; ne yaptığınızı, nasıl çalıştığınızı
              ve ne kadar güvenilir olduğunuzu anlatan en temel dijital alanlardan biri.
            </p>
            <p>
              Katman Labs'ta web sitesini bu bakış açısıyla ele alıyor, abartıdan uzak
              ama işini doğru yapan yapılar kuruyoruz.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section id="web-tasarim-neden" className="mb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-primary-dark mb-6">Şirketler İçin Web Sitesi Neden Zorunlu?</h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Bir web sitesi artık yalnızca kartvizit yerine geçmiyor. Ürün ya da hizmetle ilgilenen biri için web sitesi, işletmenin kendini en net ifade ettiği alanlardan biri.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                'Ne yapıldığının açıkça anlatılması',
                'Güven duygusunun oluşturulması',
                'İletişim ve ilk temas noktası',
                'Sosyal medya ve reklamların yönlendirildiği merkez'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-accent-light flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="relative pl-6 border-l-4 border-accent-light">
              <p className="text-lg text-gray-700 font-medium italic">
                Bu nedenle web sitesinin sadece "var olması" değil, doğru çalışması ve anlaşılır olması önem kazanıyor.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-3xl"></div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Web Tasarım"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="md:order-2">
            <h2 className="text-3xl font-bold text-primary-dark mb-6">Biz Web Sitesini Nasıl Ele Alıyoruz?</h2>
            <div className="text-gray-600 space-y-4 text-lg leading-relaxed">
              <p>
                Katman Labs'ta web tasarım ve geliştirme sürecine yalnızca görsel bir çalışma olarak bakmıyoruz. Bir web sitesi; şirketin ne yaptığını, kime hitap ettiğini ve nasıl bir yapı sunduğunu ilk bakışta anlatabilen bir sistem olmalı.
              </p>
              <p>
                Bu nedenle web sitesi çalışmalarında önceliğimiz; tasarım, teknik altyapı ve ölçümleme bileşenlerinin bir bütün olarak ele alınmasıdır. Güzel görünen ama yavaş çalışan, teknik olarak doğru ama anlatımı zayıf siteler yerine, hem anlaşılır hem sorunsuz yapılar kurmayı hedefliyoruz.
              </p>
              <p>
                Web sitesini; ziyaretçinin kolayca gezebildiği, işletmenin sunduğu ürün ya da hizmeti net şekilde anlayabildiği ve gerektiğinde ölçümlenebilen bir dijital alan olarak konumlandırıyoruz. Bu yaklaşım, sitenin yalnızca yayına alınmasını değil, uzun vadede kullanılabilir ve geliştirilebilir olmasını sağlar.
              </p>
            </div>
          </div>

          <div className="relative md:order-1">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl blur-3xl"></div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Web Geliştirme Süreci"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-blue-500">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary-dark mb-4">Tasarım</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Tasarım, yalnızca görsel beğeniyle ilgili bir konu değildir. Bir sayfanın okunabilir olması, bilgilerin doğru hiyerarşiyle sunulması ve ziyaretçinin aradığını kolayca bulabilmesi tasarımın parçasıdır.
              </p>
              <ul className="space-y-3">
                {[
                  'Marka kimliğine uyum',
                  'Mobil öncelikli yapı',
                  'Sade ve abartısız görsel dil',
                  'İçeriği destekleyen tasarım tercihleri'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-emerald-500">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary-dark mb-4">Geliştirme</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                İyi görünen ama çalışmayan siteler yerine, hafif, hızlı ve sorunsuz yapılar tercih edilir.
              </p>
              <ul className="space-y-3">
                {[
                  'WordPress veya ihtiyaca uygun modern yapılar',
                  'Gereksiz eklenti ve ağır builder\'lardan kaçınma',
                  'Kolay güncellenebilir altyapı',
                  'Performans ve sayfa hızının korunması'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-orange-500">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <BarChart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary-dark mb-4">Ölçüm ve Teknik Temel</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Bir web sitesinin gerçekten işe yarayıp yaramadığını anlamak için ölçümleme şarttır. Bu nedenle her proje, temel teknik kurulumlarla birlikte ele alınır.
              </p>
              <ul className="space-y-3">
                {[
                  'Google Analytics kurulumu',
                  'Tag Manager entegrasyonu',
                  'Form ve etkileşim takibi',
                  'Teknik SEO altyapısı'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        </section>

        <section id="mevcut-site" className="mb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center py-16">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark">
              Eğer Zaten Bir Web Siteniz Varsa Ne Yapıyoruz?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Her işletmenin web sitesi ihtiyacı sıfırdan başlamak değildir. Mevcut bir web sitesi varsa, Katman Labs olarak önce bu yapıyı web tasarım, teknik altyapı ve performans açısından değerlendiriyoruz.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Çoğu durumda web sitesini tamamen yenilemek yerine, mevcut yapıyı iyileştirerek daha anlaşılır, daha hızlı ve daha işlevsel hale getirmek mümkündür. Bu yaklaşım, hem zaman hem maliyet açısından daha verimli bir çözüm sunar.
            </p>
          </div>

          <div className="relative min-h-[400px]">
            <div className="absolute inset-0 flex flex-wrap gap-4 justify-center items-center content-center">
              {[
                { text: 'Güncel tasarım dili', rotate: -3, color: 'from-blue-500 to-cyan-500' },
                { text: 'Mobil uyumluluğu', rotate: 2, color: 'from-emerald-500 to-teal-500' },
                { text: 'Sayfa hızı ve teknik durumu', rotate: -1, color: 'from-orange-500 to-red-500' },
                { text: 'İçerik yapısının ne kadar anlaşılır olduğu', rotate: 3, color: 'from-purple-500 to-pink-500' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group relative w-56 transform hover:scale-105 hover:z-10 transition-all duration-300 animate-float"
                  style={{
                    transform: `rotate(${item.rotate}deg)`,
                    animationDelay: `${idx * 0.2}s`,
                    zIndex: 5
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-xl opacity-20 blur-xl group-hover:blur-2xl transition-all`}></div>
                  <div className="relative bg-white border-2 border-gray-200 rounded-xl px-5 py-4 shadow-lg group-hover:shadow-2xl transition-all">
                    <p className="text-sm text-gray-700 leading-relaxed font-medium text-center">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </section>

        <section id="calisma-seklimiz" className="mb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center py-16">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark">
              Çalışma Şeklimiz
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Web tasarım ve geliştirme çalışmalarında süreci baştan netleştirerek ilerliyoruz. İhtiyaçlar belirlendikten sonra, proje kapsamı açık şekilde tanımlanır ve çalışma bu çerçeveye göre yürütülür.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Katman Labs'ta web sitesi projeleri genellikle proje bazlı ele alınır. Bu sayede neyin yapılacağı, hangi aşamalardan geçileceği ve çalışmanın hangi noktada tamamlanacağı baştan bellidir.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl blur-2xl"></div>
            <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                  <ClipboardList className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary-dark">Plan Süreci</h3>
              </div>

              <div className="space-y-4 mb-6">
                {[
                  { text: 'Hangi hizmetler olacak', color: 'bg-blue-500' },
                  { text: 'Kaç sayfa olacak', color: 'bg-emerald-500' },
                  { text: 'Menüdeki bölümler', color: 'bg-orange-500' },
                  { text: 'Sayfanın yapısal görünümü', color: 'bg-purple-500' },
                  { text: 'Odaklandığımız anahtar kelimeler', color: 'bg-pink-500' },
                  { text: 'Renk paleti / yazı tipi', color: 'bg-teal-500' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 group">
                    <div className={`w-2 h-2 rounded-full ${item.color} group-hover:w-3 group-hover:h-3 transition-all duration-300`}></div>
                    <span className="text-gray-700 group-hover:text-primary-dark transition-colors">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-center text-base font-semibold text-primary bg-accent-light/10 py-3 px-4 rounded-lg">
                  Fiyatlandırma ihtiyaçlara göre kişiye özel hazırlanır.
                </p>
              </div>
            </div>
          </div>
        </div>
        </section>

        <section id="blog-yazilari" className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
              İlgili Blog Yazıları
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Web tasarım ve geliştirme hakkında detaylı içerikler
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : blogs.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {blogs.slice(0, 4).map((blog) => (
                <Link
                  key={blog.id}
                  to={`/blog/${blog.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={blog.image_url}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <span className="absolute bottom-4 left-4 px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                      {blog.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary-dark mb-2 group-hover:text-blue-600 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center text-blue-600 font-semibold">
                      Devamını Oku <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <p>Henüz blog yazısı bulunmamaktadır.</p>
            </div>
          )}
        </section>
      </div>

      <div className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-40">
        <nav className="bg-white rounded-2xl shadow-2xl p-4 border border-gray-200">
          <div className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </nav>
      </div>

      <button
        onClick={() => setIsSchedulerOpen(true)}
        className="fixed bottom-8 right-8 z-50 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-semibold shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-2 animate-bounce-slow"
      >
        <Calendar className="w-5 h-5" />
        <span className="hidden sm:inline">Toplantı Planla</span>
      </button>

      <MeetingScheduler isOpen={isSchedulerOpen} onClose={() => setIsSchedulerOpen(false)} />

      <Footer />
    </div>
  );
}

export default WebTasarim;
