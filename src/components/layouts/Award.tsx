"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Award {
  id: number;
  image: string;
  title: string;
  user: string;
  age: number;
  country: string;
}

interface AwardsBannerProps {
  awards: Award[];
  className: string;
  year: string;
  direction?: "left" | "right"; // NEW
  scrollSpeed?: number;
}

const Award: React.FC<AwardsBannerProps> = ({ awards, direction = "left", className, year}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate the awards for infinite scroll effect
  const allAwards = [...awards, ...awards];

  useEffect(() => {
  let animationFrame: number;
  const container = carouselRef.current;

  if (!container) return;

  const scrollWidth = container.scrollWidth / 2;

  // If scrolling to the right, initialize scrollLeft to the midpoint
  if (direction === "right") {
    container.scrollLeft = scrollWidth;
  }

  const scroll = () => {
    if (container && !isHovered) {
      if (direction === "left") {
        container.scrollLeft += 0.5;
        if (container.scrollLeft >= scrollWidth) {
          container.scrollLeft = 0;
        }
      } else {
        container.scrollLeft -= 0.5;
        if (container.scrollLeft <= 0) {
          container.scrollLeft = scrollWidth;
        }
      }
    }

    animationFrame = requestAnimationFrame(scroll);
  };

    animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, [isHovered, direction]);



  return (
    <section className="py-8 max-w-[1440px] mx-auto">
      <h2 className={cn("px-4 sm:px-10 md:px-16 font-sentient text-xl md:text-2xl mb-7", className)}>Year {year} <span className="text-warm-brown-800">Award</span></h2>
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={carouselRef}
          className="flex space-x-6 overflow-x-auto no-scrollbar"
        >
          {allAwards.map((award, index) => (
            <div
              key={`${award.id}-${index}`}
              className="relative flex-shrink-0 w-[80vw] sm:w-[60vw] md:w-[33.33vw] lg:w-[25vw] h-[480px] rounded-xl overflow-hidden"
            >
              {/* Background Image */}
              <Image
                src={award.image}
                alt={award.title}
                fill
                className="object-cover w-full h-full"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              {/* Text Overlay at Bottom */}
              <div className="absolute bottom-0 w-full px-4 py-6 text-white text-left z-10">
                <h2 className="text-xl font-semibold">{award.title}</h2>
                <p className="text-sm text-gray-300 mt-1">
                  {award.age} years old<br />
                  {award.country}
                </p>
              </div>
            </div>
          ))}
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
};

export default Award;
