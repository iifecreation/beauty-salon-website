import React from 'react'

function HeroSection() {
  return (
    <section className="relative w-full bg-white px-8 py-16 flex flex-col items-center">
  {/* Headline */}
  <h1 className="text-5xl md:text-6xl font-light leading-tight text-center">
    Enhance Your Beauty, <br />
    <span className="font-normal">Shine Confidently</span>
  </h1>

  {/* Decorative Sparkle + Illustration Placeholder */}
  <div className="flex flex-col md:flex-row items-center justify-center mt-10 w-full max-w-7xl gap-8">
    <div className="w-full md:w-2/3 h-64 bg-gray-200 rounded-3xl"></div>
    <div className="w-full md:w-1/3 h-64 bg-gray-200 rounded-3xl"></div>
  </div>

  {/* Supporting Text */}
  <p className="mt-6 text-gray-500 max-w-3xl text-center">
    Professional makeup, pedicure, manicure, and nail fixing services designed
    to help you look and feel your best. Our experts bring artistry and care
    together for a stunning finish.
  </p>

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
