import React from 'react'

function HeroSection() {
  return (
    <section className="relative w-full bg-white pt-8 pb-16 flex flex-col items-center mx-auto max-w-[1440px] lg:px-16 px-4 sm:px-10">

      <div className="relative w-full h-[85vh] overflow-hidden mb-12 rounded-4xl">
      {/* Background Image */}
      <img
        src="/images/bg2.webp"
        alt="background"
        className="w-full h-full object-cover"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-center px-8 md:px-16">
        <div className="text-white max-w-xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-normal mb-4 font-sentient">
            Enhance Your Beauty,
          </h1>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-light italic mb-4 font-sentient text-[#fff9]">
            Shine Confidently
          </h1>
          <p className="text-md sm:text-lg md:text-xl leading-relaxed text-[#fff9]">
            Professional makeup, pedicure, manicure, and nail fixing services designed to help you look and feel your best. Our experts bring artistry and care together for a stunning finish.
          </p>
        </div>
      </div>
    </div>

  {/* Counters */}
  <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
    <div className="flex flex-col items-center border rounded-lg p-6">
      <span className="text-2xl font-semibold">50K+</span>
      <p className="text-sm text-gray-600 mt-1">Happy Clients</p>
    </div>
    <div className="flex flex-col items-center border rounded-lg p-6">
      <span className="text-2xl font-semibold">50K+</span>
      <p className="text-sm text-gray-600 mt-1">Happy Clients</p>
    </div>
    <div className="flex flex-col items-center border rounded-lg p-6">
      <span className="text-2xl font-semibold">100%</span>
      <p className="text-sm text-gray-600 mt-1">Premium Products</p>
    </div>
    <div className="flex flex-col items-center border rounded-lg p-6">
      <span className="text-2xl font-semibold">10+</span>
      <p className="text-sm text-gray-600 mt-1">Years Experience</p>
    </div>
  </div>

  {/* Search + Discover Button */}
  <div className="mt-10 flex w-full max-w-2xl">
    <input
      type="text"
      placeholder="Search for makeup, nail care, pedicure..."
      className="flex-1 border rounded-l-full px-4 py-3 text-sm text-gray-700 focus:outline-none"
    />
    <button className="px-6 py-3 bg-black text-white rounded-r-full text-sm font-medium hover:bg-gray-900">
      Discover All
    </button>
  </div>
</section>

  )
}

export default HeroSection
