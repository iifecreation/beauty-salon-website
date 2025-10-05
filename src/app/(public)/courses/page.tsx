"use client"; 

import Gallery from '@/components/Gallery';
import Award from '@/components/layouts/Award';
import ChooseAcademy from '@/components/layouts/ChooseAcademy';
import { awardsData } from '@/contant/award';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Courses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const awardees = awardsData[3].awards;
  
  const images = [
    "/images/22/IMG-20250919-WA0028.jpg",
    "/images/22/IMG-20250919-WA0029.jpg",
    "/images/22/IMG-20250919-WA0030.jpg",
    "/images/22/IMG-20250919-WA0031.jpg",
    "/images/22/IMG-20250919-WA0032.jpg",
    "/images/22/IMG-20250919-WA0033.jpg",
    "/images/22/IMG-20250919-WA0034.jpg",
    "/images/22/IMG-20250919-WA0035.jpg",
    "/images/22/IMG-20250919-WA0036.jpg",
  ];

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => {setCourses(data); console.log(data);})
      .finally(() => setLoading(false));

      
      
  }, []);

  return (
    <div className="mx-auto max-w-[1440px]">
      <div className="pt-[45px]">
        {/* Hero Section */}
        <section className="text-center mb-16 mx-auto lg:px-16 py-7 px-4 sm:px-10">
          <h1 className="text-[64px] font-sentient font-light leading-tight tracking-[-3.2px] text-foreground mb-6 max-md:text-[40px]">
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
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 mx-auto lg:px-16 py-7 px-4 sm:px-10">
          {loading ? (
            <div className="col-span-3 flex justify-center items-center h-40 text-lg text-muted-foreground">Loading...</div>
          ) : courses.length === 0 ? (
            <div className="col-span-3 text-center text-muted-foreground">No courses found.</div>
          ) : (
            courses.map((course, index) => (
              <div
                key={course._id || index}
                className="bg-card border border-border rounded-[var(--radius)] p-6 group hover:shadow-lg transition-shadow block"
              >
                <div className="relative aspect-square rounded-[24px] overflow-hidden mb-5">
                  <Image
                    src={course.image || "https://images.squarespace-cdn.com/content/v1/632f77d9215661299a94de50/1711379231800-PXH3KAGW5MR3DMEAL1C0/IMG_2994.jpeg"}
                    alt={course.title}
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
                  <h3 className="text-xl font-medium text-foreground">{course.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{course.description}</p>
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-2xl font-light text-foreground">{typeof course.price === 'number' ? `$${course.price}` : course.price}</span>
                    <Link 
                      href={`/courses/${course._id}`}
                      scroll={false}
                      className="bg-warm-brown-800 text-primary-foreground px-6 py-3 h-auto hover:opacity-90 transition-opacity hover:bg-warm-brown-800/80 rounded-full">
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>

        {/* Awards Section */}
        <section className="">
          <h2 className="text-[48px] font-light leading-tight tracking-[-2.4px] text-foreground text-center max-md:text-[32px] font-sentient">
            Awards & Recognition
          </h2>
          <p className="max-w-2xl mx-auto text-center text-lg text-muted-foreground mb-10">
            We are proud to celebrate our students&apos; achievements. These awards recognize the hard work, talent, and dedication of those who have excelled in our training programs.
          </p>

          <div className="space-y-10">
            <Award
              year="2025"
              className=""
              direction="left"
              awards={awardees}
            />
          </div>
        </section>

        {/* Why Choose Us */}
        <div className='mx-auto lg:px-16 px-4 sm:px-10'>
          <ChooseAcademy />
        </div>

        <Gallery images={images} title='Meet Our Students' />

      </div>
    </div>
  );
};

export default Courses;