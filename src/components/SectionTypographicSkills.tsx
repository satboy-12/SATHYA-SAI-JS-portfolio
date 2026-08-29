import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { EditorialImage } from './EditorialImage';

interface SkillItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  stack: string[];
  image: string;
}

export const SectionTypographicSkills: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number>(0);

  const skillsList: SkillItem[] = [
    {
      id: 'cybersecurity',
      name: 'CYBERSECURITY',
      subtitle: 'Zero-Trust Architecture & Threat Mitigation',
      description: 'Defensive perimeter architecture, real-time packet telemetry via Wireshark, OWASP Top 10 hardening, and military-grade AES-256 / RSA cryptographic isolation.',
      stack: ['Kali Linux', 'Wireshark', 'Metasploit', 'OWASP Top 10', 'AES-256 / RSA-4096', 'Packet Telemetry'],
      image: '/images/cyber_shield_core_1787052350028.jpg',
    },
    {
      id: 'web-development',
      name: 'WEB DEVELOPMENT',
      subtitle: 'Scalable Full-Stack Web Architecture',
      description: 'High-throughput enterprise platforms engineered with React 19, TypeScript, Node.js, Express, and Redis caching for sub-180ms response speed at BSRocks.',
      stack: ['React 19', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'PostgreSQL', 'Redis'],
      image: '/images/cyber_workspace_1787052364862.jpg',
    },
    {
      id: 'app-development',
      name: 'APP DEVELOPMENT',
      subtitle: 'Cross-Platform Mobile Engineering',
      description: 'Native-feel iOS & Android applications with React Native and Expo, integrating hardware biometric keystores (FaceID / Fingerprint) and offline-first SQLite cache.',
      stack: ['React Native', 'Expo', 'Reanimated 3', 'SQLite', 'Biometric Enclave', 'Gesture Physics'],
      image: '/images/project_firmware_ui_1787069039612.jpg',
    },
    {
      id: 'data-analytics',
      name: 'DATA ANALYTICS',
      subtitle: 'Power BI DAX & Predictive Pipelines',
      description: 'Certified relational star-schema data modeling, complex DAX time-intelligence metrics, and automated Python EDA workflows for executive intelligence.',
      stack: ['Power BI (DAX)', 'Google Data Analytics', 'SQL Indexing', 'Python (Pandas)', 'Star-Schema'],
      image: '/images/project_ai_lead_ui_1787069025615.jpg',
    },
    {
      id: 'entrepreneurship',
      name: 'ENTREPRENEURSHIP',
      subtitle: 'Venture Leadership & Product Direction',
      description: 'Technical leadership and business development as Partner at Zenvy Media, scaling digital ventures and transforming tech opportunities into sustainable revenue.',
      stack: ['Venture Strategy', 'Product Architecture', 'Revenue Operations', 'Agile Leadership'],
      image: '/images/arch_workspace_warm_1787069059927.jpg',
    },
    {
      id: 'digital-marketing',
      name: 'DIGITAL MARKETING',
      subtitle: 'Performance Funnels & 5-Phase Growth',
      description: 'Data-driven customer acquisition, conversion funnel optimization, SEO architecture, and content engines reaching over 500K+ organic impressions.',
      stack: ['Omni-Channel Acquisition', 'Funnel Optimization', 'SEO & Analytics', '5-Phase Growth Blueprint'],
      image: '/images/sathya_burgundy_about_1787069012646.jpg',
    },
  ];

  const currentSkill = skillsList[hoveredIdx];

  return (
    <section
      id="skills"
      className="relative w-full py-24 sm:py-32 lg:py-40 px-6 sm:px-12 lg:px-20 bg-[#FAF8F5] text-[#11110F] select-none border-b border-[#11110F]/10 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto space-y-16 sm:space-y-24">
        {/* Editorial Sub-Index */}
        <div className="w-full flex items-center justify-between pb-6 border-b border-[#11110F]/10 text-xs font-mono-subtle uppercase tracking-[0.25em] text-[#11110F]/60">
          <div className="flex items-center gap-3">
            <span className="text-[#B39A6A] font-bold">02 / CAPABILITIES</span>
            <span>&bull;</span>
            <span>SPECIALIZED DISCIPLINES</span>
          </div>
          <div className="hidden sm:inline text-[#777A5A]">
            HOVER TO EXPLORE SPECIFICATION
          </div>
        </div>

        {/* Section Headline */}
        <div>
          <span className="text-xs font-mono-subtle uppercase tracking-[0.3em] text-[#777A5A] block mb-2 font-semibold">
            AREAS OF MASTERY
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-sans-clean font-extrabold uppercase text-[#11110F] tracking-tight">
            DISCIPLINE &amp; <span className="font-serif-editorial italic font-normal text-[#B39A6A]">CRAFT.</span>
          </h2>
        </div>

        {/* Large Typographic List Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Typographic Horizontal List */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-[#11110F]/10">
            {skillsList.map((skill, idx) => {
              const isHovered = hoveredIdx === idx;
              return (
                <div
                  key={skill.id}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onClick={() => setHoveredIdx(idx)}
                  className={`py-6 sm:py-8 transition-all duration-300 cursor-pointer group flex flex-col space-y-2 ${
                    isHovered ? 'opacity-100 pl-4 bg-[#F4F1E8]' : 'opacity-45 hover:opacity-85 pl-0'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span className="text-xs font-mono-subtle text-[#B39A6A] font-semibold">
                        0{idx + 1}
                      </span>
                      <h3
                        className={`text-2xl sm:text-4xl md:text-5xl font-sans-clean font-black uppercase tracking-tight transition-colors duration-300 ${
                          isHovered ? 'text-[#11110F]' : 'text-[#11110F]/70'
                        }`}
                      >
                        {skill.name}
                      </h3>
                    </div>

                    <ArrowUpRight
                      size={24}
                      className={`transition-transform duration-300 ${
                        isHovered ? 'text-[#B39A6A] translate-x-1 -translate-y-1' : 'text-[#11110F]/20'
                      }`}
                    />
                  </div>

                  {/* Inline description on mobile viewports */}
                  <div className={`lg:hidden space-y-2 pt-2 ${isHovered ? 'block' : 'hidden'}`}>
                    <p className="text-xs text-[#11110F]/80 leading-relaxed font-light">
                      {skill.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {skill.stack.map((s) => (
                        <span
                          key={s}
                          className="text-[10px] font-mono-subtle px-2 py-0.5 rounded bg-[#11110F]/5 text-[#777A5A]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Dynamic Photographic & Technical Inspector (Desktop) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSkill.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 rounded-3xl bg-[#F4F1E8] border border-[#11110F]/15 space-y-6 shadow-xl"
              >
                {/* Visual Image Preview with Fallback */}
                <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#11110F] border border-[#11110F]/10 relative group">
                  <EditorialImage
                    src={currentSkill.image}
                    alt={currentSkill.name}
                    fallbackSrc="/sathya-profile.jpeg"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11110F]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-xs font-mono-subtle text-[#F4F1E8]">
                    <span className="text-[10px] uppercase text-[#DFC89D] block">DISCIPLINE 0{hoveredIdx + 1}</span>
                    <span className="font-semibold">{currentSkill.subtitle}</span>
                  </div>
                </div>

                {/* Narrative Specification */}
                <div className="space-y-2">
                  <h4 className="text-lg font-sans-clean font-bold text-[#11110F]">
                    {currentSkill.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#11110F]/80 font-sans-clean font-light leading-relaxed">
                    {currentSkill.description}
                  </p>
                </div>

                {/* Stack Tags */}
                <div className="pt-4 border-t border-[#11110F]/10 space-y-2">
                  <span className="text-[10px] font-mono-subtle uppercase tracking-widest text-[#777A5A] block font-semibold">
                    CORE TECHNOLOGIES &amp; TOOLING
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentSkill.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#11110F]/10 text-xs font-mono-subtle text-[#11110F]/90"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
