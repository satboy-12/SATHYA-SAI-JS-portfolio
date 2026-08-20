import React, { useEffect, useState } from 'react';
import { cyberAudio } from '../utils/soundEngine';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const bootLines = [
    '> initializing secure_environment...',
    '> verifying identity: SATHYA_SAI_JS',
    '> biometrics: AUTHORIZED [SHA-256 MATCH]',
    '> launching cinematic 3D cyber visualizer...',
    '> access granted_'
  ];

  useEffect(() => {
    if (currentLineIndex >= bootLines.length) {
      cyberAudio.playUnlockChime();
      const timer = setTimeout(() => {
        setIsFading(true);
        setTimeout(onComplete, 650);
      }, 400);
      return () => clearTimeout(timer);
    }

    const currentTarget = bootLines[currentLineIndex];
    if (currentCharIndex < currentTarget.length) {
      const typeSpeed = Math.random() * 18 + 12;
      const timer = setTimeout(() => {
        if (currentCharIndex % 3 === 0) {
          cyberAudio.playKeyClick();
        }
        setLines(prev => {
          const next = [...prev];
          next[currentLineIndex] = currentTarget.slice(0, currentCharIndex + 1);
          return next;
        });
        setCurrentCharIndex(prev => prev + 1);
      }, typeSpeed);
      return () => clearTimeout(timer);
    } else {
      const lineDelay = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 160);
      return () => clearTimeout(lineDelay);
    }
  }, [currentLineIndex, currentCharIndex, onComplete]);

  const handleSkip = () => {
    cyberAudio.playUnlockChime();
    setIsFading(true);
    setTimeout(onComplete, 300);
  };

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-50 bg-[#05060a] flex flex-col items-center justify-center cursor-pointer transition-opacity duration-700 select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background cyber grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(62,234,244,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full px-6 text-left">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 font-mono text-xs text-white/40">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 text-cyan-400 font-semibold tracking-wider">// SECURE_BOOT_SEQUENCE</span>
          </div>
          <span className="text-[#8a5cff]">NODE_2026.SYS</span>
        </div>

        {/* Terminal Content */}
        <div className="font-mono text-sm sm:text-base text-[#3eeaf4] space-y-2 min-h-[140px] drop-shadow-[0_0_12px_rgba(62,234,244,0.5)]">
          {lines.map((line, i) => (
            <div key={i} className="leading-relaxed flex items-center">
              <span>{line}</span>
              {i === currentLineIndex && (
                <span className="inline-block w-2.5 h-4 ml-1 bg-[#3eeaf4] animate-pulse" />
              )}
            </div>
          ))}
        </div>

        {/* Skip Hint */}
        <div className="mt-8 text-center">
          <button
            onClick={handleSkip}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 hover:border-cyan-400/40 bg-white/[0.02] hover:bg-cyan-400/10 font-mono text-xs text-white/40 hover:text-cyan-300 transition-all duration-300 uppercase tracking-widest"
          >
            <span>[ CLICK OR TAP TO SKIP ]</span>
          </button>
        </div>
      </div>
    </div>
  );
};
