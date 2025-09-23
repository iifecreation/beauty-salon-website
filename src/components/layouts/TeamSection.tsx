"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Facebook, Instagram } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Sophia Glam",
    role: "Creative Director",
    img: "/images/IMG-20250907-WA0009.jpg",
    socials: { fb: "#", ig: "#" },
  },
  {
    id: 2,
    name: "Isabella Shine",
    role: "Lead Makeup Artist",
    img: "/images/IMG-20250908-WA0008.jpg",
    socials: { fb: "#", ig: "#" },
  },
  {
    id: 3,
    name: "Amelia Grace",
    role: "Hair & Spa Specialist",
    img: "/images/IMG-20250908-WA0012.jpg",
    socials: { fb: "#", ig: "#" },
  },
  {
    id: 4,
    name: "Olivia Luxe",
    role: "Nail & Pedicure Expert",
    img: "/images/IMG-20250907-WA0012.jpg",
    socials: { fb: "#", ig: "#" },
  },
];

export default function TeamSection() {
  return (
    <section className="py-16 mx-auto max-w-[1440px]">
      <div className="">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          The Face of Beauty Best
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Meet our passionate experts who bring creativity, skill, and innovation 
          to every beauty experience.
        </p>

        {/* Horizontal Scroll */}
        <motion.div
          className="flex space-x-6 overflow-x-auto no-scrollbar snap-x snap-mandatory"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="snap-start w-[80%] sm:w-[60%] h-auto md:w-[32%] flex-shrink-0 bg-white overflow-hidden transition"
            >
              {/* Image */}
              <div className="relative rounded-2xl w-full h-96">
                <Image
                  src={member.img}
                  alt={member.name}
                  width={400}
                  height={400}
                  className="object-cover w-full max-w-full rounded-2xl"
                />
                {/* Hover Social Icons */}
                {/* <div className="absolute inset-0 top-0 left-0 bottom-0 flex items-center justify-center space-x-3 bg-black/30 opacity-0 hover:opacity-100 transition h-full w-full">
                  <a
                    href={member.socials.fb}
                    className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-black hover:bg-gray-200"
                  >
                    <Facebook size={20} />
                  </a>
                  <a
                    href={member.socials.ig}
                    className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-black hover:bg-gray-200"
                  >
                    <Instagram size={20} />
                  </a>
                </div> */}
              </div>

              {/* Info */}
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{member.name}huhpuhuo</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
