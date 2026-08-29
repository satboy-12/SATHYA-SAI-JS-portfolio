import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, Shield, Layers } from 'lucide-react';
import { ProjectCaseStudy } from '../types';

interface ProjectCaseStudyModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
}

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-6 lg:p-10 select-none overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 0.8, 0.24, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar rounded-md bg-[var(--panel)] border border-[var(--line2)] p-6 sm:p-10 shadow-2xl z-10 space-y-8 my-auto text-[var(--txt)]"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-[var(--line)]">
            <div className="flex items-center gap-2.5 text-xs font-mono-code text-[var(--mut)]">
              <span className="text-[#ff7a29] font-bold text-base">{project.number}</span>
              <span>&bull;</span>
              <span className="uppercase font-semibold text-[#ff7a29]">{project.category}</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-sm bg-[var(--bg2)] border border-[var(--line)] text-[var(--mut)] hover:text-[var(--txt)] hover:border-[#ff7a29] transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-2">
            <h2 className="font-disp font-bold text-2xl sm:text-3xl text-[var(--txt)] tracking-tight uppercase">
              {project.name || project.title}
            </h2>
            {project.subtitle && (
              <p className="text-xs sm:text-sm font-mono-code text-[var(--mut)]">
                {project.subtitle}
              </p>
            )}
          </div>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden border border-[var(--line)] shadow-2xl">
            <img
              src={project.image}
              alt={project.name || project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--panel)] via-transparent to-transparent opacity-70" />
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="md:col-span-2 space-y-6">
              {/* Executive Summary */}
              <div className="space-y-2">
                <h4 className="font-mono-code text-xs font-bold tracking-widest text-[#ff7a29] uppercase">
                  ARCHITECTURE & OBJECTIVE
                </h4>
                <p className="text-sm text-[var(--mut)] leading-relaxed font-body">
                  {project.longDescription || project.description || project.desc}
                </p>
              </div>

              {/* Key Deliverables / Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-mono-code text-xs font-bold tracking-widest text-[#ff7a29] uppercase">
                    TECHNICAL MILESTONES & SECURITY SPECS
                  </h4>
                  <ul className="space-y-2.5">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--mut)] font-body">
                        <CheckCircle2 size={15} className="text-[#ff7a29] mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Metrics & Meta */}
            <div className="space-y-6">
              {project.metrics && project.metrics.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-mono-code text-xs font-bold tracking-widest text-[#ff7a29] uppercase">
                    PERFORMANCE METRICS
                  </h4>
                  <div className="space-y-2">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="p-3 rounded-sm bg-[var(--bg2)] border border-[var(--line)]">
                        <div className="text-[10px] font-mono-code text-[var(--dim)] uppercase">{m.label}</div>
                        <div className="text-base font-disp font-bold text-[var(--txt)] mt-0.5">{m.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div className="space-y-3">
                <h4 className="font-mono-code text-xs font-bold tracking-widest text-[#ff7a29] uppercase">
                  TECH STACK
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {(project.tech || project.tags || []).map((tag, i) => (
                    <span key={i} className="px-2 py-1 rounded-xs bg-[var(--bg2)] border border-[var(--line)] text-[10px] font-mono-code text-[var(--mut)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[#ff7a29] text-[#0b0b0e] font-mono-code text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-[var(--txt)] transition-colors"
                  >
                    <span>Visit Live Platform</span>
                    <ExternalLink size={13} />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--bg2)] border border-[var(--line2)] text-[var(--txt)] font-mono-code text-xs font-bold uppercase tracking-widest rounded-sm hover:border-[#ff7a29] hover:text-[#ff7a29] transition-all"
                  >
                    <span>View Repository</span>
                    <Github size={13} />
                  </a>
                )}
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
