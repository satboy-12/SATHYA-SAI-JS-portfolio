import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, FileText } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Check initial theme from html attribute or default to dark
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    setTheme(currentTheme);

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['home', 'about', 'skills', 'projects', 'journey', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.15) {
            setActiveSection(sectionId);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const navItems = [
    { label: 'Home', href: '#home', id: 'home', num: '01' },
    { label: 'About', href: '#about', id: 'about', num: '02' },
    { label: 'Skills', href: '#skills', id: 'skills', num: '03' },
    { label: 'Projects', href: '#projects', id: 'projects', num: '04' },
    { label: 'Experience', href: '#journey', id: 'journey', num: '05' },
    { label: 'Contact', href: '#contact', id: 'contact', num: '06' },
  ];

  return (
    <>
      <header
        id="header"
        className={`fixed top-0 left-0 right-0 h-[72px] z-[200] flex items-center transition-all duration-400 ${
          scrolled
            ? 'bg-[var(--bg)]/85 backdrop-blur-md border-b border-[var(--line)] shadow-lg'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="w-full max-w-[1300px] mx-auto px-5 sm:px-8 md:px-12 flex items-center justify-between gap-6">
          {/* Logo */}
          <a
            href="#home"
            className="font-disp font-bold text-lg md:text-xl tracking-tight flex items-center gap-2.5 group"
          >
            <i className="w-2.5 h-2.5 rounded-full bg-[#ff7a29] inline-block shadow-[0_0_12px_#ff7a29] group-hover:scale-125 transition-transform duration-300" />
            <span className="text-[var(--txt)]">{portfolioData.logoInitials}</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-7 list-none m-0 p-0">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className={`font-mono-code text-[0.74rem] uppercase tracking-[0.2em] relative py-1.5 transition-colors duration-300 block ${
                        isActive
                          ? 'text-[var(--txt)]'
                          : 'text-[var(--mut)] hover:text-[var(--txt)]'
                      }`}
                    >
                      {item.label}
                      <span
                        className={`absolute left-0 bottom-0 h-[1.5px] bg-[#ff7a29] transition-all duration-300 ease-out ${
                          isActive ? 'w-full' : 'w-0 hover:w-full'
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-3">
            {/* Resume Action */}
            <button
              onClick={onOpenResume}
              className="hidden sm:inline-flex items-center gap-2 font-mono-code text-[0.72rem] tracking-[0.16em] uppercase px-3.5 py-1.5 border border-[var(--line2)] rounded-sm text-[var(--mut)] hover:text-[#ff7a29] hover:border-[#ff7a29] transition-all duration-300"
              title="Open Resume Dossier"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-[38px] h-[38px] border border-[var(--line)] rounded-full flex items-center justify-center text-[var(--mut)] hover:text-[#ff7a29] hover:border-[#ff7a29] hover:-translate-y-0.5 transition-all duration-300"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-[38px] h-[38px] border border-[var(--line)] rounded-full flex items-center justify-center text-[var(--mut)] hover:text-[#ff7a29] hover:border-[#ff7a29] transition-all duration-300"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Circle-Reveal Mobile Menu */}
      <div
        id="mobileMenu"
        className={`fixed inset-0 bg-[var(--bg)] z-[190] flex flex-col justify-center px-10 gap-3 transition-all duration-700 ease-[cubic-bezier(0.22,0.8,0.24,1)] ${
          mobileMenuOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{
          clipPath: mobileMenuOpen
            ? 'circle(150% at calc(100% - 44px) 44px)'
            : 'circle(0 at calc(100% - 44px) 44px)',
        }}
      >
        <div className="max-w-md w-full mx-auto space-y-2">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-disp font-bold text-3xl sm:text-4xl py-3 text-[var(--mut)] hover:text-[var(--txt)] flex items-baseline gap-4 border-b border-[var(--line)] transition-all duration-300 hover:translate-x-3"
            >
              <b className="font-mono-code font-normal text-xs text-[#ff7a29]">
                {item.num}
              </b>
              <span>{item.label.toUpperCase()}</span>
            </a>
          ))}

          <div className="pt-6">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-3 py-3.5 bg-[#ff7a29] text-[#0b0b0e] font-mono-code font-semibold text-xs tracking-widest uppercase rounded-sm"
            >
              <FileText className="w-4 h-4" />
              <span>Download / View Resume Dossier</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
