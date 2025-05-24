/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

export const DragCards = () => {
  return (
    <section className="relative grid min-h-screen w-full place-content-center overflow-hidden">
      <Cards />
    </section>
  );
};

const Cards = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="absolute w-[40%] inset-0 z-10" ref={containerRef}>
      <Card
        containerRef={containerRef}
        src="/event1.png"
        alt="Example image"
        rotate="6deg"
        top="25%"
        left="25%"
        className="w-36 md:w-70"
      />
      <Card
        containerRef={containerRef}
        src="/event2.jpg"
        alt="Example image"
        rotate="12deg"
        top="60%"
        left="80%"
        className="w-44 md:w-70"
      />
      <Card
        containerRef={containerRef}
        src="/event3.jpg"
        alt="Example image"
        rotate="-6deg"
        top="35%"
        left="40%"
        className="w-52 md:w-80"
      />
      <Card
        containerRef={containerRef}
        src="/event4.png"
        alt="Example image"
        rotate="8deg"
        top="55%"
        left="30%"
        className="w-48 md:w-72"
      />
      <Card
        containerRef={containerRef}
        src="/event5.jpg"
        alt="Example image"
        rotate="18deg"
        top="15%"
        left="65%"
        className="w-40 md:w-64"
      />
      <Card
        containerRef={containerRef}
        src="/event6.jpg"
        alt="Example image"
        rotate="-3deg"
        top="40%"
        left="55%"
        className="w-24 md:w-60"
      />
    </div>
  );
};

interface Props {
  containerRef: any;
  src: string;
  alt: string;
  top: string;
  left: string;
  rotate: string;
  className?: string;
}

const Card = ({
  containerRef,
  src,
  alt,
  top,
  left,
  rotate,
  className,
}: Props) => {
  const [zIndex, setZIndex] = useState(0);

  const updateZIndex = () => {
    const els = document.querySelectorAll(".drag-elements");

    let maxZIndex = -Infinity;

    els.forEach((el) => {
      const zIndex = parseInt(
        window.getComputedStyle(el).getPropertyValue("z-index")
      );

      if (!isNaN(zIndex) && zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });

    setZIndex(maxZIndex + 1);
  };

  return (
    <motion.img
      onMouseDown={updateZIndex}
      style={{
        top,
        left,
        rotate,
        zIndex,
      }}
      className={twMerge(
        "drag-elements absolute w-48 bg-neutral-200 p-1 pb-4 cursor-pointer",
        className
      )}
      src={src}
      alt={alt}
      drag
      dragConstraints={containerRef}
      // Uncomment below and remove dragElastic to remove movement after release
      //   dragMomentum={false}
      dragElastic={0.65}
    />
  );
};