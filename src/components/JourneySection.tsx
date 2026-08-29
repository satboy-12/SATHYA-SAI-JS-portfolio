import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '../data/portfolioData';

export const JourneySection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [fillProgress, setFillProgress] = useState(0);

  const experience = portfolioData.experience;

  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const midPoint = window.innerHeight * 0.6;

      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const progress = Math.min(Math.max((midPoint - rect.top) / rect.height, 0), 1);
        setFillProgress(progress);

        const targetIdx = Math.min(Math.floor(progress * experience.length), experience.length - 1);
        if (targetIdx >= 0) {
          setActiveIdx(targetIdx);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [experience.length]);

  const currentMilestone = experience[activeIdx] || experience[0];

  return (
    <section id="journey" className="py-24 sm:py-32 relative bg-[var(--bg2)] border-t border-[var(--line)]">
      <div className="w-full max-w-[1300px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex items-baseline gap-4 mb-16 sm:mb-20">
          <span className="font-mono-code text-[0.72rem] text-[#ff7a29] tracking-[0.2em]">/ 04</span>
          <h2 className="font-disp font-bold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[var(--txt)]">
            My Journey
          </h2>
          <span className="flex-1 h-[1px] bg-[var(--line)] self-center" />
          <span className="hidden sm:inline-block font-mono-code text-[0.72rem] text-[var(--dim)] tracking-[0.2em]">
            TIMELINE
          </span>
        </div>

        {/* Horizontal Timeline Track */}
        <div ref={trackRef} className="relative h-[90px] sm:h-[110px] mb-10">
          {/* Base Track Line */}
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[var(--line)] -translate-y-1/2" />
          
          {/* Active Fill Line */}
          <div
            className="absolute top-1/2 left-0 h-[2px] bg-[linear-gradient(90deg,#ff7a29,rgba(255,122,41,0.3))] -translate-y-1/2 transition-all duration-300 ease-out shadow-[0_0_12px_#ff7a29]"
            style={{ width: `${Math.max(8, fillProgress * 100)}%` }}
          />

          {/* Timeline Nodes */}
          <div className="absolute inset-0 flex justify-between items-center px-[2%] sm:px-[4%]">
            {experience.map((node, index) => {
              const isActive = activeIdx === index;
              return (
                <button
                  key={`${node.year}-${node.title}-${index}`}
                  onClick={() => setActiveIdx(index)}
                  className={`relative w-11 h-11 sm:w-14 sm:h-14 rounded-full border flex items-center justify-center font-mono-code text-[0.6rem] sm:text-[0.68rem] tracking-wider transition-all duration-400 cursor-pointer z-10 ${
                    isActive
                      ? 'bg-[#ff7a29] text-[#0b0b0e] border-[#ff7a29] font-bold shadow-[0_0_30px_rgba(255,122,41,0.7)] scale-110'
                      : 'bg-[var(--bg2)] text-[var(--mut)] border-[var(--line2)] hover:border-[#ff7a29] hover:text-[var(--txt)]'
                  }`}
                  aria-label={`View milestone for ${node.year}`}
                >
                  {/* Glowing Pulse Halo on Active Node */}
                  {isActive && (
                    <span className="absolute -inset-2.5 rounded-full border border-[rgba(255,122,41,0.4)] animate-pulse-halo pointer-events-none" />
                  )}
                  <span>{node.year.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Milestone Detail Card with Transition */}
        <div className="min-h-[190px] border border-[var(--line)] bg-[var(--panel)] p-6 sm:p-10 shadow-xl transition-all duration-300 relative overflow-hidden">
          {/* Subtle Ambient Corner Accent */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle_at_top_right,rgba(255,122,41,0.12),transparent_70%)] pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 items-baseline">
            {/* Year Column */}
            <div>
              <span className="font-mono-code font-bold text-lg sm:text-2xl text-[#ff7a29] tracking-widest block">
                {currentMilestone.year}
              </span>
              {currentMilestone.subtitle && (
                <span className="font-mono-code text-xs text-[var(--dim)] tracking-wider mt-1 block">
                  {currentMilestone.subtitle}
                </span>
              )}
            </div>

            {/* Content Column */}
            <div className="space-y-3">
              <h3 className="font-disp font-semibold text-xl sm:text-2xl uppercase tracking-wide text-[var(--txt)]">
                {currentMilestone.title}
              </h3>
              <p className="text-[var(--mut)] text-sm sm:text-base leading-relaxed max-w-[65ch]">
                {currentMilestone.description || currentMilestone.desc}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
