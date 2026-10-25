import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Phone, MessageCircle } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  onOpenBooking: (serviceName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  onOpenBooking
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Hair Gallery' },
    { id: 'hair-care', label: 'Hair Care' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hello Dorry Hair Studio, I would like to enquire about your services and book an appointment.'
  )}`;

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#263522]/95 backdrop-blur-md shadow-md border-b border-[#C6A15B]/20 py-3'
          : 'bg-[#263522] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Mark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B] cursor-pointer"
            aria-label="Dorry Hair Studio Home"
          >
            <img
              src="/images/logo.png"
              alt="Dorry Hair Studio"
              className="h-10 sm:h-12 w-auto object-contain brightness-110 drop-shadow-sm"
            />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm tracking-wider uppercase transition-colors relative py-1 font-medium ${
                  activePage === link.id
                    ? 'text-[#D9BD83]'
                    : 'text-[#F8F5EE]/85 hover:text-[#D9BD83]'
                }`}
              >
                {link.label}
                {activePage === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C6A15B] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-[#D9BD83] hover:text-[#FFFDF8] hover:bg-[#35452E] rounded-full transition-colors border border-[#C6A15B]/30"
              title="Chat on WhatsApp"
              aria-label="Chat with Dorry Hair Studio on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 bg-[#C6A15B] hover:bg-[#D9BD83] text-[#24251F] font-medium text-xs sm:text-sm tracking-wider uppercase px-5 py-2.5 rounded-sm transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenBooking()}
              className="sm:hidden inline-flex items-center bg-[#C6A15B] text-[#24251F] font-medium text-xs tracking-wider uppercase px-3 py-1.5 rounded-sm"
            >
              Book
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#FFFDF8] hover:text-[#C6A15B] focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#263522] border-b border-[#C6A15B]/20 px-6 py-6 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4 mb-6" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left text-base tracking-wider uppercase py-2 border-b border-[#35452E] transition-colors ${
                  activePage === link.id
                    ? 'text-[#D9BD83] font-semibold pl-2 border-l-2 border-l-[#C6A15B]'
                    : 'text-[#FFFDF8]/90 hover:text-[#D9BD83]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#C6A15B] hover:bg-[#D9BD83] text-[#24251F] font-semibold text-sm tracking-wider uppercase py-3 rounded-sm shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#35452E] border border-[#C6A15B]/30 text-[#FFFDF8] hover:text-[#D9BD83] font-medium text-sm py-2.5 rounded-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#D9BD83]" />
              WhatsApp Us (Quick Chat)
            </a>

            <a
              href={`tel:${SALON_INFO.phonePrimary.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 text-xs text-[#A5AD91] hover:text-[#FFFDF8] py-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#C6A15B]" />
              {SALON_INFO.phoneDisplay} • {SALON_INFO.addressShort}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
