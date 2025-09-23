"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, MoveUp, MoveDown } from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  service: string;
  location: string;
  review: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sofia Martinez",
    service: "Professional Makeup Course",
    location: "Mexico City, Mexico",
    review:
      "The makeup course completely transformed my career. The trainers were patient, detailed, and showed us the artistry behind every brush stroke.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 2,
    name: "James Wilson",
    service: "Pedicure & Nail Care Service",
    location: "Los Angeles, USA",
    review:
      "I’ve never felt so pampered! The pedicure session was relaxing and professional. My feet feel brand new.",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    id: 3,
    name: "Isabella Torres",
    service: "Nail Fixing Service",
    location: "Guadalajara, Mexico",
    review:
      "They fixed my broken nails so beautifully you can’t even tell there was damage. Excellent service with so much care.",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    id: 4,
    name: "Michael Brown",
    service: "Makeup Masterclass",
    location: "New York, USA",
    review:
      "The masterclass gave me confidence to start freelancing as a makeup artist. The academy is professional and inspiring.",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    id: 5,
    name: "Camila Hernandez",
    service: "Manicure Service",
    location: "Monterrey, Mexico",
    review:
      "My manicure was flawless. The attention to detail and hygiene practices made me feel safe and valued as a client.",
    image: "https://randomuser.me/api/portraits/women/19.jpg",
  },
  {
    id: 6,
    name: "David Johnson",
    service: "Nail Art Workshop",
    location: "Houston, USA",
    review:
      "I joined the nail art workshop and learned creative techniques that I now use in my salon. Worth every second!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 7,
    name: "Maria Gonzalez",
    service: "Pedicure Service",
    location: "Tijuana, Mexico",
    review:
      "Their pedicure is the most relaxing I’ve ever had. The staff is professional and welcoming every single time.",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
  },
  {
    id: 8,
    name: "Ethan Miller",
    service: "Professional Makeup Service",
    location: "Chicago, USA",
    review:
      "I booked them for an event and received countless compliments. Their artistry is top-notch and truly enhanced my look.",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
  },
  {
    id: 9,
    name: "Valeria Ramirez",
    service: "Nail Fixing & Manicure",
    location: "Puebla, Mexico",
    review:
      "The team fixed my nails and gave me a fresh manicure. The results were stunning, and I felt amazing.",
    image: "https://randomuser.me/api/portraits/women/42.jpg",
  },
  {
    id: 10,
    name: "Olivia Smith",
    service: "Advanced Makeup Course",
    location: "Miami, USA",
    review:
      "The advanced makeup course was challenging but rewarding. I feel fully prepared to take on clients confidently.",
    image: "https://randomuser.me/api/portraits/women/57.jpg",
  },
];

export default function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative w-full max-w-[1408px] mx-auto">
      <svg
        viewBox="0 0 701 293"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <clipPath id="testimonial-clip" clipPathUnits="userSpaceOnUse">
            <path d="M701 278C701 286.284 694.284 293 686 293H259.598C251.313 293 244.598 286.284 244.598 278V260C244.598 251.716 237.882 245 229.598 245H15C6.71573 245 0 238.284 0 230V15C0 6.71572 6.71573 0 15 0H686C694.284 0 701 6.71573 701 15V278Z" />
          </clipPath>

          {/* Gradient overlay definition */}
          <linearGradient id="testimonial-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="black" stopOpacity="0.7" />
            <stop offset="60%" stopColor="black" stopOpacity="0.3" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Slide image */}
        <AnimatePresence mode="wait">
          <motion.image
            key={testimonials[current].id}
            href={testimonials[current].image}
            width="701"
            height="293"
            clipPath="url(#testimonial-clip)"
            preserveAspectRatio="xMidYMid slice"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>

        {/* Gradient overlay */}
        <rect
          width="701"
          height="293"
          clipPath="url(#testimonial-clip)"
          fill="url(#testimonial-gradient)"
        />
      </svg>

      {/* Review text */}
      <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 max-w-sm md:max-w-md text-white z-20 px-2">
        <p className="text-sm md:text-lg lg:text-2xl leading-relaxed drop-shadow-md">
          "{testimonials[current].review}"
        </p>
      </div>

      {/* Name + Service + Location */}
      <div className="absolute bottom-0 left-0 z-30 flex flex-col-reverse">
        <h3 className="text-sm md:text-lg lg:text-xl font-semibold text-gray-500">
          {testimonials[current].service} • {testimonials[current].location}
        </h3>
        <p className="text-lg md:text-2xl lg:text-4xl font-bold text-warm-brown-800">
          {testimonials[current].name}
        </p>
      </div>

      {/* Controls */}
      <div className="absolute bg-gray-50/40 border border-white justify-between h-10/12 right-2 md:right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40 rounded-full py-3 px-2">
        <button
          onClick={prevSlide}
          className="p-0 rounded-full transition"
        >
          <MoveUp className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="p-0 rounded-full transition"
        >
          <MoveDown className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
