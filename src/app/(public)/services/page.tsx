"use client";

import ChooseServices from '@/components/layouts/ChooseServices';
import HeroBanner from '@/components/layouts/HeroBanner';
import TestimonialsSection from '@/components/TestimonialsSection';
// import { services } from '@/contant/services';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Gallery from '@/components/Gallery';

function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const images = [
    "/images/pexels-rdne-7755224.jpg",
    "/images/pexels-polina-tankilevitch-3738375.jpg",
    "/images/pexels-olly-3757942.jpg",
    "/images/pexels-koolshooters-6628700.jpg",
    "/images/pexels-karolina-grabowska-6954840.jpg",
    "/images/pexels-kampus-8834060.jpg",
    "/images/pexels-enginakyurt-3065170.jpg",
    "/images/pexels-cottonbro-7582560.jpg",
    "/images/pexels-cottonbro-3997390.jpg",
    "/images/pexels-cottonbro-3997383.jpg",
    "/images/img3.jpg",
    "/images/img2.jpg",
    "/images/pexels-cottonbro-3993443.jpg",
  ];

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className=''>

      <HeroBanner/>

      {/* Services Grid */}
      <section className="mb-20 mx-auto max-w-[1440px] lg:px-16 py-7 px-4 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    <Link
                      href={`/services/${service._id}`}
                      scroll={false}
                      className="bg-warm-brown-800 text-primary-foreground px-6 py-3 h-auto hover:opacity-90 transition-opacity hover:bg-warm-brown-800/80 rounded-full"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      {/* Why Choose Our Services */}
      <ChooseServices />

      <TestimonialsSection />

      <Gallery title='Our Gallery' images={images}  />
    </div>
  )
}

export default Services
