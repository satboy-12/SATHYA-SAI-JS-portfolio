import React, { useEffect, useRef, useMemo, useState } from 'react';
import { PORTFOLIO_PROFILE } from '../data/portfolioData';
import { ArrowRight, Linkedin, Github, Instagram, Mail, MessageCircle } from 'lucide-react';
import { cyberAudio } from '../utils/soundEngine';
import { ProfileImage } from './ProfileImage';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Mouse tracking parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mousePos.current.targetX = (e.clientX / innerWidth - 0.5) * 2;
      mousePos.current.targetY = (e.clientY / innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Ambient Gold / Champagne Particles & 3D Orbital Rings Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Warm Gold / Champagne Dust Particles
    const particleCount = window.innerWidth < 768 ? 35 : 75;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.25 - 0.05,
      baseAlpha: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.3 ? '#D6B47A' : '#E8CE9D',
      phase: Math.random() * Math.PI * 2,
    }));

    // Gold Orbital Ring Particles
    const orbitCount = window.innerWidth < 768 ? 40 : 80;
    const orbitParticles = Array.from({ length: orbitCount }, (_, i) => ({
      angle: (i / orbitCount) * Math.PI * 2,
      speed: 0.004 + Math.random() * 0.005,
      radiusOffset: (Math.random() - 0.5) * 20,
      verticalOffset: (Math.random() - 0.5) * 15,
      size: Math.random() * 2.2 + 1,
      brightness: Math.random() * 0.7 + 0.3,
      color: Math.random() > 0.3 ? '#D6B47A' : '#F3EBDD',
    }));

    let time = 0;

    const render = () => {
      time += 0.016;

      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;
      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      ctx.clearRect(0, 0, width, height);

      // 1. Ambient Floating Gold Dust
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX + mx * 0.12;
        p.y += p.speedY + my * 0.08;
        p.phase += 0.02;

        if (p.y < -20) p.y = height + 20;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        const alpha = Math.sin(p.phase) * 0.2 + p.baseAlpha;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.shadowColor = '#D6B47A';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      // 2. Gold Orbital Energy Ring around Portrait on Desktop
      if (width >= 1024) {
        const centerX = width * 0.68 + mx * 8;
        const centerY = height * 0.48 + my * 6;
        const radiusX = 260;
        const radiusY = 90;
        const tiltAngle = -0.28;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(tiltAngle);

        // Faint ring stroke
        ctx.beginPath();
        ctx.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(214, 180, 122, 0.18)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        for (let i = 0; i < orbitParticles.length; i++) {
          const op = orbitParticles[i];
          op.angle += op.speed;

          const rx = radiusX + op.radiusOffset;
          const ry = radiusY + op.verticalOffset;
          const px = Math.cos(op.angle) * rx;
          const py = Math.sin(op.angle) * ry;

          const isFront = Math.sin(op.angle) > 0;
          const zFactor = isFront ? 1.15 : 0.65;
          const alpha = (Math.sin(time * 3 + i) * 0.2 + op.brightness) * (isFront ? 0.85 : 0.3);

          ctx.beginPath();
          ctx.arc(px, py, op.size * zFactor, 0, Math.PI * 2);
          ctx.fillStyle = op.color;
          ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
          ctx.shadowColor = '#D6B47A';
          ctx.shadowBlur = 10 * zFactor;
          ctx.fill();
        }
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const socialLinks = useMemo(() => [
    { name: 'LinkedIn', icon: <Linkedin className="w-4 h-4" />, href: PORTFOLIO_PROFILE.socials.linkedin },
    { name: 'GitHub', icon: <Github className="w-4 h-4" />, href: PORTFOLIO_PROFILE.socials.github },
    { name: 'Instagram', icon: <Instagram className="w-4 h-4" />, href: PORTFOLIO_PROFILE.socials.instagram },
    { name: 'WhatsApp', icon: <MessageCircle className="w-4 h-4" />, href: PORTFOLIO_PROFILE.socials.whatsapp },
    { name: 'Email', icon: <Mail className="w-4 h-4" />, href: PORTFOLIO_PROFILE.socials.email },
  ], []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-between px-6 sm:px-12 md:px-16 pt-24 pb-16 overflow-hidden select-none bg-[#0B0A0A]"
    >
      {/* Background Deep Wine & Burgundy Luxury Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#6E2634]/30 via-[#241517]/20 to-transparent blur-3xl" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#120D0E] via-[#241517]/30 to-transparent blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,180,122,0.03)_0%,transparent_70%)]" />
      </div>

      {/* Gold & Champagne Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-2 pointer-events-none"
      />

      {/* Left Vertical Social Dock */}
      <div className="hidden lg:flex fixed left-6 sm:left-10 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-5">
        <div className="w-[1px] h-12 bg-[#D6B47A]/30" />
        {socialLinks.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => cyberAudio.playKeyClick()}
            className="text-white/60 hover:text-[#D6B47A] hover:scale-110 transition-all duration-300 cursor-pointer"
            title={item.name}
          >
            {item.icon}
          </a>
        ))}
        <div className="w-[1px] h-12 bg-[#D6B47A]/30" />
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[80vh]">
        
        {/* Left Column: Oversized Editorial Typography */}
        <div
          className="lg:col-span-7 flex flex-col items-start justify-center space-y-4 pt-4 sm:pt-0 will-change-transform transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${mousePos.current.x * 4}px, ${mousePos.current.y * 3}px, 0)`,
          }}
        >
          {/* Main Giant Name Typography matching uploaded design */}
          <div className="space-y-0 tracking-tight leading-none overflow-hidden select-none">
            <h1
              className={`font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[100px] text-white tracking-tight leading-[0.95] transition-all duration-700 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              SATHYA
            </h1>
            <h1
              className={`font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[100px] text-white tracking-tight leading-[0.95] transition-all duration-700 delay-100 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              SAI
            </h1>
            <h1
              className={`font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[100px] text-[#D6B47A] tracking-tight leading-[0.95] drop-shadow-[0_0_35px_rgba(214,180,122,0.3)] transition-all duration-700 delay-200 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              JS
            </h1>
          </div>

          {/* Three Professional Roles */}
          <div
            className={`space-y-1 font-mono text-xs sm:text-sm text-white/90 tracking-[0.2em] uppercase font-semibold transition-all duration-700 delay-300 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div>CYBER SECURITY ENGINEER</div>
            <div>SOFTWARE DEVELOPER</div>
            <div>DATA ANALYST</div>
          </div>

          {/* Subtitle Statement */}
          <p
            className={`text-white/70 text-sm sm:text-base max-w-lg leading-relaxed pt-1 transition-all duration-700 delay-400 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            I build secure systems, intelligent applications and data-driven digital experiences.
          </p>

          {/* CTAs matching uploaded layout */}
          <div
            className={`flex flex-wrap items-center gap-4 pt-3 transition-all duration-700 delay-500 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {/* Primary Filled Burgundy CTA */}
            <button
              onClick={() => {
                cyberAudio.playScannerGliss();
                onNavigate('work');
              }}
              className="px-7 py-3 bg-[#6E2634] hover:bg-[#8C2735] text-white font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-3 cursor-pointer shadow-[0_0_20px_rgba(110,38,52,0.5)] hover:shadow-[0_0_30px_rgba(110,38,52,0.8)] hover:-translate-y-0.5"
            >
              <span>EXPLORE MY WORK</span>
              <ArrowRight className="w-4 h-4 text-[#D6B47A]" />
            </button>

            {/* Secondary Gold Outline CTA */}
            <button
              onClick={() => {
                cyberAudio.playKeyClick();
                onNavigate('contact');
              }}
              className="px-7 py-3 border border-[#D6B47A]/60 hover:border-[#D6B47A] bg-transparent hover:bg-[#D6B47A]/10 text-[#D6B47A] font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
            >
              LET'S CONNECT
            </button>
          </div>

          {/* Bottom Scroll Down Indicator */}
          <div
            className={`pt-8 flex items-center gap-3 text-white/50 font-mono text-[10px] sm:text-xs tracking-widest transition-all duration-700 delay-600 ease-out ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="w-5 h-9 rounded-full border border-[#D6B47A]/40 flex items-start justify-center p-1">
              <span className="w-1 h-2 rounded-full bg-[#D6B47A] animate-bounce" />
            </div>
            <span
              onClick={() => onNavigate('about')}
              className="hover:text-[#D6B47A] transition-colors cursor-pointer"
            >
              SCROLL DOWN
            </span>
          </div>

        </div>

        {/* Right Column: Tailored Portrait + 3D Security Sculpture & Metric Stats */}
        <div
          className={`lg:col-span-5 relative flex items-center justify-center transition-all duration-1000 delay-300 ease-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{
            transform: `translate3d(${mousePos.current.x * -6}px, ${mousePos.current.y * -4}px, 0)`,
          }}
        >
          {/* Main Portrait Frame with Soft Luxury Glow using ProfileImage component */}
          <ProfileImage
            variant="hero"
            src={PORTFOLIO_PROFILE.images.heroPortrait}
            alt="SATHYA SAI JS - Cyber Security Engineer"
          />

          {/* Metric Stats Cards floating on the right */}
          <div className="absolute -right-4 sm:-right-8 top-1/4 space-y-4 pointer-events-none">
            {PORTFOLIO_PROFILE.stats.map((stat, idx) => (
              <div
                key={stat.label}
                className="bg-[#120D0E]/90 backdrop-blur-md border border-[#D6B47A]/30 px-4 py-2.5 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.6)] flex flex-col items-start animate-fade-in"
                style={{ animationDelay: `${idx * 200 + 500}ms` }}
              >
                <span className="font-display font-black text-2xl text-[#D6B47A] leading-tight">
                  {stat.value}
                </span>
                <span className="font-mono text-[9px] text-white/70 tracking-wider uppercase font-semibold">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Floating 3D Geometric Sculpture Accent in bottom-left */}
          <div className="absolute -left-6 bottom-8 w-20 h-20 border border-[#D6B47A]/30 rounded-xl rotate-45 backdrop-blur-sm bg-[#6E2634]/10 pointer-events-none animate-pulse-slow flex items-center justify-center">
            <div className="w-10 h-10 border border-[#D6B47A]/50 rounded-lg -rotate-12" />
          </div>

        </div>

      </div>

    </section>
  );
};
