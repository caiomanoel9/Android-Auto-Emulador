import React, { useEffect, useState } from 'react';
import { CsMonogram } from './CarSpecialtiesLogo';

interface BootSplashScreenProps {
  onFinish?: () => void;
  durationMs?: number;
}

export const BootSplashScreen: React.FC<BootSplashScreenProps> = ({
  onFinish,
  durationMs = 2200
}) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Fade in
    const inTimer = setTimeout(() => setOpacity(1), 50);

    // Fade out
    const outTimer = setTimeout(() => setOpacity(0), durationMs - 400);

    // Done
    const finishTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, durationMs);

    return () => {
      clearTimeout(inTimer);
      clearTimeout(outTimer);
      clearTimeout(finishTimer);
    };
  }, [durationMs, onFinish]);

  return (
    <div
      onClick={onFinish}
      className="absolute inset-0 z-50 bg-black flex items-center justify-center cursor-pointer transition-opacity duration-500 ease-in-out select-none"
      style={{ opacity }}
      title="Clique para avançar"
    >
      <div className="flex flex-col items-center justify-center">
        <CsMonogram size={150} />
      </div>
    </div>
  );
};
