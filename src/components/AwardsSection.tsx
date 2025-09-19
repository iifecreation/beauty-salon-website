import React from 'react';
import AwardSlider from './AwardSlider';

const AwardsSection = () => {

  return (
    <section className="mb-20 pt-20 pb-10">
      <h2 className="text-[48px] font-light leading-tight tracking-[-2.4px] text-foreground mb-12 text-center max-md:text-[32px]">
        Awards & Recognition
      </h2>
      
      <div className="relati overflow-hidden">
        <AwardSlider />
      </div>
    </section>
  );
};

export default AwardsSection;