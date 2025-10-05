"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

type GalleryProps = {
  images: string[];
  title?: string;
};

export default function Gallery({ images, title }: GalleryProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Duplicate images to simulate infinite scroll
  const allImages = [...images, ...images];

  // Auto-scroll effect
  useEffect(() => {
    let animationFrame: number;
    let scrollPos = 0;

    const scroll = () => {
      if (carouselRef.current) {
        scrollPos += 0.5; // scroll speed
        if (scrollPos >= carouselRef.current.scrollWidth / 2) {
          scrollPos = 0;
        }
        carouselRef.current.scrollLeft = scrollPos;
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <section className="w-full py-12 md:py-20 bg-white">
      <div className="mx-auto">
        <h2 className="text-[32px] md:text-[48px] font-light mb-8 text-center font-sentient">
          {title || "Our Talented Students"}
        </h2>

        <div className="relative overflow-hidden">
          <motion.div
            ref={carouselRef}
            className="flex space-x-6 overflow-x-auto no-scrollbar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {allImages.map((src, idx) => (
              <motion.div
                key={idx}
                className="relative w-[80vw] sm:w-[50vw] md:w-[33.33vw] lg:w-[25vw] h-[420px] flex-shrink-0 rounded-xl overflow-hidden shadow-md"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={src}
                  alt={`Student ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 80vw"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Hide scrollbars */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
