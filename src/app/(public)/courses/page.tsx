import AwardsSection from '@/components/AwardsSection';
import Gallery from '@/components/Gallery';
import ChooseAcademy from '@/components/layouts/ChooseAcademy';
import HeroBannerTwo from '@/components/layouts/HeroBannerTwo';
import { courses } from '@/contant/courses';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Courses = () => {

  const images = [
    "https://images.squarespace-cdn.com/content/v1/632f77d9215661299a94de50/1711379231800-PXH3KAGW5MR3DMEAL1C0/IMG_2994.jpeg",
    "https://images.squarespace-cdn.com/content/v1/632f77d9215661299a94de50/1711379231800-PXH3KAGW5MR3DMEAL1C0/IMG_2994.jpeg",
    "https://images.squarespace-cdn.com/content/v1/632f77d9215661299a94de50/1711379231800-PXH3KAGW5MR3DMEAL1C0/IMG_2994.jpeg",
    "https://images.squarespace-cdn.com/content/v1/632f77d9215661299a94de50/1711379231800-PXH3KAGW5MR3DMEAL1C0/IMG_2994.jpeg",
    "https://images.squarespace-cdn.com/content/v1/632f77d9215661299a94de50/1711379231800-PXH3KAGW5MR3DMEAL1C0/IMG_2994.jpeg",
    "https://images.squarespace-cdn.com/content/v1/632f77d9215661299a94de50/1711379231800-PXH3KAGW5MR3DMEAL1C0/IMG_2994.jpeg",
    "https://images.squarespace-cdn.com/content/v1/632f77d9215661299a94de50/1711379231800-PXH3KAGW5MR3DMEAL1C0/IMG_2994.jpeg",
  ]

  return (
    <div className="mx-auto max-w-[1440px]">
      <div className="pt-[45px]">
        <main className="mx-auto lg:px-16 py-7 px-4 sm:px-10">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-[64px] font-light leading-tight tracking-[-3.2px] text-foreground mb-6 max-md:text-[40px]">
              Professional Beauty
              <br />
              Courses & Certification
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Transform your passion into a professional career with our comprehensive beauty training programs. 
              Learn from industry experts and get certified in your chosen specialty.
            </p>
          </section>

           {/* Courses Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {courses.map((course, index) => (
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
                    <span className="text-sm text-muted-foreground font-medium">{course.duration}</span>
                    <span className="text-sm bg-accent px-2 py-1 rounded">{course.level}</span>
                  </div>
                  <h3 className="text-xl font-medium text-foreground">{course.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{course.description}</p>
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-2xl font-light text-foreground">{course.price}</span>
                    <button className="bg-primary text-primary-foreground px-6 py-2 rounded-[var(--radius)] hover:opacity-90 transition-opacity">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Awards Section */}
          {/* <AwardsSection /> */}

          {/* Why Choose Us */}
          <ChooseAcademy />
        </main>

        <Gallery images={images} />

      </div>
    </div>
  );
};

export default Courses;