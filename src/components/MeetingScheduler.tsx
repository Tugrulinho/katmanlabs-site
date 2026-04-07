import { useEffect, useRef, useState } from "react";
import { Calendar, X, Clock } from "lucide-react";

interface MeetingSchedulerProps {
  isOpen: boolean;
  onClose: () => void;
}

function MeetingScheduler({ isOpen, onClose }: MeetingSchedulerProps) {
  const [cfToken, setCfToken] = useState("");
  const [website, setWebsite] = useState("");
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    date: "",
    time: "",
  });
  const turnstileRef = useRef<HTMLDivElement | null>(null);
  const normalizeDate = (date: string) => {
    if (!date.includes(".")) return date;

    const [day, month, year] = date.split(".");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };
  useEffect(() => {
    const win = window as any;
    const siteKey = "0x4AAAAAACt8xcbnaubosl1H";

    const onSuccess = (token: string) => {
      setCfToken(token);
    };

    const renderTurnstile = () => {
      if (win.turnstile && turnstileRef.current) {
        if (turnstileRef.current.firstChild) {
          turnstileRef.current.innerHTML = "";
        }
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
      setTurnstileReady(true);
    } else if (existingScript) {
      existingScript.addEventListener("load", () => {
        setTurnstileReady(true);
      }, { once: true });
    } else {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      script.defer = true;
      script.addEventListener("load", () => {
        setTurnstileReady(true);
      }, { once: true });
      document.body.appendChild(script);
    }

    return () => {
      // no-op cleanup required for render callback reference
    };
  }, []);

  useEffect(() => {
    const win = window as any;
    const siteKey = "0x4AAAAAACt8xcbnaubosl1H";

    if (!isOpen || !turnstileReady || !turnstileRef.current) {
      return;
    }

    if (win.turnstile) {
      if (turnstileRef.current.firstChild) {
        turnstileRef.current.innerHTML = "";
      }
      win.turnstile.render(turnstileRef.current, {
        sitekey: siteKey,
        callback: (token: string) => setCfToken(token),
      });
    }
  }, [isOpen, turnstileReady]);

  useEffect(() => {
    if (!formData.date) {
      setBookedTimes([]);
      return;
    }

    fetch(`/api/contact?date=${normalizeDate(formData.date)}`)
      .then((res) => res.json())
      .then((data) => {
        const times = Array.isArray(data)
          ? data.map((item: any) => item.meeting_time)
          : [];
        setBookedTimes(times);
      })
      .catch(() => {
        setBookedTimes([]);
      });
  }, [formData.date]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cfToken) {
      alert("Doğrulama başarısız");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: "Toplantı Talebi", // geçici
          service: "Toplantı Planlama",
          message: `Toplantı Talebi\nTarih: ${formData.date}\nSaat: ${formData.time}`,
          website: website,
          cfToken: cfToken,

          meeting_date: formData.date,
          meeting_time: formData.time,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Bir hata oluştu");
      }
      setCfToken("");

      if ((window as any).turnstile) {
        (window as any).turnstile.reset();
      }
      alert(
        "Toplantı talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.",
      );

      onClose();

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        date: "",
        time: "",
      });
    } catch (err) {
      console.error(err);
      setCfToken("");

      if ((window as any).turnstile) {
        (window as any).turnstile.reset();
      }
      alert("Seçtiğiniz saat dolu olabilir. Lütfen başka bir saat deneyin.");
    }
  };

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full pointer-events-auto transform transition-all scale-100 animate-scale-up"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-gradient-to-r from-pink-600 to-orange-600 p-6 rounded-t-2xl relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <h3 className="text-2xl font-bold text-white mb-2">
              Toplantı Planla
            </h3>
            <p className="text-white/90 text-sm">
              Size uygun bir tarih ve saat seçin
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ad
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none transition-colors"
                  placeholder="Adınız"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Soyad
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none transition-colors"
                  placeholder="Soyadınız"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none transition-colors"
                placeholder="email@ornek.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tarih
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none transition-colors"
                />
                <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Saat
              </label>
              <div className="relative">
                <select
                  required
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none transition-colors appearance-none"
                >
                  <option value="">Saat seçin</option>
                  {timeSlots.map((time) => (
                    <option
                      key={time}
                      value={time}
                      disabled={bookedTimes.includes(time)}
                    >
                      {time} {bookedTimes.includes(time) ? "(dolu)" : ""}
                    </option>
                  ))}
                </select>
                <Clock className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
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
            />
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-pink-600 to-orange-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg"
            >
              Toplantı Talebi Gönder
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default MeetingScheduler;
