"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const teamMembers = [
  {
    id: 1,
    name: "Sophia Glam",
    role: "Creative Director",
    img: "/images/IMG-20250907-WA0009.jpg",
  },
  {
    id: 2,
    name: "Isabella Shine",
    role: "Lead Makeup Artist",
    img: "/images/IMG-20250908-WA0008.jpg",
  },
  {
    id: 3,
    name: "David",
    role: "Chairman Contact Tender Board",
    img: "/images/IMG-20250908-WA0012.jpg",
  },
  {
    id: 4,
    name: "Pat Fax",
    role: "Assistance / CEO Contract Tender Board",
    img: "/images/IMG-20250907-WA0012.jpg",
  },
];

export default function TeamSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate for infinite scroll effect
  const allMembers = [...teamMembers, ...teamMembers];

  useEffect(() => {
    let animationFrame: number;
    let scrollPos = 0;

    const scroll = () => {
      if (carouselRef.current && !isHovered) {
        scrollPos += 0.5; // Speed of scroll
        const scrollWidth = carouselRef.current.scrollWidth / 2;

        if (scrollPos >= scrollWidth) {
          scrollPos = 0;
        }

        carouselRef.current.scrollLeft = scrollPos;
      }

      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, [isHovered]);

  return (
    <section className="py-16 mx-auto max-w-[1440px]">
      <div>
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-center mb-2 font-sentient">
          The Face of Beauty Best
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Meet our passionate experts who bring creativity, skill, and innovation
          to every beauty experience.
        </p>

        {/* Auto-scrolling carousel */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            ref={carouselRef}
            className="flex space-x-6 overflow-x-auto no-scrollbar"
          >
            {allMembers.map((member, idx) => (
              <div
                key={`${member.id}-${idx}`}
                className="relative flex-shrink-0 w-[80vw] sm:w-[60vw] md:w-[33.33vw] lg:w-[25vw] h-[420px] rounded-2xl overflow-hidden"
              >
                {/* Background Image */}
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="object-cover w-full h-full"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                {/* Content on bottom over dark gradient */}
                <div className="absolute bottom-0 w-full px-4 py-6 text-white text-center z-10">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-300">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
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
