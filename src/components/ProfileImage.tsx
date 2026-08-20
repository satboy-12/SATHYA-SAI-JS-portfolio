import React, { useState } from 'react';
import profileImage from '../assets/profileImage';

export type ProfileImageVariant = 'hero' | 'about' | 'contact' | 'avatar' | 'card';

export interface ProfileImageProps {
  variant?: ProfileImageVariant;
  src?: string;
  alt?: string;
  className?: string;
  imageClassName?: string;
  aspectRatio?: '3/4' | '4/5' | '1/1' | 'auto';
  showGlow?: boolean;
  showVignette?: boolean;
  showBorder?: boolean;
  zoomOnHover?: boolean;
  onClick?: () => void;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
  variant = 'hero',
  src = profileImage,
  alt = 'Sathya Sai JS',
  className = '',
  imageClassName = '',
  aspectRatio,
  showGlow = true,
  showVignette = true,
  showBorder = true,
  zoomOnHover = true,
  onClick,
}) => {
  const [hasError, setHasError] = useState(false);

  // Use imported Vite asset bundle URL with fallbacks
  const imageSource = src || profileImage;

  // Variant specific defaults
  switch (variant) {
    case 'hero':
      return (
        <div
          onClick={onClick}
          className={`relative w-full max-w-[420px] ${
            aspectRatio === '4/5' ? 'aspect-[4/5]' : 'aspect-[3/4] sm:aspect-[4/5]'
          } rounded-2xl overflow-hidden ${
            showBorder ? 'border border-[#D6B47A]/30' : ''
          } ${
            showGlow ? 'shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(110,38,52,0.3)]' : ''
          } bg-[#120D0E] group select-none ${className}`}
        >
          <img
            src={imageSource}
            alt={alt}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover object-[50%_16%] ${
              zoomOnHover ? 'group-hover:scale-105 transition-transform duration-700 ease-out' : ''
            } ${imageClassName}`}
          />

          {/* Vignette Gradients */}
          {showVignette && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A0A]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B0A0A]/30 via-transparent to-[#0B0A0A]/30 pointer-events-none" />
            </>
          )}

          {/* Subtle Top Gold Highlight Accent */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D6B47A]/50 to-transparent pointer-events-none" />
        </div>
      );

    case 'about':
      return (
        <div
          onClick={onClick}
          className={`relative w-full max-w-[360px] aspect-[4/5] rounded-xl overflow-hidden ${
            showBorder ? 'border-2 border-[#D6B47A]/40' : ''
          } ${
            showGlow ? 'shadow-[0_20px_50px_rgba(18,13,14,0.18),0_0_30px_rgba(214,180,122,0.15)]' : ''
          } bg-[#120D0E] group select-none ${className}`}
        >
          <img
            src={imageSource}
            alt={alt}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover object-[50%_15%] ${
              zoomOnHover ? 'group-hover:scale-105 transition-transform duration-500 ease-out' : ''
            } ${imageClassName}`}
          />

          {showVignette && (
            <div className="absolute inset-0 bg-gradient-to-t from-[#120D0E]/50 via-transparent to-transparent pointer-events-none" />
          )}

          {/* Precision Corner Markings */}
          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#D6B47A]/70 pointer-events-none" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#D6B47A]/70 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#D6B47A]/70 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#D6B47A]/70 pointer-events-none" />
        </div>
      );

    case 'contact':
    case 'avatar':
      return (
        <div
          onClick={onClick}
          className={`relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden shrink-0 ${
            showBorder ? 'border-2 border-[#D6B47A]' : ''
          } ${
            showGlow ? 'shadow-[0_0_35px_rgba(214,180,122,0.35)]' : ''
          } bg-[#120D0E] group select-none ${className}`}
        >
          <img
            src={imageSource}
            alt={alt}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover object-[50%_12%] ${
              zoomOnHover ? 'group-hover:scale-110 transition-transform duration-500 ease-out' : ''
            } ${imageClassName}`}
          />

          {showVignette && (
            <div className="absolute inset-0 bg-gradient-to-t from-[#120D0E]/50 via-transparent to-transparent pointer-events-none" />
          )}

          {/* Golden Orbit Ring Pulse Glow */}
          <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
        </div>
      );

    case 'card':
    default:
      return (
        <div
          onClick={onClick}
          className={`relative overflow-hidden rounded-xl bg-[#120D0E] ${
            showBorder ? 'border border-[#D6B47A]/30' : ''
          } ${showGlow ? 'shadow-lg' : ''} ${className}`}
        >
          <img
            src={imageSource}
            alt={alt}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover object-[50%_15%] ${
              zoomOnHover ? 'hover:scale-105 transition-transform duration-500 ease-out' : ''
            } ${imageClassName}`}
          />
        </div>
      );
  }
};
