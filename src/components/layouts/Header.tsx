import React from 'react'

function Header() {
  return (
    <header className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        {/* Logo */}
        <div className="flex items-center space-x-2">
            <div className="w-6 h-6 border border-black rounded-full"></div>
            <span className="text-xl font-semibold">Laluna</span>
        </div>

        {/* Navigation Menu */}
        <nav className="flex items-center space-x-8 text-gray-700">
            <a href="/" className="relative px-2 py-1 rounded-full border border-black text-sm font-medium">
            Home
            </a>
            <a href="/products" className="text-sm hover:text-black">About us</a>
            <a href="/courses" className="text-sm hover:text-black">Provide</a>
            <a href="/services" className="text-sm hover:text-black">Product</a>
            <a href="/work" className="text-sm hover:text-black">Articles</a>
        </nav>

        {/* Contact Button */}
        <button className="px-5 py-2 bg-black text-white text-sm rounded-full shadow hover:bg-gray-900">
            Contact us
        </button>
    </header>

  )
}

export default Header
