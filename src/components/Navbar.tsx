import React, { useState, useEffect } from 'react';
import { PORTFOLIO_PROFILE } from '../data/portfolioData';
import { Menu, X, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';
import { cyberAudio } from '../utils/soundEngine';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  isMuted = false,
  onToggleMute,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'ABOUT' },
    { id: 'work', label: 'WORK' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleItemClick = (id: string) => {
    cyberAudio.playKeyClick();
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 select-none ${
          isScrolled
            ? 'py-3.5 bg-[#120D0E]/85 backdrop-blur-md border-b border-[#D6B47A]/15 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          
          {/* Left: Brand Identity */}
          <div
            onClick={() => handleItemClick('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <span className="font-display font-black text-2xl tracking-tighter text-white group-hover:text-[#D6B47A] transition-colors">
              {PORTFOLIO_PROFILE.brandShort}
            </span>
            <span className="hidden sm:inline font-mono text-xs tracking-[0.25em] text-white/80 uppercase font-semibold group-hover:text-white transition-colors">
              {PORTFOLIO_PROFILE.name}
            </span>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`font-mono text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300 relative py-1 cursor-pointer ${
                    isActive
                      ? 'text-[#D6B47A]'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#D6B47A] rounded-full shadow-[0_0_8px_#D6B47A]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Sound Toggle + Availability Badge & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Ambient Sound Toggle */}
            {onToggleMute && (
              <button
                onClick={onToggleMute}
                className="p-2 rounded-full bg-white/5 hover:bg-[#6E2634] text-white/80 hover:text-white border border-[#D6B47A]/30 transition-colors cursor-pointer"
                title={isMuted ? 'Unmute UI Audio' : 'Mute UI Audio'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#D6B47A]" />}
              </button>
            )}

            {/* Availability Pill */}
            <button
              onClick={() => handleItemClick('contact')}
              className="hidden sm:flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#D6B47A]/40 bg-[#D6B47A]/5 hover:bg-[#D6B47A]/15 text-[#D6B47A] font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(214,180,122,0.1)] hover:shadow-[0_0_20px_rgba(214,180,122,0.25)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              <span>{PORTFOLIO_PROFILE.availabilityStatus}</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => {
                cyberAudio.playKeyClick();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="md:hidden p-2 rounded-lg text-white/90 hover:text-[#D6B47A] transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </header>

      {/* Fullscreen Mobile Navigation Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0B0A0A]/95 backdrop-blur-xl flex flex-col justify-between p-8 pt-28 md:hidden animate-fade-in">
          
          <div className="space-y-6">
            <div className="font-mono text-xs text-[#D6B47A] tracking-widest uppercase">
              NAVIGATION
            </div>
            
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className="flex items-center justify-between text-left font-display font-bold text-2xl text-white hover:text-[#D6B47A] transition-colors py-2 border-b border-white/10"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-5 h-5 text-[#D6B47A]" />
                </button>
              ))}
            </nav>
          </div>

          <div className="space-y-4 pt-8 border-t border-white/10">
            <div className="font-mono text-xs text-white/50 tracking-wider">
              {PORTFOLIO_PROFILE.email}
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#10b981]" />
              <span className="font-mono text-xs text-[#D6B47A] font-semibold">
                AVAILABLE FOR ROLES & FREELANCE
              </span>
            </div>
          </div>

        </div>
      )}
    </>
  );
};
