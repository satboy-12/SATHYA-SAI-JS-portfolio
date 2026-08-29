import React from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_PROFILE } from '../data/portfolioData';
import { EditorialImage } from './EditorialImage';

export const SectionAboutManifesto: React.FC = () => {
  const metrics = [
    { label: 'THREAT MITIGATION', value: '99.98%', detail: 'Zero-trust perimeter & cryptography' },
    { label: 'API TTFB VELOCITY', value: '< 180ms', detail: 'Edge-cached full-stack microservices' },
    { label: 'VENTURE REACH', value: '500K+', detail: '5-phase performance marketing reach' },
    { label: 'ACADEMIC RECORD', value: 'Anna Univ', detail: 'B.Tech Information Technology' },
  ];

  return (
    <section
      id="about"
      className="relative w-full py-24 sm:py-32 lg:py-40 px-6 sm:px-12 lg:px-20 bg-[#F4F1E8] text-[#11110F] select-none border-b border-[#11110F]/10 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto space-y-20 sm:space-y-28">
        {/* Editorial Sub-Index */}
        <div className="w-full flex items-center justify-between pb-6 border-b border-[#11110F]/10 text-xs font-mono-subtle uppercase tracking-[0.25em] text-[#11110F]/60">
          <div className="flex items-center gap-3">
            <span className="text-[#B39A6A] font-bold">01 / PHILOSOPHY</span>
            <span>&bull;</span>
            <span>STATEMENT &amp; PRINCIPLES</span>
          </div>
          <div className="hidden sm:inline text-[#777A5A]">
            SECURITY &bull; SOFTWARE &bull; DATA
          </div>
        </div>

        {/* Grand Editorial Statement */}
        <div className="space-y-12">
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-sans-clean font-extrabold tracking-tight text-[#11110F] uppercase leading-[0.92]"
            >
              I BUILD <br />
              <span className="font-serif-editorial italic font-normal text-[#B39A6A] normal-case">
                digital experiences.
              </span>
            </motion.h2>
          </div>

          {/* Editorial Narrative Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pt-6 border-t border-[#11110F]/10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-7 space-y-6"
            >
              <p className="text-lg sm:text-xl md:text-2xl text-[#11110F] font-sans-clean font-light leading-relaxed">
                I am <strong className="font-semibold text-[#11110F]">Sathya Sai JS</strong> — a Software Engineer at BSRocks, Partner at Zenvy Media, and Information Technology graduate from Anna University.
              </p>
              <p className="text-base sm:text-lg text-[#11110F]/75 font-sans-clean font-light leading-relaxed">
                My work spans zero-trust network defenses, real-time cryptographic isolation, high-throughput full-stack web platforms, and data analytics models in Power BI DAX. I view software engineering and defensive cybersecurity not as separate disciplines, but as symbiotic forces of resilience and speed.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 space-y-6"
            >
              {/* Profile Bio Snapshot */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] border border-[#11110F]/10 space-y-4 shadow-sm">
                <div className="text-xs font-mono-subtle uppercase tracking-widest text-[#B39A6A] font-semibold">
                  PRIMARY ROLES
                </div>
                <div className="space-y-3 font-sans-clean text-sm text-[#11110F]/85">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#B39A6A]" />
                    <span>Software Engineer &bull; <strong className="font-semibold">BSRocks</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#777A5A]" />
                    <span>Partner &amp; Technical Director &bull; <strong className="font-semibold">Zenvy Media</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#292924]" />
                    <span>B.Tech Information Technology &bull; <strong className="font-semibold">Anna University</strong></span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-[#11110F]/10">
          {metrics.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="space-y-1 group"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-serif-editorial italic text-[#11110F] group-hover:text-[#B39A6A] transition-colors">
                {m.value}
              </div>
              <div className="text-xs font-mono-subtle uppercase tracking-wider text-[#777A5A] font-semibold">
                {m.label}
              </div>
              <p className="text-xs text-[#11110F]/60 font-light pt-1">
                {m.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
