import React, { useState } from 'react';
import { PORTFOLIO_PROFILE } from '../data/portfolioData';
import { Mail, MapPin, MessageCircle, Send, CheckCircle2, Linkedin, Github, Instagram } from 'lucide-react';
import { cyberAudio } from '../utils/soundEngine';
import { ProfileImage } from './ProfileImage';

interface ContactSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    cyberAudio.playScannerGliss();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 6000);
    }, 1200);
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: <Linkedin className="w-4 h-4" />, href: PORTFOLIO_PROFILE.socials.linkedin },
    { name: 'GitHub', icon: <Github className="w-4 h-4" />, href: PORTFOLIO_PROFILE.socials.github },
    { name: 'Instagram', icon: <Instagram className="w-4 h-4" />, href: PORTFOLIO_PROFILE.socials.instagram },
    { name: 'WhatsApp', icon: <MessageCircle className="w-4 h-4" />, href: PORTFOLIO_PROFILE.socials.whatsapp },
    { name: 'Email', icon: <Mail className="w-4 h-4" />, href: PORTFOLIO_PROFILE.socials.email },
  ];

  return (
    <section id="contact" className="relative w-full bg-[#FFFFFF] text-[#120D0E] select-none overflow-hidden border-t border-[#D6B47A]/15">
      
      {/* 1. TOP LIGHT EDITORIAL CONTACT FORM AREA */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Heading & Contact Info Cards */}
          <div className="lg:col-span-6 space-y-8">
            
            <div className="space-y-3">
              <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#120D0E] tracking-tight leading-tight">
                LET'S BUILD<br />WHAT'S NEXT.
              </h2>
              <p className="text-sm sm:text-base text-[#120D0E]/70 max-w-md leading-relaxed">
                Have an idea, technical challenge or opportunity? Let's create something meaningful.
              </p>
            </div>

            {/* Contact Badges */}
            <div className="space-y-4 pt-2">
              
              {/* Email */}
              <a
                href={`mailto:${PORTFOLIO_PROFILE.email}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#F9F6F0] hover:bg-[#6E2634] text-[#120D0E] hover:text-white border border-[#D6B47A]/20 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#6E2634] text-[#D6B47A] group-hover:bg-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#6E2634] group-hover:text-[#D6B47A] uppercase font-bold tracking-wider">
                    EMAIL
                  </span>
                  <div className="font-mono text-xs sm:text-sm font-semibold truncate">
                    {PORTFOLIO_PROFILE.email}
                  </div>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F9F6F0] border border-[#D6B47A]/20">
                <div className="w-10 h-10 rounded-xl bg-[#6E2634] text-[#D6B47A] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#6E2634] uppercase font-bold tracking-wider">
                    LOCATION
                  </span>
                  <div className="font-mono text-xs sm:text-sm font-semibold text-[#120D0E]">
                    {PORTFOLIO_PROFILE.location}
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href={PORTFOLIO_PROFILE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#F9F6F0] hover:bg-[#6E2634] text-[#120D0E] hover:text-white border border-[#D6B47A]/20 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#6E2634] text-[#D6B47A] group-hover:bg-white/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#6E2634] group-hover:text-[#D6B47A] uppercase font-bold tracking-wider">
                    WHATSAPP
                  </span>
                  <div className="font-mono text-xs sm:text-sm font-semibold truncate">
                    {PORTFOLIO_PROFILE.phone}
                  </div>
                </div>
              </a>

            </div>

          </div>

          {/* Right Column: Clean Interactive Contact Form */}
          <div className="lg:col-span-6 bg-[#F9F6F0] p-8 sm:p-10 rounded-3xl border border-[#D6B47A]/30 shadow-[0_20px_50px_rgba(18,13,14,0.06)]">
            
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs font-bold text-[#120D0E] uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#120D0E]/15 focus:border-[#6E2634] text-[#120D0E] text-xs font-mono outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold text-[#120D0E] uppercase mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#120D0E]/15 focus:border-[#6E2634] text-[#120D0E] text-xs font-mono outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs font-bold text-[#120D0E] uppercase mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder="Security Assessment / Project Collaboration"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#120D0E]/15 focus:border-[#6E2634] text-[#120D0E] text-xs font-mono outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold text-[#120D0E] uppercase mb-1">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your technical requirements or project scope..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#120D0E]/15 focus:border-[#6E2634] text-[#120D0E] text-xs font-mono outline-none transition-colors resize-none"
                />
              </div>

              {isSubmitted && (
                <div className="p-3 rounded-xl bg-[#10b981]/15 border border-[#10b981]/40 text-[#10b981] font-mono text-xs font-bold flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Message dispatched successfully! I will respond promptly.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#6E2634] hover:bg-[#8C2735] text-white font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(110,38,52,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#D6B47A]" />
                <span>{isSubmitting ? 'TRANSMITTING...' : 'SEND MESSAGE'}</span>
              </button>

            </form>

          </div>

        </div>
      </div>

      {/* 2. MASTER LUXURY FOOTER BANNER (Deep Wine & Dark with Portrait & Golden Orbit) */}
      <footer className="w-full bg-[#120D0E] text-white py-16 px-6 sm:px-12 border-t border-[#D6B47A]/20 relative overflow-hidden">
        
        {/* Background ambient glow */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[radial-gradient(ellipse_at_center,rgba(110,38,52,0.25)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Left Column: Brand & Bio */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="flex items-center gap-3">
              <span className="font-display font-black text-3xl text-white">
                {PORTFOLIO_PROFILE.brandShort}
              </span>
              <span className="font-mono text-xs tracking-[0.25em] text-[#D6B47A] uppercase font-bold">
                {PORTFOLIO_PROFILE.name}
              </span>
            </div>

            <div className="space-y-1 font-mono text-xs text-white/80 tracking-wider uppercase">
              <div>CYBER SECURITY ENGINEER</div>
              <div>SOFTWARE DEVELOPER</div>
              <div>DATA ANALYST</div>
            </div>

            <p className="text-xs sm:text-sm text-white/60 max-w-md leading-relaxed">
              {PORTFOLIO_PROFILE.quote}
            </p>

            {/* Social Icons Dock */}
            <div className="flex items-center gap-4 pt-2">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#6E2634] border border-[#D6B47A]/30 text-[#D6B47A] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  title={item.name}
                >
                  {item.icon}
                </a>
              ))}
            </div>

          </div>

          {/* Center/Right: Sathya Portrait with Gold Orbit Ring + Nav Links */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row items-center justify-end gap-8">
            
            {/* Quick Navigation Links */}
            <nav className="flex flex-col items-start sm:items-end space-y-2.5 font-mono text-xs tracking-widest uppercase font-semibold text-white/70">
              {['about', 'work', 'experience', 'skills', 'contact'].map((sec) => (
                <button
                  key={sec}
                  onClick={() => {
                    cyberAudio.playKeyClick();
                    onNavigate(sec);
                  }}
                  className="hover:text-[#D6B47A] transition-colors cursor-pointer"
                >
                  {sec}
                </button>
              ))}
            </nav>

            {/* ProfileImage Component (Contact/Avatar Variant with Golden Orbit Ring) */}
            <ProfileImage
              variant="contact"
              src={PORTFOLIO_PROFILE.images.footerPortrait}
              alt="SATHYA SAI JS - Footer Profile"
            />

          </div>

        </div>

        {/* Copyright strip */}
        <div className="max-w-7xl mx-auto pt-10 mt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-white/40 font-mono text-[10px]">
          <div>
            © 2025 SATHYA SAI JS. All rights reserved.
          </div>
          <div>
            THE ARCHITECT OF SECURE DIGITAL SYSTEMS
          </div>
        </div>

      </footer>

    </section>
  );
};
