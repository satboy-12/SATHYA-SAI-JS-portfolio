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
  duration = 700,
  direction = 'up',
  blur = false,
  scale = false,
  threshold = 0.05,
  once = true
}) => {
  const [isVisible, setIsVisible] = useState(true); // Default to visible so content/images never fail to render
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check bounding rect immediately on mount
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100) {
        setIsVisible(true);
      }
    }

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
        rootMargin: '50px 0px 50px 0px'
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
    if (direction === 'up') translate = 'translate3d(0, 20px, 0)';
    if (direction === 'down') translate = 'translate3d(0, -20px, 0)';
    if (direction === 'left') translate = 'translate3d(20px, 0, 0)';
    if (direction === 'right') translate = 'translate3d(-20px, 0, 0)';

    const scaleStyle = scale ? 'scale(0.98)' : 'scale(1)';
    return `${translate} ${scaleStyle}`;
  };

  return (
    <div
      ref={elementRef}
      className={`will-change-transform ${className}`}
      style={{
        opacity: isVisible ? 1 : 0.4,
        filter: isVisible ? 'blur(0px)' : (blur ? 'blur(4px)' : 'none'),
        transform: getTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
      }}
    >
      {children}
    </div>
  );
};
