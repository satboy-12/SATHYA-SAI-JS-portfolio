import React from 'react';
import { Grid } from 'lucide-react';
import { cyberAudio } from '../utils/soundEngine';

interface DirectorHUDProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onStartCinema?: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
  scrollProgress?: number;
  onOpenPhotoManager?: () => void;
}

export const DirectorHUD: React.FC<DirectorHUDProps> = ({
  activeSection,
  onNavigate,
}) => {
  const navItems = [
    { id: 'hero', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'timeline', label: 'EXPERIENCE' },
    { id: 'contact', label: 'CONTACT' }
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-8 sm:px-14 py-7 flex items-center justify-between pointer-events-auto select-none bg-gradient-to-b from-[#03060c]/80 via-[#03060c]/20 to-transparent">
      
      {/* Left: "SJS  SATHYA SAI JS" */}
      <div
        onClick={() => onNavigate('hero')}
        className="flex items-center gap-3 cursor-pointer group select-none"
      >
        <span className="font-display font-extrabold text-2xl text-white tracking-tight">
          SJS
        </span>
        <span className="hidden sm:inline font-display font-semibold text-xs text-white/90 tracking-[0.22em] uppercase">
          SATHYA SAI JS
        </span>
      </div>

      {/* Right: Nav Items matching uploaded image + 9-dot matrix */}
      <div className="flex items-center gap-7 sm:gap-9">
        <nav className="flex items-center gap-6 sm:gap-8 font-mono text-[11px] sm:text-xs font-semibold tracking-widest">
          {navItems.map(item => {
            const isActive = (item.id === 'hero' && (!activeSection || activeSection === 'hero')) || activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  cyberAudio.playKeyClick();
                  onNavigate(item.id);
                }}
                className={`transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#3eeaf4] glow-cyan font-bold'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* 9-Dot Matrix Menu Grid from uploaded design */}
        <div
          onClick={() => {
            cyberAudio.playKeyClick();
            onNavigate('projects');
          }}
          className="w-7 h-7 flex items-center justify-center text-white/80 hover:text-[#3eeaf4] cursor-pointer transition-colors"
          title="Navigation Matrix"
        >
          <Grid className="w-5 h-5" />
        </div>
      </div>

    </header>
  );
};
