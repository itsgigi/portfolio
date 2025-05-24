import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const words = [
  "restaurateur",
  "metre",
  "manager",
  "receptionist",
  "social media handler",
  "3d enthusiast",
  "AI researcher",
  "freelancer",
  "event organizer",
  "developer"
];

export default function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showNotJustA, setShowNotJustA] = useState(false);
  const wordRef = useRef(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getSpeedForIndex = (index: number) => {
    const total = words.length - 1;
    const progress = index / total;

    if (progress < 0.2) return 1000;
    if (progress < 0.5) return 600;
    return 300;
  };

  useEffect(() => {
    const animateWord = (index: number) => {
      if (index >= words.length) {
        setShowNotJustA(true);
        return;
      }

      setCurrentWordIndex(index);

      // Animate in
      gsap.fromTo(
        wordRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );

      // Schedule next
      const delay = getSpeedForIndex(index);
      timeoutRef.current = setTimeout(() => animateWord(index + 1), delay);
    };

    animateWord(0);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="relative h-screen flex flex-col gap-2 items-center justify-center overflow-hidden">
        {/* This stays hidden until end */}
          <h1
            className={`text-2xl md:text-4xl text-white tracking-wide uppercase font-semibold transition-opacity duration-700 ${
              showNotJustA ? "opacity-100" : "opacity-0"
            }`}
          >
            Not just a
          </h1>

          {/* Animated word */}
          <h1
            ref={wordRef}
            className="text-4xl md:text-7xl font-bold text-white transition-all duration-500 min-h-[40px]"
          >
            {words[currentWordIndex]}
          </h1>

          {/* Name appears after full animation */}
          <h2
            className={`text-sm md:text-2xl font-medium tracking-widest text-white uppercase transition-opacity duration-700 ${
              showNotJustA ? "opacity-100" : "opacity-0"
            }`}
          >
            Luigi Di Loreto
          </h2>
        </div>
  );
}
