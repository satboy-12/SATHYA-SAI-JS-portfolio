import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import { cyberAudio } from '../utils/soundEngine';

export const SkillsSection: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<{ name: string; level: string; description: string } | null>(null);

  const activeCategory = SKILL_CATEGORIES[activeCategoryIndex];

  return (
    <section id="skills" className="relative w-full bg-[#FFFFFF] text-[#120D0E] py-20 lg:py-28 px-6 sm:px-12 select-none overflow-hidden border-t border-[#D6B47A]/15">
      
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="font-display font-black text-4xl sm:text-5xl text-[#120D0E] tracking-tight">
              MY TOOLKIT
            </h2>
            <p className="font-mono text-xs text-[#6E2634] tracking-widest uppercase font-bold">
              SYSTEM SECURITY · APPLIED CODE · ANALYTICAL PIPELINES
            </p>
          </div>
          
          <div className="font-mono text-xs text-[#120D0E]/60">
            [ INTERACTIVE RADAR CONSTELLATION ]
          </div>
        </div>

        {/* 5 Category Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-6 border-b border-[#120D0E]/10 pb-4">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const isActive = activeCategoryIndex === idx;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  cyberAudio.playKeyClick();
                  setActiveCategoryIndex(idx);
                  setHoveredSkill(null);
                }}
                className={`font-mono text-xs sm:text-sm font-bold tracking-widest uppercase py-2 px-1 relative transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'text-[#6E2634]'
                    : 'text-[#120D0E]/60 hover:text-[#120D0E]'
                }`}
              >
                {cat.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#6E2634] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Center Visual: Technology Constellation Radar */}
        <div className="relative min-h-[460px] sm:min-h-[520px] bg-[#F9F6F0] rounded-3xl border border-[#D6B47A]/20 p-8 flex items-center justify-center overflow-hidden shadow-[0_15px_40px_rgba(18,13,14,0.06)]">
          
          {/* Circular Radar Web Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] rounded-full border border-[#D6B47A]/25" />
            <div className="w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full border border-[#D6B47A]/20" />
            <div className="w-[420px] h-[420px] sm:w-[500px] sm:h-[500px] rounded-full border border-[#D6B47A]/15 border-dashed" />
            
            {/* Crosshair Lines */}
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#D6B47A]/15" />
            <div className="absolute inset-y-0 left-1/2 w-[1px] bg-[#D6B47A]/15" />
          </div>

          {/* Central Shield/Core Node */}
          <div className="relative z-10 w-24 h-28 sm:w-28 sm:h-32 rounded-2xl bg-gradient-to-b from-[#6E2634] via-[#4A1520] to-[#241517] text-white flex flex-col items-center justify-center p-3 shadow-[0_10px_30px_rgba(110,38,52,0.4)] border border-[#D6B47A]/50">
            <Shield className="w-8 h-8 text-[#D6B47A] mb-1" />
            <span className="font-display font-bold text-[10px] sm:text-xs text-center text-[#D6B47A] tracking-wider leading-tight">
              {activeCategory.label}
            </span>
          </div>

          {/* Orbiting Satellite Skill Nodes */}
          <div className="absolute inset-0 pointer-events-auto">
            {activeCategory.skills.map((skill, index) => {
              const total = activeCategory.skills.length;
              const angle = (index / total) * (Math.PI * 2) - Math.PI / 2;
              
              // Alternating radius for organic high-tech layout
              const radius = window.innerWidth < 640 
                ? (index % 2 === 0 ? 110 : 145) 
                : (index % 2 === 0 ? 170 : 220);

              const leftPercent = 50 + (Math.cos(angle) * radius) / (window.innerWidth < 640 ? 3.5 : 5.5);
              const topPercent = 50 + (Math.sin(angle) * radius) / (window.innerWidth < 640 ? 3.5 : 5.5);

              const isHovered = hoveredSkill?.name === skill.name;

              return (
                <div
                  key={skill.name}
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onMouseEnter={() => {
                    cyberAudio.playKeyClick();
                    setHoveredSkill(skill);
                  }}
                  className="absolute z-20 flex flex-col items-center group cursor-pointer"
                >
                  {/* Glowing Node Marker */}
                  <div
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isHovered
                        ? 'bg-[#D6B47A] shadow-[0_0_15px_#D6B47A] scale-125'
                        : 'bg-[#6E2634] border-2 border-[#D6B47A] shadow-[0_0_8px_rgba(110,38,52,0.3)]'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>

                  {/* Skill Label */}
                  <span
                    className={`mt-1.5 font-mono text-[10px] sm:text-xs font-bold tracking-wider px-2 py-0.5 rounded transition-all whitespace-nowrap ${
                      isHovered
                        ? 'bg-[#120D0E] text-[#D6B47A] shadow-md scale-105'
                        : 'bg-white/80 text-[#120D0E] border border-[#D6B47A]/20'
                    }`}
                  >
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Hover Detail Modal / Tooltip Drawer at Bottom Center */}
          <div className="absolute bottom-4 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-30 pointer-events-none">
            <div className="bg-[#120D0E]/95 backdrop-blur-md text-white border border-[#D6B47A]/40 px-6 py-3 rounded-2xl shadow-xl flex items-center gap-4 max-w-lg mx-auto">
              <Sparkles className="w-5 h-5 text-[#D6B47A] shrink-0" />
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-sm text-[#D6B47A]">
                    {hoveredSkill ? hoveredSkill.name : 'Hover over any node'}
                  </span>
                  {hoveredSkill && (
                    <span className="font-mono text-[9px] bg-[#6E2634] text-white px-2 py-0.5 rounded-full font-bold">
                      {hoveredSkill.level}
                    </span>
                  )}
                </div>
                <p className="text-xs text-white/70 leading-snug">
                  {hoveredSkill
                    ? hoveredSkill.description
                    : 'Interact with the technology constellation to inspect architectural domain competencies.'}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Skill Category Pill Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
          {activeCategory.skills.map((skill) => (
            <div
              key={skill.name}
              onMouseEnter={() => {
                cyberAudio.playKeyClick();
                setHoveredSkill(skill);
              }}
              className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F9F6F0] hover:bg-[#6E2634] text-[#120D0E] hover:text-white border border-[#D6B47A]/20 transition-all duration-300 cursor-pointer group"
            >
              <CheckCircle2 className="w-4 h-4 text-[#6E2634] group-hover:text-[#D6B47A] shrink-0" />
              <span className="font-mono text-xs font-semibold tracking-wide truncate">
                {skill.name}
              </span>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};
