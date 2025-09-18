import React, { useState, useEffect } from 'react';

const TestimonialsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const testimonials = [
    {
      name: "Sarah Johnson",
      course: "Professional Makeup Artistry",
      rating: 5,
      image: "student-1",
      text: "The makeup artistry course at Laluna Academy completely transformed my career. I went from a complete beginner to landing my dream job as a makeup artist for a major beauty brand.",
      location: "New York, NY"
    },
    {
      name: "Maria Rodriguez", 
      course: "Nail Art & Design Mastery",
      rating: 5,
      image: "student-2",
      text: "I never thought I could turn my love for nail art into a thriving business. The instructors at Laluna gave me the skills and confidence to open my own nail salon.",
      location: "Los Angeles, CA"
    },
    {
      name: "Amanda Chen",
      course: "Eyelash Extension Certification", 
      rating: 5,
      image: "student-3",
      text: "The hands-on training was incredible. I felt prepared to work with real clients from day one. Now I have my own lash studio and couldn't be happier!",
      location: "Miami, FL"
    },
    {
      name: "Jessica Williams",
      course: "Bridal Makeup Specialist",
      rating: 5, 
      image: "student-4",
      text: "Specializing in bridal makeup has been the best decision for my career. The course taught me everything from color theory to working with nervous brides.",
      location: "Chicago, IL"
    },
    {
      name: "Emily Davis",
      course: "Advanced Pedicure Techniques",
      rating: 5,
      image: "student-5", 
      text: "The pedicure course was so comprehensive. I learned not just techniques but also how to provide an amazing customer experience. My clients love coming back!",
      location: "Seattle, WA"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-secondary rounded-[var(--radius)] p-12 mb-20">
      <h2 className="text-[48px] font-light leading-tight tracking-[-2.4px] text-foreground mb-12 text-center">
        Success Stories from Our Students
      </h2>
      
      <div className="relative max-w-4xl mx-auto">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <div className="bg-background rounded-[var(--radius)] p-8 mx-4">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-foreground font-medium text-xl">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground text-lg">{testimonial.name}</h4>
                      <p className="text-muted-foreground text-sm">{testimonial.course}</p>
                      <p className="text-muted-foreground text-xs">{testimonial.location}</p>
                    </div>
                    <div className="flex gap-1">
                      {Array(testimonial.rating).fill(0).map((_, i) => (
                        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-center italic">
                    "{testimonial.text}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button 
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-background border border-border rounded-full p-3 hover:bg-accent transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-background border border-border rounded-full p-3 hover:bg-accent transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index ? 'bg-primary' : 'bg-border'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;