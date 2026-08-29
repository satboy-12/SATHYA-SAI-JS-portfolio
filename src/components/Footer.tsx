import React from 'react';
import { ArrowUp } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[var(--line)] py-10 bg-[var(--bg)]">
      <div className="w-full max-w-[1300px] mx-auto px-5 sm:px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Copyright */}
        <span className="font-mono-code text-[0.66rem] tracking-[0.2em] uppercase text-[var(--mut)] text-center md:text-left">
          © {new Date().getFullYear()} {portfolioData.fullName}. All Rights Reserved.
        </span>

        {/* Core Moto */}
        <div className="font-mono-code text-[0.62rem] tracking-[0.25em] text-[var(--dim)] uppercase text-center leading-relaxed">
          BUILT WITH PASSION<br />
          SECURED BY PURPOSE — DRIVEN BY <em className="not-italic text-[#ff7a29] font-medium">IMPACT</em>
        </div>

        {/* Back to Top */}
        <a
          href="#home"
          onClick={scrollToTop}
          className="inline-flex items-center gap-2.5 font-mono-code text-[0.68rem] tracking-[0.2em] uppercase text-[var(--mut)] hover:text-[#ff7a29] transition-colors duration-300 group"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform duration-300" />
        </a>
      </div>
    </footer>
  );
};
