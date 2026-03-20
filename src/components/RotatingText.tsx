import { useState, useEffect } from 'react';

interface RotatingTextProps {
  words: { text: string; color: string }[];
  interval?: number;
}

export default function RotatingText({ words, interval = 2000 }: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 500);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  const currentWord = words[currentIndex];

  return (
    <span
      className={`inline-block transition-opacity duration-500 font-bold ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        color: currentWord.color,
        textShadow: `0 0 20px ${currentWord.color}40`,
        minWidth: '150px',
        textAlign: 'center'
      }}
    >
      {currentWord.text}
    </span>
  );
}
