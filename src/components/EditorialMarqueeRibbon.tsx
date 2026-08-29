import React from 'react';
import { motion } from 'framer-motion';

export const EditorialMarqueeRibbon: React.FC = () => {
  const skillsRow1 = [
    'Zero-Trust Architecture',
    'Full-Stack Web Systems',
    'React 19 & TypeScript',
    'Data Analytics & Power BI',
    'Zenvy Media Ventures',
    'Defensive Cyber Security',
    'Node.js & Microservices',
    'Mobile Systems (React Native)',
    'AES-256 Cryptography',
  ];

  const skillsRow2 = [
    'Penetration Testing',
    'Star-Schema Modeling',
    '5-Phase Venture Growth',
    'Anna University IT Honors',
    'Wireshark Network Telemetry',
    'Google Certified Data Analyst',
    'BSRocks Enterprise Platform',
    'Sub-180ms TTFB Engineering',
  ];

  return (
    <div className="w-full py-10 bg-[#FAF8F5] border-y border-[#11110F]/10 overflow-hidden select-none space-y-3">
      {/* Row 1 - Left to Right */}
      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 28 }}
          className="flex items-center gap-10 text-2xl sm:text-3xl md:text-4xl font-serif-editorial italic text-[#11110F]/40"
        >
          {skillsRow1.concat(skillsRow1).concat(skillsRow1).map((item, idx) => (
            <span key={idx} className="flex items-center gap-10">
              <span className="hover:text-[#11110F] transition-colors duration-300 cursor-default">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B39A6A]" />
            </span>
          ))}
        </motion.div>
      </div>

      {/* Row 2 - Right to Left */}
      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div
          animate={{ x: [-1000, 0] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 32 }}
          className="flex items-center gap-10 text-xs sm:text-sm font-mono-subtle uppercase text-[#777A5A] tracking-[0.25em]"
        >
          {skillsRow2.concat(skillsRow2).concat(skillsRow2).map((item, idx) => (
            <span key={idx} className="flex items-center gap-10">
              <span className="hover:text-[#11110F] transition-colors duration-300 cursor-default">
                {item}
              </span>
              <span className="text-[#B39A6A]">&bull;</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
