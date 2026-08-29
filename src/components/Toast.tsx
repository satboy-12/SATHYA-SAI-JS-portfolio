import React from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible }) => {
  return (
    <div
      id="toast"
      className={`fixed left-1/2 bottom-8 -translate-x-1/2 bg-[var(--panel2)] border border-[#ff7a29] text-[var(--txt)] font-mono-code text-[0.72rem] tracking-[0.14em] uppercase px-7 py-3.5 z-[300] shadow-[0_20px_40px_-20px_rgba(255,122,41,0.5)] transition-transform duration-500 ease-[cubic-bezier(0.22,0.8,0.24,1)] ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'
      }`}
    >
      {message}
    </div>
  );
};
