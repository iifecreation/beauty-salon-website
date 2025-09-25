import ChooseServices from '@/components/layouts/ChooseServices';
import HeroBanner from '@/components/layouts/HeroBanner';
import OurValues from '@/components/layouts/OurValues';
import TestimonialsSection from '@/components/TestimonialsSection';
import { services } from '@/contant/services';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

function Services() {
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

      <HeroBanner/>

      {/* Services Grid */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-card border border-border rounded-[var(--radius)] p-6 group hover:shadow-lg transition-shadow">
              <div className="relative aspect-square rounded-[24px] overflow-hidden mb-5">
                <Image
                src="https://images.squarespace-cdn.com/content/v1/632f77d9215661299a94de50/1711379231800-PXH3KAGW5MR3DMEAL1C0/IMG_2994.jpeg"
                alt="worlds"
                width={396}
                height={399}
                className="w-full h-full object-cover"
                />
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
