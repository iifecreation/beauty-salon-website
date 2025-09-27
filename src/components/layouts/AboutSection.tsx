import React from 'react';

const AboutSection = () => {
  return (
    <section className="relative w-full bg-gray-50 px-8 py-16 flex flex-col md:flex-row items-center md:justify-between gap-12">
  {/* Left: Image Placeholder */}
  <div className="w-full md:w-1/2 flex justify-center">
    <div className="bg-gray-200 rounded-[40px] bg-no-repeat bg-cover bg-center w-full h-[500px] md:w-80 md:h-[431px] rounded-se-full rounded-ss-full rounded-b-lg" style={{backgroundImage: "url('/images/pexels-shvetsa-5069432.jpg')"}}></div>
  </div>

  {/* Right: Content */}
  <div className="w-full md:w-1/2 flex flex-col items-start">
    <h2 className="text-4xl md:text-5xl font-light leading-tight">
      Your Beauty Deserves <br />
      <span className="font-medium">the Best</span>
    </h2>

    <p className="mt-6 text-gray-600 text-base leading-relaxed max-w-lg">
      At <span className="font-semibold">Beauty Best</span>, we specialize in makeup artistry, pedicure,
      manicure, and nail fixing. Whether you’re preparing for a big day or just
      treating yourself, our professional beauty experts are here to give you
      the flawless look you deserve.
    </p>

    {/* Checklist */}
    <ul className="mt-6 space-y-3 text-gray-700">
      <li className="flex items-center space-x-2">
        <span className="w-4 h-4 bg-black rounded-full"></span>
        <span>Luxury makeup application & training</span>
      </li>
      <li className="flex items-center space-x-2">
        <span className="w-4 h-4 bg-black rounded-full"></span>
        <span>Pedicure & manicure with top-grade care</span>
      </li>
      <li className="flex items-center space-x-2">
        <span className="w-4 h-4 bg-black rounded-full"></span>
        <span>Creative & durable nail fixing</span>
      </li>
    </ul>

    {/* CTA Button */}
    <button className="mt-8 px-8 py-3 bg-black text-white rounded-full shadow hover:bg-gray-900 transition">
      Get Started
    </button>
  </div>
</section>

  );
};

export default AboutSection;
