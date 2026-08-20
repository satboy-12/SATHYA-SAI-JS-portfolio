import React from 'react';
import { PORTFOLIO_PROFILE } from '../data/portfolioData';
import { Shield, Code2, LineChart, Sparkles } from 'lucide-react';
import { cyberAudio } from '../utils/soundEngine';
import { ProfileImage } from './ProfileImage';

export const AboutSection: React.FC = () => {
  const pillarIcons: Record<string, React.ReactNode> = {
    secure: <Shield className="w-5 h-5 text-[#D6B47A]" />,
    develop: <Code2 className="w-5 h-5 text-[#D6B47A]" />,
    analyze: <LineChart className="w-5 h-5 text-[#D6B47A]" />,
    innovate: <Sparkles className="w-5 h-5 text-[#D6B47A]" />,
  };

  return (
    <section id="about" className="relative w-full bg-[#F9F6F0] text-[#120D0E] overflow-hidden select-none">
      
      {/* 1. TOP EDITORIAL PART: ABOUT ME & PORTRAIT CROP */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Editorial Story & Signature */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#120D0E] tracking-tight">
                ABOUT ME
              </h2>
              <div className="font-mono text-xs sm:text-sm text-[#6E2634] tracking-widest uppercase font-bold">
                CYBER SECURITY ENGINEER · SOFTWARE DEVELOPER · DATA ANALYST
              </div>
            </div>

            <p className="text-base sm:text-lg text-[#120D0E]/80 leading-relaxed font-normal max-w-xl">
              {PORTFOLIO_PROFILE.bio}
            </p>

            <p className="text-sm sm:text-base text-[#120D0E]/70 leading-relaxed max-w-xl">
              My engineering philosophy revolves around zero-trust defensive architecture, scalable high-performance backend pipelines, and analytical data telemetry that turns complexity into intuitive intelligence.
            </p>

            {/* Elegant Signature Script */}
            <div className="pt-4 flex flex-col items-start gap-1">
              <div className="font-serif italic text-3xl sm:text-4xl text-[#6E2634] font-medium select-none transform -rotate-2">
                Sathya Sai JS
              </div>
              <div className="w-24 h-[1.5px] bg-[#D6B47A] mt-1" />
            </div>

          </div>

          {/* Right: Portrait Crop with Editorial Matrix Grid */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Background Dotted Matrix Grid */}
            <div className="absolute -top-6 -right-6 w-40 h-40 grid grid-cols-6 gap-2 opacity-30 pointer-events-none">
              {Array.from({ length: 36 }).map((_, i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#6E2634]" />
              ))}
            </div>

            {/* ProfileImage Component (About Variant) */}
            <ProfileImage
              variant="about"
              src={PORTFOLIO_PROFILE.images.aboutPortrait}
              alt="SATHYA SAI JS - Profile Portrait"
            />

          </div>

        </div>
      </div>

      {/* 2. MIDDLE DEEP WINE BANNER: 4 CORE PILLARS */}
      <div className="w-full bg-[#241517] text-white py-14 px-6 sm:px-12 border-y border-[#D6B47A]/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PORTFOLIO_PROFILE.pillars.map((pillar) => (
            <div
              key={pillar.id}
              onMouseEnter={() => cyberAudio.playKeyClick()}
              className="flex flex-col items-start space-y-3 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-[#D6B47A]/40 transition-all duration-300 group cursor-default"
            >
              <div className="p-3 rounded-lg bg-[#6E2634]/40 border border-[#D6B47A]/30 group-hover:scale-110 transition-transform">
                {pillarIcons[pillar.id]}
              </div>
              <div className="font-display font-bold text-lg text-[#D6B47A] tracking-wider">
                {pillar.title}
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. BOTTOM PART: MY JOURNEY HORIZONTAL TIMELINE */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16 lg:py-24">
        <div className="space-y-8">
          
          <div className="space-y-1">
            <h3 className="font-display font-black text-2xl sm:text-3xl text-[#120D0E] tracking-tight">
              MY JOURNEY
            </h3>
            <div className="w-12 h-1 bg-[#6E2634]" />
          </div>

          {/* Horizontal Connecting Timeline */}
          <div className="relative pt-4">
            
            {/* Horizontal Line across */}
            <div className="hidden md:block absolute top-[22px] left-0 right-0 h-[2px] bg-[#D6B47A]/40" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PORTFOLIO_PROFILE.timeline.map((item, idx) => (
                <div
                  key={item.period}
                  className="relative flex flex-col items-start space-y-2 bg-white md:bg-transparent p-5 md:p-0 rounded-xl md:rounded-none shadow-sm md:shadow-none border md:border-none border-[#D6B47A]/20"
                >
                  {/* Golden Node on the line */}
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded-full bg-[#6E2634] border-2 border-[#D6B47A] shadow-[0_0_8px_#D6B47A] z-10" />
                    <span className="font-mono text-xs font-bold text-[#6E2634] tracking-wider">
                      {item.period}
                    </span>
                  </div>

                  <div className="pt-1">
                    <div className="font-display font-bold text-base text-[#120D0E]">
                      {item.degree}
                    </div>
                    <div className="text-xs font-semibold text-[#120D0E]/80">
                      {item.institution}
                    </div>
                    <div className="text-xs text-[#120D0E]/60 pt-1">
                      {item.highlight}
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
