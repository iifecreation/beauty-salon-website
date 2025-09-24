import React from 'react';
import ProductCard from './ProductCard';
import { courses } from '@/contant/courses';
import Image from 'next/image';

const ProductsSection = () => {
  const products = [
    { name: "Body Butter Care", price: "$20" },
    { name: "Jar Cream Care", price: "$20" },
    { name: "Skincare Tube", price: "$20" },
    { name: "Body Cream Care", price: "$20" },
    { name: "Moisturizer", price: "$20" },
    { name: "Body Perfume", price: "$20" },
  ];

  const productImage = "https://api.builder.io/api/v1/image/assets/fe5d4daf3ac346319170d3171e4e7ace/da20c2afc8ea1d8beddaea90bcb22655a06949a0?placeholderIfAbsent=true";

  return (
    <section className="bg-secondary w-full mt-[90px] px-[70px] py-[90px] max-md:mt-16 max-md:px-5 max-md:py-16">
      {/* Header */}
      <div className="flex gap-12 mb-16 max-md:flex-col max-md:gap-8 max-md:mb-12">
        <div className="flex-1">
          <h2 className="text-foreground text-[64px] font-light leading-tight tracking-[-3.2px] max-md:text-[40px]">
            Discover Your Perfect
            <br />
            Skincare Routine
          </h2>
        </div>
        <div className="flex-1 flex items-end max-md:items-start">
          <p className="text-muted-foreground text-base font-light tracking-[-0.8px] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus
            mus.
          </p>
        </div>
      </div>
      
      {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
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
        </div>
    </section>
  );
};

export default ProductsSection;
