import React, { useState } from 'react';
import { BookOpen, Sparkles, Check, ArrowRight, Shield, Droplets, Moon, Sun } from 'lucide-react';
import { HAIR_CARE_ARTICLES } from '../data/salonData';

interface HairCarePageProps {
  onOpenBooking: (serviceName?: string) => void;
  setActivePage: (page: string) => void;
}

export const HairCarePage: React.FC<HairCarePageProps> = ({ onOpenBooking, setActivePage }) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string>(HAIR_CARE_ARTICLES[0].id);

  const activeArticle =
    HAIR_CARE_ARTICLES.find((a) => a.id === selectedArticleId) || HAIR_CARE_ARTICLES[0];

  return (
    <div className="bg-[#FFFDF8] text-[#24251F]">
      {/* Header Banner */}
      <section className="relative bg-[#263522] text-[#FFFDF8] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero2.png"
            alt="Natural Hair Care Guidance"
            className="w-full h-full object-cover filter brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#263522] via-[#263522]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#C6A15B] uppercase block">
            Natural Hair Education
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FFFDF8]">
            Hair Care &amp; Health Wisdom
          </h1>
          <div className="w-16 h-0.5 bg-[#C6A15B] mx-auto my-3"></div>
          <p className="text-sm sm:text-base text-[#F8F5EE]/80 max-w-xl mx-auto font-light leading-relaxed">
            Expert guidance on maintaining healthy moisture, tension-free protective styling, and nighttime hair protection tailored for African textures in Nairobi&apos;s climate.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quick Highlights Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 bg-[#F8F5EE] border border-[#C6A15B]/25 rounded-sm flex items-start gap-4">
            <div className="p-3 bg-[#263522] text-[#D9BD83] rounded-sm shrink-0">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-medium text-[#263522] mb-1">
                Moisture First
              </h3>
              <p className="text-xs text-[#666] leading-relaxed">
                Water is the ultimate hydrator. Creams and natural oils seal water in; they do not replace it.
              </p>
            </div>
          </div>

          <div className="p-6 bg-[#F8F5EE] border border-[#C6A15B]/25 rounded-sm flex items-start gap-4">
            <div className="p-3 bg-[#263522] text-[#D9BD83] rounded-sm shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-medium text-[#263522] mb-1">
                Zero Scalp Tension
              </h3>
              <p className="text-xs text-[#666] leading-relaxed">
                Protective styles should never pinch or pull at edges. Tension compromises follicle health.
              </p>
            </div>
          </div>

          <div className="p-6 bg-[#F8F5EE] border border-[#C6A15B]/25 rounded-sm flex items-start gap-4">
            <div className="p-3 bg-[#263522] text-[#D9BD83] rounded-sm shrink-0">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-medium text-[#263522] mb-1">
                Nighttime Silk Routine
              </h3>
              <p className="text-xs text-[#666] leading-relaxed">
                Always sleep in a satin or silk bonnet to protect moisture and prevent friction breakage.
              </p>
            </div>
          </div>
        </div>

        {/* Editorial Articles Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Sidebar Article List */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-serif text-xl font-medium text-[#263522] pb-2 border-b border-[#C6A15B]/20">
              Care Guides
            </h3>
            {HAIR_CARE_ARTICLES.map((article) => (
              <button
                key={article.id}
                onClick={() => setSelectedArticleId(article.id)}
                className={`w-full text-left p-4 rounded-sm border transition-all cursor-pointer ${
                  selectedArticleId === article.id
                    ? 'bg-[#263522] text-[#FFFDF8] border-[#C6A15B]'
                    : 'bg-[#F8F5EE] text-[#24251F] border-[#C6A15B]/20 hover:bg-[#EAE4D5]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] tracking-wider uppercase mb-1">
                  <span className={selectedArticleId === article.id ? 'text-[#C6A15B]' : 'text-[#888]'}>
                    {article.category}
                  </span>
                  <span className={selectedArticleId === article.id ? 'text-[#A5AD91]' : 'text-[#999]'}>
                    {article.readTime}
                  </span>
                </div>
                <h4 className="font-serif text-base font-medium leading-snug">
                  {article.title}
                </h4>
              </button>
            ))}

            {/* Quick Consultation Callout */}
            <div className="p-6 bg-[#263522] text-[#FFFDF8] rounded-sm mt-6 border border-[#C6A15B]/30 space-y-3">
              <Sparkles className="w-5 h-5 text-[#C6A15B]" />
              <h4 className="font-serif text-lg font-medium">
                Need a Personalized Hair Consultation?
              </h4>
              <p className="text-xs text-[#A5AD91] leading-relaxed">
                Visit us at AppleWood Adams for an in-person assessment of your curl porosity and scalp health.
              </p>
              <button
                onClick={() => onOpenBooking('Consultation & Custom Styling')}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#C6A15B] hover:bg-[#D9BD83] text-[#24251F] text-xs font-semibold uppercase tracking-wider py-2.5 rounded-sm transition-all cursor-pointer"
              >
                Book Consultation
              </button>
            </div>
          </div>

          {/* Active Article Viewer */}
          <div className="lg:col-span-8 bg-white border border-[#C6A15B]/25 p-8 sm:p-12 rounded-sm space-y-8">
            <div className="space-y-3 border-b border-[#F8F5EE] pb-6">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#C6A15B]">
                {activeArticle.category} • {activeArticle.readTime}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#263522] font-normal leading-tight">
                {activeArticle.title}
              </h2>
              <p className="text-sm sm:text-base text-[#666] italic">
                {activeArticle.subtitle}
              </p>
            </div>

            <p className="text-base text-[#333] leading-relaxed bg-[#F8F5EE] p-5 rounded-sm border-l-2 border-[#C6A15B]">
              {activeArticle.summary}
            </p>

            <div className="space-y-8">
              {activeArticle.content.map((sec, idx) => (
                <div key={idx} className="space-y-4">
                  <h3 className="font-serif text-2xl text-[#263522] font-medium">
                    {sec.heading}
                  </h3>

                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-sm sm:text-base text-[#555] leading-relaxed">
                      {p}
                    </p>
                  ))}

                  {sec.tips && sec.tips.length > 0 && (
                    <div className="bg-[#FFFDF8] border border-[#C6A15B]/30 p-5 rounded-sm space-y-2 mt-4">
                      <h4 className="text-xs font-semibold tracking-wider uppercase text-[#263522]">
                        Salon Stylist Recommendations:
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-[#444]">
                        {sec.tips.map((tip, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Related Service Bridge */}
            <div className="pt-6 border-t border-[#F8F5EE] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#888] block">Complementary Salon Service</span>
                <span className="font-serif text-lg text-[#263522] font-medium">
                  Intensive Moisture Steam Therapy
                </span>
              </div>
              <button
                onClick={() => onOpenBooking('Intensive Moisture Steam Infusion')}
                className="inline-flex items-center gap-2 bg-[#263522] hover:bg-[#35452E] text-[#FFFDF8] text-xs font-semibold tracking-wider uppercase py-2.5 px-5 rounded-sm transition-colors cursor-pointer"
              >
                <span>Book This Treatment</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C6A15B]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
