import React, { useState } from 'react';
import { UserPhoto } from '../utils/photoStorage';
import { X, Shield, Terminal, Upload } from 'lucide-react';
import { cyberAudio } from '../utils/soundEngine';

interface BiometricDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: UserPhoto[];
  onOpenPhotoManager: () => void;
}

export const BiometricDossierModal: React.FC<BiometricDossierModalProps> = ({
  isOpen,
  onClose,
  photos,
  onOpenPhotoManager
}) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (!isOpen) return null;
  const currentPhoto = photos[selectedIdx] || photos[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl glass-panel border border-[#3eeaf4]/40 p-6 sm:p-10 shadow-[0_0_60px_rgba(62,234,244,0.2)] bg-[#070a12]">
        <button
          onClick={() => { cyberAudio.playKeyClick(); onClose(); }}
          aria-label="Close"
          className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 hover:border-[#3eeaf4] text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3eeaf4]/10 border border-[#3eeaf4]/40 flex items-center justify-center text-[#3eeaf4]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="font-mono text-xs text-[#3eeaf4]">// BIOMETRIC_DOSSIER_NODE</div>
              <h2 className="font-display font-bold text-2xl text-white">SATHYA SAI JS — Multi-Angle Verification</h2>
            </div>
          </div>

          <button
            onClick={() => { onClose(); onOpenPhotoManager(); }}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#3eeaf4]/10 border border-[#3eeaf4]/40 text-[#3eeaf4] font-mono text-xs font-bold hover:bg-[#3eeaf4]/20 transition-all cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Real Photos</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {photos.map((p, idx) => (
            <div
              key={p.id || idx}
              onClick={() => { cyberAudio.playScannerGliss(); setSelectedIdx(idx); }}
              className={`rounded-2xl overflow-hidden glass-panel border cursor-pointer transition-all ${
                selectedIdx === idx ? 'border-[#3eeaf4] ring-2 ring-[#3eeaf4]/50 scale-[1.02]' : 'border-white/10 opacity-70 hover:opacity-100'
              }`}
            >
              <div className="relative aspect-[3/4] w-full bg-black/40">
                <img src={p.src} alt={p.title} className="w-full h-full object-cover object-top" />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/70 border border-[#3eeaf4]/40 font-mono text-[10px] text-[#3eeaf4]">
                  ANGLE 0{idx + 1}
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] text-white">
                  <span className="text-[#3eeaf4]">{p.badge}</span>
                  <span>{p.isCustom ? 'USER ORIGINAL ✓' : 'VERIFIED ✓'}</span>
                </div>
              </div>
              <div className="p-4 bg-white/[0.02]">
                <h3 className="font-display font-semibold text-white text-base">{p.title}</h3>
                <p className="font-mono text-xs text-[#8792a3]">{p.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl glass-panel p-5 border border-white/10 bg-black/40 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-[#525c6c] text-[10px]">SELECTED ANGLE</div>
            <div className="text-white font-semibold mt-1">{currentPhoto.title}</div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-[#525c6c] text-[10px]">AUTHENTICITY</div>
            <div className="text-[#3eeaf4] font-semibold mt-1">100% Real User Image</div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-[#525c6c] text-[10px]">SECURITY ROLE</div>
            <div className="text-white font-semibold mt-1">Cyber Security Engineer</div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-[#525c6c] text-[10px]">IDENTITY CLEARANCE</div>
            <div className="text-[#8a5cff] font-semibold mt-1">SATHYA_SAI_JS</div>
          </div>
        </div>
      </div>
    </div>
  );
};
