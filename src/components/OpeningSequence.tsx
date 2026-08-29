import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OpeningSequenceProps {
  onRevealed: () => void;
}

export const OpeningSequence: React.FC<OpeningSequenceProps> = ({ onRevealed }) => {
  const [phase, setPhase] = useState<number>(0); // 0: SJS, 1: SATHYA SAI JS, 2: SCROLL TO ENTER, 3: Revealed/Exited
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Step 0 -> Step 1 (Show SJS then SATHYA SAI JS)
    const timer1 = setTimeout(() => {
      setPhase(1);
    }, 900);

    // Step 1 -> Step 2 (Show subtle SCROLL TO ENTER)
    const timer2 = setTimeout(() => {
      setPhase(2);
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      if (y > 30 && phase < 3) {
        setPhase(3);
        onRevealed();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 20 && phase >= 1) {
        setPhase(3);
        onRevealed();
      }
    };

    const handleTouch = () => {
      if (phase >= 1) {
        setPhase(3);
        onRevealed();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouch, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, [phase, onRevealed]);

  if (phase === 3) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, filter: 'blur(10px)' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => {
          setPhase(3);
          onRevealed();
        }}
        className="fixed inset-0 z-50 bg-[#11110F] text-[#F4F1E8] flex flex-col items-center justify-center select-none cursor-pointer"
      >
        <div className="space-y-6 text-center">
          {/* Phase 0: SJS Very Small */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-xs font-mono-subtle uppercase tracking-[0.4em] text-[#B39A6A]"
          >
            SJS
          </motion.div>

          {/* Phase 1: SATHYA SAI JS Small */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 10 }}
            transition={{ duration: 0.8 }}
            className="text-sm sm:text-base font-sans-clean font-light tracking-[0.25em] text-[#F4F1E8] uppercase"
          >
            Sathya Sai JS
          </motion.div>

          {/* Phase 2: SCROLL TO ENTER Subtle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 2 ? 0.6 : 0 }}
            transition={{ duration: 0.8 }}
            className="pt-8 text-[11px] font-mono-subtle uppercase tracking-[0.3em] text-[#777A5A] flex items-center justify-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#B39A6A] animate-pulse" />
            <span>SCROLL TO ENTER</span>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
