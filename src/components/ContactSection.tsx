import React, { useState, useEffect, useRef } from 'react';
import { Send, Github, Linkedin, Instagram, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface ContactSectionProps {
  onShowToast: (message: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [statusMsg, setStatusMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const globeCanvasRef = useRef<HTMLCanvasElement>(null);

  // Depth-Sorted 3D Network Globe Canvas
  useEffect(() => {
    const canvas = globeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let W = 0;
    let H = 0;
    let R = 0;
    const dpr = window.devicePixelRatio || 1;

    interface GlobeNode {
      th: number;
      ph: number;
      sp: number;
    }

    let nodes: GlobeNode[] = [];

    const initGlobe = () => {
      if (!canvas) return;
      W = canvas.width = canvas.offsetWidth * dpr;
      H = canvas.height = canvas.offsetHeight * dpr;
      R = Math.min(W, H) * 0.36;

      nodes = Array.from({ length: 46 }, () => {
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        return {
          th,
          ph,
          sp: Math.random() * 0.002 + 0.0008,
        };
      });
    };

    initGlobe();
    window.addEventListener('resize', initGlobe);

    const render = () => {
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2;
      const cy = H / 2;

      // Spherical Wireframe Rings
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.lineWidth = 1 / dpr;
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, R, (R * i) / 5, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Calculate 3D rotated positions
      const positions: { x: number; y: number; z: number; scale: number }[] = [];
      const tilt = 0.5; // X-axis tilt

      for (const n of nodes) {
        n.th += n.sp;
        const x0 = R * Math.sin(n.ph) * Math.cos(n.th);
        const z0 = R * Math.sin(n.ph) * Math.sin(n.th);
        const y0 = R * Math.cos(n.ph);

        // Rotation matrix around X
        const y = y0 * Math.cos(tilt) - z0 * Math.sin(tilt);
        const z = y0 * Math.sin(tilt) + z0 * Math.cos(tilt);

        const s = (z + R) / (2 * R);
        const scale = 0.4 + s * 0.8;

        positions.push({
          x: cx + x0,
          y: cy + y,
          z,
          scale,
        });
      }

      // Connect near nodes on the front face (z > 0)
      ctx.strokeStyle = 'rgba(255, 122, 41, 0.22)';
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const a = positions[i];
          const b = positions[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < (R * 0.45) ** 2 && a.z > 0 && b.z > 0) {
            ctx.lineWidth = 1 / dpr;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes (warm amber if front, cool/dim if rear)
      for (const p of positions) {
        if (p.z > 0) {
          ctx.fillStyle = `rgba(255, 122, 41, ${0.35 + p.scale * 0.65})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, (1.4 + p.scale * 1.5) * dpr, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = 'rgba(150, 160, 180, 0.2)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.2 * dpr, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', initGlobe);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatusMsg('PLEASE COMPLETE ALL REQUIRED FIELDS');
      return;
    }

    setIsSubmitting(true);
    setStatusMsg('');

    setTimeout(() => {
      setIsSubmitting(false);
      onShowToast('MESSAGE TRANSMITTED — I WILL REPLY SHORTLY');
      setFormData({ name: '', email: '', message: '' });
    }, 600);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative bg-[var(--bg)] border-t border-[var(--line)]">
      <div className="w-full max-w-[1300px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex items-baseline gap-4 mb-16 sm:mb-20">
          <span className="font-mono-code text-[0.72rem] text-[#ff7a29] tracking-[0.2em]">/ 05</span>
          <h2 className="font-disp font-bold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[var(--txt)]">
            Contact
          </h2>
          <span className="flex-1 h-[1px] bg-[var(--line)] self-center" />
          <span className="hidden sm:inline-block font-mono-code text-[0.72rem] text-[var(--dim)] tracking-[0.2em]">
            GET IN TOUCH
          </span>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr_0.85fr] gap-10 lg:gap-12 items-start">
          
          {/* Column 1: Info & Links */}
          <div className="space-y-6">
            <span className="font-mono-code text-xs uppercase tracking-[0.2em] text-[#ff7a29] block">
              Let&apos;s talk — reply within 24 hours
            </span>

            <h3 className="font-disp font-bold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight leading-[1.05] text-[var(--txt)]">
              Let&apos;s build <br />
              <em className="not-italic text-[#ff7a29]">something</em> <br />
              amazing together.
            </h3>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 py-2 border-b border-[var(--line)]">
                <span className="font-mono-code text-[0.66rem] tracking-[0.2em] uppercase text-[var(--dim)] w-20 flex-shrink-0">
                  Email
                </span>
                <a
                  href={`mailto:${portfolioData.email}`}
                  className="font-disp font-medium text-sm sm:text-base text-[var(--txt)] hover:text-[#ff7a29] transition-colors break-all"
                >
                  {portfolioData.email}
                </a>
              </div>

              <div className="flex items-center gap-4 py-2 border-b border-[var(--line)]">
                <span className="font-mono-code text-[0.66rem] tracking-[0.2em] uppercase text-[var(--dim)] w-20 flex-shrink-0">
                  Phone
                </span>
                <a
                  href={`tel:${portfolioData.phone.replace(/[^+\d]/g, '')}`}
                  className="font-disp font-medium text-sm sm:text-base text-[var(--txt)] hover:text-[#ff7a29] transition-colors"
                >
                  {portfolioData.phone}
                </a>
              </div>

              <div className="flex items-center gap-4 py-2 border-b border-[var(--line)]">
                <span className="font-mono-code text-[0.66rem] tracking-[0.2em] uppercase text-[var(--dim)] w-20 flex-shrink-0">
                  Location
                </span>
                <span className="font-disp font-medium text-sm sm:text-base text-[var(--txt)]">
                  {portfolioData.location}
                </span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 pt-4">
              {portfolioData.socialLinks.map((social) => {
                const getIcon = () => {
                  switch (social.icon) {
                    case 'github':
                      return <Github className="w-4 h-4" />;
                    case 'linkedin':
                      return <Linkedin className="w-4 h-4" />;
                    case 'instagram':
                      return <Instagram className="w-4 h-4" />;
                    default:
                      return <Mail className="w-4 h-4" />;
                  }
                };

                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 border border-[var(--line)] rounded-full flex items-center justify-center text-[var(--mut)] hover:text-[#ff7a29] hover:border-[#ff7a29] hover:-translate-y-1 transition-all duration-300"
                  >
                    {getIcon()}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Minimalist Interactive Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="border border-[var(--line)] bg-[var(--panel)] p-6 sm:p-8 space-y-6 shadow-xl"
            noValidate
          >
            {/* Name Field */}
            <div className="relative">
              <input
                type="text"
                id="fName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full bg-transparent border-0 border-b border-[var(--line2)] py-3 px-1 text-[var(--txt)] font-body text-base outline-none focus:border-[#ff7a29] transition-colors peer"
                placeholder=" "
              />
              <label
                htmlFor="fName"
                className="absolute left-1 top-3 font-mono-code text-[0.68rem] tracking-[0.2em] uppercase text-[var(--dim)] pointer-events-none transition-all duration-300 peer-focus:-top-3.5 peer-focus:text-[0.58rem] peer-focus:text-[#ff7a29] peer-[:not(:placeholder-shown)]:-top-3.5 peer-[:not(:placeholder-shown)]:text-[0.58rem] peer-[:not(:placeholder-shown)]:text-[#ff7a29]"
              >
                Your Name
              </label>
            </div>

            {/* Email Field */}
            <div className="relative">
              <input
                type="email"
                id="fEmail"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full bg-transparent border-0 border-b border-[var(--line2)] py-3 px-1 text-[var(--txt)] font-body text-base outline-none focus:border-[#ff7a29] transition-colors peer"
                placeholder=" "
              />
              <label
                htmlFor="fEmail"
                className="absolute left-1 top-3 font-mono-code text-[0.68rem] tracking-[0.2em] uppercase text-[var(--dim)] pointer-events-none transition-all duration-300 peer-focus:-top-3.5 peer-focus:text-[0.58rem] peer-focus:text-[#ff7a29] peer-[:not(:placeholder-shown)]:-top-3.5 peer-[:not(:placeholder-shown)]:text-[0.58rem] peer-[:not(:placeholder-shown)]:text-[#ff7a29]"
              >
                Your Email
              </label>
            </div>

            {/* Message Field */}
            <div className="relative">
              <textarea
                id="fMsg"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={4}
                className="w-full bg-transparent border-0 border-b border-[var(--line2)] py-3 px-1 text-[var(--txt)] font-body text-base outline-none focus:border-[#ff7a29] transition-colors resize-y min-h-[96px] peer"
                placeholder=" "
              />
              <label
                htmlFor="fMsg"
                className="absolute left-1 top-3 font-mono-code text-[0.68rem] tracking-[0.2em] uppercase text-[var(--dim)] pointer-events-none transition-all duration-300 peer-focus:-top-3.5 peer-focus:text-[0.58rem] peer-focus:text-[#ff7a29] peer-[:not(:placeholder-shown)]:-top-3.5 peer-[:not(:placeholder-shown)]:text-[0.58rem] peer-[:not(:placeholder-shown)]:text-[#ff7a29]"
              >
                Your Message
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 font-mono-code text-xs tracking-[0.18em] uppercase py-4 bg-[#ff7a29] text-[#0b0b0e] font-semibold rounded-sm hover:bg-[var(--txt)] transition-colors duration-300 shadow-[0_10px_25px_-8px_rgba(255,122,41,0.5)]"
            >
              <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
              <Send className="w-4 h-4" />
            </button>

            {/* Form Feedback */}
            {statusMsg && (
              <div className="font-mono-code text-[0.68rem] tracking-wider text-[#ff7a29] text-center pt-1">
                {statusMsg}
              </div>
            )}
          </form>

          {/* Column 3: Real 3D Depth-Sorted Network Globe */}
          <div className="w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[360px] aspect-square">
              <canvas ref={globeCanvasRef} className="w-full h-full block" />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono-code text-[0.6rem] tracking-[0.25em] text-[var(--dim)] uppercase pointer-events-none text-center">
                GLOBAL TELEMETRY NODE
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
