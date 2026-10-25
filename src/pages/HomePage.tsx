import React from 'react';
import {
  Calendar,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Check,
  Compass,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Eye
} from 'lucide-react';
import { SALON_INFO, SERVICES, GALLERY_ITEMS } from '../data/salonData';

interface HomePageProps {
  setActivePage: (page: string) => void;
  onOpenBooking: (serviceName?: string) => void;
  onOpenLightbox: (index: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setActivePage,
  onOpenBooking,
  onOpenLightbox
}) => {
  const whatsappUrl = `https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hello Dorry Hair Studio, I would like to enquire about your services and book an appointment.'
  )}`;

  // Four signature service categories
  const signatureCategories = [
    {
      title: 'Natural Hair Care',
      category: 'natural-hair',
      image: '/images/service-natural.png',
      description: 'Moisturizing cleanses, botanical treatments, and curl definition that nourish coils while honoring your natural pattern.'
    },
    {
      title: 'Protective Hairstyles',
      category: 'protective-styles',
      image: '/images/service-protective.png',
      description: 'Tension-free knotless braids, passion twists, and precision locs designed to safeguard your edges and promote length.'
    },
    {
      title: 'Hair Treatments',
      category: 'hair-treatments',
      image: '/images/service-treatment.png',
      description: 'Intensive moisture steam therapy and protein reconstruction to reverse dryness and rebuild resilient hair strength.'
    },
    {
      title: 'Beauty & Spa Services',
      category: 'beauty-services',
      image: '/images/service-beauty.png',
      description: 'Complementary aesthetic treatments including refreshing facials, manicure, pedicure, and soothing scalp rituals.'
    }
  ];

  return (
    <div className="w-full overflow-hidden">
      {/* 3. Luxury Hero Section */}
      <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background Image without green filter */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero1.png"
            alt="Dorry Hair Studio - Natural Hair Artistry Nairobi"
            className="w-full h-full object-cover object-center"
          />
          {/* Transparent soft neutral gradient on left only for text contrast - NO green filter */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent"></div>
        </div>

        {/* Hero Content - Clean text directly on image without any green box container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-2xl lg:max-w-3xl space-y-6">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-xs border border-[#C6A15B]/60 rounded-xs">
              <span className="w-2 h-2 rounded-full bg-[#C6A15B] animate-pulse"></span>
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#D9BD83] drop-shadow-sm">
                Your Natural Beauty, Elevated
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal text-[#FFFDF8] tracking-tight leading-[1.1] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              Your Hair. <br />
              <span className="italic font-light text-[#D9BD83]">Your Crown.</span> <br />
              Our Expertise.
            </h1>

            {/* Subtle Gold Divider */}
            <div className="w-20 h-0.5 bg-[#C6A15B]"></div>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#F8F5EE] font-light leading-relaxed max-w-xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
              Discover exceptional natural hair care, beautifully crafted protective styles, and personalised beauty experiences designed to help you look and feel your best.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onOpenBooking()}
                className="inline-flex items-center justify-center gap-2.5 bg-[#C6A15B] hover:bg-[#D9BD83] text-[#24251F] font-semibold text-sm tracking-wider uppercase px-8 py-4 rounded-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform active:scale-95 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Your Appointment</span>
              </button>

              <button
                onClick={() => {
                  setActivePage('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 bg-black/30 backdrop-blur-xs border border-[#FFFDF8]/60 hover:border-[#C6A15B] text-[#FFFDF8] hover:text-[#D9BD83] hover:bg-black/50 font-medium text-sm tracking-wider uppercase px-7 py-4 rounded-sm transition-all duration-300 cursor-pointer shadow-md"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Verified Salon Trust Highlights */}
            <div className="pt-8 border-t border-white/20 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs text-[#F8F5EE] drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span className="font-medium">100% Natural Hair Care</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span className="font-medium">AppleWood Adams, Ngong Rd</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Check className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span className="font-semibold text-[#D9BD83]">15% Off New Clients</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Brand Introduction */}
      <section className="py-20 lg:py-28 bg-[#F8F5EE] text-[#24251F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual Portrait */}
            <div className="lg:col-span-5 order-2 lg:order-1 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative border box */}
                <div className="absolute -inset-4 border border-[#C6A15B]/40 rounded-sm pointer-events-none transform -rotate-1 hidden sm:block"></div>
                <div className="relative rounded-sm overflow-hidden shadow-2xl bg-[#263522]">
                  <img
                    src="/images/dorry-style-2.png"
                    alt="Dorry Hair Studio styling expertise"
                    className="w-full h-[460px] sm:h-[520px] object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-5 left-5 right-5 text-[#FFFDF8]">
                    <p className="font-serif text-lg italic text-[#D9BD83]">
                      &ldquo;Healthy hair is beautiful hair.&rdquo;
                    </p>
                    <p className="text-xs text-[#A5AD91] tracking-wider uppercase mt-1">
                      Our Guiding Philosophy
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C6A15B] uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Dorry Philosophy</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#263522]">
                Beauty Begins <br className="hidden sm:inline" />
                <span className="italic font-light">With Dedicated Care.</span>
              </h2>

              <p className="text-base sm:text-lg text-[#444] leading-relaxed">
                Welcome to Dorry Hair Studio, a premier natural hair and beauty sanctuary serving clients at AppleWood Adams along Ngong Road, Nairobi. We are passionate about helping women embrace, maintain, and celebrate their authentic hair with utmost pride.
              </p>

              <p className="text-sm sm:text-base text-[#666] leading-relaxed">
                From everyday natural hair hydration to tension-free protective styles, precision loc maintenance, and revitalizing treatments, our goal is to deliver a bespoke salon experience tailored to your unique curl pattern and personal lifestyle.
              </p>

              {/* Feature pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-white border border-[#C6A15B]/20 rounded-sm">
                  <h4 className="font-serif text-base font-semibold text-[#263522] mb-1">
                    Curls & Coils Health
                  </h4>
                  <p className="text-xs text-[#666] leading-relaxed">
                    Protecting moisture barriers, preventing single-strand knotting, and keeping natural textures thriving.
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#C6A15B]/20 rounded-sm">
                  <h4 className="font-serif text-base font-semibold text-[#263522] mb-1">
                    Tension-Free Protection
                  </h4>
                  <p className="text-xs text-[#666] leading-relaxed">
                    Lightweight sectioning and delicate root handling that safeguards edges from thinning or stress.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-6">
                <button
                  onClick={() => {
                    setActivePage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-[#263522] hover:text-[#C6A15B] transition-colors group cursor-pointer"
                >
                  <span>Discover Our Story & Founder</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Signature Services */}
      <section className="py-20 lg:py-28 bg-[#FFFDF8] text-[#24251F] border-y border-[#C6A15B]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#C6A15B] uppercase block mb-3">
              Tailored Salon Offerings
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#263522] tracking-tight">
              Our Signature Services
            </h2>
            <div className="w-16 h-0.5 bg-[#C6A15B] mx-auto mt-4 mb-4"></div>
            <p className="text-sm sm:text-base text-[#666] leading-relaxed">
              Every appointment at Dorry Hair Studio is designed around meticulous hygiene, premium botanical formulations, and personalized styling precision.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {signatureCategories.map((cat, idx) => (
              <div
                key={idx}
                className="group bg-[#F8F5EE] border border-[#C6A15B]/20 rounded-sm overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image Container with subtle zoom */}
                <div className="relative h-60 bg-[#263522] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <span className="absolute top-3 left-3 bg-[#263522]/90 text-[#D9BD83] text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-xs border border-[#C6A15B]/30">
                    Category 0{idx + 1}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl text-[#263522] font-semibold tracking-wide group-hover:text-[#C6A15B] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#555] leading-relaxed mt-2">
                      {cat.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-[#C6A15B]/15 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setActivePage('services');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-xs font-semibold uppercase tracking-wider text-[#263522] hover:text-[#C6A15B] inline-flex items-center gap-1 group/btn cursor-pointer"
                    >
                      <span>Discover More</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => onOpenBooking(cat.title)}
                      className="text-xs font-medium text-[#C6A15B] hover:text-[#D9BD83] cursor-pointer"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Services Bottom CTA */}
          <div className="mt-14 text-center">
            <button
              onClick={() => {
                setActivePage('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-[#263522] hover:bg-[#35452E] text-[#FFFDF8] font-medium text-xs sm:text-sm tracking-wider uppercase px-8 py-3.5 rounded-sm transition-all shadow-md cursor-pointer"
            >
              <span>View Full Menu & Pricing Guidelines</span>
              <ArrowRight className="w-4 h-4 text-[#C6A15B]" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Hair Artistry Gallery Preview */}
      <section className="py-20 lg:py-28 bg-[#263522] text-[#FFFDF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="text-xs font-semibold tracking-[0.25em] text-[#C6A15B] uppercase block mb-2">
                Portfolio Showcase
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FFFDF8] tracking-tight">
                The Art of Beautiful Hair
              </h2>
              <div className="w-16 h-0.5 bg-[#C6A15B] mt-4"></div>
            </div>

            <button
              onClick={() => {
                setActivePage('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#D9BD83] hover:text-[#FFFDF8] border border-[#C6A15B]/30 px-5 py-2.5 rounded-sm self-start md:self-auto hover:bg-[#35452E] transition-all cursor-pointer"
            >
              <span>Explore Our Full Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Editorial Asymmetric Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_ITEMS.slice(0, 6).map((item, index) => (
              <div
                key={item.id}
                onClick={() => onOpenLightbox(index)}
                className="group relative h-80 sm:h-96 rounded-sm overflow-hidden bg-black/40 border border-[#C6A15B]/20 cursor-pointer shadow-lg"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                {/* Hover overlay hint */}
                <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white/80 group-hover:text-[#C6A15B] transition-colors">
                  <Eye className="w-4 h-4" />
                </div>

                {/* Caption */}
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-[#C6A15B] bg-[#263522]/80 px-2 py-0.5 rounded-xs border border-[#C6A15B]/20 inline-block mb-1">
                    {item.categoryLabel}
                  </span>
                  <h3 className="font-serif text-lg font-medium text-[#FFFDF8] group-hover:text-[#D9BD83] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#A5AD91] mt-1 line-clamp-1">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. The Dorry Experience */}
      <section className="py-20 lg:py-28 bg-[#35452E] text-[#FFFDF8] border-b border-[#C6A15B]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#C6A15B] uppercase block mb-3">
              Our Service Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FFFDF8] tracking-tight">
              The Dorry Experience
            </h2>
            <div className="w-16 h-0.5 bg-[#C6A15B] mx-auto mt-4 mb-4"></div>
            <p className="text-sm sm:text-base text-[#A5AD91] leading-relaxed">
              Every detail of your visit is curated to provide serenity, genuine hair health, and unwavering respect for your time and crown.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                icon: HeartHandshake,
                title: 'Personalised Hair Care',
                text: 'Every texture is unique. We evaluate your hair porosity, scalp state, and lifestyle before recommending styling.'
              },
              {
                icon: ShieldCheck,
                title: 'Professional Styling',
                text: 'Mastery in tension-free braiding, interlocking locs, and gentle silk press without irreversible heat damage.'
              },
              {
                icon: Compass,
                title: 'Attention to Detail',
                text: 'Clean geometric sectioning, hygienic sterilized implements, and delicate care for fragile perimeter edges.'
              },
              {
                icon: Sparkles,
                title: 'Natural Confidence',
                text: 'Empowering women to celebrate tight coils, soft waves, and rich authentic textures with radiance.'
              },
              {
                icon: Clock,
                title: 'Welcoming Atmosphere',
                text: 'A calm, elegant boutique salon on Ngong Road with flexible hours from 6:00 AM to 10:00 PM.'
              }
            ].map((exp, idx) => {
              const Icon = exp.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#263522] border border-[#C6A15B]/25 p-6 rounded-sm text-center flex flex-col items-center hover:border-[#C6A15B] transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-[#35452E] border border-[#C6A15B]/40 flex items-center justify-center text-[#D9BD83] mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-[#FFFDF8] mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-[#A5AD91] leading-relaxed">
                    {exp.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Meet the Founder */}
      <section className="py-20 lg:py-28 bg-[#F8F5EE] text-[#24251F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Founder Portrait */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                <div className="absolute -inset-3 border-2 border-[#C6A15B]/50 rounded-sm pointer-events-none transform rotate-1 hidden sm:block"></div>
                <div className="relative rounded-sm overflow-hidden shadow-2xl bg-[#263522]">
                  <img
                    src="/images/dorry-style-3.png"
                    alt={SALON_INFO.founder}
                    className="w-full h-[450px] sm:h-[500px] object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[10px] tracking-widest uppercase text-[#D9BD83] block">
                      Founder & Creative Director
                    </span>
                    <h3 className="font-serif text-2xl font-medium">
                      {SALON_INFO.founder}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Biography & Story */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold tracking-[0.25em] text-[#C6A15B] uppercase block">
                Meet The Founder
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#263522] leading-tight">
                Passionate About African Hair. <br />
                <span className="italic font-light">Dedicated to Your Crown.</span>
              </h2>

              <p className="text-base sm:text-lg text-[#444] leading-relaxed">
                Founded by <strong>Dorcas Misboris</strong> in Nairobi, Dorry Hair Studio was born from a deep-rooted passion for helping women embrace, nourish, and celebrate their natural hair without compromise.
              </p>

              <blockquote className="border-l-2 border-[#C6A15B] pl-4 py-1 italic font-serif text-lg text-[#263522]">
                &ldquo;At Dorry Hair & Beauty, we believe healthy hair is beautiful hair. We combine professional hair care, creativity, and close attention to detail to help you maintain healthy, beautiful, and manageable hair.&rdquo;
              </blockquote>

              <p className="text-sm sm:text-base text-[#666] leading-relaxed">
                Serving clients around Ngong Road and greater Nairobi, Dorcas and her team have cultivated a welcoming salon environment where clients are listened to, hair textures are respected, and protective styles are engineered to promote sustainable growth.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => onOpenBooking()}
                  className="bg-[#C6A15B] hover:bg-[#D9BD83] text-[#24251F] font-semibold text-xs sm:text-sm tracking-wider uppercase px-6 py-3 rounded-sm shadow-md transition-all cursor-pointer"
                >
                  Book with Our Team
                </button>

                <button
                  onClick={() => {
                    setActivePage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="border border-[#263522]/30 hover:border-[#263522] text-[#263522] font-medium text-xs sm:text-sm tracking-wider uppercase px-6 py-3 rounded-sm transition-all cursor-pointer"
                >
                  Read Dorcas&apos; Story
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Striking Appointment CTA Banner */}
      <section className="relative py-20 lg:py-24 bg-[#263522] text-[#FFFDF8] overflow-hidden border-y border-[#C6A15B]/30">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C6A15B_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#35452E] border border-[#C6A15B]/40 rounded-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#D9BD83]">
              Special Offer: 15% Off First Visit
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#FFFDF8]">
            Your Next Beautiful Hair Day <br className="hidden sm:inline" />
            <span className="italic font-light text-[#D9BD83]">Starts Here.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#F8F5EE]/80 max-w-2xl mx-auto font-light leading-relaxed">
            Let us help you find a style and hair care experience that feels uniquely yours. Relax at our serene AppleWood Adams salon or consult with our stylists.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#C6A15B] hover:bg-[#D9BD83] text-[#24251F] font-semibold text-sm tracking-wider uppercase px-8 py-4 rounded-sm shadow-xl active:scale-95 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book an Appointment</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm tracking-wider uppercase px-7 py-4 rounded-sm shadow-xl active:scale-95 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat With Us on WhatsApp</span>
            </a>
          </div>

          <p className="text-xs text-[#A5AD91] pt-2">
            Prefer to call? Speak directly with our reception: <a href={`tel:${SALON_INFO.phonePrimary.replace(/\s+/g, '')}`} className="text-[#FFFDF8] underline font-medium">{SALON_INFO.phonePrimary}</a>
          </p>
        </div>
      </section>

      {/* 11. Location and Contact Preview */}
      <section className="py-20 bg-[#FFFDF8] text-[#24251F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Details Box */}
            <div className="lg:col-span-5 bg-[#F8F5EE] border border-[#C6A15B]/30 p-8 sm:p-10 rounded-sm flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-semibold tracking-widest text-[#C6A15B] uppercase block mb-2">
                  Visit Our Studio
                </span>
                <h3 className="font-serif text-3xl font-medium text-[#263522]">
                  AppleWood Adams, Nairobi
                </h3>
                <div className="w-12 h-0.5 bg-[#C6A15B] my-4"></div>
                <p className="text-sm text-[#555] leading-relaxed">
                  Conveniently situated along Ngong Road with secure parking, serene ambiance, and private styling stations.
                </p>
              </div>

              <div className="space-y-4 text-sm text-[#333]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#263522]">Address</strong>
                    <span>{SALON_INFO.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#263522]">Studio Hours</strong>
                    <span>{SALON_INFO.hours.weekdays}</span>
                    <span className="block">{SALON_INFO.hours.weekends}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#263522]">Phone Contacts</strong>
                    <a href={`tel:${SALON_INFO.phonePrimary.replace(/\s+/g, '')}`} className="text-[#263522] hover:text-[#C6A15B] block font-medium">
                      {SALON_INFO.phonePrimary}
                    </a>
                    <a href={`tel:${SALON_INFO.phoneSecondary.replace(/\s+/g, '')}`} className="text-[#263522] hover:text-[#C6A15B] block">
                      {SALON_INFO.phoneSecondary}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={SALON_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#263522] hover:bg-[#35452E] text-[#FFFDF8] text-xs font-semibold tracking-wider uppercase py-3 px-5 rounded-sm transition-colors text-center"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>Get Directions</span>
                </a>

                <button
                  onClick={() => {
                    setActivePage('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2 border border-[#263522]/30 hover:border-[#263522] text-[#263522] text-xs font-semibold tracking-wider uppercase py-3 px-5 rounded-sm transition-colors text-center cursor-pointer"
                >
                  <span>Detailed Contact Page</span>
                </button>
              </div>
            </div>

            {/* Map / Visual Card */}
            <div className="lg:col-span-7 bg-[#263522] rounded-sm overflow-hidden border border-[#C6A15B]/30 relative flex flex-col justify-end min-h-[350px]">
              <img
                src="/images/hero2.png"
                alt="AppleWood Adams Salon Area"
                className="absolute inset-0 w-full h-full object-cover filter brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#263522] via-[#263522]/40 to-transparent"></div>

              <div className="relative z-10 p-8 sm:p-10 text-[#FFFDF8]">
                <span className="text-[10px] tracking-widest uppercase text-[#D9BD83] font-semibold block mb-1">
                  Location Highlights
                </span>
                <h4 className="font-serif text-2xl font-medium mb-2">
                  Sanctuary of Natural Hair Artistry
                </h4>
                <p className="text-xs sm:text-sm text-[#A5AD91] max-w-lg mb-4">
                  Easily accessible along Ngong Road, Adams Arcade vicinity. Early morning appointments available starting at 6:00 AM for professionals on the go.
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href={SALON_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#D9BD83] hover:text-white underline"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
