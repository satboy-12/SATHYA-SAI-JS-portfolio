import React, { useState, useRef } from 'react';
import { UserPhoto, readFileAsDataUrl, saveStoredPhotos } from '../utils/photoStorage';
import { X, Upload, Image, Trash2, CheckCircle2, Shield, AlertCircle, Sparkles } from 'lucide-react';
import { cyberAudio } from '../utils/soundEngine';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: UserPhoto[];
  onUpdatePhotos: (newPhotos: UserPhoto[]) => void;
}

export const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
  isOpen,
  onClose,
  photos,
  onUpdatePhotos
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<number>(0);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleClose = () => {
    cyberAudio.playKeyClick();
    onClose();
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    cyberAudio.playScannerGliss();
    const updated = [...photos];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) continue;

      const dataUrl = await readFileAsDataUrl(file);
      const targetSlot = (selectedSlot + i) % 3;

      const titles = ['Front Direct Stride', 'Perspective Stride Angle', 'Facial Profile Close-up'];
      const badges = ['PRIMARY_AUTH', 'LATERAL_POSE', 'FACIAL_MESH'];

      updated[targetSlot] = {
        id: `custom_${targetSlot}_${Date.now()}`,
        title: titles[targetSlot],
        subtitle: file.name,
        src: dataUrl,
        badge: badges[targetSlot],
        isCustom: true
      };
    }

    onUpdatePhotos(updated);
    saveStoredPhotos(updated);
    cyberAudio.playUnlockChime();
    setStatusMsg(`✓ Successfully loaded ${files.length} real photo(s)! Applied instantly across portfolio.`);
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    if (e.target) e.target.value = '';
  };

  const handleResetSlot = (slotIdx: number) => {
    cyberAudio.playKeyClick();
    const defaultSources = [
      "/images/sathya-profile.jpg",
      "/images/sathya-profile.jpg",
      "/images/sathya-profile.jpg"
    ];
    const titles = ['Front Direct Stride', 'Perspective Angle', 'Close Facial Geometry'];
    const badges = ['PRIMARY_AUTH', 'LATERAL_SCAN', 'FACIAL_MESH'];

    const updated = [...photos];
    updated[slotIdx] = {
      id: `default_${slotIdx}`,
      title: titles[slotIdx],
      subtitle: 'Original Authentic Pose',
      src: defaultSources[slotIdx],
      badge: badges[slotIdx],
      isCustom: false
    };

    onUpdatePhotos(updated);
    saveStoredPhotos(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl glass-panel border border-[#3eeaf4]/40 p-6 sm:p-10 shadow-[0_0_60px_rgba(62,234,244,0.2)] bg-[#070a12]">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 hover:border-[#3eeaf4] text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#3eeaf4]/10 border border-[#3eeaf4]/40 flex items-center justify-center text-[#3eeaf4]">
            <Image className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#3eeaf4]">
              <span className="w-2 h-2 rounded-full bg-[#3eeaf4] animate-ping" />
              <span>// AUTHENTIC_PHOTO_MANAGER</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Use Your Exact Original Photos
            </h2>
          </div>
        </div>

        <p className="text-sm text-[#8792a3] mb-6">
          Select or drag-and-drop your exact WhatsApp / camera photos directly. Your real unedited photos are saved locally and immediately updated across the 3D Hero, Dossier, and Cinematic Reveal video.
        </p>

        {/* Status Notification */}
        {statusMsg && (
          <div className="mb-6 p-3 rounded-xl bg-[#3eeaf4]/10 border border-[#3eeaf4] font-mono text-xs text-[#3eeaf4] flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* Drag and Drop Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`p-8 rounded-2xl border-2 border-dashed text-center cursor-pointer transition-all duration-300 mb-8 flex flex-col items-center justify-center gap-3 ${
            dragOver
              ? 'border-[#3eeaf4] bg-[#3eeaf4]/10 scale-[1.01]'
              : 'border-white/20 hover:border-[#3eeaf4]/50 bg-black/40 hover:bg-white/[0.02]'
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-[#3eeaf4]/10 border border-[#3eeaf4]/30 flex items-center justify-center text-[#3eeaf4]">
            <Upload className="w-7 h-7" />
          </div>
          <div>
            <div className="font-display font-semibold text-white text-base">
              Click to select or drag &amp; drop your original photos here
            </div>
            <div className="font-mono text-xs text-[#8792a3] mt-1">
              Supports JPEG, JPG, PNG (e.g. WhatsApp Image 2026-08-18 at 4.34.35 PM.jpeg)
            </div>
          </div>
          <span className="px-4 py-1.5 rounded-full bg-[#3eeaf4] text-[#05060a] font-mono text-xs font-bold shadow-[0_0_15px_rgba(62,234,244,0.4)]">
            BROWSE MY DEVICE
          </span>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileInputChange}
          />
        </div>

        {/* 3 Active Photo Slots */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {photos.map((p, idx) => (
            <div
              key={p.id || idx}
              onClick={() => setSelectedSlot(idx)}
              className={`rounded-2xl overflow-hidden glass-panel border p-4 transition-all duration-300 ${
                selectedSlot === idx
                  ? 'border-[#3eeaf4] ring-2 ring-[#3eeaf4]/40 bg-[#3eeaf4]/[0.03]'
                  : 'border-white/10'
              }`}
            >
              <div className="flex items-center justify-between font-mono text-xs text-[#8a5cff] mb-2">
                <span>SLOT 0{idx + 1}</span>
                {p.isCustom && (
                  <span className="px-2 py-0.5 rounded bg-[#3eeaf4]/20 text-[#3eeaf4] text-[10px] font-bold">
                    ORIGINAL USER PHOTO ✓
                  </span>
                )}
              </div>

              {/* Photo preview */}
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-black/60 mb-3 border border-white/10">
                <img
                  src={p.src}
                  alt={p.title}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05060a] via-transparent to-black/20" />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between font-mono text-[10px] text-white/80">
                  <span className="text-[#3eeaf4]">{p.badge}</span>
                  <span className="truncate max-w-[120px]">{p.title}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSlot(idx);
                    fileInputRef.current?.click();
                  }}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-[#3eeaf4]/10 border border-white/10 hover:border-[#3eeaf4]/40 text-xs text-white font-mono transition-colors text-center cursor-pointer"
                >
                  Change Photo 0{idx + 1}
                </button>

                {p.isCustom && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleResetSlot(idx);
                    }}
                    title="Reset to default"
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 font-mono text-xs">
          <div className="text-[#8792a3] flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#3eeaf4]" />
            <span>Zero AI Alterations. Uses 100% authentic user-provided image data.</span>
          </div>

          <button
            onClick={handleClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#3eeaf4] to-[#8a5cff] text-[#05060a] font-bold hover:shadow-[0_0_20px_rgba(62,234,244,0.4)] transition-all cursor-pointer"
          >
            DONE &amp; VIEW PORTFOLIO
          </button>
        </div>

      </div>
    </div>
  );
};
