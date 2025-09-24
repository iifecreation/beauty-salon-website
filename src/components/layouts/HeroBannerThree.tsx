"use client";

import React from "react";

interface HeroBannerThreeProps {
  image: string;
}

const HeroBannerThree: React.FC<HeroBannerThreeProps> = ({ image }) => {
  return (
    <section className="relative mx-auto max-w-[1440px] lg:px-16 py-7 px-4 sm:px-10 space-y-8">
      <div className="flex ">
        <h1 className="text-7xl font-normal ">
          Best Beauty Services And Professional Training.
        </h1>

        <p className="text-black text-xl md:text-xl self-end">
            Empowering beauty through expert training and premium services in makeup, hair, nails, spa, and more — with heart.
          </p>
      </div>
      
      <div
        className="relative w-full mb-12 h-[500px] bg-cover bg-center bg-no-repeat rounded-4xl"
        style={{
          backgroundImage:
            "url('https://images.squarespace-cdn.com/content/v1/632f77d9215661299a94de50/1711379231800-PXH3KAGW5MR3DMEAL1C0/IMG_2994.jpeg')"
        }}
></div>
    </section>
  );
};

export default HeroBannerThree;
