import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#1f1f1f] text-white px-8 py-12">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
    {/* Brand / About */}
    <div>
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 border border-white rounded-full"></div>
        <span className="text-2xl font-light">Laluna</span>
      </div>
      <p className="mt-4 text-sm text-gray-300 leading-relaxed max-w-xs">
        Professional makeup, pedicure, manicure, and nail fixing services.
        We combine artistry and care to give you the perfect beauty
        experience.
      </p>
    </div>

    {/* Information */}
    <div>
      <h3 className="text-lg font-medium mb-4">Information</h3>
      <ul className="space-y-2 text-sm text-gray-300">
        <li><a href="#" className="hover:text-white">About Us</a></li>
        <li><a href="#" className="hover:text-white">Services</a></li>
        <li><a href="#" className="hover:text-white">Pricing</a></li>
        <li><a href="#" className="hover:text-white">Gallery</a></li>
        <li><a href="#" className="hover:text-white">Reviews</a></li>
      </ul>
    </div>

    {/* Useful Links */}
    <div>
      <h3 className="text-lg font-medium mb-4">Useful Links</h3>
      <ul className="space-y-2 text-sm text-gray-300">
        <li><a href="#" className="hover:text-white">Contact</a></li>
        <li><a href="#" className="hover:text-white">Community</a></li>
        <li><a href="#" className="hover:text-white">FAQ</a></li>
        <li><a href="#" className="hover:text-white">Forum</a></li>
        <li><a href="#" className="hover:text-white">Help Center</a></li>
      </ul>
    </div>

    {/* Contact & Socials */}
    <div>
      <h3 className="text-lg font-medium mb-4">Contact Us</h3>
      <div className="flex space-x-4">
        <a href="#"><img src="/icons/facebook.svg" alt="Facebook" className="w-6 h-6" /></a>
        <a href="#"><img src="/icons/twitter.svg" alt="Twitter" className="w-6 h-6" /></a>
        <a href="#"><img src="/icons/linkedin.svg" alt="LinkedIn" className="w-6 h-6" /></a>
        <a href="#"><img src="/icons/instagram.svg" alt="Instagram" className="w-6 h-6" /></a>
      </div>
    </div>
  </div>

  {/* Bottom bar */}
  <div className="mt-12 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
    <p>© {new Date().getFullYear()} Laluna. All Rights Reserved</p>
    <div className="flex space-x-6 mt-4 md:mt-0">
      <a href="#" className="hover:text-white">Terms & Conditions</a>
      <a href="#" className="hover:text-white">Privacy Policy</a>
    </div>
  </div>
</footer>

  );
};

export default Footer;
