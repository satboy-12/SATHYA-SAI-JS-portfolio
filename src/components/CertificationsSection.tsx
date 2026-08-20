import React, { useState } from 'react';
import { CERTIFICATIONS_LIST, CertificateItem } from '../data/portfolioData';
import { Award, CheckCircle2, ExternalLink, X, Sparkles } from 'lucide-react';
import { cyberAudio } from '../utils/soundEngine';

export const CertificationsSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  return (
    <section id="certifications" className="relative w-full bg-[#FFFFFF] text-[#120D0E] py-20 lg:py-28 px-6 sm:px-12 select-none overflow-hidden border-t border-[#D6B47A]/15">
      
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="space-y-1 text-center sm:text-left">
          <h2 className="font-display font-black text-4xl sm:text-5xl text-[#120D0E] tracking-tight">
            CERTIFICATIONS
          </h2>
          <p className="font-mono text-xs text-[#6E2634] tracking-widest uppercase font-bold">
            VERIFIED INDUSTRY CREDENTIALS & SPECIALIZED DOMAIN AUDITS
          </p>
        </div>

        {/* 4 Framed Certificate Cards Grid matching master image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFICATIONS_LIST.map((cert) => (
            <div
              key={cert.id}
              onClick={() => {
                cyberAudio.playKeyClick();
                setSelectedCert(cert);
              }}
              className="relative p-6 rounded-2xl bg-[#F9F6F0] hover:bg-white border-2 border-[#D6B47A]/30 hover:border-[#6E2634] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between space-y-6 group cursor-pointer"
            >
              
              {/* Top Certificate Header & Gold Seal */}
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#6E2634]/10 border border-[#D6B47A]/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6 text-[#6E2634]" />
                </div>

                <span className="font-mono text-[10px] bg-[#D6B47A]/20 text-[#6E2634] px-2.5 py-1 rounded-full font-bold">
                  {cert.year}
                </span>
              </div>

              {/* Title & Issuer */}
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-[#6E2634] tracking-wider uppercase font-semibold">
                  {cert.category}
                </span>
                <h3 className="font-display font-bold text-lg text-[#120D0E] group-hover:text-[#6E2634] transition-colors leading-snug">
                  {cert.title}
                </h3>
                <p className="text-xs text-[#120D0E]/60">
                  {cert.issuer}
                </p>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#120D0E]/10">
                {cert.skills.slice(0, 2).map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[9px] px-2 py-0.5 rounded bg-white text-[#120D0E]/80 border border-[#D6B47A]/20"
                  >
                    {s}
                  </span>
                ))}
                {cert.skills.length > 2 && (
                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-white text-[#6E2634] font-bold">
                    +{cert.skills.length - 2}
                  </span>
                )}
              </div>

              {/* View Action */}
              <div className="flex items-center justify-between text-[#6E2634] font-mono text-[10px] font-bold tracking-wider pt-2">
                <span>INSPECT CREDENTIAL</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Centered Button matching master image */}
        <div className="flex justify-center pt-4">
          <button
            onClick={() => {
              cyberAudio.playKeyClick();
              setSelectedCert(CERTIFICATIONS_LIST[0]);
            }}
            className="px-8 py-3 rounded-full bg-[#6E2634] hover:bg-[#8C2735] text-white font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(110,38,52,0.4)] cursor-pointer"
          >
            VIEW ALL CERTIFICATES
          </button>
        </div>

      </div>

      {/* Certificate Detailed Inspector Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-[#F9F6F0] rounded-3xl border-2 border-[#D6B47A] p-8 shadow-2xl space-y-6">
            
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#120D0E]/5 hover:bg-[#120D0E]/10 text-[#120D0E] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#6E2634] text-[#D6B47A] flex items-center justify-center shadow-md">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <span className="font-mono text-xs text-[#6E2634] font-bold tracking-wider">
                  VERIFIED CERTIFICATION
                </span>
                <h3 className="font-display font-black text-xl text-[#120D0E]">
                  {selectedCert.title}
                </h3>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#D6B47A]/30 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#120D0E]/60">Credential ID:</span>
                <span className="font-mono font-bold text-[#6E2634]">{selectedCert.credentialId}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#120D0E]/60">Year Issued:</span>
                <span className="font-semibold text-[#120D0E]">{selectedCert.year}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#120D0E]/60">Verification Status:</span>
                <span className="font-semibold text-[#10b981] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Authenticated
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-mono text-xs font-bold text-[#120D0E] tracking-wider uppercase">
                COVERED CURRICULUM & COMPETENCIES
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedCert.skills.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 rounded-lg bg-[#6E2634]/10 border border-[#D6B47A]/30 font-mono text-xs text-[#6E2634] font-semibold"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedCert(null)}
              className="w-full py-3 rounded-xl bg-[#120D0E] hover:bg-[#6E2634] text-white font-mono text-xs font-bold tracking-widest uppercase transition-colors"
            >
              CLOSE CREDENTIAL
            </button>

          </div>
        </div>
      )}

    </section>
  );
};
