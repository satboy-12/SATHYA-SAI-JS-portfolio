import React from 'react';
import { Shield, ChevronUp } from 'lucide-react';
import { cyberAudio } from '../utils/soundEngine';

interface FooterProps {
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop }) => {
  return (
    <footer className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#525c6c]">
      <div className="flex items-center gap-2 text-[#8792a3]">
        <Shield className="w-4 h-4 text-[#3eeaf4]" />
        <span>© 2026 SATHYA SAI JS. ALL SYSTEMS OPERATIONAL.</span>
      </div>

      <div className="flex items-center gap-6">
        <span className="tracking-widest text-[#3eeaf4]/70">
          SECURE · CLASSIFY · SHIP
        </span>

        <button
          onClick={() => {
            cyberAudio.playKeyClick();
            onScrollToTop();
          }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] hover:bg-[#3eeaf4]/10 border border-white/10 hover:border-[#3eeaf4]/40 text-[#8792a3] hover:text-white transition-all cursor-pointer"
        >
          <span>TOP</span>
          <ChevronUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
