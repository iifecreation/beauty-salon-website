"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Award from "./Award";
import { awardsData } from "@/contant/award";


const AwardsBanner = () => {

  return (
    <section className="mb-20 pt-20 pb-10 max-w-[1440px] mx-auto">
      <h2 className="text-[48px] font-light leading-tight tracking-[-2.4px] text-foreground text-center max-md:text-[32px] font-sentient">
        Awards & Recognition
      </h2>
      <p className="max-w-2xl mx-auto text-center text-lg text-muted-foreground mb-10">
        We are proud to celebrate our students' achievements. These awards recognize the hard work, talent, and dedication of those who have excelled in our training programs.
      </p>

      <div className="space-y-10">
        {awardsData.map(({ year, className, direction, awards }) => (
          <Award
            key={year}
            year={year}
            className={className}
            direction={direction}
            awards={awards}
          />
        ))}
      </div>

    </section>
  );
};

export default AwardsBanner;
