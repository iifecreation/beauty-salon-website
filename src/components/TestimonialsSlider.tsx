"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MoveLeft, MoveRight } from "lucide-react";
import { testimonials } from "@/contant/testimonials";


export default function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // <-- NEW

  const visibleCount = 3;

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (isHovered) return; // Pause auto-scroll on hover

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [isHovered]); // <-- re-run if hover state changes

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-10 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Testimonials</h2>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
          >
            <MoveLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
          >
            <MoveRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Slider Container */}
      <div className="overflow-hidden w-full">
        <motion.div
          className="flex gap-6 transition-transform duration-500 ease-in-out"
          animate={{ x: `-${current * (100 / visibleCount)}%` }}
          style={{
            width: `${(testimonials.length / visibleCount) * 100}%`,
          }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group perspective-1000 w-full"
              style={{
                width: `calc(100% / ${visibleCount})`,
              }}
              onMouseEnter={() => setIsHovered(true)} // <-- pause
              onMouseLeave={() => setIsHovered(false)} // <-- resume
            >
              <div className="relative w-full h-[420px] group cursor-pointer">
                {/* Front */}
                <div className="absolute inset-0 bg-white shadow-xl rounded-lg overflow-hidden backface-hidden transition-transform duration-700 group-hover:rotate-y-180">
                  <div className="flex flex-col items-center justify-center p-6 h-full relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-24 h-24 rounded-full object-cover shadow-md mb-4"
                    />
                    <p className="text-center text-gray-700 text-lg mb-8">
                      "{testimonial.review}"
                    </p>
                    <div className="absolute bottom-4 left-4 right-4 text-center">
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
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
