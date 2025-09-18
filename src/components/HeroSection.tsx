import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] mt-[90px] max-md:mt-10 overflow-hidden">
      {/* Organic background shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-secondary rounded-[100px_0_0_100px] max-md:w-[250px] max-md:h-[200px]" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[250px] bg-secondary rounded-[0_100px_100px_0] max-md:w-[200px] max-md:h-[150px]" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[150px] bg-white border border-border rounded-[50px] opacity-80 max-md:w-[150px] max-md:h-[100px]" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full pt-[60px] max-md:pt-8">
        <div className="text-foreground text-[88px] leading-[88px] font-light tracking-[-4.4px] max-md:text-[40px] max-md:leading-[45px]">
          Master Beauty Arts,
          <br />
          <span className="ml-8">— Build Your Career</span>
        </div>
        
        <div className="mt-auto pb-[60px] max-md:pb-8 max-md:mt-20">
          <p className="text-muted-foreground text-base tracking-[-0.8px] max-w-[500px] leading-relaxed">
            Transform your passion for beauty into a thriving career. Learn makeup artistry, 
            nail care, eyelash extensions, and advanced beauty techniques from certified professionals. 
            Start your journey with Laluna Academy today.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
