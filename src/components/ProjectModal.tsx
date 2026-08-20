import React from 'react';
import { ProjectItem } from '../types';
import { X, Github, ExternalLink, ShieldCheck, Terminal, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { cyberAudio } from '../utils/soundEngine';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const handleClose = () => {
    cyberAudio.playKeyClick();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl glass-panel border border-[#3eeaf4]/40 p-6 sm:p-10 shadow-[0_0_50px_rgba(62,234,244,0.15)] bg-[#0b0e17]">
        
        {/* Top Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 hover:border-[#3eeaf4] text-white/60 hover:text-white flex items-center justify-center transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pr-12">
          <div className="flex items-center gap-3 font-mono text-xs text-[#8a5cff] mb-2">
            <span>{project.caseNum}</span>
            <span className="text-white/20">•</span>
            <span className="text-[#3eeaf4]">{project.category}</span>
          </div>

          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            {project.title}
          </h2>
          <div className="font-mono text-xs text-[#3eeaf4] tracking-wider uppercase mt-1">
            {project.role}
          </div>
        </div>

        {/* Detailed Overview */}
        <div className="mt-6 text-[#8792a3] text-sm sm:text-base leading-relaxed">
          {project.detailedOverview || project.description}
        </div>

        {/* Security & Cryptographic Feature Highlight */}
        <div className="mt-6 p-4 rounded-xl bg-[#3eeaf4]/[0.05] border border-[#3eeaf4]/30 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#3eeaf4] shrink-0 mt-0.5" />
          <div>
            <div className="font-mono text-xs font-semibold text-[#3eeaf4] uppercase tracking-wider">
              Core Security Protocol
            </div>
            <div className="text-sm text-white font-medium mt-0.5">
              {project.securityFeature}
            </div>
          </div>
        </div>

        {/* Architecture & Engineering Points */}
        <div className="mt-8">
          <h3 className="font-mono text-xs font-semibold text-white tracking-widest uppercase mb-3 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#3eeaf4]" />
            <span>Architecture &amp; Implementation Details</span>
          </h3>

          <div className="space-y-3">
            {project.architecturePoints.map((point, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3 text-sm text-[#8792a3]"
              >
                <span className="font-mono text-xs text-[#3eeaf4] font-semibold mt-0.5">
                  0{idx + 1}.
                </span>
                <span className="leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="mt-8 grid grid-cols-3 gap-3">
          {project.metrics.map((m, i) => (
            <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/10 text-center">
              <div className="font-mono text-base sm:text-lg font-bold text-[#3eeaf4]">{m.value}</div>
              <div className="text-xs text-[#8792a3] mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Tech Stack Tags */}
        <div className="mt-8">
          <div className="font-mono text-xs text-[#525c6c] uppercase mb-2">Technologies &amp; Libraries</div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t, i) => (
              <span
                key={i}
                className="font-mono text-xs px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-white"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#3eeaf4] text-[#05060a] font-bold font-mono text-xs sm:text-sm hover:shadow-[0_0_20px_rgba(62,234,244,0.4)] transition-all"
          >
            <Github className="w-4 h-4" />
            <span>Open Source Repository</span>
          </a>

          <button
            onClick={handleClose}
            className="font-mono text-xs text-[#8792a3] hover:text-white transition-colors cursor-pointer"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
