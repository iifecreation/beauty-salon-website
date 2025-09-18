import React from 'react';

const AboutSection = () => {
  return (
    <section className="mt-[90px] max-md:mt-16">
      <div className="flex gap-8 max-md:flex-col max-md:gap-12">
        {/* Left Column - Skincare Info */}
        <div className="w-1/4 max-md:w-full max-md:order-2">
          <div className="bg-secondary h-40 rounded-[var(--radius)] mb-6 rounded-tr-[100px]"></div>
          <h3 className="text-foreground text-[28px] font-normal leading-tight tracking-[-1.4px] mb-6">
            Beauty Education with
            <br />
            Love & Excellence
          </h3>
          <p className="text-muted-foreground text-sm font-light leading-relaxed mb-6">
            Learn from certified professionals and master the latest beauty techniques 
            in makeup artistry, nail care, and advanced beauty treatments.
          </p>
          <div className="space-y-2">
            {[
              'Industry-certified instructors',
              'Hands-on practical training', 
              'Job placement assistance'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-3 h-2 bg-foreground rounded-sm flex-shrink-0"></div>
                <span className="text-muted-foreground text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center Column - Large Circle */}
        <div className="w-1/3 max-md:w-full max-md:order-1 flex justify-center">
          <div className="bg-secondary w-80 h-80 rounded-full max-md:w-64 max-md:h-64"></div>
        </div>

        {/* Right Column - Main Content */}
        <div className="flex-1 max-md:w-full max-md:order-3">
          <h2 className="text-foreground text-[64px] leading-tight font-light tracking-[-3.2px] text-right max-md:text-[40px] max-md:text-left">
            Your Beauty Career
            <br />
            Starts Here
          </h2>
          <p className="text-muted-foreground text-base tracking-[-0.8px] mt-6 leading-relaxed max-md:text-left">
            Join thousands of successful beauty professionals who started their journey with us. 
            Our comprehensive programs in makeup artistry, nail care, eyelash extensions, and beauty treatments 
            provide you with the skills and certification needed to excel in the beauty industry.
            <br />
            <br />
            From beginner-friendly courses to advanced specialization programs, we offer flexible 
            learning options that fit your schedule. Get hands-on experience, build your portfolio, 
            and launch your dream career in beauty.
          </p>
          <button className="bg-primary text-primary-foreground text-2xl font-medium tracking-[-1.2px] mt-12 px-12 py-4 rounded-[var(--radius)] hover:opacity-90 transition-opacity max-md:mt-8">
            Start Learning
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
