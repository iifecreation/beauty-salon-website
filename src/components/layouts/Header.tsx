"use client";

import React from 'react'
import { usePathname } from 'next/navigation';

function CartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);
  
  // If SSR, fallback to empty string
  // If using next/navigation in app router, you can use: const pathname = usePathname();
  // Uncomment below if you want to use next/navigation (recommended for app router):
  // const pathname = usePathname();
  return (
    <header className="w-full h-auto flex items-center justify-between px-4 md:px-8 py-4 bg-white shadow-sm relative">
      {/* Logo */}
      <div className="flex items-center space-x-2 z-20">
        <div className="w-6 h-6 border border-black rounded-full"></div>
        <span className="text-xl font-semibold">Laluna</span>
      </div>

      {/* Hamburger Icon for Mobile */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 z-20"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className={`block w-6 h-0.5 bg-black mb-1 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-black mb-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
      </button>

      {/* Navigation Menu */}
      <nav
        className={`flex-col md:flex-row flex md:flex items-center md:space-x-8 text-gray-700 bg-white md:bg-transparent fixed md:static top-0 right-0 w-2/3 max-w-xs md:w-auto shadow-lg md:shadow-none transition-transform duration-300 z-10
        ${menuOpen ? 'flex translate-x-0 h-full' : 'hidden md:flex translate-x-full md:translate-x-0 md:h-auto'}`}
        style={menuOpen ? { minHeight: '100vh', paddingTop: '5rem' } : {}}
      >
        <a
          href="/"
          className={`relative px-3 py-1 text-sm mb-4 md:mb-0 md:mr-0 ${pathname === '/' ? 'rounded-full border border-black font-medium' : 'hover:text-black'}`}
        >
          Home
        </a>
        <a
          href="/products"
          className={`text-sm px-3 mb-4 md:mb-0 ${pathname === '/products' ? 'rounded-full border border-black font-medium' : 'hover:text-black'}`}
        >
          Products
        </a>
        <a
          href="/courses"
          className={`text-sm px-3 mb-4 md:mb-0 ${pathname === '/courses' ? 'rounded-full border border-black font-medium' : 'hover:text-black'}`}
        >
          Courses
        </a>
        <a
          href="/services"
          className={`text-sm px-3 mb-4 md:mb-0 ${pathname === '/services' ? 'rounded-full border border-black font-medium' : 'hover:text-black'}`}
        >
          Services
        </a>
        <a
          href="/work"
          className={`text-sm px-3 mb-4 md:mb-0 ${pathname === '/work' ? 'rounded-full border border-black font-medium' : 'hover:text-black'}`}
        >
          Work
        </a>
        {/* Cart Icon for Mobile */}
        <button className="md:hidden mt-6 flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
          <CartIcon />
        </button>
      </nav>

      {/* Cart Icon for Desktop */}
      <button className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
        <CartIcon />
      </button>

      {/* Overlay for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-0 md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </header>
  )
}

export default Header
