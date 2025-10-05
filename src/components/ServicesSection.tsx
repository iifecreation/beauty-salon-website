"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

const ServicesSection = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services?limit=3')
      .then(res => res.json())
      .then(data => setServices(data))
      .finally(() => setLoading(false));
  }, []);

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
        {loading ? (
          <div className="col-span-3 flex justify-center items-center h-40 text-lg text-muted-foreground">Loading...</div>
        ) : services.length === 0 ? (
          <div className="col-span-3 text-center text-muted-foreground">No services found.</div>
        ) : (
          services.map((service, index) => (
            <div key={service._id || index} className="bg-card border border-border rounded-[var(--radius)] p-6 group hover:shadow-lg transition-shadow">
              <div className="relative aspect-square rounded-[24px] overflow-hidden mb-5">
                <Image
                  src={service.image || "https://images.squarespace-cdn.com/content/v1/632f77d9215661299a94de50/1711379231800-PXH3KAGW5MR3DMEAL1C0/IMG_2994.jpeg"}
                  alt={service.name}
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
                  <span className="text-2xl font-light text-foreground">{typeof service.price === 'number' ? `$${service.price}` : service.price}</span>
                  <Link href={`/courses/${service._id}`} className="bg-warm-brown-800 text-primary-foreground px-6 py-3 h-auto hover:opacity-90 transition-opacity hover:bg-warm-brown-800/80 rounded-full">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className='flex items-center justify-center'>
        <Button className='text-center bg-warm-brown-800 py-6 hover:bg-warm-brown-800/80 px-7 rounded-full'>See More</Button>
      </div>
    </section>
  );
};

export default ServicesSection;
