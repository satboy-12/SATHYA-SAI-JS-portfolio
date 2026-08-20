import React from 'react';
import { PORTFOLIO_PROFILE } from '../data/portfolioData';
import { Briefcase, CheckCircle2, Building2, GraduationCap } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="relative w-full bg-[#F9F6F0] text-[#120D0E] py-20 lg:py-28 px-6 sm:px-12 select-none overflow-hidden border-t border-[#D6B47A]/15">
      
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="space-y-1">
          <h2 className="font-display font-black text-4xl sm:text-5xl text-[#120D0E] tracking-tight">
            EXPERIENCE
          </h2>
          <p className="font-mono text-xs text-[#6E2634] tracking-widest uppercase font-bold">
            ACADEMIC SUPPORT · TECHNICAL SYSTEMS · DATA AUTOMATION
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Timeline & Responsibilities */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Active Position Card */}
            <div className="p-8 rounded-3xl bg-white border border-[#D6B47A]/30 shadow-[0_15px_40px_rgba(18,13,14,0.06)] space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#6E2634] text-[#D6B47A] flex items-center justify-center shadow-md">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold text-[#6E2634] tracking-wider uppercase">
                      2025 — PRESENT
                    </span>
                    <h3 className="font-display font-black text-2xl text-[#120D0E]">
                      TECHNICAL ASSOCIATE
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6B47A]/15 border border-[#D6B47A]/30 text-[#6E2634] font-mono text-xs font-bold">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Braiil Academy</span>
                </div>
              </div>

              {/* Responsibilities list matching uploaded image */}
              <div className="space-y-3 pt-2">
                {[
                  "Providing technical academic support to students and faculty across core CS & security coursework.",
                  "Developing and maintaining educational tools, interactive data visualizers, and learning resources.",
                  "Assisting in data management, analytics reporting, and automated telemetry pipelines.",
                  "Working on institutional learning platforms and administrative automation scripts."
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#6E2634] shrink-0 mt-1" />
                    <p className="text-xs sm:text-sm text-[#120D0E]/80 leading-relaxed font-normal">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

            </div>

            {/* Education Summary Strip */}
            <div className="p-6 rounded-2xl bg-[#241517] text-white border border-[#D6B47A]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-[#D6B47A]" />
                <div>
                  <div className="font-display font-bold text-sm text-[#D6B47A]">
                    B.E. CYBER SECURITY
                  </div>
                  <div className="text-xs text-white/70">
                    Sri Ram Engineering College · 2024 — 2027
                  </div>
                </div>
              </div>

              <div className="font-mono text-[10px] bg-[#6E2634] text-white px-3 py-1 rounded-full font-bold self-start sm:self-auto">
                UNDERGRADUATE
              </div>
            </div>

          </div>

          {/* Right Column: Arched Architectural Window Frame */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Arched Architectural Photo Frame matching master image */}
            <div className="relative w-full max-w-[380px] h-[480px] rounded-t-[190px] rounded-b-3xl overflow-hidden border-2 border-[#D6B47A]/30 shadow-[0_20px_50px_rgba(18,13,14,0.15)] group">
              <img
                src={PORTFOLIO_PROFILE.images.archWorkspace}
                alt="Architectural Laboratory Workspace"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120D0E]/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 inset-x-6 text-center text-white space-y-1">
                <span className="font-mono text-[10px] text-[#D6B47A] tracking-widest uppercase font-bold">
                  WORKSPACE TELEMETRY
                </span>
                <p className="text-xs text-white/90 font-serif italic">
                  "Precision engineering meets secure execution."
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
