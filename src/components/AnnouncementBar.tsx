import React from 'react';
import { Sparkles, Phone, MapPin } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#263522] text-[#D9BD83] text-xs sm:text-sm py-2 px-4 border-b border-[#C6A15B]/20 tracking-wider">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C6A15B] shrink-0 animate-pulse" />
          <span className="font-medium tracking-wide">
            {SALON_INFO.promotionText}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-5 text-xs text-[#A5AD91]">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-[#C6A15B]" />
            {SALON_INFO.addressShort}
          </span>
          <a
            href={`tel:${SALON_INFO.phonePrimary.replace(/\s+/g, '')}`}
            className="flex items-center gap-1.5 hover:text-[#D9BD83] transition-colors"
          >
            <Phone className="w-3 h-3 text-[#C6A15B]" />
            <span>{SALON_INFO.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
