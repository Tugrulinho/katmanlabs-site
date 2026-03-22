import { useState, useEffect } from 'react';
import { ArrowLeft, Instagram, Check, Calendar, Linkedin, Facebook, Search, MessageCircle, Repeat, Sparkles, TrendingUp, Package, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MeetingScheduler from '../components/MeetingScheduler';
import Footer from '../components/Footer';

interface SosyalMedyaTasarimProps {
  onBack: () => void;
}

function SosyalMedyaTasarim({ onBack }: SosyalMedyaTasarimProps) {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const sections = [
    { id: 'kimler-icin', label: 'Kimler İçin?' },
    { id: 'surecimiz', label: 'Sürecimiz' },
    { id: 'platform-yaklasimi', label: 'Platform Yaklaşımı' },
    { id: 'paket-calisma', label: 'Paket Çalışma' },
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

     <div className="
relative
bg-[url('/images/sosyal-medya-hero-mobile.webp')]
md:bg-[url('/images/sosyal-medya-hero-desktop.webp')]
bg-cover 
bg-center 
text-white py-20 pt-32 min-h-[500px] flex items-center
">
       
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Ana Sayfaya Dön
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Instagram className="w-10 h-10 text-white" />
            </div>
            <div>
              <div className="text-sm text-white/90 mb-1 font-medium">En Popüler Hizmetimiz</div>
              <h1 className="text-4xl md:text-5xl font-bold">Sosyal Medya & Tasarım</h1>
            </div>
          </div>

          <div className="text-lg text-white/95 max-w-4xl space-y-4 leading-relaxed">
            <p>
              Sosyal medya ve tasarım, küçük işletmeler için çoğu zaman "yapılması gereken ama vakit bulunamayan" işler arasında kalır.
            </p>
            <p>
              Ajans bütçeleri yüksek, tam zamanlı bir çalışan almak her zaman mümkün değil.
            </p>
            <p>
              Bu hizmet, sosyal medyayı tamamen boş bırakmadan düzenli, tutarlı ve markaya uygun şekilde yürütmek isteyen küçük işletmeler için tasarlandı.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section id="kimler-icin" className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
              Bu Hizmet Kimler / Hangi İşletmeler İçin Daha Uygun?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-8 pt-[30px]">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed font-bold">
                  Katman Labs olarak küçük işletmelerde dijital işlerin nasıl arada kaldığını yakından görüyoruz.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Günlük operasyonlar öncelik kazanırken sosyal medya ve tasarım işleri çoğu zaman plansız ilerliyor ya da tamamen ihmal ediliyor. Bunun nedeni genellikle isteksizlik değil; zaman, bütçe ve kaynak sınırlamaları.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Bu hizmet, büyük ajans yapılarıyla çalışmak istemeyen ya da buna ihtiyaç duymayan işletmeler için kurgulandı. Ama aynı zamanda "elde ne varsa onunla idare edelim" yaklaşımının da ötesinde, sosyal medyanın belirli bir düzen içinde, markaya zarar vermeden yürütülmesini hedefliyor.
                </p>
              </div>

              <div className="relative pt-12">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-orange-500/20 to-rose-500/20 rounded-2xl blur-xl"></div>
                <p className="text-xl text-gray-600 italic font-light relative z-10 px-6 py-4">
                  Eğer sizin de böyle sorularınız varsa doğru yerdesiniz
                </p>
              </div>
            </div>

            <div className="relative min-h-[600px]">
              <div className="absolute inset-0 flex flex-wrap gap-4 justify-center items-start content-start">
                {[
                  { question: 'Küçük işletmem için sosyal medya yönetimi nasıl yapılır?', rotate: -2, icon: Instagram, color: 'from-pink-500 to-purple-600' },
                  { question: 'Ajans tutmadan sosyal medyayı düzenli yürütmek mümkün mü?', rotate: 3, icon: Facebook, color: 'from-blue-500 to-blue-700' },
                  { question: 'Sosyal medya için ayrı bir çalışan almadan bu işi nasıl çözerim?', rotate: -1, icon: Linkedin, color: 'from-blue-600 to-cyan-600' },
                  { question: 'Instagram ve LinkedIn paylaşımlarımı kim düzenli yapabilir?', rotate: 2, icon: Instagram, color: 'from-pink-500 to-orange-500' },
                  { question: 'Sosyal medya tasarımı ve içerik işlerini tek yerden kim yapar?', rotate: -3, icon: Facebook, color: 'from-blue-500 to-indigo-600' },
                  { question: 'Küçük işletmeler için uygun sosyal medya çözümleri nelerdir?', rotate: 1, icon: Search, color: 'from-red-500 to-yellow-500' },
                  { question: 'Sosyal medya boş kalmasın ama ajans bütçesi de ayıramıyorum, ne yapabilirim?', rotate: -2, icon: Linkedin, color: 'from-blue-600 to-blue-800' },
                  { question: 'Paylaşımlarım düzensiz, bunu toparlayacak biri var mı?', rotate: 2, icon: Instagram, color: 'from-purple-500 to-pink-600' },
                  { question: 'Markama uygun sosyal medya tasarımı nasıl yaptırabilirim?', rotate: -1, icon: Facebook, color: 'from-indigo-500 to-blue-600' },
                  { question: 'Sosyal medyada var olmak için büyük ajans şart mı?', rotate: 1, icon: Search, color: 'from-green-500 to-blue-500' }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className={`group relative w-64 transform hover:scale-105 hover:z-10 transition-all duration-300 ${idx >= 3 ? 'hidden md:flex' : ''}`}
                      style={{
                        transform: `rotate(${item.rotate}deg)`,
                        zIndex: 5
                      }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-xl opacity-20 blur-xl group-hover:blur-2xl transition-all`}></div>
                      <div className="relative bg-white border-2 border-gray-200 rounded-xl p-4 shadow-lg group-hover:shadow-2xl transition-all">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed font-medium">{item.question}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="surecimiz" className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
              İçerik ve Tasarım Sürecimiz
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Sosyal medya çalışmalarında asıl farkı yaratan şey tek tek paylaşımlar değil,<br />
              nasıl bir süreçle üretildiği ve devam ettirildiğidir.<br />
              Katman Labs'ta içerik ve tasarım süreci, rastgele üretim yerine<br />
              önceden belirlenmiş bir çerçeveyle ilerler.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Search,
                title: 'Tanıma ve Netleştirme',
                description: 'İlk aşamada işletmenin ne yaptığı, ne sunduğu ve nasıl görünmek istediği netleştirilir. Amaç; herkesin her şeyi yaptığı bir sayfa değil, ne sunduğu anlaşılır bir sosyal medya profili oluşturmaktır.',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Calendar,
                title: 'Planlama',
                description: 'İçerikler tek tek değil, belirli bir dönem için birlikte ele alınır. Bu sayede paylaşımlar hem görsel hem dil açısından bir bütünlük içinde ilerler ve sayfa düzensiz bir görünümden çıkar.',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: Sparkles,
                title: 'Tasarım ve Üretim',
                description: 'Planlanan içeriklere uygun olarak tasarım ve metin üretimi yapılır. Hazır şablonlardan ziyade, markaya uyumlu ve tekrar edilebilir bir yapı tercih edilir. Gerekli durumlarda revizyonlar bu aşamada alınır.',
                color: 'from-pink-500 to-rose-500'
              },
              {
                icon: TrendingUp,
                title: 'Yayınlama ve Takip',
                description: 'İçerikler belirlenen zamanlarda paylaşılır ve süreç kontrol altında tutulur. Amaç; sosyal medya hesabının uzun süre boş kalmaması ve sayfanın canlılığını korumasıdır.',
                color: 'from-orange-500 to-red-500'
              }
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-transparent" style={{ borderTopColor: `var(--tw-gradient-from)` }}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`}></div>
                  <div className={`relative w-14 h-14 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-dark mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="platform-yaklasimi" className="mb-24 py-16">
          <div className="grid md:grid-cols-3 gap-8 items-start" style={{ marginTop: '30px' }}>
            <div className="md:col-span-1">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                Platforma Göre İçerik Yaklaşımı
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Her sosyal medya platformu aynı şekilde çalışmaz. Kullanıcı beklentisi, içerik tüketme biçimi ve etkileşim dili platformdan platforma değişir. Bu yüzden tek bir tasarımı ya da metni her yerde aynı şekilde kullanmak çoğu zaman markaya fayda sağlamaz.
              </p>
              <p className="text-lg text-gray-600">
                Katman Labs'ta içerik üretimi yapılırken platformların kendi dinamikleri dikkate alınır.
              </p>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div className="group relative transform rotate-[-1deg] hover:rotate-0 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200/50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Instagram className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary-dark mb-2">Instagram</h3>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Instagram daha görsel ağırlıklı bir platformdur. Tasarım dili, renk kullanımı ve görsel bütünlük ön plandadır. Amaç; profili ziyaret eden bir kullanıcının ilk bakışta sayfanın ne anlattığını ve markanın ne sunduğunu anlayabilmesidir.
                  </p>
                </div>
              </div>

              <div className="group relative transform rotate-[1deg] hover:rotate-0 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-700/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200/50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Linkedin className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary-dark mb-2">LinkedIn</h3>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    LinkedIn ise daha bilgi ve bağlam odaklıdır. Burada içerikler görsel olarak sade tutulur, metin tarafında ise yapılan işin ne olduğu ve kime hitap ettiği daha açık anlatılır. Hedef; profesyonel bir izlenim ve güven algısı oluşturmaktır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="paket-calisma" className="mb-24 space-y-16">
          <div className="grid md:grid-cols-3 gap-12 items-start">
            <div className="md:col-span-2 space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-dark">
                Paket Çalışma Modeli
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                Sosyal medya ve tasarım çalışmalarında tek tip paketlerin her işletmeye uymadığını biliyoruz. İhtiyaç, içerik yoğunluğu ve beklenti seviyesi işletmeden işletmeye değişiyor. Bu nedenle Katman Labs'ta çalışma modeli esnek ama sınırları net bir yapıyla ilerler.
              </p>

              <div>
                <h3 className="text-2xl font-bold text-primary-dark mb-4">Nasıl Çalışıyoruz?</h3>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Çalışmalar genellikle aylık planlama üzerinden yürütülür. Bu sayede içerikler önceden belirlenir, tasarım ve metin süreci kontrol altına alınır ve sosyal medya hesapları düzensiz ilerlemez.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    İhtiyaca göre:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-pink-500 font-bold">•</span>
                      <span>Aylık belirli sayıda içerik üretimi</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-pink-500 font-bold">•</span>
                      <span>Sadece tasarım + metin</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-pink-500 font-bold">•</span>
                      <span>Tasarım, metin ve yayınlama birlikte</span>
                    </li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    şeklinde farklı çalışma biçimleri oluşturulabilir.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-primary-dark mb-4">Uzun Vadeli Düşünce</h3>
                <p className="text-gray-700 leading-relaxed">
                  Amaç tek seferlik paylaşımlar değil, sosyal medya hesaplarında sürdürülebilir bir profil inşa etmek. Bu yüzden çalışma modeli, işletmenin temposuna uyum sağlayacak şekilde kurgulanır.
                </p>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-pink-500 sticky top-24">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-orange-500/5 rounded-2xl"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                    <Package className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary-dark mb-4">Paket Mantığı</h3>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Buradaki yaklaşımımız "ne kadar çok içerik, o kadar iyi" değil; işletmenin gerçekten ihtiyacı olan kadar içerik üretmektir.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Bu nedenle paketler:
                    </p>
                    <ul className="space-y-2 ml-4">
                      <li className="text-gray-700 flex items-start gap-2">
                        <span className="text-pink-500 font-bold">•</span>
                        <span>İçerik sayısına</span>
                      </li>
                      <li className="text-gray-700 flex items-start gap-2">
                        <span className="text-pink-500 font-bold">•</span>
                        <span>Kullanılacak platformlara</span>
                      </li>
                      <li className="text-gray-700 flex items-start gap-2">
                        <span className="text-pink-500 font-bold">•</span>
                        <span>Tasarım ve revizyon ihtiyacına</span>
                      </li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed">
                      göre şekillenir.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Her işletmeye aynı paketi sunmak yerine, kısa bir değerlendirme sonrası en uygun yapı belirlenir.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl"></div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Düzen ve süreklilik"
                  className="rounded-2xl shadow-2xl w-full h-[600px] object-cover"
                />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-dark">
                Düzen ve Süreklilik Mantığı
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed">
                Sosyal medyada asıl sorun çoğu zaman içerik üretmemek değil, üretilen içeriğin düzensiz ve kopuk ilerlemesidir. Bir dönem paylaşımlar yapılır, sonra uzun süre sessizlik olur. Bu durum, işletmenin dijital vitrininin güncel olmadığı izlenimini yaratır.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                Katman Labs'ta odaklandığımız nokta tam olarak burasıdır: sosyal medya hesaplarının aralıklı heveslerle değil, belirli bir düzen içinde ilerlemesi.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                Düzen, paylaşımların her gün yapılması anlamına gelmez. Önemli olan; hangi sıklıkta paylaşım yapılacağına karar verilmesi ve bu kararın sürdürülebilir şekilde uygulanmasıdır. Bu yaklaşım, hem içerik kalitesinin düşmesini engeller hem de işletmenin temposuna uyum sağlar.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                Süreklilik ise yalnızca paylaşım yapmakla sınırlı değildir. Görsel dilin korunması, kullanılan metin tonunun tutarlı olması ve sayfanın genel görünümünün zaman içinde dağılmaması da bu yapının parçasıdır.
              </p>
            </div>
          </div>
        </section>

        <section id="blog-yazilari" className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
              İlgili Blog Yazıları
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sosyal medya ve tasarım hakkında detaylı içerikler
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Link
              to="/blog/icerik-pazarlama-hikayeler"
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://picsum.photos/seed/blog12/800/600"
                  alt="Instagram Reels"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute bottom-4 left-4 px-3 py-1 bg-pink-500 text-white text-xs font-semibold rounded-full">
                  Sosyal Medya
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary-dark mb-2 group-hover:text-pink-600 transition-colors">
                  Instagram Reels ile Etkileşim Artırma Stratejileri
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  Instagram Reels ile organik erişiminizi artırın ve hedef kitlenizle güçlü bir bağ kurun. Viral içerik üretme teknikleri.
                </p>
                <div className="flex items-center text-pink-600 font-semibold">
                  Devamını Oku <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>

            <Link
              to="/blog/backlink-stratejileri"
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://picsum.photos/seed/blog8/800/600"
                  alt="İçerik Takvimi"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute bottom-4 left-4 px-3 py-1 bg-pink-500 text-white text-xs font-semibold rounded-full">
                  Sosyal Medya
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary-dark mb-2 group-hover:text-pink-600 transition-colors">
                  Sosyal Medya İçerik Takvimi Nasıl Hazırlanır?
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  Başarılı bir sosyal medya stratejisi için içerik takvimi oluşturun. Düzenli ve etkili paylaşımlarla takipçi kitlenizi büyütün.
                </p>
                <div className="flex items-center text-pink-600 font-semibold">
                  Devamını Oku <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>

            <Link
              to="/blog/modern-web-tasarim-trendleri-2024"
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://picsum.photos/seed/blog1/800/600"
                  alt="TikTok vs Instagram"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute bottom-4 left-4 px-3 py-1 bg-pink-500 text-white text-xs font-semibold rounded-full">
                  Sosyal Medya
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary-dark mb-2 group-hover:text-pink-600 transition-colors">
                  TikTok ve Instagram: Hangi Platform Markanız İçin Daha İyi?
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  TikTok ve Instagram platformlarını karşılaştırarak markanız için en uygun sosyal medya stratejisini belirleyin.
                </p>
                <div className="flex items-center text-pink-600 font-semibold">
                  Devamını Oku <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>

            <Link
              to="/blog/sosyal-medya-hedef-kitle"
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://picsum.photos/seed/blog9/800/600"
                  alt="Hedef Kitle Analizi"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute bottom-4 left-4 px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
                  Dijital Pazarlama
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary-dark mb-2 group-hover:text-pink-600 transition-colors">
                  Sosyal Medya Reklamcılığında Hedef Kitle Analizi
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  Facebook ve Instagram reklamlarında doğru kişilere ulaşmanın formülü.
                </p>
                <div className="flex items-center text-pink-600 font-semibold">
                  Devamını Oku <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
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
                    ? 'bg-gradient-to-r from-pink-600 to-orange-600 text-white shadow-lg'
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
        className="fixed bottom-8 right-8 z-50 px-6 py-4 bg-gradient-to-r from-pink-600 to-orange-600 text-white rounded-full font-semibold shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-2 animate-bounce-slow"
      >
        <Calendar className="w-5 h-5" />
        <span className="hidden sm:inline">Toplantı Planla</span>
      </button>

      <MeetingScheduler isOpen={isSchedulerOpen} onClose={() => setIsSchedulerOpen(false)} />

      <Footer />
    </div>
  );
}

export default SosyalMedyaTasarim;
