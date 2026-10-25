import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Heart } from 'lucide-react';
import { SALON_INFO, SERVICES } from '../data/salonData';

interface FooterProps {
  setActivePage: (page: string) => void;
  onOpenBooking: (serviceName?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, onOpenBooking }) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hello Dorry Hair Studio, I would like to enquire about your services and book an appointment.'
  )}`;

  return (
    <footer className="bg-[#263522] text-[#F8F5EE] border-t border-[#C6A15B]/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-14">
          {/* Column 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src="/images/logo.png"
                alt="Dorry Hair Studio"
                className="h-11 sm:h-12 w-auto object-contain brightness-110"
              />
            </div>

            <p className="text-sm text-[#A5AD91] leading-relaxed pt-2">
              Healthy hair is beautiful hair. A premier natural hair and beauty sanctuary located at AppleWood Adams, Ngong Road, Nairobi. Passionate about helping women embrace, maintain, and celebrate their authentic crowns.
            </p>

            <div className="pt-2">
              <span className="inline-block text-xs font-medium text-[#D9BD83] bg-[#35452E] px-3 py-1.5 rounded-sm border border-[#C6A15B]/20">
                ✨ Special Offer: 15% Off for New Clients
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg tracking-wider text-[#D9BD83] font-medium border-b border-[#C6A15B]/20 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F8F5EE]/80">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-[#D9BD83] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-[#D9BD83] transition-colors cursor-pointer"
                >
                  About Our Studio & Founder
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#D9BD83] transition-colors cursor-pointer"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('gallery')}
                  className="hover:text-[#D9BD83] transition-colors cursor-pointer"
                >
                  Hair Artistry Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('hair-care')}
                  className="hover:text-[#D9BD83] transition-colors cursor-pointer"
                >
                  Natural Hair Care Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-[#D9BD83] transition-colors cursor-pointer"
                >
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Featured Services */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg tracking-wider text-[#D9BD83] font-medium border-b border-[#C6A15B]/20 pb-2">
              Specialized Services
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F8F5EE]/80">
              {SERVICES.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => {
                      handleNav('services');
                    }}
                    className="hover:text-[#D9BD83] transition-colors text-left line-clamp-1 cursor-pointer"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onOpenBooking()}
                  className="text-xs font-semibold uppercase tracking-wider text-[#C6A15B] hover:text-[#D9BD83] pt-1 block"
                >
                  + Reserve Custom Appointment
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Studio Hours */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg tracking-wider text-[#D9BD83] font-medium border-b border-[#C6A15B]/20 pb-2">
              Salon Location & Hours
            </h4>
            <div className="space-y-3 text-sm text-[#A5AD91]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C6A15B] shrink-0 mt-1" />
                <span>{SALON_INFO.location}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <a
                  href={`tel:${SALON_INFO.phonePrimary.replace(/\s+/g, '')}`}
                  className="hover:text-[#FFFDF8] transition-colors"
                >
                  {SALON_INFO.phonePrimary}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <a
                  href={`mailto:${SALON_INFO.email}`}
                  className="hover:text-[#FFFDF8] transition-colors"
                >
                  {SALON_INFO.email}
                </a>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <Clock className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <p className="text-[#FFFDF8] font-medium">{SALON_INFO.hours.weekdays}</p>
                  <p className="text-[#FFFDF8] font-medium">{SALON_INFO.hours.weekends}</p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-medium text-[#24251F] bg-[#C6A15B] hover:bg-[#D9BD83] px-3.5 py-2 rounded-sm transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Chat Directly on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Gold Divider */}
        <div className="border-t border-[#C6A15B]/20 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A5AD91] gap-4 text-center sm:text-left">
          <p>
            &copy; {currentYear} Dorry Hair Studio. All Rights Reserved. AppleWood Adams, Ngong Road, Nairobi, Kenya.
          </p>
          <div className="flex items-center gap-1 text-xs">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-[#C6A15B] fill-current" />
            <span>for Natural African Beauty</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
