import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Download, Github, Linkedin, Instagram, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface HeroSectionProps {
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const stageWrapRef = useRef<HTMLDivElement>(null);
  const [activeRailIndex, setActiveRailIndex] = useState<number | null>(0);

  const railItems = [
    { num: '01', title: 'Secure', desc: 'Vulnerability assessment, penetration testing, and secure-by-design engineering.' },
    { num: '02', title: 'Develop', desc: 'Full-stack tools, Python automation, and Streamlit analytical platforms.' },
    { num: '03', title: 'Analyze', desc: 'Interactive Power BI KPI dashboards and SQL-based data pipelines.' },
    { num: '04', title: 'Research', desc: 'Blockchain vehicular firmware security presented at SIMATS & SIH Space Tech.' },
  ];

  // Canvas particle field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particlesCount = window.innerWidth < 768 ? 40 : 85;
    const particles = Array.from({ length: particlesCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.3 + 0.4,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      alpha: Math.random() * 0.5 + 0.15,
    }));

    const resize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', resize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const coolColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--cool')
        .trim() || '#9fc6e8';

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = coolColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // 3D mouse tilt interaction
  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!stageWrapRef.current || !stageRef.current) return;
      const rect = stageWrapRef.current.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) / window.innerWidth;
      const dy = (e.clientY - (rect.top + rect.height / 2)) / window.innerHeight;
      stageRef.current.style.transform = `rotateY(${dx * 12}deg) rotateX(${-dy * 10}deg)`;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center pt-[calc(72px+30px)] pb-20 overflow-hidden bg-[var(--bg)]"
    >
      {/* Particle Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full" />

      {/* Ambient Orange Radial Glow */}
      <div className="absolute -top-[15%] -right-[10%] w-[56vw] h-[56vw] max-w-[850px] max-h-[850px] rounded-full bg-[radial-gradient(circle,rgba(255,122,41,0.08)_0%,transparent_65%)] pointer-events-none filter blur-2xl" />

      <div className="w-full max-w-[1300px] mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 w-full">
          
          {/* Left Column: Typography & Content */}
          <div className="flex-1 w-full min-w-0">
            {/* Greeting */}
            <div className="flex items-center gap-3.5 mb-6">
              <span className="w-11 h-[1px] bg-[#ff7a29] inline-block" />
              <span className="font-mono-code text-[0.72rem] tracking-[0.2em] uppercase text-[var(--mut)]">
                Hello, I&apos;m
              </span>
            </div>

            {/* Display Name */}
            <h1 className="font-disp font-bold text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] leading-[1.02] tracking-tight uppercase text-[var(--txt)]">
              <span className="block">{portfolioData.firstName}</span>
              <span className="block text-[#ff7a29]">{portfolioData.lastName}</span>
            </h1>

            {/* Roles Bar */}
            <div className="mt-6 flex flex-wrap items-center gap-2 font-mono-code text-xs sm:text-sm tracking-[0.14em] uppercase text-[var(--txt)]">
              <span className="text-[var(--txt)]">{portfolioData.rolePrimary}</span>
              <span className="text-[#ff7a29]">/</span>
              <span className="text-[var(--mut)]">{portfolioData.roleSecondary}</span>
              <span className="text-[#ff7a29]">/</span>
              <span className="text-[var(--dim)]">{portfolioData.roleExtra}</span>
            </div>

            {/* Introduction Paragraph */}
            <p className="mt-5 max-w-[50ch] text-[var(--mut)] text-base sm:text-lg leading-relaxed">
              {portfolioData.intro}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#projects"
                className="inline-flex items-center gap-3 font-mono-code text-xs tracking-[0.18em] uppercase px-7 py-3.5 bg-[#ff7a29] text-[#0b0b0e] font-semibold rounded-sm border border-[#ff7a29] hover:bg-[var(--txt)] hover:text-[#0b0b0e] hover:border-[var(--txt)] transition-all duration-300 shadow-[0_10px_25px_-8px_rgba(255,122,41,0.5)] group"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-3 font-mono-code text-xs tracking-[0.18em] uppercase px-7 py-3.5 border border-[var(--line2)] text-[var(--txt)] rounded-sm hover:border-[#ff7a29] hover:text-[#ff7a29] hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <span>Download Resume</span>
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
              </button>
            </div>

            {/* Social Icons List */}
            <div className="flex items-center gap-3 mt-9">
              {portfolioData.socialLinks.map((social) => {
                const getIcon = () => {
                  switch (social.icon) {
                    case 'github':
                      return <Github className="w-4 h-4" />;
                    case 'linkedin':
                      return <Linkedin className="w-4 h-4" />;
                    case 'instagram':
                      return <Instagram className="w-4 h-4" />;
                    case 'mail':
                      return <Mail className="w-4 h-4" />;
                    default:
                      return <Github className="w-4 h-4" />;
                  }
                };

                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 border border-[var(--line)] rounded-full flex items-center justify-center text-[var(--mut)] hover:text-[#ff7a29] hover:border-[#ff7a29] hover:-translate-y-1 hover:shadow-[0_10px_20px_-8px_rgba(255,122,41,0.4)] transition-all duration-300"
                  >
                    {getIcon()}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Center Column: 3D Stage with Floating Portrait Disc */}
          <div className="flex-1 w-full flex justify-center py-6 lg:py-0">
            <div ref={stageWrapRef} className="relative w-full max-w-[420px] aspect-square [perspective:1100px]">
              <div
                ref={stageRef}
                className="w-full h-full relative [transform-style:preserve-3d] transition-transform duration-200 ease-out"
              >
                {/* SVG Orbital Rings */}
                <svg className="absolute -inset-[5%] w-[110%] h-[110%] overflow-visible pointer-events-none" viewBox="0 0 600 600" aria-hidden="true">
                  <defs>
                    <linearGradient id="gOrb" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stopColor="transparent" />
                      <stop offset="0.6" stopColor="var(--cool)" />
                      <stop offset="1" stopColor="transparent" />
                    </linearGradient>
                  </defs>

                  {/* Outer Cool Orbital Ring */}
                  <g className="animate-spin-c">
                    <ellipse cx="300" cy="300" rx="275" ry="105" fill="none" stroke="url(#gOrb)" strokeWidth="0.9" />
                    <circle cx="575" cy="300" r="3.5" fill="var(--cool)" opacity="0.9" />
                  </g>

                  {/* Mid Tilted Amber Orbital Ring */}
                  <g className="animate-spin-b">
                    <ellipse cx="300" cy="300" rx="260" ry="90" fill="none" stroke="var(--line2)" strokeWidth="0.9" />
                    <circle cx="560" cy="300" r="3.5" fill="#ff7a29" />
                  </g>

                  {/* Inner Dashed Amber Ring */}
                  <g className="animate-spin-a">
                    <ellipse cx="300" cy="300" rx="245" ry="120" fill="none" stroke="rgba(255,122,41,0.22)" strokeWidth="1.2" strokeDasharray="4 8" />
                  </g>
                </svg>

                {/* Floating Glow Satellites */}
                <span className="absolute top-[6%] left-[12%] w-1.5 h-1.5 rounded-full bg-[#ff7a29] shadow-[0_0_10px_#ff7a29] animate-floaty" />
                <span className="absolute bottom-[10%] right-[10%] w-1.5 h-1.5 rounded-full bg-[var(--cool)] shadow-[0_0_8px_var(--cool)] animate-floaty [animation-delay:1.4s]" />
                <span className="absolute top-[24%] right-[18%] w-1.5 h-1.5 rounded-full bg-[#ff7a29] animate-floaty [animation-delay:2.2s]" />

                {/* Wireframe Corner Accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[var(--line2)] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[var(--line2)] pointer-events-none" />

                {/* Disc Base Shadow Platform */}
                <div className="absolute left-[8%] right-[8%] bottom-[2%] h-[10%] rounded-full border border-[var(--line2)] bg-[radial-gradient(ellipse_at_center,rgba(255,122,41,0.12),transparent_70%)] pointer-events-none" />

                {/* Central Floating Portrait Disc */}
                <div className="absolute left-1/2 top-[47%] w-[58%] aspect-square -translate-x-1/2 -translate-y-1/2 [transform:translate(-50%,-50%)_translateZ(40px)] rounded-full bg-[radial-gradient(circle_at_32%_28%,#22222b,#101015_58%,#0b0b0f)] shadow-[0_0_0_1px_var(--line2),0_0_80px_-15px_rgba(255,122,41,0.4),inset_0_0_60px_rgba(0,0,0,0.8)] flex items-center justify-center overflow-hidden">
                  
                  {/* Subtle Scanning Laser */}
                  <div className="absolute left-0 right-0 h-[34%] bg-[linear-gradient(to_bottom,transparent,rgba(159,198,232,0.15),transparent)] animate-scan pointer-events-none" />

                  {/* Dashed Border Inner Ring */}
                  <div className="absolute inset-3 border border-dashed border-[var(--line2)] rounded-full pointer-events-none" />

                  {/* Profile Portrait Image */}
                  <img
                    src={portfolioData.photo}
                    alt={portfolioData.fullName}
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      // Fallback if image fails to load
                      const target = e.currentTarget;
                      target.style.display = 'none';
                    }}
                  />

                  {/* Fallback Text if photo not loaded */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center pointer-events-none font-mono-code text-[0.68rem] tracking-widest text-[var(--dim)] opacity-0 hover:opacity-100 transition-opacity">
                    <b className="text-[#ff7a29] font-medium block text-xs">{portfolioData.logoInitials}</b>
                    <span>CORE IDENTITY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Numbered Side Rail */}
          <aside className="w-full lg:w-[220px] flex flex-row lg:flex-col gap-0 border-t lg:border-t-0 lg:border-l border-[var(--line)] pt-4 lg:pt-0 overflow-x-auto">
            {railItems.map((item, idx) => {
              const isActive = activeRailIndex === idx;
              return (
                <button
                  key={item.num}
                  onClick={() => setActiveRailIndex(idx)}
                  onMouseEnter={() => setActiveRailIndex(idx)}
                  className={`relative text-left p-4 lg:p-5 lg:pl-6 border-l lg:border-l-0 border-[var(--line)] min-w-[160px] lg:min-w-0 transition-all duration-300 ${
                    isActive ? 'lg:pl-8 bg-[var(--panel)]/40' : ''
                  }`}
                >
                  {/* Amber Active Bar Indicator */}
                  <span
                    className={`absolute left-0 top-0 bottom-0 w-[2px] bg-[#ff7a29] transition-transform duration-300 origin-top ${
                      isActive ? 'scale-y-100' : 'scale-y-0'
                    }`}
                  />
                  
                  <span className="block font-mono-code text-[0.68rem] text-[#ff7a29] tracking-[0.2em]">
                    {item.num}
                  </span>
                  
                  <span
                    className={`block font-disp font-semibold text-sm lg:text-base tracking-wider uppercase my-1 transition-colors duration-300 ${
                      isActive ? 'text-[var(--txt)]' : 'text-[var(--mut)] hover:text-[var(--txt)]'
                    }`}
                  >
                    {item.title}
                  </span>

                  <span
                    className={`block text-[0.76rem] text-[var(--dim)] leading-relaxed transition-all duration-300 ${
                      isActive ? 'max-h-24 opacity-100 mt-2' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                  >
                    {item.desc}
                  </span>
                </button>
              );
            })}
          </aside>

        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="absolute left-5 sm:left-8 md:left-12 bottom-6 flex items-center gap-3 font-mono-code text-[0.65rem] tracking-[0.25em] text-[var(--dim)] pointer-events-none">
        <i className="w-11 h-[1px] bg-[var(--line)] relative overflow-hidden block">
          <span className="absolute inset-0 bg-[#ff7a29] animate-sweep" />
        </i>
        <span>SCROLL TO EXPLORE</span>
      </div>
    </section>
  );
};
