import React from 'react';
import TestimonialsSlider from './TestimonialsSlider';
import { cn } from '@/lib/utils';

interface TestimonialsSectionProps {
  className?: string;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ className }) => {
  return (
    <section
      className={cn(
        "py-20",
        className
      )}
    >
      <div className='mb-12'>
        <h2 className="text-[32px] md:text-[48px] font-instrument text-warm-brown-700 font-medium text-center ">
          Testimonials
        </h2>
        <p className='text-center'>Success Stories from Our Students and Clients</p>
      </div>

      <TestimonialsSlider />
    </section>
  );
};

export default TestimonialsSection;
