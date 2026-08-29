import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reducedMotion || window.innerWidth < 1024) return;

    setIsVisible(true);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = !!target.closest('a, button, [role="button"], input, textarea, .skill, .tl-node, .pl-item, .tech-chip');
        setIsHovering(isInteractive);
      }
    };

    let animationFrameId: number;
    const loop = () => {
      cursorX += (mouseX - cursorX) * 0.16;
      cursorY += (mouseY - cursorY) * 0.16;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[220] rounded-full border transition-all duration-200 ease-out -mt-[17px] -ml-[17px] ${
          isHovering
            ? 'w-[48px] h-[48px] -mt-[24px] -ml-[24px] border-[#ff7a29] bg-[rgba(255,122,41,0.08)] scale-110'
            : 'w-[34px] h-[34px] border-[rgba(255,122,41,0.55)]'
        }`}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[220] w-[5px] h-[5px] rounded-full bg-[#ff7a29] -mt-[2.5px] -ml-[2.5px]"
      />
    </>
  );
};
