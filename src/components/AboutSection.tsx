import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Mail, Phone, MapPin, Calendar, User, Camera, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);
  const photos = [
    { src: portfolioData.photo, label: 'PORTRAIT .01' },
    { src: portfolioData.secondaryPhoto || portfolioData.photo, label: 'PHOTO .02' }
  ];

  return (
    <section id="about" className="py-24 sm:py-32 relative bg-[var(--bg)] border-t border-[var(--line)]">
      <div className="w-full max-w-[1300px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex items-baseline gap-4 mb-16 sm:mb-20">
          <span className="font-mono-code text-[0.72rem] text-[#ff7a29] tracking-[0.2em]">/ 01</span>
          <h2 className="font-disp font-bold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[var(--txt)]">
            About Me
          </h2>
          <span className="flex-1 h-[1px] bg-[var(--line)] self-center" />
          <span className="hidden sm:inline-block font-mono-code text-[0.72rem] text-[var(--dim)] tracking-[0.2em]">
            WHO AM I
          </span>
        </div>

        {/* 3-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr_0.8fr] gap-8 lg:gap-12 items-center">
          
          {/* Column 1: Copy & Headline */}
          <div className="space-y-6">
            <span className="font-mono-code text-xs uppercase tracking-[0.25em] text-[#ff7a29] block">
              Biography & Vision
            </span>
            
            <h3 className="font-disp font-bold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight leading-[1.12] text-[var(--txt)]">
              I turn code into <br />
              secure digital <br />
              <em className="not-italic text-[#ff7a29]">solutions.</em>
            </h3>

            <p className="text-[var(--mut)] text-base sm:text-lg leading-relaxed max-w-[48ch]">
              {portfolioData.aboutText}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#skills"
                className="inline-flex items-center gap-3 font-mono-code text-xs tracking-[0.18em] uppercase px-7 py-3.5 border border-[var(--line2)] text-[var(--txt)] rounded-sm hover:border-[#ff7a29] hover:text-[#ff7a29] transition-all duration-300 group"
              >
                <span>Explore Capabilities</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-3 font-mono-code text-xs tracking-[0.18em] uppercase px-6 py-3.5 bg-[var(--panel)] border border-[var(--line)] text-[var(--mut)] rounded-sm hover:border-[#ff7a29] hover:text-[var(--txt)] transition-all duration-300"
              >
                <span>View Works</span>
              </a>
            </div>
          </div>

          {/* Column 2: Cybernetic Portrait Frame */}
          <div className="space-y-3">
            <div className="relative aspect-[4/5] border border-[var(--line)] bg-[var(--panel)] overflow-hidden flex items-center justify-center group shadow-xl">
              {/* Background Wireframe Mesh SVG */}
              <svg
                className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
                viewBox="0 0 400 500"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M200 90c40 0 66 32 66 74 0 34-14 60-30 76l10 18c40 14 88 34 88 82v134H66v-134c0-48 48-68 88-82l10-18c-16-16-30-42-30-76 0-42 26-74 66-74z"
                  fill="none"
                  stroke="var(--line2)"
                  strokeWidth="1"
                />
                <path
                  d="M66 470L130 250M334 470L270 250M200 240v230M90 340h220M110 400h180"
                  stroke="var(--line)"
                  strokeWidth="1"
                />
                <circle
                  cx="200"
                  cy="164"
                  r="86"
                  fill="none"
                  stroke="rgba(255,122,41,0.15)"
                  strokeWidth="1"
                />
              </svg>

              {/* Profile Image with smooth transition */}
              <img
                key={activePhotoIdx}
                src={photos[activePhotoIdx].src}
                alt={portfolioData.fullName}
                className="w-full h-full object-cover relative z-1 transition-all duration-500 group-hover:scale-105"
              />

              {/* Scanning Laser Bar */}
              <div className="absolute left-0 right-0 h-[2px] bg-[linear-gradient(90deg,transparent,#ff7a29,transparent)] animate-scan opacity-85 z-10 pointer-events-none" />

              {/* Tag Chips */}
              <div className="absolute top-3 left-3 bg-[var(--bg2)]/90 backdrop-blur border border-[var(--line2)] px-2.5 py-1 font-mono-code text-[0.6rem] tracking-widest text-[#ff7a29] z-10">
                .ID — VERIFIED
              </div>

              <div className="absolute bottom-3 right-3 bg-[var(--bg2)]/90 backdrop-blur border border-[var(--line2)] px-2.5 py-1 font-mono-code text-[0.6rem] tracking-widest text-[var(--mut)] z-10">
                [ CYBER • SOFTWARE • DATA ]
              </div>
            </div>

            {/* Photo Selector Switcher */}
            <div className="flex items-center justify-between px-1">
              <span className="font-mono-code text-[0.65rem] text-[var(--dim)] tracking-wider">
                AUTHENTIC TELEMETRY CAPTURE
              </span>
              <div className="flex items-center gap-1.5">
                {photos.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhotoIdx(idx)}
                    className={`px-2.5 py-1 rounded-xs font-mono-code text-[0.65rem] tracking-wider transition-all cursor-pointer ${
                      activePhotoIdx === idx
                        ? 'bg-[#ff7a29] text-[#0b0b0e] font-bold shadow-[0_0_12px_rgba(255,122,41,0.4)]'
                        : 'bg-[var(--bg2)] text-[var(--mut)] border border-[var(--line)] hover:text-[var(--txt)] hover:border-[var(--line2)]'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Structured Information Panel */}
          <dl className="border border-[var(--line)] bg-[var(--panel)] p-6 sm:p-8 space-y-4">
            <div className="flex justify-between items-baseline gap-4 py-3.5 border-b border-[var(--line)]">
              <dt className="font-mono-code text-[0.68rem] tracking-[0.2em] uppercase text-[var(--dim)] flex items-center gap-2">
                <User className="w-3 h-3 text-[#ff7a29]" />
                <span>Name</span>
              </dt>
              <dd className="font-disp font-medium text-sm sm:text-base text-[var(--txt)] text-right">
                {portfolioData.fullName}
              </dd>
            </div>

            <div className="flex justify-between items-baseline gap-4 py-3.5 border-b border-[var(--line)]">
              <dt className="font-mono-code text-[0.68rem] tracking-[0.2em] uppercase text-[var(--dim)] flex items-center gap-2">
                <ShieldCheck className="w-3 h-3 text-[#ff7a29]" />
                <span>Focus</span>
              </dt>
              <dd className="font-disp font-medium text-xs sm:text-sm text-[var(--txt)] text-right">
                Cyber Security &bull; Dev &bull; Analytics
              </dd>
            </div>

            <div className="flex justify-between items-baseline gap-4 py-3.5 border-b border-[var(--line)]">
              <dt className="font-mono-code text-[0.68rem] tracking-[0.2em] uppercase text-[var(--dim)] flex items-center gap-2">
                <MapPin className="w-3 h-3 text-[#ff7a29]" />
                <span>Location</span>
              </dt>
              <dd className="font-disp font-medium text-xs sm:text-sm text-[var(--txt)] text-right">
                {portfolioData.location}
              </dd>
            </div>

            <div className="flex justify-between items-baseline gap-4 py-3.5 border-b border-[var(--line)]">
              <dt className="font-mono-code text-[0.68rem] tracking-[0.2em] uppercase text-[var(--dim)] flex items-center gap-2">
                <Mail className="w-3 h-3 text-[#ff7a29]" />
                <span>Email</span>
              </dt>
              <dd className="font-disp font-medium text-xs sm:text-sm text-[var(--txt)] text-right break-all">
                <a href={`mailto:${portfolioData.email}`} className="hover:text-[#ff7a29] transition-colors">
                  {portfolioData.email}
                </a>
              </dd>
            </div>

            <div className="flex justify-between items-baseline gap-4 py-3.5">
              <dt className="font-mono-code text-[0.68rem] tracking-[0.2em] uppercase text-[var(--dim)] flex items-center gap-2">
                <Phone className="w-3 h-3 text-[#ff7a29]" />
                <span>Phone</span>
              </dt>
              <dd className="font-disp font-medium text-xs sm:text-sm text-[var(--txt)] text-right">
                <a href={`tel:${portfolioData.phone.replace(/[^+\d]/g, '')}`} className="hover:text-[#ff7a29] transition-colors">
                  {portfolioData.phone}
                </a>
              </dd>
            </div>
          </dl>

        </div>
      </div>
    </section>
  );
};
