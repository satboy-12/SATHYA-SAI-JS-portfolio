import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, Send } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolioData';

interface EditorialNavbarProps {
  onContactClick: () => void;
  onOpenResume: () => void;
}

export const EditorialNavbar: React.FC<EditorialNavbarProps> = ({ onContactClick, onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'WORK', href: '#work' },
    { label: 'ZENVY MEDIA', href: '#zenvy-media' },
    { label: 'JOURNEY', href: '#journey' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 select-none ${
          isScrolled
            ? 'py-4 bg-[#F4F1E8]/90 backdrop-blur-xl border-b border-[#11110F]/10 shadow-sm'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#"
            className="flex items-center gap-3 text-xs sm:text-sm font-sans-clean font-bold uppercase tracking-[0.2em] text-[#11110F] hover:text-[#B39A6A] transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-[#B39A6A]" />
            <span>SATHYA SAI JS</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-xs font-mono-subtle uppercase tracking-[0.2em] text-[#11110F]/65">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#11110F] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenResume}
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF8F5] hover:bg-[#11110F] hover:text-[#F4F1E8] border border-[#11110F]/15 text-xs font-mono-subtle text-[#11110F] transition-all cursor-pointer"
            >
              <FileText size={12} className="text-[#B39A6A]" />
              <span>CV</span>
            </button>

            <button
              onClick={onContactClick}
              className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full bg-[#11110F] hover:bg-[#B39A6A] text-[#F4F1E8] text-xs font-sans-clean font-bold tracking-wider uppercase transition-all duration-300 shadow hover:scale-105 cursor-pointer"
            >
              <Send size={12} />
              <span>CONTACT</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2.5 rounded-2xl bg-[#FAF8F5] border border-[#11110F]/15 text-[#11110F] hover:text-[#B39A6A] transition-colors cursor-pointer"
              aria-label="Open Mobile Menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#F4F1E8] text-[#11110F] flex flex-col justify-between p-8 sm:p-12 overflow-y-auto"
          >
            {/* Top Bar */}
            <div className="w-full flex items-center justify-between pb-6 border-b border-[#11110F]/10">
              <div className="flex items-center gap-2 text-xs font-mono-subtle uppercase tracking-widest text-[#11110F]">
                <span className="w-2 h-2 rounded-full bg-[#B39A6A]" />
                <span>SATHYA SAI JS</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-full bg-[#FAF8F5] border border-[#11110F]/15 text-[#11110F] hover:text-[#B39A6A]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Animated Nav Links */}
            <div className="flex flex-col space-y-6 my-auto py-8">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="text-3xl sm:text-5xl font-serif-editorial italic text-[#11110F] hover:text-[#B39A6A] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="space-y-3 pt-6 border-t border-[#11110F]/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full py-4 rounded-full bg-[#FAF8F5] border border-[#11110F]/20 text-[#11110F] font-mono-subtle text-xs font-bold uppercase tracking-wider"
              >
                VIEW CURRICULUM VITAE
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onContactClick();
                }}
                className="w-full py-4 rounded-full bg-[#11110F] text-[#F4F1E8] font-sans-clean text-xs font-bold uppercase tracking-wider"
              >
                GET IN TOUCH
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
