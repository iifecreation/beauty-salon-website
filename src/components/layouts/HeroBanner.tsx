"use client";

import Image from "next/image";
import React from "react";

interface HeroBannerProps {
  image?: string;
  title?: string;
  description?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  image = "/images/bg-1.avif",
  description = "We offer professional makeup, pedicure, facials, hairstyling, manicure, and nail fixing services tailored to your beauty needs.",
}) => {
  return (
    <div className="relative w-full h-[80vh] overflow-hidden mb-12 rounded-4xl">
      {/* Background Image */}
      <Image
        src={image}
        alt="background"
        className="w-full h-full object-cover"
        fill
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-center px-8 md:px-16">
        <div className="text-white max-w-xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-normal mb-4 font-sentient">
            Enhance Your
          </h1>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-light italic mb-4 font-sentient text-[#fff9]">
            Natural Beauty
          </h1>
          <p className="text-md sm:text-lg md:text-xl leading-relaxed text-[#fff9]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
