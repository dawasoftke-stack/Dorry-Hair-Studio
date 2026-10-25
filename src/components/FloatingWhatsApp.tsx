import React from 'react';
import { MessageCircle } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export const FloatingWhatsApp: React.FC = () => {
  const prefilledMessage = encodeURIComponent(
    'Hello Dorry Hair Studio, I would like to enquire about your services and book an appointment.'
  );
  const whatsappUrl = `https://wa.me/${SALON_INFO.whatsappNumber}?text=${prefilledMessage}`;

  return (
    <aside
      aria-label="Contact options"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group"
    >
      {/* Tooltip prompt */}
      <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[#263522] text-[#FFFDF8] text-xs px-3 py-1.5 rounded-sm shadow-xl border border-[#C6A15B]/30 whitespace-nowrap mb-1">
        <span className="text-[#C6A15B] font-semibold">Chat with Dorry Hair Studio</span>
        <span className="block text-[10px] text-[#A5AD91]">Typically replies within minutes</span>
      </div>

      {/* Floating button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Dorry Hair Studio on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/20"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-100 border border-[#25D366]"></span>
        </span>
        <MessageCircle className="w-7 h-7 fill-current" />
      </a>
    </aside>
  );
};
