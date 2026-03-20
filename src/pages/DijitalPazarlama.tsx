import { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp, Check, Search, Facebook, Instagram, Target, Megaphone, Settings, BarChart, ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MeetingScheduler from '../components/MeetingScheduler';
import { useBlogsByCategory } from '../hooks/useBlogsByCategory';

interface DijitalPazarlamaProps {
  onBack: () => void;
}

function DijitalPazarlama({ onBack }: DijitalPazarlamaProps) {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { blogs, loading } = useBlogsByCategory('Dijital Pazarlama');

  const sections = [
    { id: 'reklam-sureci', label: 'Reklam Süreci' },
    { id: 'reklam-turleri', label: 'Reklam Türleri' },
    { id: 'kurulum-yonetim', label: 'Kurulum & Yönetim' },
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
      <div className="bg-gradient-to-br from-secondary via-secondary/90 to-zinc-900 text-white py-20 pt-32 min-h-[500px] flex items-center">
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
              <TrendingUp className="w-10 h-10 text-accent-light" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Google & Meta Reklamları</h1>
            </div>
          </div>

          <div className="text-lg text-gray-200 max-w-4xl space-y-4 leading-relaxed">
            <p>
              Google ve Meta reklamları, küçük işletmeler için doğru kurgulandığında etkili;
              ölçüm ve kontrol olmadan açıldığında ise bütçenin hızla boşa gitmesine neden olabilen kanallardır.
            </p>
            <p>
              Bu nedenle reklam çalışmalarını yalnızca reklam açmak olarak değil,
              takibi yapılabilen ve kontrol edilebilen bir süreç olarak ele almak gerekir.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section id="reklam-sureci" className="mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-8 mt-[30px]">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-6">
                  Reklam Sürecine Nasıl Başlıyoruz?
                </h2>
                <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                  <p>
                    Reklam çalışmasına başlamadan önce ilk beklentimiz, ne satıldığını, kime satıldığını ve reklamdan ne beklendiğini netleştirmektir. Bu aşama genellikle kısa ama kritiktir.
                  </p>
                  <p>
                    Hangi ürün ya da hizmetin öne çıkacağı, iletişimin telefon mu, form mu yokba başka bir aksiyon mu üzerinden ilerleyeceği başlangıçta konuşulur.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-primary-dark mb-4">Dijital Altyapı</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Web sitesi, yönlendirme sayfaları, iletişim kanalları ve ölçümleme tarafı reklamla uyumlu mu değil mi değerlendirilir. Amaç; reklam trafiği geldiğinde bunun boşa gitmemesidir.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-lg font-bold text-primary-dark mb-3">Temel teknik SEO uyumu</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Reklam trafiğinin boşa gitmemesi için sayfanın teknik temeli kontrol edilir.
                </p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-lg font-bold text-primary-dark mb-3">Google Analytics kurulumu ve yapılandırması</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Ziyaretçi davranışlarını doğru okuyabilmek için temel analitik yapı kurulur.
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-lg font-bold text-primary-dark mb-3">Google Tag Manager entegrasyonu</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Tıklamalar, formlar ve önemli etkileşimler kod karmaşası olmadan takip edilir.
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-100 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-lg font-bold text-primary-dark mb-3">Meta Pixel kurulumu</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Instagram ve Facebook reklamlarının ne sonuç ürettiği doğru şekilde izlenir.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="reklam-turleri" className="relative py-24 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none z-5 overflow-hidden">
            <div className="absolute top-[8%] left-[15%] animate-float-slow" style={{ animationDelay: '0s' }}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-yellow-500 to-green-500 rounded-full opacity-10 blur-md animate-pulse-glow"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-2.5 rounded-full border border-white/20">
                  <Search className="w-7 h-7 text-blue-500" />
                </div>
              </div>
            </div>

            <div className="absolute top-[10%] right-[10%] animate-float-medium" style={{ animationDelay: '1s' }}>
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500 rounded-2xl opacity-10 blur-md animate-pulse-glow"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-2.5 rounded-2xl border border-white/20">
                  <Target className="w-7 h-7 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="absolute bottom-[8%] left-[10%] animate-float" style={{ animationDelay: '2s' }}>
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 rounded-2xl opacity-10 blur-md animate-pulse-glow"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-2.5 rounded-2xl border border-white/20">
                  <Facebook className="w-7 h-7 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="absolute bottom-[10%] right-[12%] animate-float-slow" style={{ animationDelay: '2.5s' }}>
              <div className="relative">
                <div className="absolute inset-0 bg-pink-500 rounded-2xl opacity-10 blur-md animate-pulse-glow"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-2.5 rounded-2xl border border-white/20">
                  <Megaphone className="w-7 h-7 text-pink-600" />
                </div>
              </div>
            </div>

            <div className="absolute top-[5%] left-[45%] animate-float-medium" style={{ animationDelay: '3s' }}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl opacity-10 blur-md animate-pulse-glow"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-2.5 rounded-2xl border border-white/20">
                  <Instagram className="w-7 h-7 text-pink-500" />
                </div>
              </div>
            </div>

            <div className="absolute top-[8%] right-[35%] animate-float-slow opacity-50" style={{ animationDelay: '3.5s' }}>
              <div className="relative bg-white/5 backdrop-blur-sm p-2 rounded-xl border border-white/10">
                <Search className="w-6 h-6 text-green-500" />
              </div>
            </div>

            <div className="absolute bottom-[6%] left-[38%] animate-float opacity-50" style={{ animationDelay: '4s' }}>
              <div className="relative bg-white/5 backdrop-blur-sm p-2 rounded-xl border border-white/10">
                <Facebook className="w-6 h-6 text-blue-500" />
              </div>
            </div>

            <div className="absolute bottom-[8%] right-[40%] animate-float-medium opacity-50" style={{ animationDelay: '4.5s' }}>
              <div className="relative bg-white/5 backdrop-blur-sm p-2 rounded-xl border border-white/10">
                <Instagram className="w-6 h-6 text-pink-400" />
              </div>
            </div>

            <div className="absolute top-[10%] left-[5%] animate-float-slow opacity-50" style={{ animationDelay: '5s' }}>
              <div className="relative bg-white/5 backdrop-blur-sm p-2 rounded-xl border border-white/10">
                <Target className="w-5 h-5 text-orange-500" />
              </div>
            </div>

            <div className="absolute bottom-[5%] right-[5%] animate-float-medium opacity-50" style={{ animationDelay: '1.5s' }}>
              <div className="relative bg-white/5 backdrop-blur-sm p-2 rounded-xl border border-white/10">
                <Megaphone className="w-6 h-6 text-pink-500" />
              </div>
            </div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-6">
                Hangi Reklam Türüne İhtiyacınız Var?
              </h2>
              <div className="max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed space-y-3">
                <p>
                  Her işletmenin reklam ihtiyacı aynı değildir.
                </p>
                <p>
                  Satılan ürün ya da hizmet, hedef kitle ve iletişim biçimi hangi reklam kanalının daha mantıklı olacağını belirler.
                </p>
                <p>
                  Bu noktada amaç, her yerde reklam vermek değil; doğru kanalı doğru amaçla kullanmaktır.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow border-t-4 border-blue-500">
                <h3 className="text-2xl font-bold text-primary-dark mb-4">Google Ads</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Google reklamları, hali hazırda bir ihtiyacı olan ve arama yapan kullanıcılara ulaşmak için tercih edilir.
                  Genellikle şu durumlarda daha mantıklıdır:
                </p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Hizmet veya ürün arama yoluyla bulunuyorsa</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Telefon araması ya da form dönüşümü hedefleniyorsa</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">"Şu an ihtiyacım var" diyen kullanıcıya ulaşmak isteniyorsa</span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Google arama ağı reklamları, doğru kurulduğunda küçük işletmeler için daha doğrudan ve ölçülebilir sonuçlar sunar.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow border-t-4 border-pink-500">
                <h3 className="text-2xl font-bold text-primary-dark mb-4">Meta Ads</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Meta reklamları, kullanıcıyı arama yaparken değil, gündelik akış içinde yakalamayı hedefler.
                  Genellikle şu durumlarda tercih edilir:
                </p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-pink-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Marka bilinirliği oluşturulmak isteniyorsa</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-pink-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Ürün ya da hizmet görselle anlatılabiliyorsa</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-pink-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Instagram ve Facebook üzerinden etkileşim hedefleniyorsa</span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Meta reklamları, doğru hedefleme ve içerikle kullanıldığında potansiyel müşterinin sizi fark etmesini sağlar.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="kurulum-yonetim" className="mb-24 py-16">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-primary-dark mb-6">Kurulum mu?</h3>
                <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                  <p>
                    Kurulum çalışması, reklam altyapısının doğru ve eksiksiz şekilde hazırlanmasını kapsar. Amaç, reklam verilebilir ve ölçülebilir bir yapı oluşturmaktır.
                  </p>
                  <p className="font-medium">Bu kapsamda:</p>
                  <ul className="space-y-3 ml-4">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                      <span>Google Ads ve/veya Meta Ads hesapları hazırlanır</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                      <span>Analytics, Tag Manager ve dönüşüm takibi kurulur</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                      <span>Reklam hesapları teknik olarak çalışır hale getirilir</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                      <span>Test edilebilir bir temel oluşturulur</span>
                    </li>
                  </ul>
                  <p className="text-gray-600 italic pt-4">
                    Bu model, reklamları kendi yönetecek ya da mevcut bir ekiple devam edecek işletmeler için uygundur.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl blur-2xl"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Settings className="w-7 h-7 text-white transition-transform duration-700 group-hover:rotate-360" />
                  </div>
                  <h4 className="text-xl font-bold text-primary-dark">Teknik Altyapı</h4>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Google Analytics</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-500">Aktif</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Tag Manager</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-500">Aktif</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Google Ads</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-500">Kuruldu</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Meta Pixel</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-500">Kuruldu</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Conversion Tracking</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-500">Yapılandırıldı</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start mt-24">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl blur-2xl"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                    <BarChart className="w-7 h-7 text-white transition-transform duration-700 group-hover:rotate-360" />
                  </div>
                  <h4 className="text-xl font-bold text-primary-dark">Performans Takibi</h4>
                </div>

                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Tıklama Oranı</span>
                      <span className="text-sm font-bold text-emerald-600">4.2%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '84%' }}></div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Dönüşüm Oranı</span>
                      <span className="text-sm font-bold text-emerald-600">2.8%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">ROI</span>
                      <span className="text-sm font-bold text-emerald-600">320%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Maliyet/Dönüşüm</span>
                      <span className="text-sm font-bold text-emerald-600">₺45</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-primary-dark mb-6">Yönetim mi?</h3>
                <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                  <p>
                    Yönetim çalışması, kurulumun ardından reklamların belirli bir süre birlikte takip edilmesini kapsar. Amaç, reklamların yalnızca açılması değil, sonuçlarının izlenmesi ve gerektiğinde yönlendirilmesidir.
                  </p>
                  <p className="font-medium">Bu süreçte:</p>
                  <ul className="space-y-3 ml-4">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                      <span>Reklamlar kontrollü şekilde yayına alınır</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                      <span>Performans düzenli olarak takip edilir</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                      <span>Hangi reklamın ne sonuç verdiği değerlendirilir</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                      <span>Gerekli ayarlamalar yapılır</span>
                    </li>
                  </ul>
                  <p className="text-gray-600 italic pt-4">
                    Bu model, reklam sürecini tek başına takip edecek zamanı ya da kaynağı olmayan işletmeler için daha uygundur.
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
              Dijital pazarlama ve reklam yönetimi hakkında detaylı içerikler
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
                    <span className="absolute bottom-4 left-4 px-3 py-1 bg-purple-500 text-white text-xs font-semibold rounded-full">
                      {blog.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary-dark mb-2 group-hover:text-purple-600 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center text-purple-600 font-semibold">
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
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
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
        className="fixed bottom-8 right-8 z-50 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-2 animate-bounce-slow"
      >
        <Calendar className="w-5 h-5" />
        <span className="hidden sm:inline">Toplantı Planla</span>
      </button>

      <MeetingScheduler isOpen={isSchedulerOpen} onClose={() => setIsSchedulerOpen(false)} />

      <Footer />
    </div>
  );
}

export default DijitalPazarlama;
