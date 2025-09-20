"use client";

import React from "react";

interface HeroBannerThreeProps {
  image: string;
}

const HeroBannerThree: React.FC<HeroBannerThreeProps> = ({ image }) => {
  return (
    <section className="relative w-full max-w-[1282px] mx-auto py-7 space-y-8">
      <h1 className="text-7xl font-normal ">
        Best Beauty Services And Professional Training.
      </h1>
      <div className="relative w-full mb-12">
        <svg
          viewBox="0 0 1282 453"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="xMidYMid slice"
        >
          <mask
            id="mask0_2024_61"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="1282"
            height="453"
          >
            <path
              d="M0 48C0 21.4903 21.4903 0 48 0H803.5C830.01 0 851.5 21.4903 851.5 48V53C851.5 79.5097 872.99 101 899.5 101H1234C1260.51 101 1282 122.49 1282 149V405C1282 431.51 1260.51 453 1234 453H48C21.4903 453 0 431.51 0 405V48Z"
              fill="#E82323"
            />
          </mask>
          <g mask="url(#mask0_2024_61)">
            <image
              href={image}
              x="-1"
              y="-69"
              width="1285"
              height="855"
              preserveAspectRatio="xMidYMid slice"
            />
          </g>
        </svg>

        {/* Overlay text */}
        <div className="absolute -top-6 right-0 p-8 text-white">
          <div className="max-w-96 flex gap-2">
            <svg width="24" height="44" viewBox="0 0 24 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.306 16.3018L19.4521 16.1322V19.299L14.306 19.1293L17.2466 23.3706L14.3626 25.0671L11.7613 20.4865L9.15997 25.0671L6.27592 23.3706L9.21652 19.1293L4.07047 19.299V16.1322L9.21652 16.3018L6.27592 12.0606L9.15997 10.3641L11.7613 14.9446L14.3626 10.3641L17.2466 12.0606L14.306 16.3018Z" fill="#1D1D1D"/>
            </svg>
            <p className="text-black text-xl md:text-xl">
            Empowering beauty through expert training and premium services in makeup, hair, nails, spa, and more — with heart.
          </p>
          </div>
         
        </div>
      </div>
    </section>
  );
};

export default HeroBannerThree;
