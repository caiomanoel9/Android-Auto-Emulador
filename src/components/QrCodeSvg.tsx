import React from 'react';

/**
 * QR Code component matching the crisp high-contrast design in the bottom right corner
 */
export const QrCodeSvg: React.FC<{
  size?: number;
  className?: string;
  onClick?: () => void;
}> = ({ size = 96, className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white p-2 sm:p-2.5 rounded-xl shadow-xl flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform ${className}`}
      title="Conectar via Wi-Fi / Hotspot QR Code"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 33 33"
        fill="black"
        shapeRendering="crispEdges"
      >
        {/* White background */}
        <rect width="33" height="33" fill="white" />

        {/* Top-Left Finder Pattern (7x7) */}
        <rect x="2" y="2" width="7" height="7" fill="black" />
        <rect x="3" y="3" width="5" height="5" fill="white" />
        <rect x="4" y="4" width="3" height="3" fill="black" />

        {/* Top-Right Finder Pattern (7x7) */}
        <rect x="24" y="2" width="7" height="7" fill="black" />
        <rect x="25" y="3" width="5" height="5" fill="white" />
        <rect x="26" y="4" width="3" height="3" fill="black" />

        {/* Bottom-Left Finder Pattern (7x7) */}
        <rect x="2" y="24" width="7" height="7" fill="black" />
        <rect x="3" y="25" width="5" height="5" fill="white" />
        <rect x="4" y="26" width="3" height="3" fill="black" />

        {/* Timing Lines */}
        <rect x="2" y="10" width="1" height="1" fill="black" />
        <rect x="4" y="10" width="1" height="1" fill="black" />
        <rect x="6" y="10" width="1" height="1" fill="black" />
        <rect x="8" y="10" width="1" height="1" fill="black" />
        <rect x="10" y="10" width="1" height="1" fill="black" />
        <rect x="12" y="10" width="1" height="1" fill="black" />
        <rect x="14" y="10" width="1" height="1" fill="black" />
        <rect x="16" y="10" width="1" height="1" fill="black" />
        <rect x="18" y="10" width="1" height="1" fill="black" />
        <rect x="20" y="10" width="1" height="1" fill="black" />
        <rect x="22" y="10" width="1" height="1" fill="black" />

        <rect x="10" y="2" width="1" height="1" fill="black" />
        <rect x="10" y="4" width="1" height="1" fill="black" />
        <rect x="10" y="6" width="1" height="1" fill="black" />
        <rect x="10" y="8" width="1" height="1" fill="black" />
        <rect x="10" y="12" width="1" height="1" fill="black" />
        <rect x="10" y="14" width="1" height="1" fill="black" />
        <rect x="10" y="16" width="1" height="1" fill="black" />
        <rect x="10" y="18" width="1" height="1" fill="black" />
        <rect x="10" y="20" width="1" height="1" fill="black" />
        <rect x="10" y="22" width="1" height="1" fill="black" />

        {/* Authentic Data Matrix Pattern */}
        {/* Alignment pattern near bottom right */}
        <rect x="22" y="22" width="5" height="5" fill="black" />
        <rect x="23" y="23" width="3" height="3" fill="white" />
        <rect x="24" y="24" width="1" height="1" fill="black" />

        {/* Data clusters */}
        <rect x="12" y="3" width="2" height="2" fill="black" />
        <rect x="15" y="2" width="1" height="3" fill="black" />
        <rect x="17" y="3" width="2" height="1" fill="black" />
        <rect x="20" y="2" width="2" height="2" fill="black" />

        <rect x="12" y="7" width="3" height="1" fill="black" />
        <rect x="16" y="6" width="2" height="3" fill="black" />
        <rect x="19" y="8" width="3" height="1" fill="black" />

        <rect x="2" y="12" width="3" height="2" fill="black" />
        <rect x="6" y="13" width="2" height="3" fill="black" />
        <rect x="4" y="16" width="3" height="2" fill="black" />
        <rect x="2" y="20" width="4" height="2" fill="black" />

        <rect x="12" y="12" width="2" height="3" fill="black" />
        <rect x="15" y="13" width="3" height="1" fill="black" />
        <rect x="19" y="12" width="1" height="3" fill="black" />
        <rect x="21" y="14" width="3" height="2" fill="black" />
        <rect x="26" y="12" width="2" height="2" fill="black" />
        <rect x="29" y="13" width="2" height="3" fill="black" />

        <rect x="13" y="17" width="2" height="2" fill="black" />
        <rect x="16" y="16" width="3" height="2" fill="black" />
        <rect x="20" y="18" width="2" height="3" fill="black" />
        <rect x="24" y="17" width="2" height="2" fill="black" />
        <rect x="27" y="16" width="4" height="1" fill="black" />

        <rect x="12" y="22" width="3" height="2" fill="black" />
        <rect x="16" y="21" width="2" height="4" fill="black" />
        <rect x="13" y="26" width="4" height="2" fill="black" />
        <rect x="18" y="27" width="2" height="3" fill="black" />

        <rect x="28" y="21" width="3" height="2" fill="black" />
        <rect x="29" y="25" width="2" height="2" fill="black" />
        <rect x="27" y="29" width="4" height="2" fill="black" />
        <rect x="23" y="29" width="3" height="2" fill="black" />
        <rect x="12" y="29" width="3" height="2" fill="black" />
      </svg>
    </div>
  );
};
