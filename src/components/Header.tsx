import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="flex w-full flex-col items-stretch px-[70px] max-md:px-5">
      <nav className="flex w-full items-stretch gap-5 font-light flex-wrap justify-between max-md:relative">
        <div className="flex items-stretch gap-3.5 text-4xl text-foreground whitespace-nowrap tracking-[-1.8px]">
          <div className="border flex w-6 shrink-0 h-6 my-auto rounded-[50%] border-foreground border-solid" />
          <div className="basis-auto">
            Laluna
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-[40px_45px] text-2xl text-muted-foreground tracking-[-1.2px]">
          <div className="border self-stretch text-foreground font-normal whitespace-nowrap my-auto px-4 rounded-[500px] border-foreground border-solid">
            <div>Home</div>
          </div>
          <a href="/products" className="self-stretch my-auto cursor-pointer hover:text-foreground transition-colors">
            Product
          </a>
          <a href="/courses" className="self-stretch my-auto cursor-pointer hover:text-foreground transition-colors">
            Courses
          </a>
          <a href="/services" className="self-stretch my-auto cursor-pointer hover:text-foreground transition-colors">
            Services
          </a>
          <a href="/work" className="self-stretch my-auto cursor-pointer hover:text-foreground transition-colors">
            Work
          </a>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-background">
                <circle cx="8" cy="21" r="1"/>
                <circle cx="19" cy="21" r="1"/>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57L23 8H7"/>
                <path d="M7 13H17l-1.68-4.39"/>
              </svg>
            </div>
            <button className="bg-primary text-primary-foreground font-medium text-center px-6 py-2 rounded-[var(--radius)] hover:opacity-90 transition-opacity">
              <div>Contact us</div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-background">
              <circle cx="8" cy="21" r="1"/>
              <circle cx="19" cy="21" r="1"/>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57L23 8H7"/>
              <path d="M7 13H17l-1.68-4.39"/>
            </svg>
          </div>
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-t border-border shadow-lg z-50 md:hidden">
            <div className="flex flex-col py-4 px-5 space-y-4">
              <div className="text-foreground font-normal text-lg px-4 py-2 rounded-[500px] border border-foreground">
                Home
              </div>
              <a 
                href="/products" 
                className="text-muted-foreground hover:text-foreground transition-colors text-lg px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Product
              </a>
              <a 
                href="/courses" 
                className="text-muted-foreground hover:text-foreground transition-colors text-lg px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Courses
              </a>
              <a 
                href="/services" 
                className="text-muted-foreground hover:text-foreground transition-colors text-lg px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </a>
              <a 
                href="/work" 
                className="text-muted-foreground hover:text-foreground transition-colors text-lg px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Work
              </a>
              <button className="bg-primary text-primary-foreground font-medium text-center px-6 py-2 rounded-[var(--radius)] hover:opacity-90 transition-opacity mt-4">
                Contact us
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
