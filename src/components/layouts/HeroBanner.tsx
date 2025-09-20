"use client";

import React from "react";

interface HeroBannerProps {
  image?: string;
  title?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ image ="https://images.squarespace-cdn.com/content/v1/632f77d9215661299a94de50/1711379231800-PXH3KAGW5MR3DMEAL1C0/IMG_2994.jpeg", title }) => {
  return (
    <div className="relative w-full max-w-[1408px] mb-12">
      <svg
        viewBox="0 0 701 293"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <clipPath id="hero-banner-clip" clipPathUnits="userSpaceOnUse">
            <path d="M701 278C701 286.284 694.284 293 686 293H259.598C251.313 293 244.598 286.284 244.598 278V260C244.598 251.716 237.882 245 229.598 245H15C6.71573 245 0 238.284 0 230V15C0 6.71572 6.71573 0 15 0H686C694.284 0 701 6.71573 701 15V278Z" />
          </clipPath>
        </defs>

        <image
          href={image}
          width="701"
          height="293"
          clipPath="url(#hero-banner-clip)"
          preserveAspectRatio="xMidYMid slice"
        />
      </svg>

      {/* Overlay text */}
      <div className="absolute -bottom-7 left-0 p-8 text-white">
        <h2 className="text-black text-5xl md:text-7xl">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default HeroBanner;
