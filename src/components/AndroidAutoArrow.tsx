import React from 'react';

interface AndroidAutoArrowProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

/**
 * 3D-shaded Android Auto Navigation Arrow
 * Recreates the two-facet lighting (bright left side, darker right side)
 * with the center ridge and bottom triangular notch.
 */
export const AndroidAutoArrow: React.FC<AndroidAutoArrowProps> = ({
  className = '',
  size = 140,
  glow = false
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {glow && (
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-25 bg-white pointer-events-none"
          style={{ width: size, height: size * 1.1 }}
        />
      )}

      <svg
        width={size}
        height={size * 1.12}
        viewBox="0 0 100 112"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
      >
        <defs>
          {/* Bright left facet gradient */}
          <linearGradient id="aa_arrow_left" x1="20" y1="10" x2="50" y2="86" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          {/* Shaded right facet gradient */}
          <linearGradient id="aa_arrow_right" x1="50" y1="10" x2="85" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#CBD5E1" />
            <stop offset="40%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          {/* Subtle center crease shadow */}
          <filter id="aa_crease" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="-0.5" dy="0" stdDeviation="0.8" floodColor="#000000" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Left Facet: (50, 6) -> (6, 96) -> (50, 76) */}
        <polygon
          points="50,6 6,96 50,76"
          fill="url(#aa_arrow_left)"
        />

        {/* Right Facet: (50, 6) -> (50, 76) -> (94, 96) */}
        <polygon
          points="50,6 50,76 94,96"
          fill="url(#aa_arrow_right)"
        />

        {/* Crisp center crease highlight line */}
        <line
          x1="50"
          y1="6"
          x2="50"
          y2="76"
          stroke="#FFFFFF"
          strokeWidth="0.75"
          opacity="0.6"
        />
      </svg>
    </div>
  );
};
