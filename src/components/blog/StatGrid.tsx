import { useEffect, useMemo, useRef, useState } from "react";

type StatItem = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  note?: string;
};

type StatGridProps = {
  title?: string;
  items: StatItem[];
};

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  active,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  active: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(active ? value : 0);

  useEffect(() => {
    if (!active) {
      setDisplayValue(0);
      return;
    }

    if (value === 0) {
      setDisplayValue(0);
      return;
    }

    let animationFrame = 0;
    const duration = 900;
    const start = performance.now();

    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [active, value]);

  return (
    <span>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

export default function StatGrid({ title = "Hizli Bakis", items }: StatGridProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      { threshold: 0.25 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const visibleItems = useMemo(() => items.filter((item) => item.value >= 0), [items]);

  return (
    <section
      ref={wrapperRef}
      className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_50px_-32px_rgba(15,23,42,0.35)]"
    >
      <div className="border-b border-slate-200 px-6 py-4">
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          {title}
        </div>
      </div>
      <div className="grid gap-px bg-slate-200 sm:grid-cols-3">
        {visibleItems.map((item) => (
          <div key={item.label} className="bg-white px-6 py-6">
            <div className="text-3xl font-bold text-slate-950 sm:text-4xl">
              <AnimatedNumber
                value={item.value}
                prefix={item.prefix}
                suffix={item.suffix}
                active={isVisible}
              />
            </div>
            <div className="mt-3 text-sm font-semibold text-slate-700">
              {item.label}
            </div>
            {item.note ? (
              <p className="mt-2 text-sm leading-6 text-slate-500">{item.note}</p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
