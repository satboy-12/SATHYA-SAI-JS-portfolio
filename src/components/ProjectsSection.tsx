import React, { useState } from 'react';
import { ExternalLink, Github, ArrowRight, Layers } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { ProjectCaseStudy } from '../types';

interface ProjectsSectionProps {
  onOpenCaseStudy: (project: ProjectCaseStudy) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenCaseStudy }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isSwapping, setIsSwapping] = useState(false);

  const currentProject = portfolioData.projects[selectedIdx] || portfolioData.projects[0];

  const handleSelectProject = (index: number) => {
    if (index === selectedIdx || isSwapping) return;
    setIsSwapping(true);
    setTimeout(() => {
      setSelectedIdx(index);
      setIsSwapping(false);
    }, 280);
  };

  return (
    <section id="projects" className="py-24 sm:py-32 relative bg-[var(--bg)] border-t border-[var(--line)]">
      <div className="w-full max-w-[1300px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex items-baseline gap-4 mb-16 sm:mb-20">
          <span className="font-mono-code text-[0.72rem] text-[#ff7a29] tracking-[0.2em]">/ 03</span>
          <h2 className="font-disp font-bold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[var(--txt)]">
            Featured Projects
          </h2>
          <span className="flex-1 h-[1px] bg-[var(--line)] self-center" />
          <span className="hidden sm:inline-block font-mono-code text-[0.72rem] text-[var(--dim)] tracking-[0.2em]">
            SELECTED WORK
          </span>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.9fr] gap-8 lg:gap-14 items-start">
          
          {/* Project Preview Viewport */}
          <div
            className={`transition-all duration-300 ease-out ${
              isSwapping ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'
            }`}
          >
            <div className="relative aspect-[16/10] border border-[var(--line)] bg-[var(--panel)] overflow-hidden flex items-center justify-center group shadow-2xl">
              {/* Background Grid Pattern */}
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Radial Amber Glow */}
              <div className="absolute -top-[20%] -left-[10%] w-[60%] aspect-square rounded-full bg-[radial-gradient(circle,rgba(255,122,41,0.18)_0%,transparent_70%)] filter blur-xl pointer-events-none" />

              {/* Project Image */}
              <img
                src={currentProject.image}
                alt={currentProject.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,0.8,0.24,1)] group-hover:scale-105 relative z-1"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />

              {/* Number Overlay Badge */}
              <div className="absolute top-4 right-4 bg-[var(--bg)]/90 backdrop-blur border border-[var(--line2)] px-3 py-1 font-mono-code text-xs tracking-widest text-[#ff7a29] z-10">
                0{selectedIdx + 1} / 0{portfolioData.projects.length}
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div
            className={`transition-all duration-300 ease-out ${
              isSwapping ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
            }`}
          >
            {/* Category Tag */}
            <span className="inline-block border border-[var(--line2)] px-3.5 py-1.5 font-mono-code text-[0.66rem] tracking-[0.2em] uppercase text-[#ff7a29] mb-5">
              {currentProject.category}
            </span>

            {/* Title */}
            <h3 className="font-disp font-bold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight leading-tight text-[var(--txt)] mb-4">
              {currentProject.name}
            </h3>

            {/* Description */}
            <p className="text-[var(--mut)] text-sm sm:text-base leading-relaxed max-w-[48ch] mb-8">
              {currentProject.description || currentProject.desc}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              {currentProject.liveUrl && (
                <a
                  href={currentProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono-code text-xs tracking-[0.16em] uppercase px-5 py-3 bg-[#ff7a29] text-[#0b0b0e] font-semibold rounded-sm hover:bg-[var(--txt)] transition-colors duration-300"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {currentProject.githubUrl && (
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono-code text-xs tracking-[0.16em] uppercase px-5 py-3 border border-[var(--line2)] text-[var(--txt)] rounded-sm hover:border-[#ff7a29] hover:text-[#ff7a29] transition-all duration-300"
                >
                  <span>View Code</span>
                  <Github className="w-3.5 h-3.5" />
                </a>
              )}

              <button
                onClick={() => onOpenCaseStudy(currentProject)}
                className="inline-flex items-center gap-2 font-mono-code text-xs tracking-[0.16em] uppercase px-5 py-3 border border-[var(--line2)] text-[var(--txt)] rounded-sm hover:border-[#ff7a29] hover:text-[#ff7a29] transition-all duration-300"
              >
                <span>Case Study</span>
                <Layers className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tech Chips */}
            <div className="flex flex-wrap gap-2 pt-6 mt-8 border-t border-[var(--line)]">
              {(currentProject.tech || currentProject.tags || []).map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 font-mono-code text-[0.66rem] tracking-wider border border-[var(--line)] px-3 py-1.5 text-[var(--mut)] hover:text-[var(--txt)] hover:border-[#ff7a29] transition-colors"
                >
                  <i className="w-1.5 h-1.5 rounded-full bg-[#ff7a29] inline-block" />
                  <span>{t}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Interactive Navigation List */}
        <div className="mt-14 sm:mt-20 border-t border-[var(--line)]">
          {portfolioData.projects.map((project, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={project.id || project.name}
                onClick={() => handleSelectProject(idx)}
                className={`w-full grid grid-cols-[40px_1fr_auto] items-center gap-4 py-5 px-3 border-b border-[var(--line)] text-left transition-all duration-300 relative group ${
                  isSelected ? 'bg-[var(--panel)] pl-6' : 'hover:bg-[var(--panel)]/50 hover:pl-6'
                }`}
              >
                {/* Active Left Indicator Bar */}
                <span
                  className={`absolute left-0 top-0 bottom-0 w-[2px] bg-[#ff7a29] transition-transform duration-300 ${
                    isSelected ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'
                  }`}
                />

                {/* Index Number */}
                <span
                  className={`font-mono-code text-xs tracking-widest ${
                    isSelected ? 'text-[#ff7a29]' : 'text-[var(--dim)] group-hover:text-[#ff7a29]'
                  }`}
                >
                  0{idx + 1}
                </span>

                {/* Project Title */}
                <span
                  className={`font-disp font-semibold text-base sm:text-lg uppercase tracking-wide transition-colors ${
                    isSelected ? 'text-[var(--txt)]' : 'text-[var(--mut)] group-hover:text-[var(--txt)]'
                  }`}
                >
                  {project.name}
                </span>

                {/* Arrow Icon */}
                <ArrowRight
                  className={`w-4 h-4 transition-all duration-300 ${
                    isSelected
                      ? 'text-[#ff7a29] opacity-100 translate-x-0'
                      : 'text-[var(--dim)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[#ff7a29]'
                  }`}
                />
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
