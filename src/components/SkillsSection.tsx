import React from 'react';
import { Shield, Code, Smartphone, BarChart3, Rocket, Megaphone } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'shield':
        return <Shield className="w-5 h-5" />;
      case 'code':
        return <Code className="w-5 h-5" />;
      case 'mobile':
        return <Smartphone className="w-5 h-5" />;
      case 'chart':
        return <BarChart3 className="w-5 h-5" />;
      case 'rocket':
        return <Rocket className="w-5 h-5" />;
      case 'megaphone':
        return <Megaphone className="w-5 h-5" />;
      default:
        return <Code className="w-5 h-5" />;
    }
  };

  return (
    <section id="skills" className="py-24 sm:py-32 relative bg-[var(--bg2)] border-t border-[var(--line)]">
      <div className="w-full max-w-[1300px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex items-baseline gap-4 mb-16 sm:mb-20">
          <span className="font-mono-code text-[0.72rem] text-[#ff7a29] tracking-[0.2em]">/ 02</span>
          <h2 className="font-disp font-bold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[var(--txt)]">
            What I Do
          </h2>
          <span className="flex-1 h-[1px] bg-[var(--line)] self-center" />
          <span className="hidden sm:inline-block font-mono-code text-[0.72rem] text-[var(--dim)] tracking-[0.2em]">
            CAPABILITIES
          </span>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[var(--line)] border border-[var(--line)]">
          {portfolioData.skills.map((skill, index) => (
            <article
              key={skill.title}
              className="bg-[var(--bg)] p-8 sm:p-10 relative overflow-hidden group hover:bg-[var(--panel)] transition-colors duration-400 cursor-default"
            >
              {/* Top Accent Hover Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#ff7a29] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,0.8,0.24,1)]" />

              {/* Number Micro-Label */}
              <span className="font-mono-code text-[0.68rem] text-[var(--dim)] tracking-[0.2em]">
                0{index + 1}
              </span>

              {/* Icon Container with Hover Shift */}
              <div className="w-12 h-12 my-6 border border-[var(--line2)] rounded-sm flex items-center justify-center text-[#ff7a29] group-hover:-translate-y-1 group-hover:-rotate-3 group-hover:shadow-[0_12px_24px_-8px_rgba(255,122,41,0.5)] transition-all duration-400 ease-[cubic-bezier(0.22,0.8,0.24,1)]">
                {getIcon(skill.icon)}
              </div>

              {/* Title */}
              <h3 className="font-disp font-semibold text-lg sm:text-xl uppercase tracking-wide text-[var(--txt)] mb-3">
                {skill.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[var(--mut)] leading-relaxed mb-6">
                {skill.desc}
              </p>

              {/* Technical Tags */}
              {skill.tags && (
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--line)]">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono-code text-[0.62rem] tracking-wider text-[var(--dim)] bg-[var(--bg2)] px-2 py-0.5 border border-[var(--line)] rounded-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
