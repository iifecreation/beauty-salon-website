import ChooseServices from '@/components/layouts/ChooseServices';
import HeroBanner from '@/components/layouts/HeroBanner';
import OurValues from '@/components/layouts/OurValues';
import TestimonialsSection from '@/components/TestimonialsSection';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

function Services() {
    const services = [
    {
      name: "Professional Makeup Application",
      price: "From $150",
      duration: "2 hours",
      category: "Makeup",
      description: "Professional makeup for special events, photoshoots, and occasions"
    },
    {
      name: "Bridal Makeup Package",
      price: "From $300",
      duration: "4 hours",
      category: "Bridal",
      description: "Complete bridal makeup including trial, wedding day application, and touch-ups"
    },
    {
      name: "Luxury Manicure",
      price: "$85",
      duration: "1.5 hours",
      category: "Nail Care",
      description: "Premium manicure with nail art, cuticle care, and long-lasting polish"
    },
    {
      name: "Spa Pedicure Experience",
      price: "$120",
      duration: "2 hours",
      category: "Foot Care",
      description: "Relaxing pedicure with foot massage, exfoliation, and nail care"
    },
    {
      name: "Eyelash Extensions",
      price: "$200",
      duration: "2.5 hours",
      category: "Lashes",
      description: "Professional eyelash extension application for natural or dramatic looks"
    },
    {
      name: "Nail Art Design",
      price: "$45",
      duration: "45 minutes",
      category: "Nail Art",
      description: "Custom nail art designs and creative nail decorations"
    }
  ];

  const packages = [
    {
      name: "Bridal Beauty Package",
      services: ["Bridal Makeup", "Manicure", "Pedicure", "Lash Extensions"],
      price: "$550",
      savings: "Save $150"
    },
    {
      name: "Glamour Session",
      services: ["Professional Makeup", "Nail Art", "Lash Touch-up"],
      price: "$280",
      savings: "Save $65"
    },
    {
      name: "Spa Day Experience",
      services: ["Luxury Manicure", "Spa Pedicure", "Relaxing Massage"],
      price: "$320",
      savings: "Save $80"
    }
  ];
  return (
    <div className='mx-auto max-w-[1440px] lg:px-16 py-7 px-4 sm:px-10'>

      <HeroBanner title='Our Services'/>

      {/* Services Grid */}
      <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-card border border-border rounded-[var(--radius)] p-6 group hover:shadow-lg transition-shadow">
                <div className="relative aspect-square rounded-[24px] overflow-hidden mb-5">
                  <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 396 399"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute inset-0 w-full h-full"
                      >
                      <defs>
                          <clipPath id="productCardClip">
                          <path d="M236 0C258.091 0 276 17.9086 276 40V80C276 102.091 293.909 120 316 120H356C378.091 120 396 137.909 396 160V359C396 381.091 378.091 399 356 399H40C17.9086 399 0 381.091 0 359V40C0 17.9086 17.9086 0 40 0H236Z" />
                          </clipPath>
                      </defs>

                      {/* Image inside clipPath */}
                      <foreignObject
                          width="396"
                          height="399"
                          clipPath="url(#productCardClip)"
                      >
                          <Image
                          src="https://images.squarespace-cdn.com/content/v1/632f77d9215661299a94de50/1711379231800-PXH3KAGW5MR3DMEAL1C0/IMG_2994.jpeg"
                          alt="worlds"
                          width={396}
                          height={399}
                          className="w-full h-full object-cover"
                          />
                      </foreignObject>
                  </svg>

                  {/* Arrow Icon (top-right corner) */}
                  <div className="absolute top-3 right-3 bg-background/80 rounded-full p-2">
                  <ArrowUpRight className="w-5 h-5 text-foreground" />
                  </div>
              </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground font-medium">{service.category}</span>
                    <span className="text-sm bg-accent px-2 py-1 rounded">{service.duration}</span>
                  </div>
                  <h3 className="text-xl font-medium text-foreground">{service.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-2xl font-light text-foreground">{service.price}</span>
                    <button className="bg-primary text-primary-foreground px-6 py-2 rounded-[var(--radius)] hover:opacity-90 transition-opacity">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </section>
      {/* Why Choose Our Services */}
      <ChooseServices />

      <TestimonialsSection />
    </div>
  )
}

export default Services
