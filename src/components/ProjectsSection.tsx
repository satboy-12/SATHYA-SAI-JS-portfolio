import React, { useState } from 'react';
import { SELECTED_PROJECTS, ProjectCaseStudy } from '../data/portfolioData';
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Github, Sparkles } from 'lucide-react';
import { cyberAudio } from '../utils/soundEngine';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectCaseStudy) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeProject = SELECTED_PROJECTS[currentIndex];
  const nextProject = SELECTED_PROJECTS[(currentIndex + 1) % SELECTED_PROJECTS.length];

  const handleNext = () => {
    cyberAudio.playKeyClick();
    setCurrentIndex((prev) => (prev + 1) % SELECTED_PROJECTS.length);
  };

  const handlePrev = () => {
    cyberAudio.playKeyClick();
    setCurrentIndex((prev) => (prev - 1 + SELECTED_PROJECTS.length) % SELECTED_PROJECTS.length);
  };

  return (
    <section id="work" className="relative w-full bg-[#F9F6F0] text-[#120D0E] py-20 lg:py-28 px-6 sm:px-12 select-none overflow-hidden border-t border-[#D6B47A]/15">
      
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="font-display font-black text-4xl sm:text-5xl text-[#120D0E] tracking-tight">
              SELECTED WORK
            </h2>
            <p className="font-mono text-xs text-[#6E2634] tracking-widest uppercase font-bold">
              PRODUCTION ARCHITECTURES · DATA PLATFORMS · CRYPTOGRAPHIC SYSTEMS
            </p>
          </div>
          
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full border border-[#120D0E]/20 hover:border-[#6E2634] hover:bg-[#6E2634] hover:text-white transition-all cursor-pointer"
              aria-label="Previous Project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full border border-[#120D0E]/20 hover:border-[#6E2634] hover:bg-[#6E2634] hover:text-white transition-all cursor-pointer"
              aria-label="Next Project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Project Showcase Layout matching uploaded master image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Project Number Navigation Index */}
          <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-4 sm:gap-6">
            {SELECTED_PROJECTS.map((proj, idx) => {
              const isActive = currentIndex === idx;
              return (
                <button
                  key={proj.id}
                  onClick={() => {
                    cyberAudio.playKeyClick();
                    setCurrentIndex(idx);
                  }}
                  className={`font-display font-black text-3xl sm:text-4xl transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'text-[#6E2634] scale-110'
                      : 'text-[#120D0E]/25 hover:text-[#120D0E]/60'
                  }`}
                >
                  {proj.num}
                </button>
              );
            })}

            {/* Mobile Prev / Next Buttons */}
            <div className="flex sm:hidden items-center gap-2 ml-auto">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full border border-[#120D0E]/20 hover:bg-[#6E2634] hover:text-white"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full border border-[#120D0E]/20 hover:bg-[#6E2634] hover:text-white"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Center Main Feature Card (Curved Dark UI Card) */}
          <div className="lg:col-span-7 relative group">
            <div
              onClick={() => onSelectProject(activeProject)}
              className="relative rounded-3xl bg-[#120D0E] text-white p-6 sm:p-8 border border-[#D6B47A]/30 overflow-hidden shadow-[0_20px_50px_rgba(18,13,14,0.3)] hover:shadow-[0_25px_60px_rgba(110,38,52,0.4)] transition-all duration-500 cursor-pointer"
            >
              
              {/* Project Preview Image with Aspect Ratio */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 border border-white/10 group-hover:border-[#D6B47A]/50 transition-colors">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120D0E] via-transparent to-transparent opacity-80" />

                {/* Floating Category Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {(Array.isArray(activeProject.category) ? activeProject.category : [activeProject.category]).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-[#120D0E]/85 backdrop-blur-md border border-[#D6B47A]/30 font-mono text-[9px] font-bold text-[#D6B47A] tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h3 className="font-display font-black text-xl sm:text-2xl text-white group-hover:text-[#D6B47A] transition-colors leading-tight">
                  {activeProject.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed line-clamp-2">
                  {activeProject.description}
                </p>

                {/* Bottom Action Strip */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="font-mono text-xs text-[#D6B47A] font-semibold tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    EXPLORE CASE STUDY
                  </span>

                  <div className="w-10 h-10 rounded-full bg-[#6E2634] group-hover:bg-[#8C2735] text-white flex items-center justify-center transition-all group-hover:scale-110 shadow-[0_0_15px_rgba(110,38,52,0.6)]">
                    <ArrowRight className="w-4 h-4 text-[#D6B47A]" />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Peeking Next Card */}
          <div className="hidden lg:block lg:col-span-3">
            <div
              onClick={handleNext}
              className="relative rounded-3xl bg-[#241517]/40 backdrop-blur-sm border border-[#D6B47A]/20 p-5 overflow-hidden opacity-70 hover:opacity-100 transition-all duration-300 cursor-pointer group"
            >
              <div className="font-mono text-[10px] text-[#D6B47A] tracking-widest uppercase mb-2">
                NEXT UP // {nextProject.num}
              </div>
              <div className="aspect-video rounded-xl overflow-hidden mb-3 border border-white/10">
                <img
                  src={nextProject.image}
                  alt={nextProject.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <h4 className="font-display font-bold text-sm text-[#120D0E] line-clamp-2">
                {nextProject.title}
              </h4>
            </div>
          </div>

        </div>

        {/* Bottom Centered Action */}
        <div className="flex justify-center pt-6">
          <button
            onClick={() => onSelectProject(activeProject)}
            className="px-8 py-3 rounded-full bg-[#120D0E] hover:bg-[#6E2634] text-white font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md cursor-pointer flex items-center gap-3"
          >
            <span>VIEW ALL PROJECTS</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D6B47A]" />
          </button>
        </div>

      </div>

    </section>
  );
};
