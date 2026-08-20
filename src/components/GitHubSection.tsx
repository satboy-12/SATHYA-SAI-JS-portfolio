import React from 'react';
import { GITHUB_REPOSITORIES, PORTFOLIO_PROFILE } from '../data/portfolioData';
import { Github, Star, GitFork, ExternalLink, Code2, Terminal } from 'lucide-react';
import { cyberAudio } from '../utils/soundEngine';

export const GitHubSection: React.FC = () => {
  return (
    <section id="github" className="relative w-full bg-[#F9F6F0] text-[#120D0E] py-20 lg:py-28 px-6 sm:px-12 select-none overflow-hidden border-t border-[#D6B47A]/15">
      
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Heading matching master image */}
        <div className="space-y-1">
          <h2 className="font-display font-black text-4xl sm:text-5xl text-[#120D0E] tracking-tight">
            CODE. BUILD. SHIP.
          </h2>
          <p className="font-mono text-xs text-[#6E2634] tracking-widest uppercase font-bold">
            SOME OF MY OPEN SOURCE REPOSITORIES
          </p>
        </div>

        {/* 4 Repository Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {GITHUB_REPOSITORIES.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => cyberAudio.playKeyClick()}
              className="p-6 rounded-2xl bg-white hover:bg-[#120D0E] text-[#120D0E] hover:text-white border-2 border-[#D6B47A]/25 hover:border-[#6E2634] transition-all duration-300 shadow-sm hover:shadow-2xl flex flex-col justify-between space-y-6 group cursor-pointer"
            >
              
              <div className="space-y-3">
                {/* Repo Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Terminal className="w-5 h-5 text-[#6E2634] group-hover:text-[#D6B47A] transition-colors" />
                    <h3 className="font-mono font-bold text-sm sm:text-base tracking-tight text-[#120D0E] group-hover:text-[#D6B47A] transition-colors">
                      {repo.name}
                    </h3>
                  </div>

                  <ExternalLink className="w-4 h-4 text-[#120D0E]/40 group-hover:text-[#D6B47A] transition-colors" />
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#120D0E]/70 group-hover:text-white/80 leading-relaxed font-normal">
                  {repo.description}
                </p>
              </div>

              {/* Tags & Stars / Forks strip */}
              <div className="space-y-3 pt-2 border-t border-[#120D0E]/10 group-hover:border-white/10">
                
                <div className="flex flex-wrap gap-1.5">
                  {repo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#F9F6F0] group-hover:bg-[#6E2634] text-[#120D0E]/80 group-hover:text-white border border-[#D6B47A]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-[#120D0E]/60 group-hover:text-white/60">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-[#D6B47A]" />
                    <span>{repo.stars}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5 text-[#D6B47A]" />
                    <span>{repo.forks}</span>
                  </span>
                </div>

              </div>

            </a>
          ))}
        </div>

        {/* Bottom Button matching master image */}
        <div className="flex justify-center pt-4">
          <a
            href={PORTFOLIO_PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full bg-[#6E2634] hover:bg-[#8C2735] text-white font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(110,38,52,0.4)] cursor-pointer flex items-center gap-3"
          >
            <Github className="w-4 h-4 text-[#D6B47A]" />
            <span>VIEW GITHUB PROFILE</span>
          </a>
        </div>

      </div>

    </section>
  );
};
