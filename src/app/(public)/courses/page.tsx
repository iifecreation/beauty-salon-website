import AwardsSection from '@/components/AwardsSection';
import Gallery from '@/components/Gallery';
import ChooseAcademy from '@/components/layouts/ChooseAcademy';
import HeroBannerTwo from '@/components/layouts/HeroBannerTwo';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Courses = () => {
  const courses = [
    {
      name: "Professional Makeup Artistry",
      duration: "12 weeks",
      price: "$1,299",
      level: "Beginner to Advanced",
      description: "Master the art of professional makeup application, from basic techniques to advanced editorial looks."
    },
    {
      name: "Nail Art & Design Mastery",
      duration: "8 weeks",
      price: "$899",
      level: "All Levels",
      description: "Learn professional nail art techniques, gel application, and creative design concepts."
    },
    {
      name: "Eyelash Extension Certification",
      duration: "6 weeks",
      price: "$799",
      level: "Beginner",
      description: "Get certified in professional eyelash extension application with hands-on training."
    },
    {
      name: "Advanced Pedicure Techniques",
      duration: "4 weeks",
      price: "$599",
      level: "Intermediate",
      description: "Master advanced pedicure techniques and foot care treatments for professionals."
    },
    {
      name: "Bridal Makeup Specialist",
      duration: "10 weeks",
      price: "$1,099",
      level: "Intermediate",
      description: "Specialize in bridal makeup artistry with portfolio development and client management."
    },
    {
      name: "Nail Health & Repair",
      duration: "6 weeks",
      price: "$699",
      level: "All Levels",
      description: "Learn nail health assessment, repair techniques, and treatment protocols."
    }
  ];

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
    <div className="mx-auto max-w-[1440px] lg:px-16 py-7 px-4 sm:px-10">
      <div className="pt-[45px]">
        <HeroBannerTwo title='Our Services'/>
        <main className="mt-20">
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
          <AwardsSection />

          <Gallery images={images} />

          {/* Why Choose Us */}
          <ChooseAcademy />
        </main>
      </div>
    </div>
  );
};

export default Courses;