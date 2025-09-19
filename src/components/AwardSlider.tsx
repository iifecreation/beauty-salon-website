"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

type Award = {
  id: number;
  name: string;
  recipient: string;
  year: string;
  description: string;
  image: string;
};

const awards: Award[] = [
  {
    id: 1,
    name: "Best Innovation Award",
    recipient: "Sarah Johnson",
    year: "2023",
    description:
      "Winning this award has been an amazing recognition of my work. The community and opportunities here have been invaluable!",
    image:
      "https://images.squarespace-cdn.com/content/v1/632f77d9215661299a94de50/1711379231800-PXH3KAGW5MR3DMEAL1C0/IMG_2994.jpeg",
  },
  {
    id: 2,
    name: "Leadership Excellence",
    recipient: "David Kim",
    year: "2022",
    description:
      "This recognition has been a milestone in my career. The support here is second to none.",
    image:
      "https://images.squarespace-cdn.com/content/v1/632f77d9215661299a94de50/1711379231800-PXH3KAGW5MR3DMEAL1C0/IMG_2994.jpeg",
  },
];

export default function AwardSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % awards.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + awards.length) % awards.length);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Clipped Image Section */}
      <div
        className="relative w-full h-[415px] overflow-hidden"
        style={{ clipPath: "url(#award-clip)" }}
      >
        {/* SVG clipPath */}
        <svg className="absolute w-0 h-0">
          <defs>
            <clipPath id="award-clip" clipPathUnits="userSpaceOnUse">
              <path d="M1347 385C1347 401.569 1333.57 415 1317 415H309.16C300.047 415 292.66 407.613 292.66 398.5V398.5C292.66 389.387 285.273 382 276.16 382H265.513C251.706 382 240.513 370.807 240.513 357V357C240.513 343.193 229.32 332 215.513 332H30C13.4315 332 0 318.569 0 302V30C0 13.4314 13.4315 0 30 0H1317C1333.57 0 1347 13.4315 1347 30V385Z" />
            </clipPath>
          </defs>
        </svg>

        {/* Background with fade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={awards[current].id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image
              src={awards[current].image}
              alt={awards[current].recipient}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>
        </AnimatePresence>

        {/* Description inside image (left center) */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 max-w-md text-white z-20">
          <p className="text-lg leading-relaxed drop-shadow-md">
            {awards[current].description}
          </p>
        </div>
      </div>

      {/* Award name + recipient OUTSIDE on curve edge */}
      <div className="absolute bottom-[80px] left-0 translate-y-full z-30 text-black px-0 py-3 flex flex-col-reverse">
        <h3 className="text-lg font-semibold text-black">
          {awards[current].name} ({awards[current].year})
        </h3>
        <p className="text-2xl font-bold text-black">
          {awards[current].recipient}
        </p>
      </div>

      {/* Controls */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40">
        <button
          onClick={prevSlide}
          className="p-2 bg-black/40 rounded-full hover:bg-black/60 transition"
        >
          <ChevronUp className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="p-2 bg-black/40 rounded-full hover:bg-black/60 transition"
        >
          <ChevronDown className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
