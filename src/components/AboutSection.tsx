import React from 'react';

const AboutHomeSection = () => {
  return (
    <section className="mt-[90px] pb-12 sm:pb-20 md:mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-12 md:gap-8 lg:gap-16">
        {/* Left Column - Skincare Info */}
        <div className="w-full md:w-1/4 order-1 md:order-1">
          <div className="h-40 rounded-[var(--radius)] mb-6 rounded-tr-[100px] bg-no-repeat bg-cover bg-center" style={{backgroundImage: "url('/images/img1.jpg')"}}></div>
          <h3 className="text-foreground text-[22px] md:text-[28px] font-normal leading-tight tracking-[-1.1px] md:tracking-[-1.4px] mb-6">
            Beauty Education with
            <br />
            Love & Excellence
          </h3>
          <p className="text-muted-foreground text-sm md:text-base font-light leading-relaxed mb-6">
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
                <span className="text-muted-foreground text-xs md:text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center Column - Large Circle */}
        <div className="w-full md:w-1/3 order-2 md:order-2 flex justify-center items-center mb-8 md:mb-0">
          <div className="bg-no-repeat bg-cover bg-center w-full h-[500px] md:w-80 md:h-[431px] rounded-se-full rounded-ss-full rounded-b-lg" style={{backgroundImage: "url('/images/pexels-karolina-grabowska-6954840.jpg')"}}></div>
        </div>

        {/* Right Column - Main Content */}
        <div className="w-full flex-1 order-3 md:order-3">
          <h2 className="text-foreground text-[32px] sm:text-[40px] md:text-[64px] leading-tight font-light tracking-[-1.6px] md:tracking-[-3.2px] text-left md:text-right">
            Your Beauty Career
            <br />
            Starts Here
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base tracking-[-0.4px] md:tracking-[-0.8px] mt-6 leading-relaxed text-left md:text-right">
            Join thousands of successful beauty professionals who started their journey with us. 
            Our comprehensive programs in makeup artistry, nail care, eyelash extensions, and beauty treatments 
            provide you with the skills and certification needed to excel in the beauty industry.
            <br />
            <br />
            From beginner-friendly courses to advanced specialization programs, we offer flexible 
            learning options that fit your schedule. Get hands-on experience, build your portfolio, 
            and launch your dream career in beauty.
          </p>
          <button className="mt-8 md:mt-12 md:py-4 transition-opacity w-full md:w-auto bg-test-brown-800 hover:bg-test-brown-800/80 px-7 py-6 rounded-full text-white">
            Start Learning
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutHomeSection;
