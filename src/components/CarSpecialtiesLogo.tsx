import React from 'react';

/**
 * CS Monogram (Page 1)
 * High-precision vector recreation of the geometric "CS" Car Specialties logo
 */
export const CsMonogram: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 140
}) => {
  return (
    <svg
      width={size}
      height={size * 0.625}
      viewBox="0 0 160 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Letter 'C' */}
      <path
        d="M66 18H14V82H66V62H36V38H66V18Z"
        fill="white"
      />

      {/* Letter 'S' */}
      <path
        d="M78 18H146V38H98V50H146V82H78V62H126V50H78V18Z"
        fill="white"
      />
    </svg>
  );
};

/**
 * Top-right brand header: Camera icon + carspecialties (Pages 2, 3, 4)
 */
export const CarSpecialtiesHeader: React.FC<{ className?: string }> = ({
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Instagram-style camera glyph */}
      <svg
        className="w-5 h-5 text-white flex-shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5.5" ry="5.5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.8" cy="6.2" r="1.1" fill="currentColor" stroke="none" />
      </svg>

      {/* Text carspecialties in bold italic sans-serif */}
      <span className="text-white font-extrabold italic text-sm sm:text-base tracking-tight font-sans">
        carspecialties
      </span>
    </div>
  );
};
