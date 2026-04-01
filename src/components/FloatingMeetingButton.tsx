import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Calendar } from "lucide-react";
import MeetingScheduler from "./MeetingScheduler";

export default function FloatingMeetingButton() {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const location = useLocation();

  const hiddenPaths = [
    "/hizmet/sosyal-medya-tasarim",
    "/hizmet/web-tasarim",
    "/hizmet/dijital-pazarlama",
    "/hizmet/seo-analitik",
  ];

  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsSchedulerOpen(true)}
        className="fixed bottom-8 right-8 z-50 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-semibold shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-2 animate-bounce-slow"
      >
        <Calendar className="w-5 h-5" />
        <span className="hidden sm:inline">Toplantı Planla</span>
      </button>

      <MeetingScheduler
        isOpen={isSchedulerOpen}
        onClose={() => setIsSchedulerOpen(false)}
      />
    </>
  );
}
