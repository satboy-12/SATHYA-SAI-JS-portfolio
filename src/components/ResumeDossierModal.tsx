import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Briefcase, GraduationCap, Award, Mail, Phone, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface ResumeDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeDossierModal: React.FC<ResumeDossierModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-6 lg:p-10 select-none overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 0.8, 0.24, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar rounded-md bg-[var(--panel)] border border-[var(--line2)] p-6 sm:p-10 shadow-2xl z-10 space-y-8 my-auto text-[var(--txt)]"
        >
          {/* Top Actions Ribbon */}
          <div className="flex items-center justify-between pb-4 border-b border-[var(--line)]">
            <div className="flex items-center gap-2.5 text-xs font-mono-code text-[var(--mut)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff7a29]" />
              <span className="font-bold tracking-widest uppercase text-[var(--txt)]">
                CURRICULUM VITAE &bull; {portfolioData.fullName}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-sm bg-[var(--bg2)] border border-[var(--line)] text-xs font-mono-code text-[var(--txt)] hover:text-[#ff7a29] hover:border-[#ff7a29] transition-all flex items-center gap-2 cursor-pointer"
                title="Print or Save as PDF"
              >
                <Printer size={13} className="text-[#ff7a29]" />
                <span>PRINT / PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-sm bg-[var(--bg2)] border border-[var(--line)] text-[var(--mut)] hover:text-[var(--txt)] hover:border-[#ff7a29] transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Header Profile Info */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h1 className="font-disp font-bold text-3xl sm:text-4xl text-[var(--txt)] tracking-tight uppercase">
                {portfolioData.fullName}
              </h1>
              <span className="text-xs font-mono-code font-semibold text-[#ff7a29] tracking-wider uppercase">
                {portfolioData.rolePrimary} &bull; {portfolioData.roleSecondary}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono-code text-[var(--mut)] border-y border-[var(--line)] py-3">
              <span className="flex items-center gap-1.5">
                <Mail size={13} className="text-[#ff7a29]" />
                {portfolioData.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone size={13} className="text-[#ff7a29]" />
                {portfolioData.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-[#ff7a29]" />
                {portfolioData.location}
              </span>
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono-code font-bold text-[#ff7a29] uppercase tracking-widest">
              PROFESSIONAL SUMMARY
            </h3>
            <p className="text-xs sm:text-sm text-[var(--mut)] leading-relaxed font-body">
              {portfolioData.aboutText}
            </p>
          </div>

          {/* Section 2: Experience & Milestones */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono-code font-bold text-[#ff7a29] uppercase tracking-widest flex items-center gap-2">
              <Briefcase size={14} />
              <span>EXPERIENCE & MILESTONES</span>
            </h3>

            <div className="space-y-4 divide-y divide-[var(--line)]">
              {portfolioData.experience.map((item, idx) => (
                <div key={idx} className={`space-y-1.5 ${idx > 0 ? 'pt-4' : ''}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <h4 className="font-disp font-semibold text-sm sm:text-base text-[var(--txt)] uppercase">
                      {item.title} {item.subtitle && <span className="text-[#ff7a29]">&bull; {item.subtitle}</span>}
                    </h4>
                    <span className="text-xs font-mono-code text-[var(--dim)]">{item.year}</span>
                  </div>
                  <p className="text-xs text-[var(--mut)] font-body leading-relaxed">
                    {item.description || item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Education & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <h3 className="text-xs font-mono-code font-bold text-[#ff7a29] uppercase tracking-widest flex items-center gap-2">
                <GraduationCap size={14} />
                <span>EDUCATION</span>
              </h3>
              <div className="p-4 rounded-sm bg-[var(--bg2)] border border-[var(--line)] space-y-1">
                <h4 className="font-disp font-semibold text-sm text-[var(--txt)] uppercase">B.E. in Cyber Security</h4>
                <p className="text-xs font-mono-code text-[#ff7a29]">Sri Ram Engineering College &bull; 2024 – Present</p>
                <p className="text-xs text-[var(--mut)] font-body pt-1">
                  Focus: Network & Information Security, Threat Modeling, Pentesting. National-level Smart India Hackathon participant in Space Technology.
                </p>
              </div>

              <div className="p-4 rounded-sm bg-[var(--bg2)] border border-[var(--line)] space-y-1">
                <h4 className="font-disp font-semibold text-sm text-[var(--txt)] uppercase">Diploma in ECE (86%)</h4>
                <p className="text-xs font-mono-code text-[#ff7a29]">CPCL Polytechnic College &bull; 2017 – 2020</p>
                <p className="text-xs text-[var(--mut)] font-body pt-1">
                  Focus: Digital Electronics, Microprocessors, Network Hardware & Signal Communications.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-mono-code font-bold text-[#ff7a29] uppercase tracking-widest flex items-center gap-2">
                <Award size={14} />
                <span>KEY ACHIEVEMENTS & CERTS</span>
              </h3>
              <div className="p-4 rounded-sm bg-[var(--bg2)] border border-[var(--line)] space-y-2.5">
                <div className="text-xs font-body text-[var(--mut)]">
                  <span className="font-semibold text-[var(--txt)]">&bull; SIMATS Engineering Conference</span>
                  <p className="text-[11px] text-[var(--dim)]">Published & presented research on Blockchain Safe Vehicular Firmware Updates.</p>
                </div>
                <div className="text-xs font-body text-[var(--mut)]">
                  <span className="font-semibold text-[var(--txt)]">&bull; 50% Fraud Charge Reduction</span>
                  <p className="text-[11px] text-[var(--dim)]">Cut fraudulent charges by 50% & boosted customer satisfaction by 90% via pattern analytics.</p>
                </div>
                <div className="text-xs font-body text-[var(--mut)]">
                  <span className="font-semibold text-[var(--txt)]">&bull; Network Security & Vulnerability Assessment</span>
                  <p className="text-[11px] text-[var(--dim)]">Hands-on internships across Prodigy Infotech, Red Hat network security, and Blockchain.</p>
                </div>
                <div className="text-xs font-body text-[var(--mut)]">
                  <span className="font-semibold text-[var(--txt)]">&bull; Power BI & SQL Data Modeling</span>
                  <p className="text-[11px] text-[var(--dim)]">End-to-end data pipeline prep, DAX measures, and interactive KPI dashboard design.</p>
                </div>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
