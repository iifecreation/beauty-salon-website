"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Prevent background scrolling when modal is open
  useEffect(() => {
    const original = document.body.style.overflow;
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = original || "";
    }

    return () => {
      document.body.style.overflow = original || "";
    };
  }, [isModalOpen]);



  return (
    <section className="py-8 max-w-[1440px] mx-auto">
      <div className="flex items-center justify-between px-4 sm:px-10 md:px-16">
        <h2 className={cn("font-sentient text-xl md:text-2xl mb-7 flex items-center space-x-4", className)}>
          <span>Year {year} <span className="text-warm-brown-800">Award</span></span>
        </h2>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <button
              className="text-warm-brown-800 underline py-2 rounded-md text-sm hover:opacity-90"
              aria-haspopup="dialog"
            >
              See Awardees
            </button>
          </DialogTrigger>

          <DialogContent
            // Override the default centered max-width to be full-screen
            className="inset-0 top-0 left-0 translate-x-0 translate-y-0 fixed w-full h-full max-w-none rounded-none p-0"
          >
            <DialogHeader className="flex items-center justify-between px-4 py-3 border-b">
              <DialogTitle>Awardees - {year}</DialogTitle>
            </DialogHeader>

            <div className="p-4 overflow-auto h-[calc(100vh-72px)]">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="text-left text-sm text-gray-700">
                    <th className="p-2 border-b">S/N</th>
                    <th className="p-2 border-b">Name</th>
                    <th className="p-2 border-b">Age</th>
                    <th className="p-2 border-b">Country</th>
                    <th className="p-2 border-b">Award</th>
                  </tr>
                </thead>
                <tbody>
                  {awards && awards.length > 0 ? (
                    awards.map((a, i) => (
                      <tr key={a.id} className="text-sm even:bg-gray-50">
                        <td className="p-2 border-b">{i + 1}</td>
                        <td className="p-2 border-b">{a.user}</td>
                        <td className="p-2 border-b">{a.age}</td>
                        <td className="p-2 border-b">{a.country}</td>
                        <td className="p-2 border-b">{a.title}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-gray-500">No awardees found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-4 py-3 border-t flex justify-end">
              <DialogClose asChild>
                <button className="px-4 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200">Close</button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>

      </div>
      
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
                  {year}
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
