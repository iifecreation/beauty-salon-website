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
      <div className="relative w-full overflow-hidden rounded-xl">
        {/* Award Image */}
        <img
          src={currentAward.image}
          alt={currentAward.title}
          className="w-full h-[472px] object-cover rounded-xl"
        />

        {/* Award Year Overlay */}
        <div className="absolute top-0 left-0 bg-white text-black px-4 py-2 rounded">
          <h2 className="text-sm md:text-lg font-semibold leading-tight">
            YEAR 2025 <br /> AWARD
          </h2>
        </div>

        {/* Text Overlay */}
        <div className="absolute bottom-0 left-0 w-full bg-black/40 text-white p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAward.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <h2 className="text-3xl md:text-5xl font-medium ">
                {currentAward.user}
              </h2>
              <p className="text-lg md:text-2xl mt-2 text-gray-300">
                {currentAward.age} years old <br />
                {currentAward.country}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col absolute top-1/2 -translate-y-1/2 right-10 bg-gray-50/40 border border-white justify-between h-10/12 gap-3 z-40 rounded-full py-3 px-3">
        <button
          onClick={prevAward}
          className="py-7 rounded-full transition"
        >
          <MoveUp className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextAward}
          className="py-7 rounded-full transition"
        >
          <MoveDown className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Award;
