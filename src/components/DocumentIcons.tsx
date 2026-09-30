import React from 'react';

/**
 * Android Auto / Material 8-tooth Settings Gear
 * Exact match to Pages 2, 3, 4 bottom-left and Page 5 floating controls
 */
export const DocumentSettingsGear: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 32, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.31-.07.63-.07.94s.02.63.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
);

/**
 * Android Auto Coolwalk Multi-Window Launcher Icon (Page 5 bottom-left)
 * A tall vertical pane on the left, and two stacked square panes on the right
 */
export const CoolwalkGridIcon: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 26, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    {/* Left tall pane */}
    <rect x="2.5" y="3" width="7" height="18" rx="2" />
    {/* Top-right pane */}
    <rect x="12.5" y="3" width="9" height="7.5" rx="2" />
    {/* Bottom-right pane */}
    <rect x="12.5" y="13.5" width="9" height="7.5" rx="2" />
  </svg>
);

/**
 * Google Assistant Microphone Icon (Page 5 bottom-left)
 */
export const AssistantMicIcon: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 24, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
    <path
      d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"
    />
  </svg>
);

/**
 * Google Maps App Icon (Monochrome Black & Gray)
 */
export const GoogleMapsAppIcon: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <div
    style={{ width: size, height: size }}
    className="rounded-full bg-[#242730] border border-neutral-600/60 shadow-lg flex items-center justify-center relative overflow-hidden flex-shrink-0"
    title="Google Maps"
  >
    <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 48 48" fill="none">
      <path
        d="M24 4C15.16 4 8 11.16 8 20C8 30.5 22.1 43.1 22.7 43.7C23.1 44.1 23.5 44.3 24 44.3C24.5 44.3 24.9 44.1 25.3 43.7C25.9 43.1 40 30.5 40 20C40 11.16 32.84 4 24 4Z"
        fill="#E2E8F0"
      />
      <path
        d="M24 12C19.58 12 16 15.58 16 20C16 24.42 19.58 28 24 28C28.42 28 32 24.42 32 20C32 15.58 28.42 12 24 12Z"
        fill="#242730"
      />
      <circle cx="24" cy="20" r="4.5" fill="#94A3B8" />
      <path d="M24 4C18 4 13 8 10 13L24 20L38 13C35 8 30 4 24 4Z" fill="#CBD5E1" opacity="0.6" />
      <path d="M40 20C40 28 28 39 24 43V20L40 20Z" fill="#64748B" opacity="0.6" />
    </svg>
  </div>
);

/**
 * Spotify App Icon (Monochrome Black & Gray)
 */
export const SpotifyAppIcon: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <div
    style={{ width: size, height: size }}
    className="rounded-full bg-[#242730] border border-neutral-600/60 shadow-lg flex items-center justify-center flex-shrink-0"
    title="Spotify"
  >
    <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 24 24" fill="#E2E8F0">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.434-5.308-1.758-8.793-.963-.335.077-.67-.133-.746-.468-.077-.334.132-.67.467-.746 3.808-.87 7.076-.51 9.722 1.113.294.18.386.563.207.857zm1.225-2.723c-.226.367-.707.483-1.074.257-2.69-1.654-6.79-2.133-9.97-1.168-.413.125-.85-.11-.975-.523-.125-.413.11-.85.523-.975 3.633-1.102 8.147-.568 11.24 1.335.367.226.482.707.256 1.074zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71c-.494.15-1.018-.128-1.168-.622-.15-.494.128-1.018.622-1.168 3.532-1.072 9.404-.866 13.115 1.337.445.264.59.838.327 1.282-.264.444-.838.59-1.28.327z" />
    </svg>
  </div>
);

/**
 * Phone App Icon (Monochrome Black & Gray)
 */
export const PhoneCallAppIcon: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <div
    style={{ width: size, height: size }}
    className="rounded-full bg-[#242730] border border-neutral-600/60 shadow-lg flex items-center justify-center flex-shrink-0 text-white"
    title="Telefone"
  >
    <svg width={size * 0.52} height={size * 0.52} viewBox="0 0 24 24" fill="#E2E8F0">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  </div>
);

/**
 * Steering Wheel / OEM Car System App Icon (Page 5 Dock - Icon 4)
 * Authentic OEM launcher icon returning to the car's native multimedia
 */
export const SteeringWheelAppIcon: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <div
    style={{ width: size, height: size }}
    className="rounded-full bg-[#242730] border border-neutral-600/60 shadow-lg flex items-center justify-center flex-shrink-0 text-white"
    title="Retornar à central multimídia"
  >
    <svg
      width={size * 0.62}
      height={size * 0.62}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#E2E8F0"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Outer steering wheel ring */}
      <circle cx="12" cy="12" r="9.5" strokeWidth="1.9" />
      {/* Center horn pad */}
      <circle cx="12" cy="12" r="2.8" fill="#E2E8F0" stroke="none" />
      {/* 3 spokes */}
      <line x1="12" y1="14.8" x2="12" y2="21.5" strokeWidth="2" />
      <line x1="9.3" y1="12.8" x2="3.2" y2="14.2" strokeWidth="2" />
      <line x1="14.7" y1="12.8" x2="20.8" y2="14.2" strokeWidth="2" />
    </svg>
  </div>
);

/**
 * Cellular Signal Staircase Bars (Monochrome Black & Gray)
 */
export const CellularSignalIcon: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 16, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <rect x="2" y="17" width="3.5" height="5" rx="0.5" />
    <rect x="7.5" y="13" width="3.5" height="9" rx="0.5" />
    <rect x="13" y="8.5" width="3.5" height="13.5" rx="0.5" />
    <rect x="18.5" y="3" width="3.5" height="19" rx="0.5" />
  </svg>
);

/**
 * Battery Status Icon (Monochrome Black & Gray)
 */
export const BatteryIndicatorIcon: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size * 0.55}
    viewBox="0 0 24 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="0.75" y="0.75" width="19.5" height="11.5" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="3" y="3" width="13" height="7" rx="1" fill="currentColor" />
    <path d="M22 4.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

/**
 * Route Alternative Split / Fork Icon (Monochrome Black & Gray)
 */
export const RouteSplitIcon: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 21V12" />
    <path d="M12 12C12 9 7 8 7 5" />
    <path d="M12 12C12 9 17 8 17 5" />
    <polyline points="4 7 7 4 10 7" />
    <polyline points="14 7 17 4 20 7" />
  </svg>
);

/**
 * Waypoint / Add Stop Pin (Monochrome Black & Gray)
 */
export const AddWaypointPinIcon: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7z" />
    <circle cx="12" cy="9" r="2.5" fill="currentColor" />
  </svg>
);

/**
 * Mute / Speaker With Diagonal Slash
 */
export const MapMuteIcon: React.FC<{
  muted?: boolean;
  size?: number;
  className?: string;
}> = ({ muted = false, size = 20, className = '' }) => {
  if (!muted) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
      >
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
    </svg>
  );
};

/**
 * Compass Needle Button (Monochrome Silver & Dark Slate)
 */
export const CompassNeedleIcon: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 22, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Silver/White North needle */}
    <polygon points="12,3 9,12 12,10" fill="#F1F5F9" />
    <polygon points="12,3 15,12 12,10" fill="#CBD5E1" />
    {/* Dark Gray South needle */}
    <polygon points="12,21 9,12 12,14" fill="#475569" />
    <polygon points="12,21 15,12 12,14" fill="#334155" />
    <circle cx="12" cy="12" r="1.5" fill="#FFFFFF" />
  </svg>
);
