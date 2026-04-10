import { useState, useEffect, useRef } from 'react';

interface StatCardProps {
  number: string;
  label: string;
}

export default function StatCard({ number, label }: StatCardProps) {
  const parseNumber = (str: string): { value: number; prefix: string; suffix: string } => {
    const prefixMatch = str.match(/^[^0-9]*/);
    const suffixMatch = str.match(/[^0-9]*$/);
    const numberMatch = str.match(/[0-9]+/);

    return {
      value: numberMatch ? parseInt(numberMatch[0]) : 0,
      prefix: prefixMatch ? prefixMatch[0] : '',
      suffix: suffixMatch ? suffixMatch[0] : '',
    };
  };

  const { value: targetValue, prefix, suffix } = parseNumber(number);

  const [count, setCount] = useState(targetValue);
  const cardRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const animateCount = (reset: boolean = false) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const duration = 2000;
    const startTime = performance.now();
    const startValue = reset ? 0 : count;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);

      setCount(currentCount);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setCount(0);
    animateCount(true);
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      className="relative text-center cursor-pointer group overflow-hidden rounded-xl py-4 transition-transform duration-300 hover:scale-110"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-pink-500 to-rose-500 opacity-0 -translate-x-full group-hover:translate-x-full group-hover:opacity-30 transition-all duration-700 ease-out"></div>

      <div className="relative z-10">
        <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-cta mb-2">
          {prefix}{count}{suffix}
        </div>
        <div className="text-gray-600">{label}</div>
      </div>
    </div>
  );
}
