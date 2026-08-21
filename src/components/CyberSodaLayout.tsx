import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PORTFOLIO_PROFILE, ProjectCaseStudy, CertificationItem } from '../data/portfolioData';
import { heroImage, ABOUT_IMAGE_URL } from '../assets/profileImage';
import { Cyber3DScrollCanvas } from './Cyber3DScrollCanvas';
import { RevealOnScroll } from './RevealOnScroll';
import { InteractiveTerminal } from './InteractiveTerminal';
import { KineticText, ScrambleHeading } from './KineticTypography';
import { 
  Shield, 
  Terminal, 
  Lock, 
  Code2, 
  Cpu, 
  Volume2, 
  VolumeX, 
  Send, 
  CheckCircle2, 
  Github, 
  Linkedin, 
  Instagram, 
  Mail, 
  MapPin, 
  Award,
  X,
  ChevronRight,
  Database,
  BarChart3,
  FileDown,
  Briefcase,
  GraduationCap,
  ArrowUpRight,
  Sparkles,
  Phone,
  Copy,
  ExternalLink,
  RotateCcw,
  Play,
  Check,
  Radio,
  Zap,
  Layers,
  ChevronDown,
  MessageCircle,
  MessageSquare,
  Maximize2,
  Minimize2,
  Menu
} from 'lucide-react';
import { cyberAudio } from '../utils/soundEngine';
import confetti from 'canvas-confetti';

interface ThemeMode {
  id: string;
  name: string;
  code: string;
  role: string;
  tagline: string;
  leftTitleMain: string;
  leftTitleSub: string;
  accent: string;
  accentRgb: string;
  colors: {
    inner: string;
    mid: string;
    outer: string;
  };
  icon: React.ReactNode;
}

const THEMES: ThemeMode[] = [
  {
    id: 'cyber_security',
    name: 'Cyber Security',
    code: 'DEFENSE • PENTEST • ZERO TRUST',
    role: 'Cyber Security Engineer',
    tagline: 'Defending enterprise networks, penetration testing, firmware analysis, and zero-day threat mitigation.',
    leftTitleMain: 'SECURE',
    leftTitleSub: 'ENGINEERING',
    accent: '#60a5fa',
    accentRgb: '96, 165, 250',
    colors: {
      inner: '#0c1524',
      mid: '#070b14',
      outer: '#04060a'
    },
    icon: <Shield className="w-4 h-4 text-[#60a5fa]" />
  },
  {
    id: 'software_developer',
    name: 'Web & App Dev',
    code: 'WEB & MOBILE • REACT • BSROCKS',
    role: 'Web & App Developer @ BSRocks',
    tagline: 'Architecting modern responsive web platforms, cross-platform mobile apps, and scalable digital ecosystems at BSRocks.',
    leftTitleMain: 'WEB & APP',
    leftTitleSub: 'DEVELOPER',
    accent: '#38bdf8',
    accentRgb: '56, 189, 248',
    colors: {
      inner: '#0a1628',
      mid: '#060d18',
      outer: '#03070d'
    },
    icon: <Code2 className="w-4 h-4 text-[#38bdf8]" />
  },
  {
    id: 'data_analyst',
    name: 'Data Analyst',
    code: 'POWER BI • DAX • PREDICTIVE AI',
    role: 'Data Analyst',
    tagline: 'Transforming telemetry, relational databases, and enterprise data streams into executive BI dashboards.',
    leftTitleMain: 'EXECUTIVE',
    leftTitleSub: 'ANALYTICS',
    accent: '#818cf8',
    accentRgb: '129, 140, 248',
    colors: {
      inner: '#101428',
      mid: '#080a18',
      outer: '#04050d'
    },
    icon: <BarChart3 className="w-4 h-4 text-[#818cf8]" />
  }
];

const SECTIONS = [
  { id: 'hero', number: '01', title: 'INIT', label: 'Executive Stage' },
  { id: 'about', number: '02', title: 'ABOUT', label: 'Identity & Bio' },
  { id: 'toolkit', number: '03', title: 'TOOLKIT', label: 'Technical Arsenal' },
  { id: 'projects', number: '04', title: 'WORK', label: 'Architectures' },
  { id: 'experience', number: '05', title: 'CREDENTIALS', label: 'Certificates & XP' },
  { id: 'contact', number: '06', title: 'CONTACT', label: 'Transmission' }
];

export const CyberSodaLayout: React.FC = () => {
  const [activeThemeIdx, setActiveThemeIdx] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeToolkitTab, setActiveToolkitTab] = useState<string>('cyber_security');
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);
  const [contactDispatchMode, setContactDispatchMode] = useState<'gmail' | 'whatsapp' | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedWhatsApp, setCopiedWhatsApp] = useState<boolean>(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });

  // Scroll Progress State
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSectionId, setActiveSectionId] = useState<string>('hero');

  // Typing Effect State for About Section
  const [typedBio, setTypedBio] = useState<string>('');
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const [isTypingActive, setIsTypingActive] = useState<boolean>(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentTheme = THEMES[activeThemeIdx];
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  // Toggle Full Screen Function
  const toggleFullscreen = () => {
    cyberAudio.playKeyClick();
    if (!document.fullscreenElement) {
      const docEl = document.documentElement as any;
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen().catch(() => {});
      } else if (docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen();
      } else if (docEl.msRequestFullscreen) {
        docEl.msRequestFullscreen();
      }
    } else {
      const doc = document as any;
      if (doc.exitFullscreen) {
        doc.exitFullscreen().catch(() => {});
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      }
    }
  };

  // Sound toggle
  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    cyberAudio.setMuted(next);
    if (!next) cyberAudio.playKeyClick();
  };

  // Switch Theme Function
  const handleSwitchTheme = (idx: number) => {
    if (idx === activeThemeIdx) return;
    cyberAudio.playGlitch();
    cyberAudio.playSweep();
    setActiveThemeIdx(idx);
  };

  // Scroll Progress and Section Tracking Listener
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const current = window.scrollY;
      const progress = Math.min(Math.max((current / totalScroll) * 100, 0), 100);
      setScrollProgress(progress);

      // Determine active section based on element bounding offsets
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveSectionId(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP-driven subtle parallax effect on slide titles, subtitles, and description text
  useEffect(() => {
    let animFrameId: number;

    const updateParallax = () => {
      if (window.innerWidth < 640) return;

      const windowHeight = window.innerHeight;
      const centerY = windowHeight / 2;

      // 1. Parallax for Section & Slide Titles
      const titles = document.querySelectorAll<HTMLElement>('.gsap-parallax-title');
      titles.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight + 100 && rect.bottom > -100) {
          const progress = (rect.top - centerY) / centerY;
          const targetY = progress * -20;
          gsap.to(el, {
            y: targetY,
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }
      });

      // 2. Parallax for Descriptions & Body Text
      const descs = document.querySelectorAll<HTMLElement>('.gsap-parallax-desc');
      descs.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight + 100 && rect.bottom > -100) {
          const progress = (rect.top - centerY) / centerY;
          const targetY = progress * -12;
          gsap.to(el, {
            y: targetY,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }
      });

      // 3. Parallax for Badges & Tag Headers
      const badges = document.querySelectorAll<HTMLElement>('.gsap-parallax-badge');
      badges.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight + 100 && rect.bottom > -100) {
          const progress = (rect.top - centerY) / centerY;
          const targetY = progress * -28;
          gsap.to(el, {
            y: targetY,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }
      });
    };

    const handleScrollParallax = () => {
      cancelAnimationFrame(animFrameId);
      animFrameId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('scroll', handleScrollParallax, { passive: true });
    window.addEventListener('resize', handleScrollParallax, { passive: true });
    updateParallax();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('scroll', handleScrollParallax);
      window.removeEventListener('resize', handleScrollParallax);
      const allElements = document.querySelectorAll<HTMLElement>(
        '.gsap-parallax-title, .gsap-parallax-desc, .gsap-parallax-badge'
      );
      allElements.forEach((el) => gsap.killTweensOf(el));
    };
  }, []);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    cyberAudio.playKeyClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Typing Animation Function for Cyber Security Bio
  const fullBioText = PORTFOLIO_PROFILE.bio;

  const startTypingEffect = (instant = false) => {
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    if (instant) {
      setTypedBio(fullBioText);
      setIsTypingComplete(true);
      setIsTypingActive(false);
      return;
    }

    setTypedBio('');
    setIsTypingComplete(false);
    setIsTypingActive(true);

    let charIndex = 0;
    const typeNextChar = () => {
      if (charIndex < fullBioText.length) {
        setTypedBio(fullBioText.slice(0, charIndex + 1));
        charIndex++;
        // Small random delay for natural terminal keystroke feeling
        const delay = Math.random() * 16 + 10;
        typingTimeoutRef.current = setTimeout(typeNextChar, delay);
      } else {
        setIsTypingComplete(true);
        setIsTypingActive(false);
        cyberAudio.playSuccess();
      }
    };

    typeNextChar();
  };

  // Auto-start typing when scrolling into the About section for the first time
  useEffect(() => {
    if (activeSectionId === 'about' && !typedBio && !isTypingActive) {
      startTypingEffect(false);
    }
  }, [activeSectionId]);

  // Cleanup typing timeout
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  // Copy Email Function
  const handleCopyEmail = () => {
    cyberAudio.playKeyClick();
    navigator.clipboard.writeText(PORTFOLIO_PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Copy WhatsApp Function
  const handleCopyWhatsApp = () => {
    cyberAudio.playKeyClick();
    navigator.clipboard.writeText(PORTFOLIO_PROFILE.whatsappNumber || PORTFOLIO_PROFILE.phone);
    setCopiedWhatsApp(true);
    setTimeout(() => setCopiedWhatsApp(false), 2000);
  };

  // Dispatch via Gmail
  const handleSendViaGmail = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!contactForm.name && !contactForm.message) {
      // Just open Gmail compose to Sathya Sai
      window.open(PORTFOLIO_PROFILE.getGmailUrl("Project Collaboration Inquiry", "Hi Sathya Sai JS,\n\nI would like to discuss a project with you."), '_blank');
      return;
    }

    cyberAudio.playSuccess();
    confetti({ particleCount: 80, spread: 85, origin: { y: 0.65 } });
    setContactSubmitted(true);
    setContactDispatchMode('gmail');

    const subject = contactForm.subject.trim() || `Portfolio Inquiry from ${contactForm.name}`;
    const body = `Hello Sathya Sai JS,\n\nName: ${contactForm.name}\nEmail: ${contactForm.email}\nSubject: ${subject}\n\nMessage:\n${contactForm.message}\n\n---\nSent via Portfolio Contact Gateway`;
    
    // Copy payload to clipboard as backup
    navigator.clipboard.writeText(`From: ${contactForm.name} (${contactForm.email})\n\n${contactForm.message}`).catch(() => {});
    
    // Open Gmail web compose in a new tab
    const gmailUrl = PORTFOLIO_PROFILE.getGmailUrl(subject, body);
    window.open(gmailUrl, '_blank');

    setTimeout(() => {
      setContactSubmitted(false);
      setContactDispatchMode(null);
      setContactForm({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  // Dispatch via WhatsApp
  const handleSendViaWhatsApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    cyberAudio.playSuccess();
    confetti({ particleCount: 80, spread: 85, origin: { y: 0.65 } });
    setContactSubmitted(true);
    setContactDispatchMode('whatsapp');

    const nameStr = contactForm.name ? `*From:* ${contactForm.name}\n` : '';
    const emailStr = contactForm.email ? `*Email:* ${contactForm.email}\n` : '';
    const msgStr = contactForm.message ? `*Message:*\n${contactForm.message}` : `Hi Sathya Sai JS, I would like to connect regarding your portfolio!`;
    const fullText = `👋 Hello Sathya Sai JS!\n\n${nameStr}${emailStr}${msgStr}`;

    const waUrl = PORTFOLIO_PROFILE.getWhatsAppUrl(fullText);
    window.open(waUrl, '_blank');

    setTimeout(() => {
      setContactSubmitted(false);
      setContactDispatchMode(null);
      setContactForm({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  // Form Submit Handler (defaults to Gmail)
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendViaGmail(e);
  };

  // Download CV
  const handleDownloadCV = () => {
    cyberAudio.playSuccess();
    const element = document.createElement('a');
    const file = new Blob([
      `SATHYA SAI JS - Web & App Developer & Cyber Security Engineer Resume\n\n` +
      `ROLE: ${PORTFOLIO_PROFILE.roleTitle}\n` +
      `EMAIL: ${PORTFOLIO_PROFILE.email}\n` +
      `PHONE: ${PORTFOLIO_PROFILE.phone}\n` +
      `LOCATION: ${PORTFOLIO_PROFILE.location}\n\n` +
      `SUMMARY:\n${PORTFOLIO_PROFILE.bio}\n\n` +
      `EXPERIENCE:\n` +
      `- Web & App Developer at BSRocks (2025 - Present)\n` +
      `- Technical Associate at Braiil Academy (2025 - Present)\n\n` +
      `EDUCATION:\n- B.E. Cyber Security, Sri Ram Engineering College (2024 - 2027)\n- Diploma in ECE, CPCL Polytechnic College (2020 - 2023)\n\n` +
      `VERIFIED CERTIFICATIONS:\n- Power BI Data Analytics (2025)\n- Data Analytics Certification (2024)\n- Python Programming (2024)\n- Cyber Security Fundamentals (2024)`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "Sathya_Sai_JS_Resume.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // 3D Card Mouse Tilt Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = -(y / (rect.height / 2)) * 8;
    const rotY = (x / (rect.width / 2)) * 8;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.015, 1.015, 1.015)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  const filteredProjects = projectFilter === 'all'
    ? PORTFOLIO_PROFILE.projects
    : PORTFOLIO_PROFILE.projects.filter(p => {
        if (projectFilter === 'bsrocks' || projectFilter === 'web_app') {
          return p.category.toLowerCase().includes('bsrocks') || 
                 p.category.toLowerCase().includes('web') || 
                 p.category.toLowerCase().includes('app') ||
                 p.tags.some(t => t.toLowerCase().includes('bsrocks') || t.toLowerCase().includes('react'));
        }
        if (projectFilter === 'cyber') return p.category.toLowerCase().includes('security') || p.category.toLowerCase().includes('cyber') || p.category.toLowerCase().includes('blockchain');
        if (projectFilter === 'data') return p.category.toLowerCase().includes('data') || p.category.toLowerCase().includes('power bi') || p.category.toLowerCase().includes('ai');
        return true;
      });

  return (
    <div 
      ref={containerRef} 
      className="min-h-screen bg-[#04060a] text-white font-sans selection:bg-blue-500/30 selection:text-white relative antialiased"
      style={{
        background: `radial-gradient(ellipse at 50% 0%, ${currentTheme.colors.inner} 0%, ${currentTheme.colors.mid} 50%, ${currentTheme.colors.outer} 100%)`
      }}
    >
      {/* WebGL 3D Geometric Architectural Canvas (No photo frames in background) */}
      <Cyber3DScrollCanvas 
        scrollProgress={scrollProgress} 
        accentColor={currentTheme.accent}
        activeSectionId={activeSectionId}
        activeThemeId={THEMES[activeThemeIdx].id}
      />

      {/* Background Tech Grid */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.035] z-0"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Dynamic Ambient Accent Glow */}
      <div 
        className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[180px] pointer-events-none opacity-25 transition-colors duration-1000 z-0"
        style={{ backgroundColor: currentTheme.accent }}
      />

      {/* =========================================================================
          THIN VERTICAL PROGRESS INDICATOR (RIGHT SIDE SCROLL DEPTH TRACKER)
          ========================================================================= */}
      <aside 
        aria-label="Scroll Progress Indicator"
        className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-3 select-none"
      >
        {/* Top Percentage Readout */}
        <div className="px-2 py-1 rounded-md bg-black/60 border border-white/10 backdrop-blur-md text-[9px] font-code font-bold text-white/70 tracking-widest">
          {Math.round(scrollProgress)}%
        </div>

        {/* Rail & Fill Track */}
        <div className="relative w-1.5 h-64 sm:h-80 bg-white/[0.08] rounded-full overflow-hidden backdrop-blur-sm border border-white/[0.06]">
          <div 
            className="absolute top-0 left-0 w-full rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_rgba(96,165,250,0.8)]"
            style={{ 
              height: `${scrollProgress}%`,
              backgroundColor: currentTheme.accent
            }}
          />
        </div>

        {/* Section Dots */}
        <div className="flex flex-col gap-2.5">
          {SECTIONS.map((sec) => {
            const isActive = activeSectionId === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className="group relative flex items-center justify-end p-1 cursor-pointer focus:outline-none"
                title={`${sec.number} // ${sec.label}`}
              >
                {/* Floating Tooltip Hover Label */}
                <div className="absolute right-7 px-2.5 py-1 rounded-lg bg-[#0d0d12]/90 border border-white/15 backdrop-blur-xl text-[10px] font-code whitespace-nowrap text-white opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-xl transform translate-x-2 group-hover:translate-x-0">
                  <span className="text-white/40">{sec.number}</span> <span className="font-bold">{sec.title}</span> &nbsp;—&nbsp; {sec.label}
                </div>

                {/* Milestone Dot / Pill */}
                <div 
                  className={`transition-all duration-300 rounded-full ${
                    isActive 
                      ? 'w-2.5 h-2.5 shadow-[0_0_8px_#ffffff]' 
                      : 'w-1.5 h-1.5 bg-white/30 group-hover:bg-white/70 group-hover:scale-125'
                  }`}
                  style={{
                    backgroundColor: isActive ? currentTheme.accent : undefined
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Scroll down indicator tip */}
        <div className="text-[8px] font-code text-white/30 tracking-widest uppercase rotate-90 mt-2">
          DEPTH
        </div>
      </aside>

      {/* =========================================================================
          SLEEK EXECUTIVE FIXED HEADER
          ========================================================================= */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 sm:px-12 py-5 bg-[#05070b]/80 backdrop-blur-xl border-b border-white/[0.06]">
        {/* Monogram Brand */}
        <div 
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg border border-white/15 bg-white/[0.04] flex items-center justify-center backdrop-blur-md group-hover:border-white/40 transition-all">
            <span className="font-code font-bold text-xs tracking-wider text-white">
              {PORTFOLIO_PROFILE.brandMark}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-white/90 group-hover:text-white transition-colors">
              {PORTFOLIO_PROFILE.name}
            </span>
            <span className="text-[9px] font-code tracking-[0.2em] text-white/40 uppercase">
              PORTFOLIO // 2026
            </span>
          </div>
        </div>

        {/* Nav Link Pills */}
        <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
          {SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-all ${
                activeSectionId === sec.id
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              {sec.title}
            </button>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Full Screen Mode Toggle Button */}
          <button
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Exit Full Screen" : "Fit Full Screen"}
            title={isFullscreen ? "Exit Full Screen (Esc)" : "Fit in Full Screen"}
            className="w-8 h-8 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 transition-all backdrop-blur-md cursor-pointer"
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5 text-blue-400" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5 text-white/80" />
            )}
          </button>

          <button
            onClick={toggleMute}
            aria-label="Toggle Sound"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
            className="w-8 h-8 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 transition-all backdrop-blur-md cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-white/80" />}
          </button>

          <button
            onClick={handleDownloadCV}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/80 hover:text-white font-code text-xs font-medium tracking-wider transition-all backdrop-blur-md cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5" /> CV
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="hidden sm:inline-flex px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold tracking-wide transition-all shadow-lg shadow-blue-500/20 cursor-pointer"
          >
            Transmit
          </button>

          {/* Mobile Drawer Hamburger Button */}
          <button
            onClick={() => {
              cyberAudio.playKeyClick();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="md:hidden w-8 h-8 rounded-full border border-white/15 bg-white/[0.06] flex items-center justify-center text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4 text-blue-400" /> : <Menu className="w-4 h-4 text-white" />}
          </button>
        </div>
      </header>

      {/* =========================================================================
          MOBILE DRAWER NAVIGATION (PHONES & TABLETS < 768px)
          ========================================================================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden animate-fade-in">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="absolute top-20 left-0 right-0 max-h-[calc(100vh-5rem)] overflow-y-auto bg-[#07090f]/95 border-b border-white/10 p-6 space-y-6 shadow-2xl">
            {/* Navigation Links */}
            <div className="space-y-1">
              <div className="text-[10px] font-code text-white/40 tracking-widest uppercase mb-2">
                NAVIGATION
              </div>
              {SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    scrollToSection(sec.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-left text-sm font-medium transition-all ${
                    activeSectionId === sec.id
                      ? 'bg-blue-600/20 border border-blue-500/30 text-white font-bold'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span>{sec.title}</span>
                  <ChevronRight className="w-4 h-4 text-white/40" />
                </button>
              ))}
            </div>

            {/* Quick Actions in Mobile Drawer */}
            <div className="space-y-3 pt-4 border-t border-white/[0.08]">
              <div className="text-[10px] font-code text-white/40 tracking-widest uppercase">
                DIRECT TRANSMISSIONS
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={PORTFOLIO_PROFILE.getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] font-bold text-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={PORTFOLIO_PROFILE.getGmailUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-400 font-bold text-xs"
                >
                  <Mail className="w-4 h-4" />
                  <span>Gmail</span>
                </a>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => {
                    handleDownloadCV();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-white/[0.05] border border-white/15 text-white text-xs font-medium"
                >
                  <FileDown className="w-3.5 h-3.5" /> Download CV
                </button>
                <button
                  onClick={() => {
                    toggleFullscreen();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-white/[0.05] border border-white/15 text-white text-xs font-medium"
                >
                  {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 text-blue-400" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  <span>{isFullscreen ? 'Exit Full' : 'Fullscreen'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MAIN SECTIONS CONTAINER (WIDE SCREEN & FULL VIEWPORT FIT)
          ========================================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-24 sm:pt-28 pb-24 space-y-28 lg:space-y-36">

        {/* =======================================================================
            SECTION 01: HERO / EXECUTIVE STAGE (FULL SCREEN FIT)
            ======================================================================= */}
        <section id="hero" className="min-h-[calc(100vh-6rem)] flex flex-col justify-center py-6 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Clean Executive Headline & Brief */}
            <div className="lg:col-span-7 space-y-6">
              {/* Status Badge */}
              <RevealOnScroll direction="up" delay={0} blur={true}>
                <div className="gsap-parallax-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-code font-medium tracking-wider text-white/80">
                    {PORTFOLIO_PROFILE.availability}
                  </span>
                </div>
              </RevealOnScroll>

              {/* Bold Modern Executive Headline with Kinetic Typography */}
              <RevealOnScroll direction="up" delay={100} blur={true}>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                    <p className="gsap-parallax-badge text-xs font-code tracking-[0.25em] text-white/50 uppercase">
                      <ScrambleHeading text="SYSTEMS & ARCHITECTURE // 2026" speed={22} />
                    </p>
                  </div>
                  <h1 className="gsap-parallax-title text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-white tracking-tight uppercase select-none">
                    <div className="text-white drop-shadow-[0_0_25px_rgba(59,130,246,0.35)]">
                      <KineticText key={`main-${currentTheme.id}`} variant="split-chars" stagger={0.02}>
                        {currentTheme.leftTitleMain}
                      </KineticText>
                    </div>
                    <div className="text-blue-400/80 drop-shadow-[0_0_20px_rgba(96,165,250,0.25)]">
                      <KineticText key={`sub-${currentTheme.id}`} variant="split-chars" delay={0.12} stagger={0.02}>
                        {currentTheme.leftTitleSub}
                      </KineticText>
                    </div>
                  </h1>
                </div>
              </RevealOnScroll>

              {/* Role Title & Domain Code with Scramble FX */}
              <RevealOnScroll direction="up" delay={200} blur={true}>
                <div className="space-y-2.5">
                  <div className="gsap-parallax-badge text-sm font-code font-semibold tracking-wider uppercase text-white/90 flex flex-wrap items-center gap-2">
                    <span 
                      className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/10 shadow-sm"
                      style={{ color: currentTheme.accent }}
                    >
                      <ScrambleHeading key={currentTheme.role} text={currentTheme.role} speed={25} />
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="text-white/60 text-xs tracking-widest">{currentTheme.code}</span>
                  </div>
                  <p className="gsap-parallax-desc text-white/75 text-sm sm:text-base leading-relaxed max-w-xl font-light">
                    <KineticText key={`desc-${currentTheme.id}`} variant="word-reveal" delay={0.2} stagger={0.015}>
                      {PORTFOLIO_PROFILE.tagline}
                    </KineticText>
                  </p>
                </div>
              </RevealOnScroll>

              {/* Action Buttons */}
              <RevealOnScroll direction="up" delay={300} blur={true}>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black hover:bg-white/90 text-xs font-bold tracking-wide transition-all shadow-xl hover:-translate-y-0.5 cursor-pointer"
                  >
                    Explore Work
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => scrollToSection('about')}
                    className="px-5 py-3 rounded-full text-white/80 hover:text-white text-xs font-medium tracking-wide border border-white/10 hover:border-white/20 bg-white/[0.03] backdrop-blur-md transition-all cursor-pointer"
                  >
                    About & Bio
                  </button>
                </div>
              </RevealOnScroll>

              {/* Stats Bar */}
              <RevealOnScroll direction="up" delay={400} blur={true}>
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/[0.08] max-w-md">
                  {PORTFOLIO_PROFILE.stats.map((st, i) => (
                    <div key={i} className="space-y-0.5">
                      <div className="text-2xl font-bold text-white tracking-tight">{st.value}</div>
                      <div className="text-[10px] text-white/40 font-code tracking-wider uppercase">{st.label}</div>
                    </div>
                  ))}
                </div>
              </RevealOnScroll>
            </div>

            {/* Right Column: Clean Executive Portrait Card */}
            <div className="lg:col-span-5 flex flex-col items-center gap-5">
              <RevealOnScroll direction="up" delay={100} scale={true} blur={false}>
                <div
                  ref={cardRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="relative w-full max-w-[340px] aspect-[3/4] rounded-3xl overflow-hidden border border-white/15 bg-[#0b0e14] shadow-[0_25px_60px_rgba(0,0,0,0.8)] group cursor-pointer transition-transform duration-150 ease-out"
                >
                  <img
                    src={heroImage}
                    alt="Sathya Sai JS"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/sathya_hero_new.jpg';
                    }}
                    className="w-full h-full object-cover object-center relative z-0"
                  />
                  
                  {/* Subtle Gradient Bottom Rim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04060a]/80 via-transparent to-transparent opacity-60 pointer-events-none z-10" />

                  {/* Card Live Badge */}
                  <div className="absolute bottom-4 inset-x-4 flex items-center justify-between pointer-events-none bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/15 z-20">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white tracking-wide">
                        {PORTFOLIO_PROFILE.name}
                      </span>
                      <span className="text-[10px] font-code text-white/70">
                        {currentTheme.role}
                      </span>
                    </div>
                    <div 
                      className="w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_8px_#fff]"
                      style={{ backgroundColor: currentTheme.accent }}
                    />
                  </div>
                </div>
              </RevealOnScroll>

              {/* Interactive Domain Switcher Strip */}
              <RevealOnScroll direction="up" delay={350} blur={true} className="w-full max-w-[340px]">
                <div className="w-full p-2 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl flex flex-col gap-1.5">
                  <span className="text-[9px] font-code text-white/40 tracking-widest uppercase px-2 pt-1">
                    ACTIVE SPECIALIZATION
                  </span>
                  <div className="grid grid-cols-3 gap-1">
                    {THEMES.map((th, idx) => (
                      <button
                        key={th.id}
                        onClick={() => handleSwitchTheme(idx)}
                        className={`p-2 rounded-xl text-center font-code text-[11px] transition-all cursor-pointer ${
                          idx === activeThemeIdx
                            ? 'bg-white text-black font-bold shadow-md'
                            : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                        }`}
                      >
                        {th.name}
                      </button>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            </div>

          </div>
        </section>

        {/* =======================================================================
            KINETIC TYPOGRAPHY INFINITE MARQUEE STRIP
            ======================================================================= */}
        <div className="w-full overflow-hidden border-y border-white/[0.08] py-3 bg-white/[0.01] backdrop-blur-sm -my-6 select-none">
          <div className="animate-marquee-left flex items-center gap-8 text-xs font-code tracking-[0.25em] text-white/50 uppercase">
            <span className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              CYBER SECURITY DEFENSE
            </span>
            <span className="text-white/20">///</span>
            <span className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              FULL STACK WEB & MOBILE APPS
            </span>
            <span className="text-white/20">///</span>
            <span className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              POWER BI & DATA INTELLIGENCE
            </span>
            <span className="text-white/20">///</span>
            <span className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              ZERO TRUST ARCHITECTURE
            </span>
            <span className="text-white/20">///</span>
            <span className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              BRAIIL ACADEMY & BSROCKS
            </span>
            <span className="text-white/20">///</span>
            {/* Duplicated for smooth loop */}
            <span className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              CYBER SECURITY DEFENSE
            </span>
            <span className="text-white/20">///</span>
            <span className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              FULL STACK WEB & MOBILE APPS
            </span>
            <span className="text-white/20">///</span>
            <span className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              POWER BI & DATA INTELLIGENCE
            </span>
            <span className="text-white/20">///</span>
            <span className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              ZERO TRUST ARCHITECTURE
            </span>
            <span className="text-white/20">///</span>
            <span className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              BRAIIL ACADEMY & BSROCKS
            </span>
            <span className="text-white/20">///</span>
          </div>
        </div>

        {/* =======================================================================
            SECTION 02: ABOUT & IDENTITY
            ======================================================================= */}
        <section id="about" className="space-y-8 scroll-mt-28">
          <RevealOnScroll direction="up" blur={true}>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <span className="gsap-parallax-badge inline-block text-xs font-code text-blue-400 tracking-widest uppercase">
                  <ScrambleHeading text="02 // PROFILE & DOSSIER" speed={24} />
                </span>
                <h2 className="gsap-parallax-title text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  <KineticText variant="split-chars" stagger={0.02}>
                    Professional Background
                  </KineticText>
                </h2>
              </div>

              {/* Dossier Stream Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => startTypingEffect(false)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/80 font-code text-xs transition-all cursor-pointer"
                  title="Replay biometric bio stream"
                >
                  <RotateCcw className="w-3 h-3" /> Replay Bio
                </button>

                <button
                  onClick={() => startTypingEffect(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-white font-code text-xs transition-all cursor-pointer"
                >
                  <Zap className="w-3 h-3 text-blue-400" /> Instant
                </button>
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Photo & Ident Badge */}
              <div className="lg:col-span-4 space-y-4">
                <RevealOnScroll direction="up" delay={50} scale={true} blur={false}>
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/15 bg-[#0b0e14] shadow-2xl">
                    <img 
                      src={ABOUT_IMAGE_URL} 
                      alt="Sathya Sai JS" 
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/images/sathya-image-2.jpeg';
                      }}
                      className="w-full h-full object-cover object-center relative z-0"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 border border-white/10 backdrop-blur-md text-[9px] font-code text-emerald-400 flex items-center gap-1.5 z-10">
                      <Shield className="w-3 h-3" /> VERIFIED ENGINEER
                    </div>
                    <div className="absolute bottom-3 inset-x-3 p-3 rounded-2xl bg-[#09090d]/85 border border-white/10 backdrop-blur-md flex items-center justify-between z-10">
                      <div>
                        <div className="text-xs font-bold text-white">{PORTFOLIO_PROFILE.name}</div>
                        <div className="text-[10px] font-code text-white/60">{PORTFOLIO_PROFILE.location}</div>
                      </div>
                      <div className="font-code text-[10px] text-blue-300">B.E. 2027</div>
                    </div>
                  </div>
                </RevealOnScroll>

                {/* Quick Details */}
                <RevealOnScroll direction="up" delay={200} blur={true}>
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2 text-xs font-code">
                    <div className="flex justify-between text-white/50">
                      <span>ENGAGEMENT:</span>
                      <span className="text-white font-semibold">Technical Associate</span>
                    </div>
                    <div className="flex justify-between text-white/50">
                      <span>ORGANIZATION:</span>
                      <span className="text-white font-semibold">Braiil Academy</span>
                    </div>
                    <div className="flex justify-between text-white/50">
                      <span>CORE FOCUS:</span>
                      <span className="text-blue-300 font-semibold">Security & Architecture</span>
                    </div>
                  </div>
                </RevealOnScroll>
              </div>

              {/* Right: Clean Terminal Content */}
              <div className="lg:col-span-8 space-y-6">
                <RevealOnScroll direction="up" delay={150} blur={true}>
                  <div className="rounded-3xl bg-[#090c12] border border-white/12 p-6 sm:p-8 shadow-2xl space-y-4 relative overflow-hidden">
                    {/* Terminal Header Bar */}
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                        <span className="ml-2 font-code text-xs text-white/40">
                          TERMINAL // sathya@production-node:~# cat bio.md
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isTypingActive && (
                          <span className="text-[10px] font-code text-blue-300 animate-pulse flex items-center gap-1">
                            <Radio className="w-3 h-3" /> STREAMING TEXT...
                          </span>
                        )}
                        {isTypingComplete && (
                          <span className="text-[10px] font-code text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> VERIFIED
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Headline */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {PORTFOLIO_PROFILE.aboutHeadline}
                    </h3>

                    {/* TYPED BIOGRAPHY CONTENT */}
                    <div className="min-h-[130px] text-white/85 leading-relaxed text-sm sm:text-base font-mono relative bg-black/30 p-4 rounded-2xl border border-white/[0.06]">
                      <span>{typedBio || (isTypingActive ? '' : fullBioText)}</span>
                      <span className="inline-block w-2.5 h-4 ml-1 bg-blue-400 animate-pulse align-middle" />
                    </div>

                    {/* Highlights Badges */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-code">
                        #ZeroTrustDefense
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-code">
                        #FullStackPythonReact
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-code">
                        #PowerBIAnalytics
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-code">
                        #BraiilAcademyAssociate
                      </span>
                    </div>

                    {/* Signature */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                      <span className="text-xs font-code text-white/40">SIGNATURE:</span>
                      <span className="font-semibold text-lg text-blue-200 tracking-wide">{PORTFOLIO_PROFILE.signature}</span>
                    </div>
                  </div>
                </RevealOnScroll>

                {/* 4 Core Pillars Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {PORTFOLIO_PROFILE.pillars.map((pil, pIdx) => (
                    <RevealOnScroll key={pil.id} direction="up" delay={250 + pIdx * 80} blur={true}>
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-all space-y-1.5 h-full">
                        <div className="flex items-center justify-between text-xs font-code">
                          <span className="font-bold text-white">{pil.title}</span>
                          <span className="text-blue-400/80">{pil.number}</span>
                        </div>
                        <p className="text-xs text-white/60 leading-relaxed">{pil.description}</p>
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>
            </div>
        </section>

        {/* =======================================================================
            SECTION 03: TECHNICAL ARSENAL
            ======================================================================= */}
        <section id="toolkit" className="space-y-8 scroll-mt-28">
          <RevealOnScroll direction="up" blur={true}>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <span className="gsap-parallax-badge inline-block text-xs font-code text-blue-400 tracking-widest uppercase">
                  <ScrambleHeading text="03 // SKILLS & STACK" speed={24} />
                </span>
                <h2 className="gsap-parallax-title text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  <KineticText variant="split-chars" stagger={0.02}>
                    Technical Arsenal
                  </KineticText>
                </h2>
              </div>

              {/* Category Tabs */}
              <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                {PORTFOLIO_PROFILE.toolkitCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      cyberAudio.playKeyClick();
                      setActiveToolkitTab(cat.id);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      activeToolkitTab === cat.id
                        ? 'bg-white text-black font-bold shadow-md'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {cat.name} ({cat.count})
                  </button>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Skills Matrix Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {PORTFOLIO_PROFILE.toolkitCategories
              .find(c => c.id === activeToolkitTab)?.skills.map((skill, idx) => (
                <RevealOnScroll key={`${activeToolkitTab}-${idx}`} direction="up" delay={idx * 60} blur={true}>
                  <div 
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all flex items-center justify-between group hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-code text-white/30">0{idx + 1}</span>
                      <span className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                        {skill}
                      </span>
                    </div>
                    <span className="text-[10px] font-code text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                      PROFICIENT
                    </span>
                  </div>
                </RevealOnScroll>
              ))}
          </div>

          {/* Technology Ecosystem Badges */}
          <RevealOnScroll direction="up" delay={200} blur={true}>
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] space-y-3">
              <div className="text-xs font-code text-white/40 tracking-wider uppercase">
                ACTIVE ECOSYSTEM TECH
              </div>
              <div className="flex flex-wrap gap-2.5">
                {PORTFOLIO_PROFILE.technologiesWorkedWith.map((tech) => (
                  <div 
                    key={tech.name}
                    className="px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-medium text-white/80 hover:text-white hover:border-white/20 transition-all flex items-center gap-2"
                  >
                    <span>{tech.name}</span>
                    <span className="text-[10px] text-white/40 font-code">• {tech.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* =======================================================================
            SECTION 04: FEATURED ARCHITECTURES & WORK
            ======================================================================= */}
        <section id="projects" className="space-y-8 scroll-mt-28">
          <RevealOnScroll direction="up" blur={true}>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <span className="gsap-parallax-badge inline-block text-xs font-code text-blue-400 tracking-widest uppercase">
                  <ScrambleHeading text="04 // SELECTED WORK" speed={24} />
                </span>
                <h2 className="gsap-parallax-title text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  <KineticText variant="split-chars" stagger={0.02}>
                    Featured Projects
                  </KineticText>
                </h2>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                {[
                  { id: 'all', label: 'All Work' },
                  { id: 'cyber', label: 'Security' },
                  { id: 'software', label: 'Development' },
                  { id: 'data', label: 'Analytics' }
                ].map((flt) => (
                  <button
                    key={flt.id}
                    onClick={() => {
                      cyberAudio.playKeyClick();
                      setProjectFilter(flt.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      projectFilter === flt.id
                        ? 'bg-white text-black font-bold shadow-md'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {flt.label}
                  </button>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj, pIdx) => (
              <RevealOnScroll key={proj.id} direction="up" delay={pIdx * 100} blur={true}>
                <div className="group rounded-3xl bg-[#090c12] border border-white/10 hover:border-white/25 overflow-hidden transition-all duration-300 flex flex-col h-full shadow-2xl">
                  {/* Preview Image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/40 border-b border-white/[0.08]">
                    <img 
                      src={proj.image} 
                      alt={proj.title} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-code text-white/80">
                      {proj.number} // {proj.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="gsap-parallax-title text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                        {proj.title}
                      </h3>
                      <p className="gsap-parallax-desc text-xs text-white/70 leading-relaxed font-light">
                        {proj.description}
                      </p>
                    </div>

                    {/* Metrics Bar */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/[0.06]">
                      {proj.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="space-y-0.5">
                          <div className="text-[9px] font-code text-white/40 uppercase">{m.label}</div>
                          <div className="text-xs font-bold text-white">{m.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tags & Action Links */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {proj.tags.slice(0, 3).map((tg) => (
                          <span key={tg} className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[10px] font-code text-white/60">
                            {tg}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <a 
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-white transition-all cursor-pointer"
                          title="View Repository"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* =======================================================================
            SECTION 05: CREDENTIALS & JOURNEY
            ======================================================================= */}
        <section id="experience" className="space-y-8 scroll-mt-28">
          <RevealOnScroll direction="up" blur={true}>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <span className="gsap-parallax-badge inline-block text-xs font-code text-blue-400 tracking-widest uppercase">
                  <ScrambleHeading text="05 // CREDENTIALS & EXPERIENCE" speed={24} />
                </span>
                <h2 className="gsap-parallax-title text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  <KineticText variant="split-chars" stagger={0.02}>
                    Timeline & Certifications
                  </KineticText>
                </h2>
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Timeline Column */}
            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-sm font-code tracking-wider uppercase text-white/50 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-400" />
                ACADEMIC & PROFESSIONAL JOURNEY
              </h3>

              <div className="space-y-3">
                {PORTFOLIO_PROFILE.timeline.map((item, idx) => (
                  <RevealOnScroll key={idx} direction="up" delay={idx * 80} blur={true}>
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-code">
                        <span className="text-blue-400">{item.period}</span>
                        <span className="text-white/40">{item.location}</span>
                      </div>
                      <div className="text-base font-bold text-white">{item.degree}</div>
                      <div className="text-xs text-white/70 font-medium">{item.institution}</div>
                      <p className="text-xs text-white/60 leading-relaxed pt-1 font-light">{item.highlight}</p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>

            {/* Certifications Column */}
            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-sm font-code tracking-wider uppercase text-white/50 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                VERIFIED CERTIFICATIONS
              </h3>

              <div className="space-y-3">
                {PORTFOLIO_PROFILE.certifications.map((cert, cIdx) => (
                  <RevealOnScroll key={cert.id} direction="up" delay={cIdx * 80} blur={true}>
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{cert.title}</span>
                        <span className="text-[10px] font-code text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                          {cert.year}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-white/60 font-code">
                        <span>{cert.issuer}</span>
                        <span className="text-white/40">ID: {cert.credentialId}</span>
                      </div>
                      <p className="text-xs text-white/60 leading-relaxed font-light">{cert.description}</p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================================
            SECTION 06: TRANSMISSION / CONTACT
            ======================================================================= */}
        <section id="contact" className="space-y-8 scroll-mt-28">
          <RevealOnScroll direction="up" blur={true}>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <span className="gsap-parallax-badge inline-block text-xs font-code text-blue-400 tracking-widest uppercase">
                  <ScrambleHeading text="06 // DIRECT CONTACT & TRANSMISSION" speed={24} />
                </span>
                <h2 className="gsap-parallax-title text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  <KineticText variant="split-chars" stagger={0.02}>
                    Get In Touch
                  </KineticText>
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="gsap-parallax-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-code">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE & RESPONDING PROMPTLY
                </span>
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Direct Channels Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">Direct Transmission Hub</h3>
                  <p className="text-xs text-white/60 leading-relaxed font-light">
                    Reach me directly on Gmail or send a message on WhatsApp for instant discussions, project collaborations, or security audits.
                  </p>
                </div>

                {/* Direct Action Hub */}
                <div className="space-y-3 pt-2">
                  
                  {/* 1. Gmail Direct Card */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-red-950/20 via-white/[0.02] to-transparent border border-red-500/20 hover:border-red-500/40 transition-all space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-white">
                        <div className="w-7 h-7 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400">
                          <Mail className="w-3.5 h-3.5" />
                        </div>
                        <span>Gmail Inbox</span>
                      </div>
                      <span className="text-[10px] font-code text-red-400/80 uppercase">Primary</span>
                    </div>

                    <div className="text-xs font-code text-white/80 select-all truncate pl-1">
                      {PORTFOLIO_PROFILE.email}
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <a
                        href={PORTFOLIO_PROFILE.getGmailUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-code text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-red-900/20 cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Open in Gmail</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                      <button
                        onClick={handleCopyEmail}
                        className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white transition-colors cursor-pointer"
                        title="Copy Email Address"
                      >
                        {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-white/70" />}
                      </button>
                    </div>
                  </div>

                  {/* 2. WhatsApp Direct Card */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/20 via-white/[0.02] to-transparent border border-emerald-500/20 hover:border-emerald-500/40 transition-all space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-white">
                        <div className="w-7 h-7 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                          <MessageCircle className="w-3.5 h-3.5" />
                        </div>
                        <span>WhatsApp Chat</span>
                      </div>
                      <span className="text-[10px] font-code text-emerald-400/80 uppercase">Instant</span>
                    </div>

                    <div className="text-xs font-code text-white/80 select-all truncate pl-1">
                      {PORTFOLIO_PROFILE.whatsappNumber || PORTFOLIO_PROFILE.phone}
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <a
                        href={PORTFOLIO_PROFILE.getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-code text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-900/20 cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat on WhatsApp</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                      <button
                        onClick={handleCopyWhatsApp}
                        className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white transition-colors cursor-pointer"
                        title="Copy WhatsApp Number"
                      >
                        {copiedWhatsApp ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-white/70" />}
                      </button>
                    </div>
                  </div>

                  {/* Location Card */}
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs font-code text-white/80">
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span>{PORTFOLIO_PROFILE.location}</span>
                    </div>
                    <span className="text-[10px] text-white/40 font-mono">IST (UTC+5:30)</span>
                  </div>
                </div>

                {/* Social Profiles */}
                <div className="flex items-center gap-2 pt-2">
                  <a
                    href={PORTFOLIO_PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-center text-xs font-code text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Github className="w-3.5 h-3.5" /> GitHub
                  </a>
                  <a
                    href={PORTFOLIO_PROFILE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-center text-xs font-code text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                  </a>
                  <a
                    href={PORTFOLIO_PROFILE.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-center text-xs font-code text-white transition-all flex items-center justify-center"
                    title="Instagram"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Transmission Contact Form Column */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#090c12] border border-white/10 space-y-5 shadow-2xl relative">
                
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <div>
                    <h4 className="text-sm font-bold text-white">Send Direct Message</h4>
                    <p className="text-xs text-white/50">Choose to send directly to Gmail or message on WhatsApp.</p>
                  </div>
                  <span className="text-[10px] font-code px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    256-BIT ENCRYPTED
                  </span>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-code text-white/60">YOUR NAME *</label>
                      <input 
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs font-code focus:outline-none focus:border-blue-400 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-code text-white/60">YOUR EMAIL *</label>
                      <input 
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="e.g. alex@enterprise.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs font-code focus:outline-none focus:border-blue-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-code text-white/60">SUBJECT</label>
                    <input 
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      placeholder="e.g. Web & App Development / Security Architecture"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs font-code focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-code text-white/60">YOUR MESSAGE *</label>
                    <textarea 
                      rows={4}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Describe your technical requirements, project scope, or opportunity..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs font-code focus:outline-none focus:border-blue-400 transition-colors resize-none"
                    />
                  </div>

                  {contactSubmitted && (
                    <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-code flex items-center gap-2.5 animate-fade-in">
                      <Check className="w-4 h-4 shrink-0" />
                      <span>
                        {contactDispatchMode === 'whatsapp' 
                          ? 'Opening WhatsApp with your pre-filled message...'
                          : 'Opening Gmail with your message drafted to sathyasaijs12@gmail.com!'}
                      </span>
                    </div>
                  )}

                  {/* Dual Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    
                    {/* Send to Gmail Button */}
                    <button
                      type="button"
                      onClick={() => handleSendViaGmail()}
                      className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-900/30 active:scale-98"
                    >
                      <Mail className="w-4 h-4 text-white" />
                      <span>SEND VIA GMAIL</span>
                    </button>

                    {/* Message on WhatsApp Button */}
                    <button
                      type="button"
                      onClick={() => handleSendViaWhatsApp()}
                      className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-900/30 active:scale-98"
                    >
                      <MessageCircle className="w-4 h-4 text-white" />
                      <span>MESSAGE ON WHATSAPP</span>
                    </button>

                  </div>

                  <p className="text-[10px] text-center font-code text-white/40 pt-1">
                    Direct recipient: <span className="text-white/70">{PORTFOLIO_PROFILE.email}</span> • Instant responses within hours
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* =========================================================================
          FLOATING QUICK CONNECT DOCK (WhatsApp, Gmail & Fullscreen Quick Launchers)
          ========================================================================= */}
      <aside aria-label="Quick Connect Actions" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-auto select-none">
        
        {/* Fullscreen Quick Button */}
        <button
          onClick={toggleFullscreen}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.16] backdrop-blur-xl border border-white/20 text-white shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer font-bold text-xs"
          title={isFullscreen ? "Exit Full Screen (Esc)" : "Fit in Full Screen"}
        >
          {isFullscreen ? (
            <>
              <Minimize2 className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline font-mono text-[11px]">Exit Fullscreen</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-3.5 h-3.5 text-white/90" />
              <span className="hidden sm:inline font-mono text-[11px]">Fullscreen</span>
            </>
          )}
        </button>

        {/* WhatsApp Quick Trigger */}
        <a
          href={PORTFOLIO_PROFILE.getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => cyberAudio.playKeyClick()}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-[0_8px_25px_rgba(37,211,102,0.45)] transition-all duration-300 transform hover:scale-105 cursor-pointer font-bold text-xs"
          title="Message me on WhatsApp"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline tracking-wide font-mono">WhatsApp Me</span>
        </a>

        {/* Gmail Quick Trigger */}
        <a
          href={PORTFOLIO_PROFILE.getGmailUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => cyberAudio.playKeyClick()}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#EA4335] hover:bg-[#d93025] text-white shadow-[0_8px_25px_rgba(234,67,53,0.45)] transition-all duration-300 transform hover:scale-105 cursor-pointer font-bold text-xs"
          title="Email me in Gmail"
        >
          <Mail className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline tracking-wide font-mono">Email via Gmail</span>
        </a>

      </aside>

      {/* =========================================================================
          SLEEK FOOTER
          ========================================================================= */}
      <footer className="border-t border-white/[0.08] py-8 bg-[#030408] text-center text-xs font-code text-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} {PORTFOLIO_PROFILE.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-white/60">
            <span>Chennai, India</span>
            <span>•</span>
            <span className="text-emerald-400">Available</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
