import { useState, useRef, useEffect } from 'react';
import { Search, Settings, FileText, BarChart3, TrendingUp } from 'lucide-react';

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: typeof Search;
  color: string;
  gradient: string;
  items: string[];
}

const seoSteps: ProcessStep[] = [
  {
    id: 1,
    title: 'Anahtar Kelime Araştırması',
    description: 'Hedef kitlenizin aradığı kelimeleri tespit ederiz',
    icon: Search,
    color: 'from-blue-500 to-cyan-500',
    gradient: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    items: [
      'Rekabet analizi ve pazar araştırması',
      'Kullanıcı arama niyeti tespiti',
      'Uzun kuyruk anahtar kelime keşfi',
      'Arama hacmi ve zorluk analizi',
      'Rakip anahtar kelime stratejileri'
    ]
  },
  {
    id: 2,
    title: 'Teknik Optimizasyon',
    description: 'Sitenizi Google standartlarına uygun hale getiririz',
    icon: Settings,
    color: 'from-green-500 to-emerald-500',
    gradient: 'bg-gradient-to-br from-green-50 to-emerald-50',
    items: [
      'Sayfa hızı ve performans iyileştirme',
      'Mobil uyumluluk optimizasyonu',
      'URL yapısı ve site mimarisi',
      'Indexleme ve tarama düzenlemeleri',
      'Schema markup ve yapılandırılmış veri'
    ]
  },
  {
    id: 3,
    title: 'İçerik Geliştirme',
    description: 'SEO dostu ve kullanıcı odaklı içerikler üretiriz',
    icon: FileText,
    color: 'from-orange-500 to-amber-500',
    gradient: 'bg-gradient-to-br from-orange-50 to-amber-50',
    items: [
      'Arama niyetine uygun içerik üretimi',
      'Başlık ve metin yapısı optimizasyonu',
      'İç ve dış bağlantı stratejisi',
      'Görsel ve multimedya optimizasyonu',
      'Mevcut içeriklerin yeniden kurgulanması'
    ]
  },
  {
    id: 4,
    title: 'Ölçümleme ve İyileştirme',
    description: 'Veri odaklı iyileştirmeler yaparak sonuçları maksimize ederiz',
    icon: BarChart3,
    color: 'from-red-500 to-rose-500',
    gradient: 'bg-gradient-to-br from-red-50 to-rose-50',
    items: [
      'Google Analytics ve Search Console kurulumu',
      'Trafik ve kullanıcı davranışı analizi',
      'Sıralama ve görünürlük takibi',
      'Dönüşüm oranı optimizasyonu',
      'Performansa göre sürekli güncelleme'
    ]
  },
  {
    id: 5,
    title: 'Sürekli Büyüme',
    description: 'Kalıcı ve sürdürülebilir trafik artışı sağlarız',
    icon: TrendingUp,
    color: 'from-purple-500 to-violet-500',
    gradient: 'bg-gradient-to-br from-purple-50 to-violet-50',
    items: [
      'Düzenli içerik takvimi ve üretimi',
      'Rakip stratejilerinin takibi',
      'Yeni fırsatların keşfi ve değerlendirilmesi',
      'Teknik güncellemelerin yapılması',
      'ROI odaklı stratejik planlama'
    ]
  }
];

function CircularSeoProcess() {
  const [rotation, setRotation] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [clickedCard, setClickedCard] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, angle: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const calculateAngle = (x: number, y: number) => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const startAngle = calculateAngle(e.clientX, e.clientY);
    setDragStart({ x: e.clientX, y: e.clientY, angle: startAngle });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const currentAngle = calculateAngle(e.clientX, e.clientY);
    const angleDiff = currentAngle - dragStart.angle;
    setRotation(prev => prev + angleDiff);
    setDragStart(prev => ({ ...prev, angle: currentAngle }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    const startAngle = calculateAngle(touch.clientX, touch.clientY);
    setDragStart({ x: touch.clientX, y: touch.clientY, angle: startAngle });
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const currentAngle = calculateAngle(touch.clientX, touch.clientY);
    const angleDiff = currentAngle - dragStart.angle;
    setRotation(prev => prev + angleDiff);
    setDragStart(prev => ({ ...prev, angle: currentAngle }));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, dragStart]);

  const radius = 280;
  const cardAngle = 360 / seoSteps.length;

  const handleCardClick = (stepId: number) => {
    if (isMobile) {
      setClickedCard(clickedCard === stepId ? null : stepId);
    }
  };

  if (isMobile) {
    return (
      <div className="w-full py-10 px-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {seoSteps.map((step) => {
            const Icon = step.icon;
            const isExpanded = clickedCard === step.id;

            return (
              <div
                key={step.id}
                onClick={() => handleCardClick(step.id)}
                className={`${step.gradient} rounded-2xl shadow-lg border-2 border-white transition-all duration-300 cursor-pointer`}
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${step.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white font-bold text-lg">{step.id}</span>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-900 mb-2 text-lg">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {step.description}
                  </p>

                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: isExpanded ? '400px' : '0px',
                      opacity: isExpanded ? 1 : 0
                    }}
                  >
                    <div className="pt-3 border-t border-gray-200">
                      <ul className="space-y-2">
                        {step.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${step.color} flex-shrink-0 mt-1.5`} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Detayları görmek için kartlara tıklayın
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full py-20">
      <div
        ref={containerRef}
        className="relative mx-auto"
        style={{
          width: `${radius * 2 + 400}px`,
          height: `${radius * 2 + 400}px`,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-400">SEO</span>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 transition-transform duration-200 ease-out"
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: 'center center'
          }}
        >
          {seoSteps.map((step, index) => {
            const angle = (index * cardAngle - 90) * (Math.PI / 180);
            const x = radius + radius * Math.cos(angle);
            const y = radius + radius * Math.sin(angle);
            const isHovered = hoveredCard === step.id;

            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="absolute transition-all duration-300 pointer-events-auto"
                style={{
                  left: `${x + 200}px`,
                  top: `${y + 200}px`,
                  transform: `translate(-50%, -50%) rotate(${-rotation}deg) ${isHovered ? 'scale(1.4)' : 'scale(1)'}`,
                  zIndex: isHovered ? 50 : 10,
                  transformOrigin: 'center center'
                }}
                onMouseEnter={() => setHoveredCard(step.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`${step.gradient} rounded-2xl shadow-lg border-2 border-white transition-all duration-300 ${
                  isHovered ? 'shadow-2xl' : 'shadow-md'
                } ${hoveredCard !== null && !isHovered ? 'opacity-40 blur-sm' : 'opacity-100'}`}
                style={{
                  width: isHovered ? '320px' : '200px',
                  minHeight: isHovered ? 'auto' : '180px'
                }}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${step.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white font-bold text-lg">{step.id}</span>
                      </div>
                      <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>

                    <h3 className="font-bold text-gray-900 mb-2" style={{ fontSize: isHovered ? '1.1rem' : '1rem' }}>
                      {step.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      {step.description}
                    </p>

                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{
                        maxHeight: isHovered ? '400px' : '0px',
                        opacity: isHovered ? 1 : 0
                      }}
                    >
                      <div className="pt-3 border-t border-gray-200">
                        <ul className="space-y-2">
                          {step.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                              <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${step.color} flex-shrink-0 mt-1.5`} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-500 text-sm">
          {isDragging ? '🔄 Döndürülüyor...' : '💡 Kartları döndürmek için mouse ile tutup sürükleyin'}
        </p>
      </div>
    </div>
  );
}

export default CircularSeoProcess;
