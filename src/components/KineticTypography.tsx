import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface KineticTextProps {
  children: React.ReactNode;
  variant?: 'split-chars' | 'word-reveal' | 'cyber-glitch' | 'magnetic-drift' | 'typewriter' | 'gradient-shimmer';
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  repeat?: boolean;
}

export const KineticText: React.FC<KineticTextProps> = ({
  children,
  variant = 'split-chars',
  className = '',
  delay = 0,
  stagger = 0.03,
  duration = 0.8,
  repeat = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Split chars logic
    if (variant === 'split-chars' || variant === 'cyber-glitch') {
      const chars = el.querySelectorAll('.kinetic-char');
      if (chars.length > 0) {
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            y: 40,
            rotateX: -80,
            filter: 'blur(10px)',
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: 'blur(0px)',
            duration: duration,
            stagger: stagger,
            delay: delay,
            ease: 'power3.out',
            overwrite: 'auto',
          }
        );
      }
    } else if (variant === 'word-reveal') {
      const words = el.querySelectorAll('.kinetic-word');
      if (words.length > 0) {
        gsap.fromTo(
          words,
          {
            opacity: 0,
            y: 30,
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: duration,
            stagger: stagger * 3,
            delay: delay,
            ease: 'power3.out',
            overwrite: 'auto',
          }
        );
      }
    }
  }, [variant, delay, stagger, duration, children]);

  // If text is pure string, render split elements
  if (typeof children === 'string') {
    if (variant === 'split-chars' || variant === 'cyber-glitch') {
      const chars = children.split('');
      return (
        <span ref={containerRef} className={`inline-block overflow-hidden ${className}`}>
          {chars.map((char, i) => (
            <span
              key={i}
              className={`kinetic-char inline-block will-change-transform ${
                char === ' ' ? 'w-[0.25em]' : ''
              } ${variant === 'cyber-glitch' ? 'hover:text-cyan-400 transition-colors duration-150' : ''}`}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      );
    }

    if (variant === 'word-reveal') {
      const words = children.split(' ');
      return (
        <span ref={containerRef} className={`inline-block ${className}`}>
          {words.map((word, i) => (
            <span key={i} className="kinetic-word inline-block mr-[0.28em] will-change-transform">
              {word}
            </span>
          ))}
        </span>
      );
    }
  }

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

interface ScrambleHeadingProps {
  text: string;
  className?: string;
  speed?: number;
  triggerOnHover?: boolean;
  prefix?: string;
  suffix?: string;
}

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}—=+*^?#_$%&';

export const ScrambleHeading: React.FC<ScrambleHeadingProps> = ({
  text,
  className = '',
  speed = 28,
  triggerOnHover = true,
  prefix = '',
  suffix = '',
}) => {
  const [displayText, setDisplayText] = React.useState<string>(text);
  const intervalRef = useRef<number | null>(null);
  const isScramblingRef = useRef(false);

  const runScramble = () => {
    if (isScramblingRef.current) return;
    isScramblingRef.current = true;
    let iteration = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplayText(() =>
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        isScramblingRef.current = false;
      }

      iteration += 1 / 2.2;
    }, speed);
  };

  useEffect(() => {
    runScramble();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  return (
    <span
      className={`inline-block font-mono cursor-default select-none ${className}`}
      onMouseEnter={() => {
        if (triggerOnHover) runScramble();
      }}
    >
      {prefix}
      <span className="font-bold tracking-tight">{displayText}</span>
      {suffix}
    </span>
  );
};
