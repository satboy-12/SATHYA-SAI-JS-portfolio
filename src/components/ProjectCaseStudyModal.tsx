import React, { useEffect } from 'react';
import { ProjectCaseStudy } from '../data/portfolioData';
import { X, Github, ExternalLink, ShieldCheck, Cpu, Database, CheckCircle2, ArrowRight } from 'lucide-react';
import { cyberAudio } from '../utils/soundEngine';

interface ProjectCaseStudyModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
  onSelectProject?: (proj: ProjectCaseStudy) => void;
}

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({
  project,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-lg animate-fade-in select-none">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#120D0E] text-white rounded-3xl border border-[#D6B47A]/40 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col">
        
        {/* Top Header Bar */}
        <div className="px-6 sm:px-10 py-5 bg-[#241517] border-b border-[#D6B47A]/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-display font-black text-2xl text-[#D6B47A]">
              {project.num}
            </span>
            <div className="h-4 w-[1px] bg-[#D6B47A]/30" />
            <span className="font-mono text-xs text-white/70 tracking-widest uppercase">
              CASE STUDY // ARCHITECTURE SPECIFICATION
            </span>
          </div>

          <button
            onClick={() => {
              cyberAudio.playKeyClick();
              onClose();
            }}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-10 custom-scrollbar">
          
          {/* Title & Subtitle */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {project.category.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 rounded-md bg-[#6E2634]/40 border border-[#D6B47A]/30 font-mono text-[10px] font-bold text-[#D6B47A] tracking-wider uppercase"
                >
                  {cat}
                </span>
              ))}
            </div>

            <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-[#D6B47A] font-serif italic">
              {project.subtitle}
            </p>
          </div>

          {/* Project Preview Image */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120D0E]/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Key Metrics / Results Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.results.map((res) => (
              <div
                key={res.label}
                className="p-4 rounded-xl bg-[#241517] border border-[#D6B47A]/25 flex flex-col items-start space-y-1"
              >
                <span className="font-display font-black text-2xl text-[#D6B47A]">
                  {res.value}
                </span>
                <span className="font-mono text-[10px] text-white/70 tracking-wider uppercase font-semibold">
                  {res.label}
                </span>
              </div>
            ))}
          </div>

          {/* The Problem & The Approach Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <h3 className="font-display font-bold text-lg text-[#D6B47A] tracking-wider">
                THE PROBLEM
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <h3 className="font-display font-bold text-lg text-[#D6B47A] tracking-wider">
                THE APPROACH
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                {project.approach}
              </p>
            </div>
          </div>

          {/* System Architecture Points */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-xl text-white tracking-wide flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#D6B47A]" />
              SYSTEM ARCHITECTURE & PIPELINE
            </h3>

            <div className="space-y-3">
              {project.architecturePoints.map((point, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl bg-[#241517]/60 border border-[#D6B47A]/20"
                >
                  <span className="font-mono text-xs font-bold text-[#D6B47A] bg-[#6E2634] w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features & Tech Stack */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-3">
              <h3 className="font-display font-bold text-base text-white tracking-wide flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D6B47A]" />
                CORE IMPLEMENTATION FEATURES
              </h3>
              <div className="space-y-2">
                {project.keyFeatures.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-[#D6B47A] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-display font-bold text-base text-white tracking-wide flex items-center gap-2">
                <Database className="w-4 h-4 text-[#D6B47A]" />
                TECHNOLOGY STACK
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/15 font-mono text-xs font-semibold text-white/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Modal Bottom Action Footer */}
        <div className="px-6 sm:px-10 py-5 bg-[#241517] border-t border-[#D6B47A]/20 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-xl bg-[#6E2634] hover:bg-[#8C2735] text-white font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(110,38,52,0.5)]"
          >
            <Github className="w-4 h-4 text-[#D6B47A]" />
            <span>VIEW SOURCE ON GITHUB</span>
          </a>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-white/20 hover:border-[#D6B47A] text-white font-mono text-xs font-semibold tracking-wider transition-colors cursor-pointer"
          >
            CLOSE CASE STUDY
          </button>
        </div>

      </div>

    </div>
  );
};
