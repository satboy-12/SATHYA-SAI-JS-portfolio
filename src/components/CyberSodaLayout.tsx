import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_PROFILE, ProjectCaseStudy, CertificationItem } from '../data/portfolioData';
import profileImage from '../assets/images/sathya image 2.jpeg';
import { Cyber3DScrollCanvas } from './Cyber3DScrollCanvas';
import { RevealOnScroll } from './RevealOnScroll';
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
  ChevronDown
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
  rightTitleMain: string;
  rightTitleSub: string;
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
    leftTitleMain: 'Secure',
    leftTitleSub: 'Systems',
    rightTitleMain: 'Zero',
    rightTitleSub: 'Breach',
    accent: '#fbcfe8',
    accentRgb: '251, 207, 232',
    colors: {
      inner: '#160d13',
      mid: '#0c070a',
      outer: '#060405'
    },
    icon: <Shield className="w-4 h-4 text-[#fbcfe8]" />
  },
  {
    id: 'software_developer',
    name: 'Software Dev',
    code: 'FULL STACK • PYTHON • REACT',
    role: 'Software Developer',
    tagline: 'Engineering scalable architectures, intelligent microservices, and high-performance secure applications.',
    leftTitleMain: 'Intelligent',
    leftTitleSub: 'Code',
    rightTitleMain: 'Modern',
    rightTitleSub: 'Engines',
    accent: '#93c5fd',
    accentRgb: '147, 197, 253',
    colors: {
      inner: '#0d1520',
      mid: '#070b10',
      outer: '#040608'
    },
    icon: <Code2 className="w-4 h-4 text-[#93c5fd]" />
  },
  {
    id: 'data_analyst',
    name: 'Data Analyst',
    code: 'POWER BI • DAX • PREDICTIVE AI',
    role: 'Data Analyst',
    tagline: 'Transforming telemetry, relational databases, and enterprise data streams into executive BI dashboards.',
    leftTitleMain: 'Visual',
    leftTitleSub: 'Insights',
    rightTitleMain: 'Deep',
    rightTitleSub: 'Analytics',
    accent: '#a7f3d0',
    accentRgb: '167, 243, 208',
    colors: {
      inner: '#0d1a16',
      mid: '#060e0c',
      outer: '#030706'
    },
    icon: <BarChart3 className="w-4 h-4 text-[#a7f3d0]" />
  }
];

const SECTIONS = [
  { id: 'hero', number: '01', title: 'INIT', label: 'Zero-Trust Stage' },
  { id: 'about', number: '02', title: 'ABOUT', label: 'Biometrics & Bio' },
  { id: 'toolkit', number: '03', title: 'TOOLKIT', label: 'Defense Arsenal' },
  { id: 'projects', number: '04', title: 'WORK', label: 'Architectures' },
  { id: 'experience', number: '05', title: 'CREDENTIALS', label: 'Certificates & XP' },
  { id: 'contact', number: '06', title: 'CONTACT', label: 'Secure Transmission' }
];

export const CyberSodaLayout: React.FC = () => {
  const [activeThemeIdx, setActiveThemeIdx] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [activeToolkitTab, setActiveToolkitTab] = useState<string>('cyber_security');
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

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
        const delay = Math.random() * 18 + 12;
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

  // Form Submit Handler
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    cyberAudio.playSuccess();
    confetti({ particleCount: 75, spread: 80, origin: { y: 0.7 } });
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: '', email: '', message: '' });
    }, 3000);
  };

  // Download CV
  const handleDownloadCV = () => {
    cyberAudio.playSuccess();
    const element = document.createElement('a');
    const file = new Blob([
      `SATHYA SAI JS - Cyber Security Engineer & Full Stack Developer Resume\n\n` +
      `ROLE: ${PORTFOLIO_PROFILE.roleTitle}\n` +
      `EMAIL: ${PORTFOLIO_PROFILE.email}\n` +
      `PHONE: ${PORTFOLIO_PROFILE.phone}\n` +
      `LOCATION: ${PORTFOLIO_PROFILE.location}\n\n` +
      `SUMMARY:\n${PORTFOLIO_PROFILE.bio}\n\n` +
      `EXPERIENCE:\nTechnical Associate at Braiil Academy (2025 - Present)\n\n` +
      `EDUCATION:\n- B.E. Cyber Security, Sri Ram Engineering College (2024 - 2027)\n- Diploma in ECE, CPCL Polytechnic College (2020 - 2023)\n\n` +
      `VERIFIED CERTIFICATIONS:\n- Power BI Data Analytics (2025)\n- Data Analytics Certification (2024)\n- Python Programming (2024)\n- Cyber Security Fundamentals (2024)`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "Sathya_Sai_JS_Cyber_Resume.txt";
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
    const rotX = -(y / (rect.height / 2)) * 10;
    const rotY = (x / (rect.width / 2)) * 10;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  const filteredProjects = projectFilter === 'all'
    ? PORTFOLIO_PROFILE.projects
    : PORTFOLIO_PROFILE.projects.filter(p => {
        if (projectFilter === 'cyber') return p.category.toLowerCase().includes('security') || p.category.toLowerCase().includes('cyber');
        if (projectFilter === 'software') return p.category.toLowerCase().includes('software') || p.category.toLowerCase().includes('python') || p.category.toLowerCase().includes('full stack');
        if (projectFilter === 'data') return p.category.toLowerCase().includes('data') || p.category.toLowerCase().includes('power bi');
        return true;
      });

  return (
    <div 
      ref={containerRef} 
      className="min-h-screen bg-[#07070a] text-white font-sans selection:bg-pink-500/30 selection:text-white relative antialiased"
      style={{
        background: `radial-gradient(ellipse at 50% 0%, ${currentTheme.colors.inner} 0%, ${currentTheme.colors.mid} 50%, ${currentTheme.colors.outer} 100%)`
      }}
    >
      {/* WebGL 3D Scroll Animation Canvas */}
      <Cyber3DScrollCanvas 
        scrollProgress={scrollProgress} 
        accentColor={currentTheme.accent}
        activeSectionId={activeSectionId}
      />

      {/* Background Subtle Tech Mesh */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Dynamic Ambient Accent Glow */}
      <div 
        className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none opacity-20 transition-colors duration-1000 z-0"
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
          {/* Active Fill Laser */}
          <div 
            className="absolute top-0 left-0 w-full rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_rgba(251,207,232,0.8)]"
            style={{ 
              height: `${scrollProgress}%`,
              backgroundColor: currentTheme.accent
            }}
          />
        </div>

        {/* Section Milestones List */}
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
          SLEEK OBSIDIAN FIXED HEADER
          ========================================================================= */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 sm:px-12 py-5 bg-[#07070a]/75 backdrop-blur-xl border-b border-white/[0.06]">
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
              CYBER OBSIDIAN
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
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleMute}
            aria-label="Toggle Sound"
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
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/80 to-purple-600/80 hover:from-pink-500 hover:to-purple-600 text-white text-xs font-semibold tracking-wide transition-all shadow-lg shadow-pink-500/20 cursor-pointer"
          >
            Transmit
          </button>
        </div>
      </header>

      {/* =========================================================================
          CINEMATIC SECTIONS CONTAINER
          ========================================================================= */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 pt-28 pb-24 space-y-32">

        {/* =======================================================================
            SECTION 01: HERO / ZERO-TRUST STAGE
            ======================================================================= */}
        <section id="hero" className="min-h-[85vh] flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Headline & Bio Brief */}
            <div className="lg:col-span-7 space-y-6">
              {/* Status Badge */}
              <RevealOnScroll direction="up" delay={0} blur={true}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-code font-medium tracking-wider text-white/80">
                    {PORTFOLIO_PROFILE.availability}
                  </span>
                </div>
              </RevealOnScroll>

              {/* Headline */}
              <RevealOnScroll direction="up" delay={100} blur={true}>
                <div className="space-y-1">
                  <p className="text-xs font-code tracking-[0.25em] text-white/40 uppercase">
                    ZERO-TRUST ARCHITECTURE // 2026
                  </p>
                  <h1 className="font-cursive text-6xl sm:text-7xl lg:text-8xl leading-[0.85] text-white tracking-tight">
                    <span>{currentTheme.leftTitleMain}</span><br />
                    <span className="text-white/60">{currentTheme.leftTitleSub}</span>
                  </h1>
                </div>
              </RevealOnScroll>

              {/* Role Title & Domain Code */}
              <RevealOnScroll direction="up" delay={200} blur={true}>
                <div className="space-y-2">
                  <div className="text-sm font-code font-semibold tracking-wider uppercase text-white/90 flex items-center gap-2">
                    <span style={{ color: currentTheme.accent }}>{currentTheme.role}</span>
                    <span className="text-white/30">•</span>
                    <span className="text-white/50 text-xs">{currentTheme.code}</span>
                  </div>
                  <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-xl font-light">
                    {PORTFOLIO_PROFILE.tagline}
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
                    Explore Architectures
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => scrollToSection('about')}
                    className="px-5 py-3 rounded-full text-white/80 hover:text-white text-xs font-medium tracking-wide border border-white/10 hover:border-white/20 bg-white/[0.03] backdrop-blur-md transition-all cursor-pointer"
                  >
                    Decrypted Bio
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

            {/* Right Column: 3D Holographic Portrait Stage */}
            <div className="lg:col-span-5 flex flex-col items-center gap-5">
              <RevealOnScroll direction="up" delay={200} scale={true} blur={true}>
                <div
                  ref={cardRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="relative w-full max-w-[340px] aspect-[3/4] rounded-3xl overflow-hidden border border-white/15 bg-[#0e0e14] shadow-[0_25px_60px_rgba(0,0,0,0.8)] group cursor-pointer transition-transform duration-150 ease-out"
                >
                  <img
                    src={profileImage}
                    alt="Sathya Sai JS"
                    className="w-full h-full object-cover object-center"
                  />
                  
                  {/* Gradient Rim Sheen */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-transparent to-transparent opacity-85 pointer-events-none" />

                  {/* Card Live HUD Badge */}
                  <div className="absolute bottom-5 inset-x-5 flex items-center justify-between pointer-events-none bg-white/[0.06] backdrop-blur-md p-3 rounded-2xl border border-white/10">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-white tracking-wide">
                        {PORTFOLIO_PROFILE.name}
                      </span>
                      <span className="text-[10px] font-code text-white/50">
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

              {/* Interactive Domain Switcher Pill Strip */}
              <RevealOnScroll direction="up" delay={350} blur={true} className="w-full max-w-[340px]">
                <div className="w-full p-2 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl flex flex-col gap-1.5">
                  <span className="text-[9px] font-code text-white/40 tracking-widest uppercase px-2 pt-1">
                    DOMAIN FOCUS MATRIX
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
            SECTION 02: ABOUT & BIOMETRICS (WITH CYBER TERMINAL TYPING EFFECT)
            ======================================================================= */}
        <section id="about" className="space-y-8 scroll-mt-28">
          <RevealOnScroll direction="up" blur={true}>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <span className="text-xs font-code text-pink-300 tracking-widest uppercase">02 // BIOMETRICS & DOSSIER</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Cyber Security Engineer Bio</h2>
              </div>

              {/* Terminal Actions (Replay / Instant Decrypt) */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => startTypingEffect(false)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/80 font-code text-xs transition-all cursor-pointer"
                  title="Re-run terminal stream"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Replay Stream
                </button>

                <button
                  onClick={() => startTypingEffect(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-white font-code text-xs transition-all cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300" /> Instant Decrypt
                </button>
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Photo & Ident Badge */}
            <div className="lg:col-span-4 space-y-4">
              <RevealOnScroll direction="up" delay={100} scale={true} blur={true}>
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/15 bg-[#0e0e14]">
                  <img 
                    src={profileImage} 
                    alt="Sathya Sai JS" 
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 border border-white/10 backdrop-blur-md text-[9px] font-code text-emerald-400 flex items-center gap-1.5">
                    <Shield className="w-3 h-3" /> VERIFIED AGENT
                  </div>
                  <div className="absolute bottom-3 inset-x-3 p-3 rounded-2xl bg-[#09090d]/80 border border-white/10 backdrop-blur-md flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{PORTFOLIO_PROFILE.name}</div>
                      <div className="text-[10px] font-code text-white/50">{PORTFOLIO_PROFILE.location}</div>
                    </div>
                    <div className="font-code text-[10px] text-pink-300">B.E. 2027</div>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Quick Biometric Details */}
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
                    <span>SECURITY SPECIALTY:</span>
                    <span className="text-pink-300 font-semibold">Network & Zero-Day</span>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* Right: CYBER SECURITY TERMINAL WITH TYPING ANIMATION */}
            <div className="lg:col-span-8 space-y-6">
              <RevealOnScroll direction="up" delay={150} blur={true}>
                <div className="rounded-3xl bg-[#0b0b10] border border-white/15 p-6 sm:p-8 shadow-2xl space-y-4 relative overflow-hidden">
                  {/* Terminal Header Bar */}
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 font-code text-xs text-white/40">
                        SEC_TERMINAL_V2.4 // root@sathya-node:~# decrypt bio.dat
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isTypingActive && (
                        <span className="text-[10px] font-code text-pink-300 animate-pulse flex items-center gap-1">
                          <Radio className="w-3 h-3" /> STREAMING TELEMETRY...
                        </span>
                      )}
                      {isTypingComplete && (
                        <span className="text-[10px] font-code text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> SHA-256 VERIFIED
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Headline */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {PORTFOLIO_PROFILE.aboutHeadline}
                  </h3>

                  {/* TYPED BIOGRAPHY CONTENT */}
                  <div className="min-h-[140px] text-white/80 leading-relaxed text-sm sm:text-base font-mono relative bg-black/30 p-4 rounded-2xl border border-white/[0.06]">
                    <span>{typedBio || (isTypingActive ? '' : fullBioText)}</span>
                    {/* Blinking Cyber Hacker Cursor */}
                    <span className="inline-block w-2.5 h-4 ml-1 bg-pink-400 animate-pulse align-middle" />
                  </div>

                  {/* Cyber Highlights Pill Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-code">
                      #ZeroTrustDefense
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-code">
                      #FullStackPythonReact
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-code">
                      #PowerBIAnalytics
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-code">
                      #BraiilAcademyAssociate
                    </span>
                  </div>

                  {/* Signature */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    <span className="text-xs font-code text-white/40">AUTHENTICATED IDENTITY SIGNATURE:</span>
                    <span className="font-cursive text-2xl text-pink-200">{PORTFOLIO_PROFILE.signature}</span>
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
                        <span className="text-pink-300/80">{pil.number}</span>
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
            SECTION 03: DEFENSE & TOOLKIT ARSENAL
            ======================================================================= */}
        <section id="toolkit" className="space-y-8 scroll-mt-28">
          <RevealOnScroll direction="up" blur={true}>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <span className="text-xs font-code text-pink-300 tracking-widest uppercase">03 // DEFENSE & TOOLKIT ARSENAL</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Technical Arsenal & Mastery</h2>
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
                      <span className="text-sm font-semibold text-white group-hover:text-pink-200 transition-colors">
                        {skill}
                      </span>
                    </div>
                    <span className="text-[10px] font-code text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                      MASTERED
                    </span>
                  </div>
                </RevealOnScroll>
              ))}
          </div>

          {/* Technology Ecosystem Badges */}
          <RevealOnScroll direction="up" delay={200} blur={true}>
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] space-y-3">
              <span className="text-xs font-code text-white/40 tracking-widest uppercase">
                ACTIVE STACK & ENTERPRISE ECOSYSTEM
              </span>
              <div className="flex flex-wrap gap-2">
                {PORTFOLIO_PROFILE.technologiesWorkedWith.map((tech, i) => (
                  <div 
                    key={i} 
                    className="px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/20 text-xs font-code text-white/80 hover:text-white transition-all flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                    {tech.name}
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* =======================================================================
            SECTION 04: PRODUCTION ARCHITECTURES (PROJECTS)
            ======================================================================= */}
        <section id="projects" className="space-y-8 scroll-mt-28">
          <RevealOnScroll direction="up" blur={true}>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <span className="text-xs font-code text-pink-300 tracking-widest uppercase">04 // PRODUCTION WORK</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Engineered Architectures</h2>
              </div>

              {/* Filter Pills */}
              <div className="flex gap-1.5 p-1 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                {[
                  { id: 'all', label: 'All Architectures' },
                  { id: 'cyber', label: 'Cyber Defense' },
                  { id: 'software', label: 'Software' },
                  { id: 'data', label: 'Data & BI' }
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setProjectFilter(f.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      projectFilter === f.id
                        ? 'bg-white text-black font-bold'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((proj, pIdx) => (
              <RevealOnScroll key={proj.id} direction="up" delay={pIdx * 120} scale={true} blur={true}>
                <div 
                  className="p-7 rounded-3xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between space-y-5 shadow-xl group h-full"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-code text-pink-300 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20">
                        {proj.category}
                      </span>
                      <span className="text-xs font-code text-white/30">{proj.number}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-pink-200 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                      {proj.description}
                    </p>
                  </div>

                  {/* Project Metrics */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/[0.06]">
                    {proj.metrics.map((m, mi) => (
                      <div key={mi} className="text-left">
                        <div className="text-sm font-bold text-white">{m.value}</div>
                        <div className="text-[9px] text-white/40 font-code tracking-wider uppercase">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tags and Source Code Button */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tags.slice(0, 3).map((t, ti) => (
                        <span key={ti} className="px-2.5 py-0.5 rounded-md bg-white/[0.03] text-[10px] font-code text-white/70">
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-pink-300 hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      Source Code <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* =======================================================================
            SECTION 05: VERIFIED CREDENTIALS & EXPERIENCE
            ======================================================================= */}
        <section id="experience" className="space-y-8 scroll-mt-28">
          <RevealOnScroll direction="up" blur={true}>
            <div className="border-b border-white/[0.08] pb-4">
              <span className="text-xs font-code text-pink-300 tracking-widest uppercase">05 // VERIFIED CREDENTIALS & RECORD</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Experience & Certifications</h2>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Experience & Education Column */}
            <div className="lg:col-span-6 space-y-6">
              <RevealOnScroll direction="up" delay={100} blur={true}>
                <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.02] border border-white/[0.08] space-y-4">
                  <div className="flex items-center gap-2 text-pink-300 font-code text-xs">
                    <Briefcase className="w-4 h-4" />
                    <span>ACTIVE ENGAGEMENT</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-bold text-white">Technical Associate</h4>
                      <span className="text-xs font-code text-emerald-400">2025 - PRESENT</span>
                    </div>
                    <p className="text-xs text-white/50 font-code">Braiil Academy • Chennai, India</p>
                  </div>
                  <ul className="text-xs sm:text-sm text-white/70 space-y-2 list-disc list-inside leading-relaxed font-light">
                    <li>Engineering student educational systems and administrative data workflows.</li>
                    <li>Building real-time Power BI cohort telemetry dashboards for academic performance.</li>
                    <li>Securing internal communication pipelines and automated infrastructure.</li>
                  </ul>
                </div>
              </RevealOnScroll>

              {/* Education Block */}
              <RevealOnScroll direction="up" delay={200} blur={true}>
                <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.02] border border-white/[0.08] space-y-4">
                  <div className="flex items-center gap-2 text-blue-300 font-code text-xs">
                    <GraduationCap className="w-4 h-4" />
                    <span>ACADEMIC DEGREES</span>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                      <div className="flex items-center justify-between">
                        <h5 className="font-semibold text-white text-sm">B.E. in Cyber Security</h5>
                        <span className="text-[10px] font-code text-white/40">2024 - 2027</span>
                      </div>
                      <p className="text-xs text-white/60">Sri Ram Engineering College, Anna University</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                      <div className="flex items-center justify-between">
                        <h5 className="font-semibold text-white text-sm">Diploma in ECE</h5>
                        <span className="text-[10px] font-code text-white/40">2020 - 2023</span>
                      </div>
                      <p className="text-xs text-white/60">CPCL Polytechnic College, DOTE</p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* Certifications Grid Column */}
            <div className="lg:col-span-6 space-y-4">
              <RevealOnScroll direction="up" delay={100} blur={true}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-code text-white/50 uppercase">OFFICIAL ACCREDITATIONS</span>
                  <span className="text-xs font-code text-emerald-400">4 VERIFIED CERTS</span>
                </div>
              </RevealOnScroll>

              <div className="space-y-3">
                {PORTFOLIO_PROFILE.certifications.map((cert, cIdx) => (
                  <RevealOnScroll key={cert.id} direction="up" delay={150 + cIdx * 80} blur={true}>
                    <div 
                      className="p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-white/20 transition-all space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs font-code">
                        <span className="text-pink-300 font-semibold">{cert.year}</span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px]">VERIFIED</span>
                      </div>
                      <h4 className="text-base font-bold text-white">{cert.title}</h4>
                      <p className="text-xs text-white/60">{cert.issuer} • {cert.description}</p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================================
            SECTION 06: CONTACT / TRANSMISSION
            ======================================================================= */}
        <RevealOnScroll direction="up" scale={true} blur={true}>
          <section id="contact" className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.1] backdrop-blur-2xl scroll-mt-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5 space-y-5">
                <span className="text-xs font-code text-pink-300 tracking-widest uppercase">06 // SECURE TRANSMISSION</span>
                <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Initialize Direct Engagement</h3>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                  Available for enterprise security defense, full stack web apps, and automated analytics engineering.
                </p>

                <div className="space-y-2.5 pt-2">
                  <div 
                    onClick={handleCopyEmail}
                    className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 flex items-center justify-between font-code text-xs cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-pink-300" />
                      <span className="text-white/90">{PORTFOLIO_PROFILE.email}</span>
                    </div>
                    <span className="text-[10px] text-white/40 group-hover:text-white">
                      {copiedEmail ? 'COPIED!' : 'COPY'}
                    </span>
                  </div>

                  <a 
                    href={`tel:${PORTFOLIO_PROFILE.phone}`}
                    className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 flex items-center justify-between font-code text-xs transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-emerald-400" />
                      <span className="text-white/90">{PORTFOLIO_PROFILE.phone}</span>
                    </div>
                    <span className="text-[10px] text-white/40">CALL</span>
                  </a>
                </div>

                <div className="flex gap-2 pt-2">
                  <a
                    href={PORTFOLIO_PROFILE.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-center border border-white/10 text-xs font-code text-white transition-all"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={PORTFOLIO_PROFILE.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-center border border-white/10 text-xs font-code text-white transition-all"
                  >
                    GitHub
                  </a>
                </div>
              </div>

              <form onSubmit={handleContactSubmit} className="lg:col-span-7 space-y-4">
                <div>
                  <label className="text-[10px] font-code text-white/50 block mb-1.5 uppercase">OPERATOR / ENTITY NAME</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="e.g. Alex Mercer"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.08] text-white text-xs font-code focus:outline-none focus:border-pink-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-code text-white/50 block mb-1.5 uppercase">SECURE TRANSMISSION EMAIL</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="alex@enterprise.sec"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.08] text-white text-xs font-code focus:outline-none focus:border-pink-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-code text-white/50 block mb-1.5 uppercase">SYSTEM SPECIFICATION / MESSAGE</label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Detail your engineering project or security audit scope..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.08] text-white text-xs font-code focus:outline-none focus:border-pink-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-xl shadow-pink-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {contactSubmitted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Transmission Confirmed & Dispatched
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Encrypted Transmission
                    </>
                  )}
                </button>
              </form>
            </div>
          </section>
        </RevealOnScroll>

      </div>
    </div>
  );
};
