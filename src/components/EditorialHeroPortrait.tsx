import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, Mail, FileText } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolioData';
import { EditorialImage } from './EditorialImage';

interface EditorialHeroPortraitProps {
  onContactClick: () => void;
  onOpenResume: () => void;
}

export const EditorialHeroPortrait: React.FC<EditorialHeroPortraitProps> = ({
  onContactClick,
  onOpenResume,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Continuous scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 24,
    restDelta: 0.001,
  });

  // 3D 360-degree rotation across the introductory scroll sequence
  // 0%: front-facing portrait -> 20%: slight perspective -> 40%: rotate around Y -> 60%: deeper perspective -> 80%: large rotation -> 100%: return toward front
  const rotateY = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], [0, 90, 180, 270, 360]);
  const rotateX = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, -10, 10, 0]);
  const scale = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [1, 1.08, 0.96, 0.9]);
  const translateZ = useTransform(smoothProgress, [0, 0.5, 1], [0, 80, -40]);

  // Typography Interlocking Parallax Movement
  // "SATHYA" (Left/Back) moves left & behind, "SAI JS" (Right/Back) moves right & behind
  const textLeftX = useTransform(smoothProgress, [0, 1], [0, -180]);
  const textRightX = useTransform(smoothProgress, [0, 1], [0, 180]);
  const textOpacity = useTransform(smoothProgress, [0, 0.8, 1], [1, 0.4, 0.1]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 14;
      const y = (e.clientY / innerHeight - 0.5) * 14;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen lg:min-h-[120vh] bg-[#F4F1E8] text-[#11110F] flex flex-col justify-between pt-24 sm:pt-28 pb-12 px-6 sm:px-12 lg:px-20 select-none overflow-hidden"
    >
      {/* Editorial Header Line */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#11110F]/10 text-xs font-mono-subtle text-[#11110F]/70 tracking-[0.2em] uppercase z-20">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#B39A6A]" />
          <span className="font-semibold text-[#11110F]">SATHYA SAI JS</span>
          <span className="text-[#11110F]/30">&bull;</span>
          <span className="text-[#777A5A]">DIGITAL PORTRAIT</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="hidden md:inline font-light text-[#11110F]/60">
            ENGINEERING &bull; DATA &bull; VENTURE ARCHITECTURE
          </span>
          <span className="text-[#777A5A] font-medium">BSRocks &bull; Zenvy Media</span>
        </div>
      </div>

      {/* Primary 3D Photographic Composition & Interlocking Typography */}
      <div className="relative w-full my-auto py-8 sm:py-16 flex items-center justify-center perspective-1200 z-10">
        
        {/* Left Name Segment (Behind Photo) */}
        <motion.div
          style={{ x: textLeftX, opacity: textOpacity }}
          className="absolute left-2 sm:left-12 lg:left-24 top-1/2 -translate-y-1/2 pointer-events-none z-0 hidden sm:block"
        >
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-sans-clean font-extrabold tracking-tighter text-[#11110F]/15 uppercase select-none">
            SATHYA
          </h1>
        </motion.div>

        {/* Right Name Segment (Behind Photo) */}
        <motion.div
          style={{ x: textRightX, opacity: textOpacity }}
          className="absolute right-2 sm:right-12 lg:right-24 top-1/2 -translate-y-1/2 pointer-events-none z-0 hidden sm:block text-right"
        >
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-serif-editorial italic font-normal tracking-tight text-[#11110F]/15 uppercase select-none">
            SAI JS
          </h1>
        </motion.div>

        {/* Central Real Photograph with Mask, 3D Rotation & Spring Physics */}
        <motion.div
          data-cursor-photo="true"
          style={{
            rotateY,
            rotateX,
            scale,
            z: translateZ,
            transformStyle: 'preserve-3d',
          }}
          animate={{
            rotateZ: mousePos.x * 0.1,
            x: mousePos.x * 0.3,
            y: mousePos.y * 0.3,
          }}
          transition={{ type: 'spring', stiffness: 90, damping: 26 }}
          className="relative z-10 w-[270px] sm:w-[350px] md:w-[420px] lg:w-[470px] aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_30px_90px_rgba(17,17,15,0.18)] border border-[#11110F]/15 bg-[#11110F] group"
        >
          {/* Authentic High-Res Portrait of Sathya Sai JS */}
          <EditorialImage
            src={PORTFOLIO_PROFILE.profileImage}
            alt={PORTFOLIO_PROFILE.name}
            fallbackSrc="/sathya-profile.jpeg"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="eager"
          />

          {/* Soft Editorial Shadow Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#11110F]/60 via-transparent to-transparent pointer-events-none" />

          {/* Floating Subtle Micro-Label */}
          <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between text-xs font-mono-subtle text-[#F4F1E8] z-20">
            <div>
              <span className="block text-[10px] tracking-[0.25em] text-[#DFC89D] uppercase">
                PORTRAIT COMPOSITION
              </span>
              <span className="font-sans-clean font-medium">Sathya Sai JS</span>
            </div>
            <div className="text-[10px] tracking-widest text-[#F4F1E8]/70 uppercase">
              360&deg; SCROLL ORBIT
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Editorial Caption & Action Cluster */}
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 pt-6 border-t border-[#11110F]/10 z-20">
        <div className="space-y-1 max-w-md">
          <div className="text-xs font-mono-subtle uppercase tracking-[0.25em] text-[#777A5A] font-semibold">
            ENGINEERING &bull; SOFTWARE &bull; VENTURES
          </div>
          <p className="text-sm font-sans-clean text-[#11110F]/80 font-light leading-relaxed">
            Software Engineer at <strong className="font-medium text-[#11110F]">BSRocks</strong> and Partner at <strong className="font-medium text-[#11110F]">Zenvy Media</strong>. Crafting defensive security, high-throughput web architectures, and growth platforms.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={onOpenResume}
            className="px-6 py-3 rounded-full bg-[#11110F] hover:bg-[#292924] text-[#F4F1E8] text-xs font-mono-subtle uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <FileText size={13} className="text-[#B39A6A]" />
            <span>CURRICULUM VITAE</span>
          </button>

          <button
            onClick={onContactClick}
            className="px-7 py-3 rounded-full bg-[#B39A6A] hover:bg-[#777A5A] text-[#F4F1E8] text-xs font-sans-clean font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-105 flex items-center gap-2 cursor-pointer"
          >
            <Mail size={13} />
            <span>LET&apos;S TALK</span>
          </button>
        </div>
      </div>
    </section>
  );
};
