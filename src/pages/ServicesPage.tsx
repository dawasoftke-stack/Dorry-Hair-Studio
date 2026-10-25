import React, { useState } from 'react';
import { Sparkles, Calendar, MessageCircle, Clock, Check, Search, HelpCircle } from 'lucide-react';
import { SERVICES, SALON_INFO } from '../data/salonData';
import { ServiceItem } from '../types';

interface ServicesPageProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'natural-hair', label: 'Natural Hair Care' },
    { id: 'protective-styles', label: 'Protective Hairstyles' },
    { id: 'hair-treatments', label: 'Hair Treatments' },
    { id: 'beauty-services', label: 'Beauty & Spa Services' }
  ];

  const filteredServices = SERVICES.filter((service) => {
    const matchesCategory =
      selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.benefits.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getWhatsAppLink = (serviceName: string) => {
    const text = encodeURIComponent(
      `Hello Dorry Hair Studio, I would like to enquire about details and pricing for: ${serviceName}.`
    );
    return `https://wa.me/${SALON_INFO.whatsappNumber}?text=${text}`;
  };

  return (
    <div className="bg-[#FFFDF8] text-[#24251F]">
      {/* Header Banner */}
      <section className="relative bg-[#263522] text-[#FFFDF8] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero4.png"
            alt="Dorry Hair Studio Services"
            className="w-full h-full object-cover filter brightness-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#263522] via-[#263522]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#C6A15B] uppercase block">
            Bespoke African Hair Care
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FFFDF8]">
            Our Salon Services
          </h1>
          <div className="w-16 h-0.5 bg-[#C6A15B] mx-auto my-3"></div>
          <p className="text-sm sm:text-base text-[#F8F5EE]/80 max-w-xl mx-auto font-light leading-relaxed">
            From deep botanical hydration to intricate protective artistry and spa wellness, explore our verified service menu at AppleWood Adams, Nairobi.
          </p>

          <div className="inline-block bg-[#35452E]/90 border border-[#C6A15B]/30 px-4 py-2 rounded-xs text-xs text-[#D9BD83] mt-2">
            ✨ Special Offer: 15% Off on All Services for New Clients
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        {/* Controls: Search and Categories */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 pb-10 border-b border-[#C6A15B]/20">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs sm:text-sm font-medium tracking-wider px-4 py-2 rounded-sm transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#263522] text-[#D9BD83] shadow-sm'
                    : 'bg-[#F8F5EE] text-[#555] hover:bg-[#EAE4D5] hover:text-[#263522]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#A5AD91] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services or styling..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#A5AD91]/40 focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B] rounded-sm pl-9 pr-3 py-2 text-xs sm:text-sm text-[#24251F] outline-none"
            />
          </div>
        </div>

        {/* Pricing Transparency Notice */}
        <div className="bg-[#F8F5EE] border-l-4 border-[#C6A15B] p-4 rounded-sm my-8 flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
          <div className="text-xs text-[#555] leading-relaxed">
            <strong className="text-[#263522] block font-medium mb-0.5">
              Transparent Consultation Policy
            </strong>
            Exact pricing and time commitments are tailored according to hair length, density, previous chemical history, and specific styling detail during consultation. We avoid arbitrary one-size-fits-all estimations to ensure the best possible care for your crown.
          </div>
        </div>

        {/* Services List */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <p className="font-serif text-2xl text-[#263522]">No services match your search.</p>
            <p className="text-sm text-[#777]">Try clearing your search query or choosing another category.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-xs uppercase tracking-wider text-[#C6A15B] underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredServices.map((service: ServiceItem) => (
              <div
                key={service.id}
                className="bg-white border border-[#C6A15B]/25 rounded-sm overflow-hidden flex flex-col sm:flex-row hover:shadow-lg transition-all duration-300 group"
              >
                {/* Visual Thumbnail */}
                <div className="sm:w-52 h-56 sm:h-auto bg-[#263522] relative shrink-0 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  <span className="absolute top-3 left-3 bg-[#263522]/90 text-[#D9BD83] text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-xs border border-[#C6A15B]/20">
                    {service.categoryLabel}
                  </span>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#263522] group-hover:text-[#C6A15B] transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#666] leading-relaxed mt-2">
                      {service.description}
                    </p>

                    {/* Verified Benefits */}
                    <div className="mt-3 space-y-1.5">
                      {service.benefits.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2 text-xs text-[#444]">
                          <Check className="w-3.5 h-3.5 text-[#C6A15B] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footnote & CTA */}
                  <div className="pt-4 border-t border-[#F8F5EE] space-y-3">
                    <div className="flex flex-wrap items-center justify-between text-xs text-[#888] gap-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#C6A15B]" />
                        {service.durationNote}
                      </span>
                      <span className="italic text-[#263522] font-medium">
                        {service.priceNote}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onOpenBooking(service.name)}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-[#C6A15B] hover:bg-[#D9BD83] text-[#24251F] font-semibold text-xs tracking-wider uppercase py-2.5 px-4 rounded-sm transition-all active:scale-95 cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Service</span>
                      </button>

                      <a
                        href={getWhatsAppLink(service.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 text-[#25D366] hover:bg-[#F8F5EE] border border-[#25D366]/40 rounded-sm transition-colors"
                        title="Enquire on WhatsApp"
                        aria-label={`Enquire about ${service.name} on WhatsApp`}
                      >
                        <MessageCircle className="w-4 h-4 fill-current" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
