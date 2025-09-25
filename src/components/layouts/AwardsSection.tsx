"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Award from "./Award";


const AwardsBanner = () => {

  return (
    <section className="mb-20 pt-20 pb-10 max-w-7xl mx-auto">
      <h2 className="text-[48px] font-light leading-tight tracking-[-2.4px] text-foreground mb-12 text-center max-md:text-[32px]">
        Awards & Recognition
      </h2>

    <div className="space-y-10">
      <Award
        awards={[
          {
            id: 1,
            image: "/images/beauty-photo.jpg",
            title: "Best Beauty Award",
            user: "Jane Doe",
            age: 28,
            country: "Nigeria",
          },
          {
            id: 2,
            image: "/images/BLOG-IMAGES-2.jpg",
            title: "Top Stylist",
            user: "Mary Smith",
            age: 32,
            country: "USA",
          },
          {
            id: 3,
            image: "/images/beauty-photo.jpg",
            title: "Rising Star",
            user: "Linda Lee",
            age: 25,
            country: "UK",
          },
        ]}
      />

       <Award
        direction="right"
        awards={[
          {
            id: 1,
            image: "/images/beauty-photo.jpg",
            title: "Best Beauty Award",
            user: "Jane Doe",
            age: 28,
            country: "Nigeria",
          },
          {
            id: 2,
            image: "/images/BLOG-IMAGES-2.jpg",
            title: "Top Stylist",
            user: "Mary Smith",
            age: 32,
            country: "USA",
          },
          {
            id: 3,
            image: "/images/beauty-photo.jpg",
            title: "Rising Star",
            user: "Linda Lee",
            age: 25,
            country: "UK",
          },
        ]}
      />


       <Award
        awards={[
          {
            id: 1,
            image: "/images/beauty-photo.jpg",
            title: "Best Beauty Award",
            user: "Jane Doe",
            age: 28,
            country: "Nigeria",
          },
          {
            id: 2,
            image: "/images/BLOG-IMAGES-2.jpg",
            title: "Top Stylist",
            user: "Mary Smith",
            age: 32,
            country: "USA",
          },
          {
            id: 3,
            image: "/images/beauty-photo.jpg",
            title: "Rising Star",
            user: "Linda Lee",
            age: 25,
            country: "UK",
          },
        ]}
      />

       <Award
        awards={[
          {
            id: 1,
            image: "/images/beauty-photo.jpg",
            title: "Best Beauty Award",
            user: "Jane Doe",
            age: 28,
            country: "Nigeria",
          },
          {
            id: 2,
            image: "/images/BLOG-IMAGES-2.jpg",
            title: "Top Stylist",
            user: "Mary Smith",
            age: 32,
            country: "USA",
          },
          {
            id: 3,
            image: "/images/beauty-photo.jpg",
            title: "Rising Star",
            user: "Linda Lee",
            age: 25,
            country: "UK",
          },
        ]}
      />
    </div>
    </section>
  );
};

export default AwardsBanner;
