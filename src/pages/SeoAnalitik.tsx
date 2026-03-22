import { useState, useEffect } from 'react';
import { ArrowLeft, BarChart3, Calendar, Search, Settings, FileText, TrendingDown, Zap, Smartphone, Link, Globe, Target, ListChecks, Type, LineChart, Database, Activity, ClipboardCheck, TrendingUp, Users, Clock, Shield, ArrowRight } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MeetingScheduler from '../components/MeetingScheduler';
import CircularSeoProcess from '../components/CircularSeoProcess';
import { useBlogsByCategory } from '../hooks/useBlogsByCategory';

interface SeoAnalitikProps {
  onBack: () => void;
}

function SeoAnalitik({ onBack }: SeoAnalitikProps) {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { blogs, loading } = useBlogsByCategory('SEO');

  const sections = [
    { id: 'neden-gorunmez', label: 'Neden Görünmez?' },
    { id: 'hizmet-kapsami', label: 'Hizmet Kapsamı' },
    { id: 'kucuk-isletmeler', label: 'Neden Önemlidir' },
    { id: 'seo-sureci', label: 'SEO Süreci' },
    { id: 'seo-reklam', label: 'SEO mu Reklam mı?' },
    { id: 'sonuc-suresi', label: 'Sonuç Süresi' },
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

      <div className="bg-[url('/images/seo-analitik-hero-mobile.png')] md:bg-[url('/images/seo-analitik-hero-desktop.png')] bg-cover bg-center text-white py-20 pt-32 min-h-[500px] flex items-center">
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
              <BarChart3 className="w-10 h-10 text-accent-light" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">SEO & Analitik</h1>
            </div>
          </div>

          <div className="text-lg text-gray-200 max-w-4xl space-y-4 leading-relaxed">
            <p>
              Web siteleri çoğu zaman vardır ama görünmez.
              Google'da çıkmayan bir site, aslında potansiyel müşteriler için yoktur.
            </p>
            <p>
              SEO, sitenizin doğru aramalarda görünmesini sağlar.
              Analitik ise gelen kullanıcıların ne yaptığını anlamanızı sağlar.
            </p>
            <p>
              Katman Labs'ta bu süreci sadece trafik getirmek için değil,
              doğru kullanıcıyı çekmek ve bu trafiği anlamlandırmak için yönetiyoruz.
            </p>
          </div>
        </div>
      </div>

      <section id="neden-gorunmez" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Web Siteniz Google'da Neden Görünmez?
            </h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Bir web sitesinin yayında olması, Google'da görüneceği anlamına gelmez.
              Çoğu site teknik hatalar, yanlış içerik yapısı veya hedeflenmemiş anahtar kelimeler nedeniyle arama sonuçlarında yer alamaz.
              Bu durum genellikle "site var ama trafik yok" problemi olarak ortaya çıkar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Yanlış Anahtar Kelime Seçimi
              </h3>
              <p className="text-gray-600 leading-relaxed">
                İçerikler, kullanıcıların gerçekten aradığı kelimelere göre hazırlanmadığında Google bu sayfaları öne çıkarmaz.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Teknik SEO Eksikleri
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Site hızı, mobil uyumluluk ve sayfa yapısı gibi temel unsurlar eksik olduğunda site indexlenir ama sıralama alamaz.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                İçerik ve Yapı Problemleri
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Sayfalar, kullanıcının sorusuna net cevap vermiyorsa veya dağınık bir yapıdaysa Google tarafından zayıf olarak değerlendirilir.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingDown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Analitik Takibin Olmaması
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Siteye gelen kullanıcıların nereden geldiği ve ne yaptığı bilinmediğinde doğru iyileştirme yapılamaz.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="hizmet-kapsami" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                SEO Hizmeti Tam Olarak Ne Kapsar?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                SEO, tek bir işlem değil; bir web sitesinin arama sonuçlarında yer alabilmesi için birlikte çalışan birçok bileşenden oluşur.
                Sadece içerik üretmek ya da teknik düzenleme yapmak tek başına yeterli değildir.
                Etkili bir SEO çalışması, teknik yapı, içerik stratejisi ve veri takibinin birlikte yönetilmesini gerektirir.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="SEO Analytics Dashboard"
                className="rounded-2xl shadow-2xl max-w-full h-auto"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <Settings className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Teknik SEO Düzenlemeleri
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Web sitesinin Google tarafından doğru şekilde taranabilmesi ve hızlı çalışması sağlanır.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-700">
                  <Zap className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Sayfa hızı ve performans iyileştirme</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <Smartphone className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Mobil uyumluluk</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <Link className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>URL ve site yapısı düzeni</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <Globe className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Indexleme ve tarama sorunlarının giderilmesi</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                İçerik ve Anahtar Kelime Stratejisi
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Site, kullanıcıların gerçekten aradığı kelimelere göre yapılandırılır.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-700">
                  <Target className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Doğru anahtar kelime araştırması</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <ListChecks className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Sayfa içeriklerinin yeniden kurgulanması</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <Search className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Arama niyetine uygun içerik üretimi</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <Type className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Başlık ve metin yapısının düzenlenmesi</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6">
                <LineChart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Analitik ve Veri Takibi
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Yapılan çalışmaların etkisi ölçülür ve buna göre iyileştirmeler yapılır.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-700">
                  <Database className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>Google Analytics kurulumu ve takibi</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <BarChart3 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>Search Console verilerinin analizi</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <Activity className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>Trafik ve kullanıcı davranışı takibi</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <ClipboardCheck className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>Performansa göre sürekli güncelleme</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="kucuk-isletmeler" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center order-2 lg:order-1">
              <img
                src="https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Small Business Growth"
                className="rounded-2xl shadow-2xl max-w-full h-auto"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Küçük İşletmeler İçin SEO Neden Önemlidir?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Küçük işletmeler için en büyük sorun, doğru kitleye ulaşamamak ve bunu sürekli hale getirememektir.
                Reklam çalışmaları kısa vadede sonuç verir, ancak sürdürülebilir bir trafik oluşturmaz.
                SEO ise doğru kurulduğunda, işletmeye düzenli ve organik bir ziyaretçi akışı sağlar.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="seo-sureci" className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              SEO Süreci Nasıl İşler?
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Etkili bir SEO stratejisi, birbirine bağlı beş temel aşamadan oluşur.
            </p>
          </div>

          <CircularSeoProcess />
        </div>
      </section>

      <section id="seo-reklam" className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="inline-block animate-[bounce_2s_ease-in-out_infinite] text-orange-600">SEO</span> <span className="text-gray-900">mu</span> <span className="inline-block animate-[bounce_2s_ease-in-out_0.3s_infinite] text-blue-600">Reklam</span> <span className="text-gray-900">mı?</span>
          </h2>
          <div className="space-y-4">
            <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed">
              SEO ve reklam birbirinin alternatifi değil, farklı amaçlara hizmet eder.
            </p>
            <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed">
              Reklam hızlı sonuç verir, SEO ise kalıcı bir yapı oluşturur.
            </p>
          </div>
        </div>
      </section>

      <section id="sonuc-suresi" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                SEO Sonuçları Ne Kadar Sürede Alınır?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                SEO, kısa vadeli sonuç veren bir çalışma değildir.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Yapılan düzenlemelerin Google tarafından algılanması ve sıralamalara yansıması zaman alır.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Bu süre; sitenin mevcut durumu, rekabet seviyesi ve yapılan çalışmaların kapsamına göre değişir.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="SEO Timeline and Results"
                className="rounded-2xl shadow-2xl max-w-full h-auto"
              />
            </div>
          </div>

          <div className="relative">
            <svg className="w-full h-48 mb-12" viewBox="0 0 1200 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.3 }} />
                  <stop offset="50%" style={{ stopColor: '#3b82f6', stopOpacity: 0.3 }} />
                  <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.3 }} />
                </linearGradient>
              </defs>
              <path
                d="M 0 100 Q 200 20, 400 100 T 800 100 Q 1000 140, 1200 100"
                fill="none"
                stroke="url(#roadGradient)"
                strokeWidth="60"
                strokeLinecap="round"
              />
              <path
                d="M 0 100 Q 200 20, 400 100 T 800 100 Q 1000 140, 1200 100"
                fill="none"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="20,15"
                opacity="0.6"
              />
            </svg>

            <div className="grid md:grid-cols-3 gap-8 relative -mt-32">
              <div className="relative">
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-xl border-4 border-white z-10">
                  <span className="text-2xl font-bold text-white">01</span>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 pt-16 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    İlk 1 Ay
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-center">
                    Temel teknik düzenlemeler yapılır ve site altyapısı iyileştirilir. Bu aşamada genellikle görünür bir trafik artışı beklenmez.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-xl border-4 border-white z-10">
                  <span className="text-2xl font-bold text-white">02</span>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 pt-16 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    2 - 3 Ay
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-center">
                    Google, yapılan değişiklikleri algılamaya başlar. Bazı anahtar kelimelerde hareketlenmeler görülebilir.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-xl border-4 border-white z-10">
                  <span className="text-2xl font-bold text-white">03</span>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 pt-16 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    3 - 6 Ay
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-center">
                    İçeriklerin ve teknik yapının etkisi daha net ortaya çıkar. Daha stabil ve ölçülebilir sonuçlar alınmaya başlanır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <div className="flex justify-center order-2 lg:order-1">
              <img
                src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="SEO Process and Time"
                className="rounded-2xl shadow-2xl max-w-full h-auto"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Neden Zaman Alır?
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Google'ın değerlendirme süreci anlık değildir
                  </p>
                </div>
                <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Rakip siteler de sürekli içerik üretir
                  </p>
                </div>
                <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    SEO bir kez yapılmaz, sürekli gelişir
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <p className="text-2xl md:text-3xl font-semibold text-gray-800 italic border-l-4 border-emerald-500 pl-6 inline-block">
              "SEO, hızlı sonuç almak için değil; kalıcı ve sürdürülebilir bir yapı kurmak için yapılır."
            </p>
          </div>
        </div>
      </section>

      <section id="blog-yazilari" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              İlgili Blog Yazıları
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              SEO ve analitik hakkında detaylı içerikler
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
          ) : blogs.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {blogs.slice(0, 4).map((blog) => (
                <RouterLink
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
                    <span className="absolute bottom-4 left-4 px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full">
                      {blog.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center text-emerald-600 font-semibold">
                      Devamını Oku <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </RouterLink>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <p>Henüz blog yazısı bulunmamaktadır.</p>
            </div>
          )}
        </div>
      </section>

      <div className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-40">
        <nav className="bg-white rounded-2xl shadow-2xl p-4 border border-gray-200">
          <div className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
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
        className="fixed bottom-8 right-8 z-50 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-semibold shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-2"
      >
        <Calendar className="w-5 h-5" />
        <span className="hidden sm:inline">Toplantı Planla</span>
      </button>

      <MeetingScheduler isOpen={isSchedulerOpen} onClose={() => setIsSchedulerOpen(false)} />

      <Footer />
    </div>
  );
}

export default SeoAnalitik;
