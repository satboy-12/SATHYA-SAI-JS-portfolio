import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Send } from 'lucide-react';
import { EditorialImage } from './EditorialImage';

interface SectionZenvyMediaStudioProps {
  onContactClick: () => void;
}

export const SectionZenvyMediaStudio: React.FC<SectionZenvyMediaStudioProps> = ({ onContactClick }) => {
  const growthPillars = [
    { phase: '01', title: 'Content Engine', description: 'High-aesthetic storytelling and technical authority assets that command audience mindshare.' },
    { phase: '02', title: 'Audience Architecture', description: 'Algorithmic distribution, multi-touch retargeting, and targeted community aggregation.' },
    { phase: '03', title: 'Engagement Telemetry', description: 'Sub-second interaction capture, behavioral funnels, and qualitative retention loops.' },
    { phase: '04', title: 'Performance Marketing', description: 'Precision paid acquisition, SEO indexing, and CAC-to-LTV multiplier engines.' },
    { phase: '05', title: 'Compounding Growth', description: 'Automated conversion infrastructure and sustainable organic momentum.' },
  ];

  return (
    <section
      id="zenvy-media"
      className="relative w-full py-24 sm:py-32 lg:py-40 px-6 sm:px-12 lg:px-20 bg-[#11110F] text-[#F4F1E8] select-none border-b border-[#F4F1E8]/10 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto space-y-20 sm:space-y-28">
        {/* Editorial Sub-Index */}
        <div className="w-full flex items-center justify-between pb-6 border-b border-[#F4F1E8]/10 text-xs font-mono-subtle uppercase tracking-[0.25em] text-[#F4F1E8]/60">
          <div className="flex items-center gap-3">
            <span className="text-[#B39A6A] font-bold">04 / VENTURE STUDIO</span>
            <span>&bull;</span>
            <span>ZENVY MEDIA</span>
          </div>
          <div className="flex items-center gap-2 text-[#DFC89D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B39A6A] animate-pulse" />
            <span>PARTNER &amp; TECHNICAL DIRECTOR</span>
          </div>
        </div>

        {/* Narrative & Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7 space-y-8">
            <span className="text-xs font-mono-subtle uppercase tracking-[0.3em] text-[#B39A6A] block font-semibold">
              VENTURE ACCELERATION &amp; PERFORMANCE MARKETING
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-sans-clean font-extrabold uppercase text-[#F4F1E8] tracking-tight leading-[1.02]">
              ACCELERATING BRANDS THROUGH <span className="font-serif-editorial italic font-normal text-[#DFC89D]">CREATIVE ENGINEERING.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#F4F1E8]/75 font-sans-clean font-light leading-relaxed">
              At <strong className="text-[#F4F1E8] font-semibold">Zenvy Media</strong>, I serve as Partner &amp; Technical Director, steering digital marketing pipelines, conversion funnels, and enterprise brand scaling. We unite data telemetry with world-class design to build compounding growth engines for modern founders and enterprises.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-[#F4F1E8]/10">
              <div>
                <span className="text-3xl sm:text-4xl font-serif-editorial italic text-[#DFC89D] block">500K+</span>
                <span className="text-[10px] sm:text-xs font-mono-subtle text-[#F4F1E8]/60 uppercase tracking-wider">Organic Reach</span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-serif-editorial italic text-[#DFC89D] block">+42.6%</span>
                <span className="text-[10px] sm:text-xs font-mono-subtle text-[#F4F1E8]/60 uppercase tracking-wider">Conversion Uplift</span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-serif-editorial italic text-[#DFC89D] block">12+</span>
                <span className="text-[10px] sm:text-xs font-mono-subtle text-[#F4F1E8]/60 uppercase tracking-wider">Partner Brands</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onContactClick}
                className="px-7 py-3.5 rounded-full bg-[#F4F1E8] hover:bg-[#B39A6A] text-[#11110F] font-sans-clean font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow hover:scale-105 cursor-pointer flex items-center gap-2"
              >
                <Send size={13} />
                <span>INQUIRE FOR VENTURE CONSULTING</span>
              </button>
            </div>
          </div>

          {/* Visual Workspace & Growth Framework */}
          <div className="lg:col-span-5 space-y-6">
            <div className="w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-[#292924] border border-[#F4F1E8]/15 relative group">
              <EditorialImage
                src="/images/arch_workspace_warm_1787069059927.jpg"
                alt="Zenvy Media Creative Direction"
                fallbackSrc="/sathya-profile.jpeg"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11110F]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono-subtle text-[#F4F1E8]">
                <span>ZENVY MEDIA &bull; VENTURE PARTNERSHIP</span>
                <ArrowUpRight size={16} className="text-[#DFC89D]" />
              </div>
            </div>
          </div>
        </div>

        {/* 5-Phase Growth Methodology Timeline */}
        <div className="space-y-6 pt-6">
          <div className="text-xs font-mono-subtle uppercase tracking-[0.25em] text-[#B39A6A] font-semibold">
            THE 5-PHASE BRAND ACCELERATION BLUEPRINT
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 pt-4 border-t border-[#F4F1E8]/10">
            {growthPillars.map((p, idx) => (
              <div key={idx} className="space-y-2 group">
                <span className="text-xs font-mono-subtle text-[#B39A6A] font-bold block">{p.phase}</span>
                <h4 className="text-base font-sans-clean font-bold text-[#F4F1E8] group-hover:text-[#DFC89D] transition-colors">
                  {p.title}
                </h4>
                <p className="text-xs text-[#F4F1E8]/60 font-light leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
