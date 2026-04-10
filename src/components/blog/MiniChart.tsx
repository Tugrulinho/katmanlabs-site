import { useEffect, useRef, useState } from "react";

type ChartItem = {
  label: string;
  value: number;
  helper?: string;
  colorClass?: string;
};

type MiniChartProps = {
  title?: string;
  items: ChartItem[];
  maxValue?: number;
};

export default function MiniChart({
  title = "Mini Grafik",
  items,
  maxValue,
}: MiniChartProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const max = maxValue || Math.max(...items.map((item) => item.value), 1);

  useEffect(() => {
    const element = wrapperRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="my-10 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.35)]"
    >
      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
        {title}
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {items.map((item) => {
          const percent = Math.max(12, Math.round((item.value / max) * 100));

          return (
            <div key={item.label} className="flex items-end gap-4">
              <div className="flex h-40 w-14 items-end overflow-hidden rounded-full bg-slate-100 p-1">
                <div
                  className={`w-full rounded-full bg-gradient-to-t ${item.colorClass || "from-[#9062ae] to-[#2f4f8f]"} transition-all duration-700 ease-out`}
                  style={{ height: isVisible ? `${percent}%` : "10%" }}
                />
              </div>
              <div className="pb-2">
                <div className="text-2xl font-bold text-slate-950">
                  {item.value}
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-700">
                  {item.label}
                </div>
                {item.helper ? (
                  <p className="mt-1 max-w-[12rem] text-sm leading-6 text-slate-500">
                    {item.helper}
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
