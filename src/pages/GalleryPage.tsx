import React, { useState } from 'react';
import { Eye, Calendar, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/salonData';

interface GalleryPageProps {
  onOpenLightbox: (index: number) => void;
  onOpenBooking: (styleName?: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onOpenLightbox,
  onOpenBooking
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'All Portfolio' },
    { id: 'natural', label: 'Natural Hair & Curls' },
    { id: 'braids', label: 'Protective Braids & Twists' },
    { id: 'locs', label: 'Sisterlocs & Loc Artistry' },
    { id: 'treatment', label: 'Hair Treatments' },
    { id: 'editorial', label: 'Studio Editorial' }
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <div className="bg-[#FFFDF8] text-[#24251F]">
      {/* Header Banner */}
      <section className="relative bg-[#263522] text-[#FFFDF8] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero5.png"
            alt="Dorry Hair Studio Artistry"
            className="w-full h-full object-cover filter brightness-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#263522] via-[#263522]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#C6A15B] uppercase block">
            Authentic African Beauty
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FFFDF8]">
            Hair Artistry Gallery
          </h1>
          <div className="w-16 h-0.5 bg-[#C6A15B] mx-auto my-3"></div>
          <p className="text-sm sm:text-base text-[#F8F5EE]/80 max-w-xl mx-auto font-light leading-relaxed">
            Explore authentic photographs of finished hairstyles, Sisterlocs, tension-free braids, and healthy natural hair transformations at Dorry Hair Studio.
          </p>
        </div>
      </section>

      {/* Main Gallery Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`text-xs sm:text-sm font-medium tracking-wider px-4 py-2 rounded-sm transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-[#263522] text-[#D9BD83] shadow-sm'
                  : 'bg-[#F8F5EE] text-[#555] hover:bg-[#EAE4D5] hover:text-[#263522]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Asymmetric / Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item) => {
            const originalIndex = GALLERY_ITEMS.findIndex((g) => g.id === item.id);

            return (
              <div
                key={item.id}
                onClick={() => onOpenLightbox(originalIndex)}
                className="group relative break-inside-avoid bg-[#263522] rounded-sm overflow-hidden border border-[#C6A15B]/20 cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                </div>

                {/* View Icon Badge */}
                <div className="absolute top-4 right-4 bg-black/60 p-2 rounded-full text-white/80 group-hover:text-[#C6A15B] transition-colors">
                  <Eye className="w-4 h-4" />
                </div>

                {/* Details Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-[#C6A15B] bg-[#263522]/90 px-2 py-0.5 rounded-xs border border-[#C6A15B]/30 inline-block mb-1.5">
                    {item.categoryLabel}
                  </span>
                  <h3 className="font-serif text-lg font-medium text-[#FFFDF8] group-hover:text-[#D9BD83] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#A5AD91] mt-1 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gallery CTA */}
        <div className="mt-20 p-10 bg-[#F8F5EE] border border-[#C6A15B]/30 rounded-sm text-center max-w-3xl mx-auto space-y-4">
          <Sparkles className="w-6 h-6 text-[#C6A15B] mx-auto" />
          <h3 className="font-serif text-2xl sm:text-3xl text-[#263522] font-medium">
            Found a Style That Speaks to You?
          </h3>
          <p className="text-sm text-[#666] max-w-lg mx-auto">
            Book an appointment with Dorcas and our talented styling team to recreate or personalize any look from our gallery.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 bg-[#C6A15B] hover:bg-[#D9BD83] text-[#24251F] font-semibold text-xs sm:text-sm tracking-wider uppercase px-7 py-3 rounded-sm shadow-md transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment for This Look</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
