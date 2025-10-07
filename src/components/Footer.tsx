import React from 'react';
import { HiEnvelope, HiMapPin, HiPhone, HiOutlineClock } from 'react-icons/hi2';
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram, FaTiktok } from 'react-icons/fa';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="w-full bg-warm-brown-800 text-white px-8 py-12">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
    {/* Brand / About */}
    <div>
      <div className="flex items-center space-x-2">
        <Image src="/white-logo.png" width={24} height={24} alt='logo' />
        <span className="text-2xl font-light">Beauty Kept</span>
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
          <HiMapPin className="w-5 h-5 text-primary-foreground" />
          <div className='text-wrap break-all divide-y divide-gray-100/50 flex flex-col gap-2 flex-2'>
            <span className=''>C. Concepción Beistegui 2756, Narvarte Poniente, Benito Juárez, 05488 Ciudad de México, CDMX, Mexico</span>
            <span>Breach, 3834 Main Street Culver City Ca 90232</span>
          </div>
        </li>
        <li >
          <a href="mailto:branchheadquartersacadeemy@hot-shot.com" className="flex items-center gap-3">
            <HiEnvelope className="w-5 h-5 text-primary-foreground" />
            <div className='text-wrap break-all divide-y divide-gray-100/50 flex flex-col gap-2'>
              <span>branchheadquartersacadeemy@hot-shot.com</span>
              <span>beautykeptacademyca@outlook.com</span>
              <span>foremanoverseersacademyligtm@worker.com</span>
            </div>
          </a>
        </li>
        <li >
          <a href="tel:+14248663880" className="flex items-center gap-3">
            <HiPhone className="w-5 h-5 text-primary-foreground" />
            <span>+52 55 1000 0499</span>
          </a>
        </li>
        <li className="flex items-center gap-3">
          <div className='w-5 h-5 fill-warm-brown-50'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M224 128L224 208L288 208L288 128L434.7 128L480 173.3L480 208L544 208L544 173.3C544 156.3 537.3 140 525.3 128L480 82.7C468 70.7 451.7 64 434.7 64L288 64C252.7 64 224 92.7 224 128zM96 192C78.3 192 64 206.3 64 224L64 512C64 529.7 78.3 544 96 544L144 544C161.7 544 176 529.7 176 512L176 224C176 206.3 161.7 192 144 192L96 192zM544 256L224 256L224 512C224 529.7 238.3 544 256 544L544 544C561.7 544 576 529.7 576 512L576 288C576 270.3 561.7 256 544 256zM288 352C288 338.7 298.7 328 312 328C325.3 328 336 338.7 336 352C336 365.3 325.3 376 312 376C298.7 376 288 365.3 288 352zM288 448C288 434.7 298.7 424 312 424C325.3 424 336 434.7 336 448C336 461.3 325.3 472 312 472C298.7 472 288 461.3 288 448zM400 328C413.3 328 424 338.7 424 352C424 365.3 413.3 376 400 376C386.7 376 376 365.3 376 352C376 338.7 386.7 328 400 328zM376 448C376 434.7 386.7 424 400 424C413.3 424 424 434.7 424 448C424 461.3 413.3 472 400 472C386.7 472 376 461.3 376 448zM488 328C501.3 328 512 338.7 512 352C512 365.3 501.3 376 488 376C474.7 376 464 365.3 464 352C464 338.7 474.7 328 488 328zM464 448C464 434.7 474.7 424 488 424C501.3 424 512 434.7 512 448C512 461.3 501.3 472 488 472C474.7 472 464 461.3 464 448z"/>
            </svg>
          </div>
          <span>+52 55 8111  0199</span>
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
    <p>© {new Date().getFullYear()} Beauty Kept. All Rights Reserved</p>
    <div className="flex space-x-6 mt-4 md:mt-0">
      <a href="#" className="hover:text-white">Terms & Conditions</a>
      <a href="#" className="hover:text-white">Privacy Policy</a>
    </div>
  </div>
</footer>

  );
};

export default Footer;
