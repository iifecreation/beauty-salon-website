"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveUp, MoveDown } from "lucide-react";

interface Award {
  id: number;
  image: string;
  title: string;
  user: string;
  age: number;
  country: string;
}

interface AwardsBannerProps {
  awards: Award[];
}

const Award: React.FC<AwardsBannerProps> = ({ awards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevAward = () => {
    setCurrentIndex((prev) => (prev - 1 + awards.length) % awards.length);
  };

  const nextAward = () => {
    setCurrentIndex((prev) => (prev + 1) % awards.length);
  };

  const currentAward = awards[currentIndex];

  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 1283 472"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <clipPath id="hero-banner-clip" clipPathUnits="userSpaceOnUse">
            <path d="M1171 167C1171 180.807 1182.19 192 1196 192H1258C1271.81 192 1283 203.193 1283 217V447C1283 460.807 1271.81 472 1258 472H25C11.1929 472 0 460.807 0 447V110C0 96.1929 11.1929 85 25 85H183C196.807 85 208 73.8071 208 60V25C208 11.1929 219.193 0 233 0H1146C1159.81 0 1171 11.1929 1171 25V167Z" />
          </clipPath>
        </defs>

        <image
          href={currentAward.image}
          width="1283"
          height="472"
          clipPath="url(#hero-banner-clip)"
          preserveAspectRatio="xMidYMid slice"
        />

        {/* Overlay inside SVG */}
        <foreignObject x="0" y="300" width="1283" height="172">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAward.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full flex flex-col justify-end p-8 bg-black/40 text-white"
            >
              <h2 className="text-3xl md:text-5xl font-medium ">
                {currentAward.user}
              </h2>
              <p className="text-lg md:text-2xl mt-2 text-gray-300">
                {currentAward.user} <br />
                {currentAward.country}
              </p>
            </motion.div>
          </AnimatePresence>
        </foreignObject>
      </svg>

      {/* Navigation buttons */}
      <div className="flex flex-col absolute top-0 right-10 gap-5">
        <div className="flex flex-col gap-2">
          <button
            onClick={prevAward}
            className="bg-warm-brown-400 px-3 py-7 rounded-full shadow-lg hover:bg-warm-brown-700 transition"
          >
            <MoveUp className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextAward}
            className="bg-warm-brown-400 px-3 py-7 rounded-full shadow-lg hover:bg-warm-brown-700 transition"
          >
            <MoveDown className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Left title */}
      <div className="flex flex-col absolute top-0 left-0 gap-5">
        <h2 className="text-2xl md:text-3xl font-instrument">
          YEAR 2025 <br /> AWARD
        </h2>
      </div>
    </div>
  );
};

export default Award;
