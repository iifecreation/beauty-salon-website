import React from 'react';

const SkincareInfoSection = () => {
  return (
    <section className="mt-[90px] max-md:mt-16">
      <h2 className="text-foreground text-[64px] font-light leading-tight tracking-[-3.2px] mb-8 max-md:text-[40px]">
        Professional Techniques &<br />
        Beauty Mastery
      </h2>
      
      <div className="flex gap-8 max-md:flex-col">
        <div className="flex-1">
          <div className="flex gap-6 mb-12 max-md:flex-col">
            {/* Small Rectangle */}
            <div className="w-64 max-md:w-full">
              <div className="bg-secondary h-60 rounded-[var(--radius)] max-md:h-40"></div>
            </div>
            
            {/* Content Next to Rectangle */}
            <div className="flex-1">
              <p className="text-muted-foreground text-base font-light tracking-[-0.8px] leading-relaxed mb-6">
                Master advanced beauty techniques through our comprehensive training programs. 
                Learn makeup artistry, nail art, eyelash extensions, and professional treatments from 
                industry experts with years of experience in the beauty field.
                <br />
                <br />
                Our curriculum combines theoretical knowledge with practical application, 
                ensuring you graduate with confidence and the skills needed to succeed 
                in your chosen beauty specialization.
              </p>
              <button className="flex items-center gap-3 text-lg text-foreground font-medium tracking-[-0.9px] hover:opacity-80 transition-opacity">
                <div className="w-3 h-3 bg-foreground rounded-sm"></div>
                <span>Learn More</span>
              </button>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="flex items-center gap-6 mb-4 max-md:flex-col max-md:items-start max-md:gap-3">
            <h3 className="text-lg text-foreground font-normal tracking-[-0.9px] leading-relaxed flex-1">
              What makes our beauty training programs different from others?
            </h3>
            <div className="w-60 h-px bg-border max-md:w-full"></div>
          </div>
          
          <p className="text-muted-foreground text-base font-light tracking-[-0.8px] leading-relaxed">
            Our programs focus on both artistic creativity and professional standards. We provide 
            hands-on training with industry-grade tools and products, personalized instruction from 
            certified professionals, and ongoing career support to help you build a successful beauty business.
          </p>
        </div>
        
        {/* Large Shape */}
        <div className="w-[400px] max-md:w-full max-md:mt-8">
          <div className="bg-secondary w-full h-96 rounded-tl-[200px] rounded-[var(--radius)] max-md:h-64"></div>
        </div>
      </div>
    </section>
  );
};

export default SkincareInfoSection;
