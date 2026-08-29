import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowUpRight, Send, FileText } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolioData';

interface SectionEditorialContactProps {
  onOpenModal: () => void;
  onOpenResume: () => void;
}

export const SectionEditorialContact: React.FC<SectionEditorialContactProps> = ({
  onOpenModal,
  onOpenResume,
}) => {
  return (
    <section
      id="contact"
      className="relative w-full py-24 sm:py-32 lg:py-40 px-6 sm:px-12 lg:px-20 bg-[#F4F1E8] text-[#11110F] select-none border-b border-[#11110F]/10 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto space-y-20 sm:space-y-28">
        {/* Editorial Sub-Index */}
        <div className="w-full flex items-center justify-between pb-6 border-b border-[#11110F]/10 text-xs font-mono-subtle uppercase tracking-[0.25em] text-[#11110F]/60">
          <div className="flex items-center gap-3">
            <span className="text-[#B39A6A] font-bold">06 / INITIATION</span>
            <span>&bull;</span>
            <span>DIRECT ENGAGEMENT</span>
          </div>
          <div className="flex items-center gap-2 text-[#777A5A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#777A5A] animate-pulse" />
            <span>AVAILABLE FOR SELECT MANDATES</span>
          </div>
        </div>

        {/* Minimal Large Typographic Statement: LET'S BUILD. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          <div className="lg:col-span-8 space-y-8">
            <span className="text-xs font-mono-subtle uppercase tracking-[0.3em] text-[#777A5A] block font-semibold">
              COMMISSIONING &amp; CONSULTING
            </span>
            <h2 className="text-6xl sm:text-8xl md:text-9xl font-sans-clean font-extrabold uppercase text-[#11110F] leading-[0.9] tracking-tight">
              LET&apos;S <br />
              <span className="font-serif-editorial italic font-normal text-[#B39A6A]">
                BUILD.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[#11110F]/80 font-sans-clean font-light leading-relaxed max-w-2xl">
              Whether you need zero-trust security perimeters, high-throughput enterprise web architectures, certified Power BI analytics, or venture acceleration with Zenvy Media — reach out directly.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-4">
            <button
              onClick={onOpenModal}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#11110F] hover:bg-[#292924] text-[#F4F1E8] font-sans-clean font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-105"
            >
              <Send size={14} />
              <span>SEND A NOTE</span>
            </button>

            <button
              onClick={onOpenResume}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FAF8F5] hover:bg-[#FAF8F5]/80 text-[#11110F] border border-[#11110F]/15 hover:border-[#B39A6A] font-mono-subtle text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText size={13} className="text-[#B39A6A]" />
              <span>VIEW CURRICULUM VITAE</span>
            </button>
          </div>
        </div>

        {/* Minimal Editorial Direct Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <a
            href={`mailto:${PORTFOLIO_PROFILE.email}`}
            className="p-8 rounded-3xl bg-[#FAF8F5] border border-[#11110F]/10 hover:border-[#B39A6A] transition-all duration-300 flex flex-col justify-between space-y-6 group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#F4F1E8] border border-[#11110F]/10 flex items-center justify-center text-[#B39A6A] group-hover:border-[#B39A6A] transition-colors">
                <Mail size={20} />
              </div>
              <ArrowUpRight size={18} className="text-[#11110F]/30 group-hover:text-[#B39A6A] transition-colors" />
            </div>

            <div className="space-y-1 font-mono-subtle">
              <span className="text-[10px] text-[#777A5A] uppercase tracking-widest block font-semibold">EMAIL DIRECT</span>
              <span className="text-sm sm:text-base font-semibold text-[#11110F] group-hover:text-[#B39A6A] transition-colors">
                {PORTFOLIO_PROFILE.email}
              </span>
            </div>
          </a>

          <a
            href={PORTFOLIO_PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 rounded-3xl bg-[#FAF8F5] border border-[#11110F]/10 hover:border-[#B39A6A] transition-all duration-300 flex flex-col justify-between space-y-6 group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#F4F1E8] border border-[#11110F]/10 flex items-center justify-center text-[#B39A6A] group-hover:border-[#B39A6A] transition-colors">
                <Linkedin size={20} />
              </div>
              <ArrowUpRight size={18} className="text-[#11110F]/30 group-hover:text-[#B39A6A] transition-colors" />
            </div>

            <div className="space-y-1 font-mono-subtle">
              <span className="text-[10px] text-[#777A5A] uppercase tracking-widest block font-semibold">LINKEDIN</span>
              <span className="text-sm sm:text-base font-semibold text-[#11110F] group-hover:text-[#B39A6A] transition-colors">
                linkedin.com/in/sathyasaijs
              </span>
            </div>
          </a>

          <a
            href={PORTFOLIO_PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 rounded-3xl bg-[#FAF8F5] border border-[#11110F]/10 hover:border-[#B39A6A] transition-all duration-300 flex flex-col justify-between space-y-6 group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#F4F1E8] border border-[#11110F]/10 flex items-center justify-center text-[#B39A6A] group-hover:border-[#B39A6A] transition-colors">
                <Github size={20} />
              </div>
              <ArrowUpRight size={18} className="text-[#11110F]/30 group-hover:text-[#B39A6A] transition-colors" />
            </div>

            <div className="space-y-1 font-mono-subtle">
              <span className="text-[10px] text-[#777A5A] uppercase tracking-widest block font-semibold">GITHUB</span>
              <span className="text-sm sm:text-base font-semibold text-[#11110F] group-hover:text-[#B39A6A] transition-colors">
                github.com/SathyaSai-JS
              </span>
            </div>
          </a>
        </div>

        {/* Minimal Footer */}
        <div className="w-full pt-12 border-t border-[#11110F]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-subtle text-[#11110F]/50">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#11110F]">{PORTFOLIO_PROFILE.name}</span>
            <span>&bull;</span>
            <span>&copy; {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] uppercase tracking-wider">
            <span>TAMIL NADU, INDIA</span>
            <span>&bull;</span>
            <span>GLOBAL REMOTE</span>
            <span>&bull;</span>
            <span className="text-[#777A5A]">ENGINEER &bull; PARTNER</span>
          </div>
        </div>
      </div>
    </section>
  );
};
