"use client";

import React from "react";

interface HeroBannerThreeProps {
  image: string;
}

const HeroBannerThree: React.FC<HeroBannerThreeProps> = ({ image }) => {
  return (
    <section className="relative mx-auto max-w-[1440px] lg:px-16 py-7 px-4 sm:px-10 space-y-8">
      <div className="flex sm:flex-row flex-col sm:gap-4 gap-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sentient flex-2">
          Best Beauty Services And Professional Training.
        </h1>

        <p className="text-black text-base self-end flex-1">
            Empowering beauty through expert training and premium services in makeup, hair, nails, spa, and more — with heart.
          </p>
      </div>
      
      <div
        className="relative w-full mb-12 h-[500px] bg-cover bg-center bg-no-repeat rounded-4xl"
        style={{
          backgroundImage:
            "url('/images/pexels-olly-3757942.jpg')"
        }}
></div>
    </section>
  );
};

export default HeroBannerThree;
