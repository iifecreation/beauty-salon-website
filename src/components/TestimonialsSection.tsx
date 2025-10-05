"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Quote from "@/components/ui/Quote";
import { testimonials } from "@/contant/testimonials";
import { cn } from "@/lib/utils";

interface TestimonialsSectionProps {
  className?: string;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ className }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate testimonials for seamless infinite scroll
  const allTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    let animationFrame: number;
    let scrollPos = 0;

    const scroll = () => {
      if (carouselRef.current && !isHovered) {
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
  }, [isHovered]);

  return (
    <section className={cn("py-20 bg-warm-brown-50/50 max-w-[1440px] mx-auto", className)}>
      <div className="mb-12">
        <h2 className="text-[32px] md:text-[48px] font-sentient font-light text-center">
          Testimonials
        </h2>
        <p className="text-center">Success Stories from Our Students and Clients</p>
      </div>

      <div className="relative w-full py-10">
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            ref={carouselRef}
            className="flex space-x-6 overflow-x-auto no-scrollbar"
          >
            {allTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`} // include index to make duplicated keys unique
                className="flex-shrink-0 w-[80vw] sm:w-[50vw] md:w-[33.33vw] lg:w-[25vw] h-[420px]"
              >
                <div className="relative w-full h-full cursor-pointer rounded-lg overflow-hidden shadow-xl">
                  {/* Full background image */}
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                  {/* Content on bottom over dark gradient */}
                  <div className="absolute bottom-0 w-full px-4 py-6 text-white text-center z-10">
                    <Quote className="text-white/95 mb-2">{testimonial.review}</Quote>
                  </div>
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
};

export default TestimonialsSection;
