"use client";

import React from "react";

interface HeroBannerProps {
  image?: string;
  title?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  image = "https://images.squarespace-cdn.com/content/v1/632f77d9215661299a94de50/1711379231800-PXH3KAGW5MR3DMEAL1C0/IMG_2994.jpeg",
  title,
}) => {
  return (
    <div className="relative w-full max-w-[1408px] mb-12">
      <svg
        viewBox="0 0 701 400" // <--- Increased viewBox height
        xmlns="http://www.w3.org/2000/svg"
        className="w-full block h-auto min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px]"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <clipPath id="hero-banner-clip" clipPathUnits="userSpaceOnUse">
            {/* Move the bottom of the shape down to match new viewBox height */}
            <path d="M701 370C701 386.284 694.284 400 686 400H259.598C251.313 400 244.598 386.284 244.598 370V340C244.598 321.716 237.882 310 229.598 310H15C6.71573 310 0 298.284 0 280V15C0 6.71572 6.71573 0 15 0H686C694.284 0 701 6.71573 701 15V370Z" />
          </clipPath>
        </defs>

        <image
          href={image}
          width="701"
          height="400"
          clipPath="url(#hero-banner-clip)"
          preserveAspectRatio="xMidYMid slice"
        />
      </svg>

      {/* Overlay text */}
      <div className="absolute bottom-0 left-0 text-white p-4">
        <h2 className="text-warm-brown-700 font-instrument font-medium text-xl sm:text-3xl md:text-4xl lg:text-[80px]">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default HeroBanner;
