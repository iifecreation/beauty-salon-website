import React from 'react';
import { HiEnvelope, HiMapPin, HiPhone, HiOutlineClock } from 'react-icons/hi2';
import { FaFacebookSquare, FaTwitterSquare, FaLinkedin, FaInstagramSquare, FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-test-brown-800 text-white px-8 py-12">
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
      <div className="flex space-x-4 mt-5">
        <a href="#" aria-label="Facebook"><FaFacebookF className="w-6 h-6 hover:text-primary" /></a>
        <a href="#" aria-label="Twitter"><FaTwitter className="w-6 h-6 hover:text-primary" /></a>
        <a href="#" aria-label="LinkedIn"><FaLinkedinIn className="w-6 h-6 hover:text-primary" /></a>
        <a href="#" aria-label="Instagram"><FaInstagram className="w-6 h-6 hover:text-primary" /></a>
        <a href="#" aria-label="Instagram"><FaTiktok className="w-6 h-6 hover:text-primary" /></a>
      </div>
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

    {/* Keep in Touch */}
    <div>
      <h3 className="text-lg font-medium mb-4">Keep in Touch</h3>
      <ul className="space-y-3 text-sm text-gray-300">
        <li className="flex items-center gap-3">
          <HiEnvelope className="w-5 h-5 text-primary-foreground" />
          <span>info@laluna.com</span>
        </li>
        <li className="flex items-center gap-3">
          <HiPhone className="w-5 h-5 text-primary-foreground" />
          <span>+1 234 567 8900</span>
        </li>
        <li className="flex items-center gap-3">
          <HiMapPin className="w-5 h-5 text-primary-foreground" />
          <span>123 Beauty Ave, City, Country</span>
        </li>
      </ul>
    </div>

    {/* Operating Hours */}
    <div>
      <h3 className="text-lg font-medium mb-4">Operating Hours</h3>
      <ul className="space-y-2 text-sm text-gray-300">
        <li className="flex items-center gap-3">
          <HiOutlineClock className="w-5 h-5 text-primary-foreground" />
          <span>Mon - Fri: 9:00am - 7:00pm</span>
        </li>
        <li className="flex items-center gap-3">
          <HiOutlineClock className="w-5 h-5 text-primary-foreground" />
          <span>Sat: 10:00am - 5:00pm</span>
        </li>
        <li className="flex items-center gap-3">
          <HiOutlineClock className="w-5 h-5 text-primary-foreground" />
          <span>Sun: Closed</span>
        </li>
      </ul>
    </div>
  </div>

  {/* Bottom bar */}
  <div className="mt-12 border-t border-gray-50 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
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
