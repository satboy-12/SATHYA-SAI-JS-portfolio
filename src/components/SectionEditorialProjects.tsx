import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolioData';
import { ProjectCaseStudy } from '../types';
import { EditorialImage } from './EditorialImage';

interface SectionEditorialProjectsProps {
  onSelectProject: (project: ProjectCaseStudy) => void;
}

export const SectionEditorialProjects: React.FC<SectionEditorialProjectsProps> = ({ onSelectProject }) => {
  const projects = PORTFOLIO_PROFILE.projects;

  return (
    <section
      id="work"
      className="relative w-full py-24 sm:py-32 lg:py-40 px-6 sm:px-12 lg:px-20 bg-[#F4F1E8] text-[#11110F] select-none border-b border-[#11110F]/10 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto space-y-24 sm:space-y-36">
        {/* Editorial Sub-Index */}
        <div className="w-full flex items-center justify-between pb-6 border-b border-[#11110F]/10 text-xs font-mono-subtle uppercase tracking-[0.25em] text-[#11110F]/60">
          <div className="flex items-center gap-3">
            <span className="text-[#B39A6A] font-bold">03 / SELECTED WORK</span>
            <span>&bull;</span>
            <span>PRODUCTION BLUEPRINTS</span>
          </div>
          <div className="hidden sm:inline text-[#777A5A]">
            SCROLL TO EXPLORE CASE STUDIES
          </div>
        </div>

        {/* Section Headline */}
        <div>
          <span className="text-xs font-mono-subtle uppercase tracking-[0.3em] text-[#777A5A] block mb-2 font-semibold">
            ENGINEERING CASE STUDIES
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-sans-clean font-extrabold uppercase text-[#11110F] tracking-tight">
            SELECTED <span className="font-serif-editorial italic font-normal text-[#B39A6A]">WORK.</span>
          </h2>
        </div>

        {/* Case Studies Presentation (Large Editorial Format) */}
        <div className="w-full flex flex-col space-y-32 sm:space-y-48">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
            >
              {/* Very Large Project Visual */}
              <div
                data-cursor-project="true"
                onClick={() => onSelectProject(project)}
                className={`w-full lg:col-span-7 aspect-[16/10] rounded-[2.5rem] overflow-hidden bg-[#11110F] border border-[#11110F]/15 shadow-2xl relative cursor-pointer group hover:border-[#B39A6A] transition-all duration-500 ${
                  idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <EditorialImage
                  src={project.image}
                  alt={project.title}
                  fallbackSrc="/sathya-profile.jpeg"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11110F]/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating Corner Tag */}
                <div className="absolute bottom-6 right-6 px-4 py-2 rounded-full bg-[#11110F]/85 backdrop-blur-md border border-[#F4F1E8]/20 text-xs font-mono-subtle text-[#DFC89D] flex items-center gap-2 group-hover:bg-[#F4F1E8] group-hover:text-[#11110F] transition-all">
                  <span>VIEW SPECIFICATION</span>
                  <ArrowUpRight size={13} />
                </div>
              </div>

              {/* Case Study Editorial Detail */}
              <div
                className={`lg:col-span-5 space-y-6 ${
                  idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                {/* Number & Category */}
                <div className="flex items-center gap-3 text-xs font-mono-subtle uppercase tracking-widest text-[#777A5A]">
                  <span className="text-[#B39A6A] font-bold text-2xl font-serif-editorial">{project.number}</span>
                  <span>&bull;</span>
                  <span>{project.category}</span>
                </div>

                {/* Project Title */}
                <h3
                  onClick={() => onSelectProject(project)}
                  className="text-3xl sm:text-4xl lg:text-5xl font-sans-clean font-black uppercase text-[#11110F] hover:text-[#B39A6A] transition-colors duration-300 leading-tight cursor-pointer"
                >
                  {project.title}
                </h3>

                <div className="text-xs sm:text-sm font-mono-subtle text-[#777A5A] font-medium">
                  {project.subtitle}
                </div>

                <p className="text-sm sm:text-base text-[#11110F]/80 font-sans-clean font-light leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#11110F]/10 text-xs font-mono-subtle text-[#11110F]/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#11110F]/10">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="px-6 py-3 rounded-full bg-[#11110F] hover:bg-[#292924] text-[#F4F1E8] font-sans-clean text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow hover:scale-105 cursor-pointer"
                  >
                    READ CASE STUDY
                  </button>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-full bg-[#FAF8F5] border border-[#11110F]/15 text-[#11110F] hover:border-[#B39A6A] hover:text-[#B39A6A] font-mono-subtle text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer"
                    >
                      <span>LIVE</span>
                      <ExternalLink size={13} />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-[#FAF8F5] border border-[#11110F]/15 text-[#11110F] hover:border-[#B39A6A] hover:text-[#B39A6A] transition-all duration-300 cursor-pointer"
                      title="GitHub Source"
                    >
                      <Github size={15} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
