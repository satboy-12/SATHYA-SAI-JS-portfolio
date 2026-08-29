import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Mail, User } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    discipline: 'Full-Stack / Cybersecurity Engineering',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      window.location.href = `mailto:${PORTFOLIO_PROFILE.email}?subject=Collaboration Inquiry: ${formData.discipline}&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    }, 900);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl rounded-3xl bg-[#0F1015] border border-white/10 p-6 sm:p-8 shadow-2xl z-10 space-y-6 text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00]" />
              <span className="text-xs font-mono-code text-[#FF7A00] uppercase tracking-[0.2em] font-bold">
                DIRECT INQUIRY
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-orange-500/40 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          <div className="space-y-1">
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
              Let's Build Together
            </h3>
            <p className="text-xs font-sans text-gray-400">
              Direct communication link to Sathya Sai JS for projects, security audits, and venture collaborations.
            </p>
          </div>

          {submitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-emerald-400">
                <CheckCircle2 size={28} />
              </div>
              <h4 className="font-heading font-bold text-xl text-white">Opening Email Client...</h4>
              <p className="text-xs text-gray-400 font-mono-code">Your message payload has been prepared.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono-code text-xs">
              <div className="space-y-1.5">
                <label className="text-gray-400 flex items-center gap-1.5">
                  <User size={13} className="text-[#FF6B00]" />
                  <span>YOUR NAME</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-4 py-3 rounded-xl bg-[#14161F] border border-white/10 focus:border-[#FF6B00] text-sm text-white placeholder-gray-600 focus:outline-none transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-400 flex items-center gap-1.5">
                  <Mail size={13} className="text-[#FF6B00]" />
                  <span>YOUR EMAIL</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#14161F] border border-white/10 focus:border-[#FF6B00] text-sm text-white placeholder-gray-600 focus:outline-none transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-400">SELECT DISCIPLINE</label>
                <select
                  value={formData.discipline}
                  onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#14161F] border border-white/10 focus:border-[#FF6B00] text-sm text-white focus:outline-none transition"
                >
                  <option value="Cybersecurity & Zero-Trust Audit">Cybersecurity & Zero-Trust Audit</option>
                  <option value="Full-Stack Web Architecture">Full-Stack Web Architecture</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="Power BI & Data Analytics">Power BI & Data Analytics</option>
                  <option value="Zenvy Media Venture Acceleration">Zenvy Media Venture Acceleration</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-400">MESSAGE BRIEF</label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline your timeline, requirements, or inquiry..."
                  className="w-full px-4 py-3 rounded-xl bg-[#14161F] border border-white/10 focus:border-[#FF6B00] text-sm text-white placeholder-gray-600 focus:outline-none transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#FF6B00] to-[#FF4500] hover:from-[#FF7A00] hover:to-[#FF5500] shadow-[0_0_20px_rgba(255,107,0,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>TRANSMIT BRIEF</span>
                <Send size={14} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
