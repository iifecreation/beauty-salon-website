import React from 'react';
import Award from './layouts/Award';
import { awardsData } from '@/contant/award';

const AwardsSection = () => {
  const awardees = awardsData[3].awards;

  return (
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
  );
};

export default AwardsSection;