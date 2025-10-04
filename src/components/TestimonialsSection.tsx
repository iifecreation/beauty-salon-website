"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
    <section className={cn("py-20 bg-test-brown-50/50 max-w-[1440px] mx-auto", className)}>
      <div className="mb-12">
        <h2 className="text-[32px] md:text-[48px] font-instrument text-warm-brown-700 font-medium text-center">
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
                className="group perspective-1000 flex-shrink-0 w-[80vw] sm:w-[50vw] md:w-[33.33vw] lg:w-[25vw] h-[420px]"
              >
                <div className="relative w-full h-full group cursor-pointer">
                  {/* Front */}
                  <div className="absolute inset-0 bg-white shadow-xl rounded-lg overflow-hidden backface-hidden transition-transform duration-700 group-hover:rotate-y-180">
                    <div className="flex flex-col items-center p-6 h-full relative">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover shadow-md mb-4 self-start"
                      />
                      <p className=" text-gray-700 text-lg mb-8">
                        &quot;{testimonial.review}&quot;
                      </p>
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-xl font-semibold text-warm-brown-800">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {testimonial.service} • {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Back - Full Image */}
                  <div className="absolute inset-0 rounded-lg overflow-hidden backface-hidden transform rotate-y-180 group-hover:rotate-y-0 transition-transform duration-700">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
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
