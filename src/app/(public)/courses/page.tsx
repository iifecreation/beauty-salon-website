import AwardsSection from '@/components/AwardsSection';
import Gallery from '@/components/Gallery';
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
    <div className="bg-background min-h-screen">
      <div className="pt-[45px]">
        
        <main className="px-[70px] max-md:px-5 mt-20">
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
          <section className="text-center mb-20">
            <h2 className="text-[48px] font-light leading-tight tracking-[-2.4px] text-foreground mb-8">
              Why Choose Laluna Academy?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary rounded-full mx-auto flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-foreground">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-foreground">Expert Instructors</h3>
                <p className="text-muted-foreground">Learn from industry professionals with years of experience</p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary rounded-full mx-auto flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-foreground">
                    <path d="M14 9V5a3 3 0 0 0-6 0v4"/>
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                    <circle cx="12" cy="16" r="1"/>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-foreground">Certification</h3>
                <p className="text-muted-foreground">Get industry-recognized certifications upon completion</p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary rounded-full mx-auto flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-foreground">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-foreground">Career Support</h3>
                <p className="text-muted-foreground">Get job placement assistance and career guidance</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Courses;