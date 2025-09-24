import React from 'react';
import ProductCard from './ProductCard';
import { courses } from '@/contant/courses';
import Image from 'next/image';
import { services } from '@/contant/services';

const ServicesSection = () => {
  const products = [
    { name: "Body Butter Care", price: "$20" },
    { name: "Jar Cream Care", price: "$20" },
    { name: "Skincare Tube", price: "$20" },
    { name: "Body Cream Care", price: "$20" },
    { name: "Moisturizer", price: "$20" },
    { name: "Body Perfume", price: "$20" },
  ];


  return (
    <section className="w-full mt-[90px] px-[70px] py-[90px] max-md:mt-16 max-md:px-5 max-md:py-16">
      {/* Header */}
      <div className="flex flex-col justify-center items-center gap-4 mb-16 max-md:flex-col max-md:gap-8 max-md:mb-12">
        <div className="flex-1">
          <h2 className="text-foreground text-center text-[64px] font-light leading-tight tracking-[-3.2px] max-md:text-[40px]">
            Beauty Services Tailored <br /> Just for You
          </h2>
        </div>
        <div className="flex-1 flex items-end max-md:items-start max-w-2xl">
          <p className="text-muted-foreground text-base font-light tracking-[-0.8px] leading-relaxed text-center">
            Indulge in a range of premium beauty treatments – from professional makeup and relaxing facials, to flawless manicures, pedicures, and stunning hairstyles. Our expert team is here to help you look and feel your best every day.
          </p>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
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
  );
};

export default ServicesSection;
