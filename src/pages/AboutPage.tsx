import React from 'react';
import { Sparkles, Calendar, Heart, Shield, CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface AboutPageProps {
  onOpenBooking: (serviceName?: string) => void;
  setActivePage: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking, setActivePage }) => {
  const whatsappUrl = `https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hello Dorry Hair Studio, I would like to enquire about your services and book an appointment.'
  )}`;

  return (
    <div className="bg-[#FFFDF8] text-[#24251F]">
      {/* Editorial Header Banner */}
      <section className="relative bg-[#263522] text-[#FFFDF8] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero3.png"
            alt="Dorry Hair Studio - About"
            className="w-full h-full object-cover object-center filter brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#263522] via-[#263522]/70 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#C6A15B] uppercase block">
            Our Heritage & Ethos
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FFFDF8]">
            Where You Can Relax <br />
            <span className="italic font-light text-[#D9BD83]">&amp; Celebrate Your Crown.</span>
          </h1>
          <div className="w-16 h-0.5 bg-[#C6A15B] mx-auto my-4"></div>
          <p className="text-base sm:text-lg text-[#F8F5EE]/80 max-w-2xl mx-auto font-light leading-relaxed">
            Welcome to Dorry Hair Studio, a sanctuary for natural African hair health, protective styling artistry, and personalized beauty care in Nairobi, Kenya.
          </p>
        </div>
      </section>

      {/* Chapter 1: The Dorry Philosophy */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold tracking-widest text-[#C6A15B] uppercase block">
              Chapter 01 • The Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#263522] leading-tight">
              &ldquo;Healthy Hair is Beautiful Hair.&rdquo;
            </h2>
            <div className="w-16 h-0.5 bg-[#C6A15B]"></div>

            <p className="text-base sm:text-lg text-[#444] leading-relaxed">
              At Dorry Hair Studio, we operate on a clear conviction: the foundation of breathtaking hair styling is authentic strand health. When your scalp is clean, your follicles stimulated, and your moisture balance carefully maintained, your natural hair thrives effortlessly.
            </p>

            <p className="text-sm sm:text-base text-[#666] leading-relaxed">
              Serving clients from our serene salon at AppleWood Adams along Ngong Road, Nairobi, we are deeply passionate about helping women embrace, nourish, and celebrate their natural coils and curls without relying on harsh chemicals or excessive damaging heat.
            </p>

            <div className="pt-2 space-y-3">
              {[
                'Honoring natural curl patterns and delicate strand density',
                'Zero scalp tension to eliminate traction-related hair loss',
                'Nourishing moisture infusions using premium botanical formulas'
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-[#263522]">
                  <CheckCircle className="w-4 h-4 text-[#C6A15B] shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-sm overflow-hidden shadow-2xl bg-[#263522]">
              <img
                src="/images/dalia-natural.png"
                alt="Natural hair care philosophy"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs tracking-widest uppercase text-[#D9BD83]">
                  AppleWood Adams • Nairobi
                </p>
                <p className="font-serif text-lg font-medium">
                  Personalized Natural Hair Journeys
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2: The Founder's Story (Dorcas Misboris) */}
      <section className="py-20 lg:py-28 bg-[#F8F5EE] border-y border-[#C6A15B]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual Portrait */}
            <div className="lg:col-span-5 order-2 lg:order-1 relative">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                <div className="absolute -inset-4 border-2 border-[#C6A15B]/40 rounded-sm pointer-events-none transform -rotate-2"></div>
                <div className="relative rounded-sm overflow-hidden shadow-2xl bg-[#263522]">
                  <img
                    src="/images/dorry123.png"
                    alt="Dorcas Misboris - Founder"
                    className="w-full h-[500px] object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[10px] tracking-widest uppercase text-[#D9BD83] block">
                      Founder & Lead Hair Artist
                    </span>
                    <h3 className="font-serif text-2xl font-medium">
                      {SALON_INFO.founder}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Founder Biography */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <span className="text-xs font-semibold tracking-widest text-[#C6A15B] uppercase block">
                Chapter 02 • Founder&apos;s Profile
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#263522] leading-tight">
                Meet Dorcas Misboris
              </h2>
              <div className="w-16 h-0.5 bg-[#C6A15B]"></div>

              <p className="text-base sm:text-lg text-[#444] leading-relaxed">
                Dorcas Misboris established Dorry Hair Studio with a singular mission: to provide African women in Nairobi with an uncompromised luxury hair care experience grounded in warmth, artistry, and genuine hair preservation.
              </p>

              <p className="text-sm sm:text-base text-[#666] leading-relaxed">
                Witnessing countless women struggle with damaged edges, aggressive salon detangling, and dry, brittle coils, Dorcas developed a specialized salon protocol focused on hydration steam treatments, gentle finger-detangling, and tension-free protective installations.
              </p>

              <blockquote className="border-l-2 border-[#C6A15B] pl-4 py-2 italic font-serif text-lg text-[#263522] bg-white/60 p-4 rounded-r-sm">
                &ldquo;Whether you are looking for a natural hair salon in Nairobi, protective styling, hair treatments, or a restorative beauty experience, Dorry Hair &amp; Beauty is ready to welcome you home.&rdquo;
              </blockquote>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => onOpenBooking()}
                  className="bg-[#C6A15B] hover:bg-[#D9BD83] text-[#24251F] font-semibold text-xs sm:text-sm tracking-wider uppercase px-7 py-3.5 rounded-sm shadow-md transition-all cursor-pointer"
                >
                  Book with Dorcas &amp; Team
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#263522]/30 hover:border-[#263522] text-[#263522] font-medium text-xs sm:text-sm tracking-wider uppercase px-6 py-3.5 rounded-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 3: Our Core Pillars */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest text-[#C6A15B] uppercase block mb-3">
            What Sets Us Apart
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#263522]">
            Our Four Cornerstones
          </h2>
          <div className="w-16 h-0.5 bg-[#C6A15B] mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              number: '01',
              title: 'Healthy Hair First',
              desc: 'We never sacrifice the health of your scalp or edges for temporary aesthetics. Every style is engineered for longevity.'
            },
            {
              number: '02',
              title: 'Creativity & Artistry',
              desc: 'From intricate Sisterlocs and crisp cornrow lines to flowing passion twists, our styling is executed with editorial precision.'
            },
            {
              number: '03',
              title: 'Sanctuary & Serenity',
              desc: 'Step into a calm, welcoming environment on Ngong Road designed for your total relaxation and renewal.'
            },
            {
              number: '04',
              title: 'Punctuality & Respect',
              desc: 'We honor your schedule. Our team operates by dedicated appointment slots so you never experience endless salon waiting.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-8 bg-[#F8F5EE] border border-[#C6A15B]/30 rounded-sm relative hover:border-[#C6A15B] transition-colors"
            >
              <span className="font-serif text-3xl font-light text-[#C6A15B] block mb-3">
                {item.number}
              </span>
              <h3 className="font-serif text-xl font-medium text-[#263522] mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="bg-[#263522] text-[#FFFDF8] py-16 px-4 sm:px-6 lg:px-8 text-center border-t border-[#C6A15B]/30">
        <div className="max-w-3xl mx-auto space-y-5">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#FFFDF8]">
            Experience the Dorry Standard
          </h2>
          <p className="text-sm sm:text-base text-[#F8F5EE]/80 leading-relaxed max-w-xl mx-auto">
            Ready to love your hair again? Schedule your appointment at AppleWood Adams and enjoy 15% off your first visit.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 bg-[#C6A15B] hover:bg-[#D9BD83] text-[#24251F] font-semibold text-xs sm:text-sm tracking-wider uppercase px-8 py-3.5 rounded-sm shadow-md transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book an Appointment</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
