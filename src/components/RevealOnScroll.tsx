import React, { useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  duration?: number; // ms
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  blur?: boolean;
  scale?: boolean;
  threshold?: number;
  once?: boolean;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 800,
  direction = 'up',
  blur = true,
  scale = false,
  threshold = 0.12,
  once = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [threshold, once]);

  // Direction transform offsets
  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0) scale(1)';
    
    let translate = 'translate3d(0, 0, 0)';
    if (direction === 'up') translate = 'translate3d(0, 32px, 0)';
    if (direction === 'down') translate = 'translate3d(0, -32px, 0)';
    if (direction === 'left') translate = 'translate3d(32px, 0, 0)';
    if (direction === 'right') translate = 'translate3d(-32px, 0, 0)';

    const scaleStyle = scale ? 'scale(0.96)' : 'scale(1)';
    return `${translate} ${scaleStyle}`;
  };

  return (
    <div
      ref={elementRef}
      className={`will-change-transform ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? 'blur(0px)' : (blur ? 'blur(10px)' : 'none'),
        transform: getTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
      }}
    >
      {children}
    </div>
  );
};
