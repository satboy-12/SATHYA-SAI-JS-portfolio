import React from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_PROFILE } from '../data/portfolioData';

export const SectionEditorialJourney: React.FC = () => {
  const milestones = PORTFOLIO_PROFILE.milestones;

  return (
    <section
      id="journey"
      className="relative w-full py-24 sm:py-32 lg:py-40 px-6 sm:px-12 lg:px-20 bg-[#F4F1E8] text-[#11110F] select-none border-b border-[#11110F]/10 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto space-y-16 sm:space-y-24">
        {/* Editorial Sub-Index */}
        <div className="w-full flex items-center justify-between pb-6 border-b border-[#11110F]/10 text-xs font-mono-subtle uppercase tracking-[0.25em] text-[#11110F]/60">
          <div className="flex items-center gap-3">
            <span className="text-[#B39A6A] font-bold">05 / TIMELINE</span>
            <span>&bull;</span>
            <span>EXPERIENCE &amp; EDUCATION</span>
          </div>
          <div className="hidden sm:inline text-[#777A5A]">
            CHRONOLOGICAL RECORD
          </div>
        </div>

        {/* Section Headline */}
        <div>
          <span className="text-xs font-mono-subtle uppercase tracking-[0.3em] text-[#777A5A] block mb-2 font-semibold">
            ACADEMIC &amp; PROFESSIONAL TRAJECTORY
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-sans-clean font-extrabold uppercase text-[#11110F] tracking-tight">
            THE <span className="font-serif-editorial italic font-normal text-[#B39A6A]">PATH.</span>
          </h2>
        </div>

        {/* Editorial Timeline Rows */}
        <div className="w-full flex flex-col divide-y divide-[#11110F]/10">
          {milestones.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start group hover:bg-[#FAF8F5] px-2 sm:px-6 rounded-3xl transition-colors duration-300"
            >
              {/* Year & Category */}
              <div className="lg:col-span-3 space-y-1 font-mono-subtle">
                <span className="text-xs text-[#777A5A] uppercase tracking-wider block font-semibold">
                  {m.type}
                </span>
                <div className="text-3xl sm:text-4xl font-serif-editorial italic text-[#11110F]">
                  {m.year}
                </div>
              </div>

              {/* Title, Organization & Bio */}
              <div className="lg:col-span-5 space-y-2">
                <h3 className="text-2xl sm:text-3xl font-sans-clean font-bold uppercase text-[#11110F] group-hover:text-[#B39A6A] transition-colors duration-300">
                  {m.title}
                </h3>
                <div className="text-xs sm:text-sm font-mono-subtle text-[#777A5A]">
                  {m.subtitle}
                </div>
                <p className="text-xs sm:text-sm text-[#11110F]/75 font-light leading-relaxed pt-1">
                  {m.description}
                </p>
              </div>

              {/* Highlights Chips */}
              <div className="lg:col-span-4 flex flex-wrap gap-2 pt-2 lg:pt-0 lg:justify-end">
                {m.highlights.map((hl) => (
                  <span
                    key={hl}
                    className="px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#11110F]/10 text-xs font-mono-subtle text-[#11110F]/80"
                  >
                    {hl}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
