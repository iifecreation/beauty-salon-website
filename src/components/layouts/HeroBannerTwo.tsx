"use client";

import React from "react";

interface HeroBannerTwoProps {
  image: string;
  title: string;
}

const HeroBannerTwo: React.FC<HeroBannerTwoProps> = ({ image, title }) => {
  return (
    <div className="relative w-full max-w-[1408px] mb-12">
      <svg
        viewBox="0 0 701 293"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <clipPath id="hero-banner-two-clip" clipPathUnits="userSpaceOnUse">
            <path d="M701 278C701 286.284 694.284 293 686 293H15C6.71573 293 0 286.284 0 278V63C0 54.7157 6.71573 48 15 48H229.598C237.882 48 244.598 41.2843 244.598 33V15C244.598 6.71573 251.313 0 259.598 0H686C694.284 0 701 6.71573 701 15V278Z" />
          </clipPath>
        </defs>

        <image
          href={image}
          width="701"
          height="293"
          clipPath="url(#hero-banner-two-clip)"
          preserveAspectRatio="xMidYMid slice"
        />
      </svg>

      {/* Overlay text */}
      <div className="absolute bottom-0 left-0 p-8 text-white">
        <h2 className="text-black font-bold text-5xl md:text-7xl leading-tight md:leading-[80px]">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default HeroBannerTwo;
