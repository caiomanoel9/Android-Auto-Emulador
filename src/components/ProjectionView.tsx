import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Plus,
  Minus,
  X,
  Search,
  Play,
  Pause
} from 'lucide-react';
import {
  DocumentSettingsGear,
  CoolwalkGridIcon,
  AssistantMicIcon,
  GoogleMapsAppIcon,
  SpotifyAppIcon,
  PhoneCallAppIcon,
  SteeringWheelAppIcon,
  CellularSignalIcon,
  BatteryIndicatorIcon,
  RouteSplitIcon,
  AddWaypointPinIcon,
  MapMuteIcon,
  CompassNeedleIcon
} from './DocumentIcons';

/* =========================================================================
   Hardware Acceleration CSS & Compositing Helpers
   ========================================================================= */
const gpuStyle: React.CSSProperties = {
  transform: 'translate3d(0, 0, 0)',
  WebkitTransform: 'translate3d(0, 0, 0)',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
  willChange: 'transform',
};

export const ProjectionView: React.FC = () => {
  const {
    disconnect,
    setActiveModal,
    showToast
  } = useApp();

  // Navigation and UI states
  const [isMuted, setIsMuted] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mapPan, setMapPan] = useState({ x: 0, y: 0 });
  const [showCoolwalkSplit, setShowCoolwalkSplit] = useState(false);
  const [showAssistantWave, setShowAssistantWave] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTrack] = useState({
    title: 'Starboy',
    artist: 'The Weeknd, Daft Punk'
  });

  // Re-center map handler
  const handleRecenter = () => {
    setMapPan({ x: 0, y: 0 });
    setZoomLevel(1);
    showToast('Navegação centralizada', 'info');
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 1.8));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.6));
  };

  const toggleAssistant = () => {
    setShowAssistantWave((prev) => !prev);
    if (!showAssistantWave) {
      showToast('Ouvindo comando de voz...', 'info');
    }
  };

  return (
    <div className="w-full h-full bg-black text-neutral-100 flex flex-col justify-between select-none relative overflow-hidden font-sans">
      {/* =====================================================================
          MAIN MAP PROJECTION VIEWPORT (Monochrome Black & Gray Theme)
          ===================================================================== */}
      <div className="flex-1 relative w-full overflow-hidden bg-[#0e1015]">
        {/* 3D Monochrome Perspective Road Canvas */}
        <div
          style={{
            ...gpuStyle,
            transform: `scale(${zoomLevel}) translate(${mapPan.x}px, ${mapPan.y}px)`,
            transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Detailed SVG 3D Navigation Map in Black & Gray */}
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 650"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/* Highway flyover drop shadow */}
              <filter id="shadow3d" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="3" dy="6" stdDeviation="5" floodColor="#000000" floodOpacity="0.8" />
              </filter>
            </defs>

            {/* Dark Landscape Grid Lines */}
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#181b22" strokeWidth="1" />
            </pattern>
            <rect width="1200" height="650" fill="#0f1117" />
            <rect width="1200" height="650" fill="url(#grid)" opacity="0.5" />

            {/* Secondary Streets & Roads */}
            {/* Street: C. Palencia & C. Vitoria */}
            <path d="M 50 250 L 350 180" stroke="#1f232c" strokeWidth="10" strokeLinecap="round" />
            <text x="180" y="215" fill="#64748b" fontSize="13" transform="rotate(-13, 180, 215)" fontFamily="sans-serif">
              C. Palencia
            </text>
            <text x="170" y="240" fill="#64748b" fontSize="13" transform="rotate(-13, 170, 240)" fontFamily="sans-serif">
              C. Vitoria
            </text>

            {/* Street: C. Pablo Picasso & C. Carmona */}
            <path d="M 120 380 L 480 270" stroke="#1f232c" strokeWidth="12" strokeLinecap="round" />
            <text x="260" y="325" fill="#64748b" fontSize="13" transform="rotate(-17, 260, 325)" fontFamily="sans-serif">
              C. Pablo Picasso
            </text>
            <text x="250" y="350" fill="#64748b" fontSize="13" transform="rotate(-17, 250, 350)" fontFamily="sans-serif">
              C. Carmona
            </text>

            {/* Street: C. Turina */}
            <path d="M 420 230 L 620 160" stroke="#1f232c" strokeWidth="10" strokeLinecap="round" />
            <text x="490" y="195" fill="#64748b" fontSize="13" transform="rotate(-19, 490, 195)" fontFamily="sans-serif">
              C. Turina
            </text>

            {/* Diagonal Road: Cam. de Roquetas */}
            <path d="M 380 480 L 1050 220" stroke="#262b36" strokeWidth="16" strokeLinecap="round" />
            <text x="520" y="435" fill="#717a8f" fontSize="14" fontWeight="600" transform="rotate(-21, 520, 435)" fontFamily="sans-serif">
              Cam. de Roquetas
            </text>
            <text x="800" y="325" fill="#717a8f" fontSize="14" fontWeight="600" transform="rotate(-21, 800, 325)" fontFamily="sans-serif">
              Cam. de Roquetas
            </text>

            {/* Elevated Highway Junction: Carr. de Cadiz (Curve and Flyover) */}
            <path
              d="M 830 650 C 820 480, 800 320, 720 180 C 700 140, 680 80, 670 0"
              stroke="#262b36"
              strokeWidth="38"
              fill="none"
              filter="url(#shadow3d)"
            />

            {/* Highway Route: The Active Monochrome Platinum Track on E-15 / A-7 */}
            <path
              d="M 720 650 C 715 500, 705 380, 715 280 C 720 230, 730 180, 770 120 C 800 80, 840 40, 890 0"
              stroke="#334155"
              strokeWidth="24"
              fill="none"
              strokeLinecap="round"
            />
            {/* Glowing inner platinum/silver core */}
            <path
              d="M 720 650 C 715 500, 705 380, 715 280 C 720 230, 730 180, 770 120 C 800 80, 840 40, 890 0"
              stroke="#e2e8f0"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
            />

            {/* Route Arrows (Crisp white) */}
            <polygon points="718,480 710,500 726,500" fill="#ffffff" opacity="0.9" />
            <polygon points="716,360 708,380 724,380" fill="#ffffff" opacity="0.9" />
            <polygon points="735,210 725,228 741,228" fill="#ffffff" opacity="0.9" transform="rotate(25, 735, 210)" />

            {/* Overpass Bridge Label: Carr. de Cadiz */}
            <text
              x="815"
              y="280"
              fill="#94a3b8"
              fontSize="14"
              fontWeight="bold"
              transform="rotate(-82, 815, 280)"
              fontFamily="sans-serif"
            >
              Carr. de Cadiz
            </text>

            {/* Monochrome Highway Shield: A-7 */}
            <g transform="translate(685, 355)">
              <rect x="0" y="0" width="36" height="20" rx="4" fill="#1e222b" stroke="#94a3b8" strokeWidth="1.5" />
              <text x="18" y="14" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                A-7
              </text>
            </g>

            {/* Monochrome Highway Shield: E-15 */}
            <g transform="translate(680, 620)">
              <rect x="0" y="0" width="42" height="22" rx="4" fill="#1e222b" stroke="#e2e8f0" strokeWidth="1.5" />
              <text x="21" y="16" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                E-15
              </text>
            </g>

            {/* Overhead Highway Sign Gantries (Monochrome Graphite & Slate) */}
            {/* Gantry 1: N-340a | AL-9024 */}
            <g transform="translate(565, 50)">
              <rect x="0" y="0" width="46" height="18" rx="3" fill="#2d323f" stroke="#94a3b8" strokeWidth="1" />
              <text x="23" y="13" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                N-340a
              </text>
              <rect x="0" y="20" width="46" height="18" rx="3" fill="#1e222b" stroke="#cbd5e1" strokeWidth="1" />
              <text x="23" y="33" fill="#f8fafc" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                AL-9024
              </text>
            </g>

            {/* Gantry 2: AL-9024 */}
            <g transform="translate(710, 20)">
              <rect x="0" y="0" width="48" height="18" rx="3" fill="#1e222b" stroke="#cbd5e1" strokeWidth="1" />
              <text x="24" y="13" fill="#f8fafc" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                AL-9024
              </text>
            </g>

            {/* Vehicle Navigation Marker (Monochrome Silver & Slate) */}
            <g transform="translate(718, 580)">
              <circle cx="0" cy="0" r="28" fill="#ffffff" opacity="0.15" />
              <circle cx="0" cy="0" r="16" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
              <polygon points="0,-14 -10,10 0,6 10,10" fill="#ffffff" />
            </g>
          </svg>
        </div>

        {/* =====================================================================
            TOP-LEFT MANEUVER BANNER (Monochrome Black & Gray)
            ===================================================================== */}
        <div className="absolute top-4 left-4 z-20 flex items-start gap-3">
          {/* Vertical Floating Control Buttons (Left edge of banner) */}
          <div className="flex flex-col gap-2.5">
            {/* Settings button with 8-tooth gear */}
            <button
              onClick={() => setActiveModal('settings')}
              className="w-11 h-11 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 text-white flex items-center justify-center shadow-lg transition"
              title="Configurações"
            >
              <DocumentSettingsGear size={22} className="text-white" />
            </button>

            {/* Mute button */}
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                showToast(isMuted ? 'Áudio da navegação ativado' : 'Áudio mutado', 'info');
              }}
              className="w-11 h-11 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 text-white flex items-center justify-center shadow-lg transition"
              title="Alternar Áudio da Navegação"
            >
              <MapMuteIcon muted={isMuted} size={20} className={isMuted ? 'text-neutral-400' : 'text-white'} />
            </button>

            {/* Compass needle button */}
            <button
              onClick={() => showToast('Orientação: Norte acima', 'info')}
              className="w-11 h-11 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 flex items-center justify-center shadow-lg transition"
              title="Bússola / Norte"
            >
              <CompassNeedleIcon size={22} />
            </button>

            {/* Zoom controls stacked pill */}
            <div className="bg-neutral-900/90 border border-neutral-700/80 rounded-2xl flex flex-col shadow-lg overflow-hidden">
              <button
                onClick={handleZoomIn}
                className="w-11 h-10 hover:bg-neutral-800 text-white flex items-center justify-center border-b border-neutral-700/60 transition"
                title="Aproximar Zoom (+)"
              >
                <Plus className="w-5 h-5" />
              </button>
              <button
                onClick={handleZoomOut}
                className="w-11 h-10 hover:bg-neutral-800 text-white flex items-center justify-center transition"
                title="Afastar Zoom (-)"
              >
                <Minus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Monochrome Maneuver Banner */}
          <div className="bg-[#1a1d24] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-neutral-700/80 flex flex-col gap-1 min-w-[240px]">
            {/* Row 1: Stay on [ E-15 ] */}
            <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
              <span>Stay on</span>
              <div className="px-2 py-0.5 rounded bg-neutral-800 border-2 border-neutral-200 text-white font-black text-sm tracking-wide">
                E-15
              </div>
            </div>

            {/* Row 2: 18 km to [ 800 ↗ ] */}
            <div className="flex items-center gap-2 text-base font-medium text-neutral-300">
              <span>18 km to</span>
              <div className="px-2 py-0.5 rounded bg-neutral-800 border-2 border-neutral-200 text-white font-black text-xs flex items-center gap-1">
                <span>800</span>
                <span className="text-sm font-bold">↗</span>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================================
            BOTTOM-LEFT ROUTE INFO CARD (Monochrome Black & Gray)
            ===================================================================== */}
        <div className="absolute bottom-5 left-4 z-20">
          <div className="bg-[#14171d]/95 border border-neutral-800/90 text-white rounded-3xl p-4 sm:p-5 shadow-2xl backdrop-blur-md min-w-[280px]">
            {/* Estimated time in high-contrast white */}
            <div className="text-2xl sm:text-3xl font-black text-white leading-none mb-1">
              18 min
            </div>

            {/* Distance and ETA clock */}
            <div className="text-sm font-semibold text-neutral-300 mb-4">
              22 km · 8:59 PM
            </div>

            {/* Action buttons row: Cancel, Alternate route, Search along route, Add stop */}
            <div className="flex items-center justify-between pt-2 border-t border-neutral-800 text-neutral-300">
              <button
                onClick={() => showToast('Rota cancelada', 'info')}
                className="p-2 hover:text-white hover:bg-neutral-800/80 rounded-xl transition"
                title="Cancelar rota"
              >
                <X className="w-5 h-5" />
              </button>

              <button
                onClick={() => showToast('Calculando rotas alternativas...', 'info')}
                className="p-2 hover:text-white hover:bg-neutral-800/80 rounded-xl transition"
                title="Rotas alternativas"
              >
                <RouteSplitIcon size={19} />
              </button>

              <button
                onClick={() => showToast('Pesquisar no trajeto', 'info')}
                className="p-2 hover:text-white hover:bg-neutral-800/80 rounded-xl transition"
                title="Pesquisar no trajeto"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => showToast('Adicionar parada intermediária', 'info')}
                className="p-2 hover:text-white hover:bg-neutral-800/80 rounded-xl transition"
                title="Adicionar parada"
              >
                <AddWaypointPinIcon size={19} />
              </button>
            </div>
          </div>
        </div>

        {/* =====================================================================
            CENTER-BOTTOM "▲ Re-center" FLOATING BUTTON (Monochrome Black & Gray)
            ===================================================================== */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20">
          <button
            onClick={handleRecenter}
            className="px-5 py-2.5 rounded-full bg-[#181a20]/95 hover:bg-[#242730] border border-neutral-700 text-neutral-100 shadow-2xl backdrop-blur-md flex items-center gap-2 font-bold text-sm tracking-wide transition active:scale-95"
          >
            <span className="text-white text-xs">▲</span>
            <span>Re-center</span>
          </button>
        </div>

        {/* =====================================================================
            BOTTOM-RIGHT SPEED LIMIT SIGN & GOOGLE WATERMARK (Monochrome)
            ===================================================================== */}
        <div className="absolute bottom-5 right-5 z-20 flex flex-col items-center gap-1 select-none pointer-events-none">
          {/* Monochrome 120 km/h speed limit sign */}
          <div className="w-14 h-14 rounded-full bg-white border-[5px] border-neutral-900 shadow-2xl flex items-center justify-center">
            <span className="text-black font-black text-xl tracking-tight leading-none">
              120
            </span>
          </div>

          {/* Google watermark */}
          <span className="text-neutral-500 font-semibold text-xs tracking-wider opacity-80 mt-1">
            Google
          </span>
        </div>

        {/* Coolwalk Split View Widget (Monochrome) */}
        {showCoolwalkSplit && (
          <div className="absolute top-4 right-4 z-30 w-80 bg-[#14171d]/95 border border-neutral-800 rounded-3xl p-4 shadow-2xl backdrop-blur-xl animate-fade-in flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Android Auto Coolwalk
              </span>
              <button
                onClick={() => setShowCoolwalkSplit(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Spotify mini-player widget */}
            <div className="bg-neutral-900/90 rounded-2xl p-3 border border-neutral-800 flex items-center gap-3">
              <SpotifyAppIcon size={36} />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-white truncate">{currentTrack.title}</div>
                <div className="text-[10px] text-neutral-400 truncate">{currentTrack.artist}</div>
              </div>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              </button>
            </div>
          </div>
        )}

        {/* Voice Assistant Waveform Overlay (Monochrome) */}
        {showAssistantWave && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 bg-black/85 backdrop-blur-xl border border-neutral-800 rounded-3xl px-8 py-6 shadow-2xl flex flex-col items-center gap-4 animate-scale-in">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-10 bg-neutral-400 rounded-full animate-pulse" />
              <div className="w-3.5 h-14 bg-white rounded-full animate-pulse delay-75" />
              <div className="w-3.5 h-8 bg-neutral-300 rounded-full animate-pulse delay-150" />
              <div className="w-3.5 h-12 bg-neutral-500 rounded-full animate-pulse delay-100" />
            </div>
            <div className="text-sm font-semibold text-white">Como posso ajudar?</div>
            <button
              onClick={() => setShowAssistantWave(false)}
              className="text-xs text-neutral-400 hover:text-white px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>

      {/* =====================================================================
          AUTHENTIC ANDROID AUTO TASKBAR / DOCK (Monochrome Black & Gray)
          ===================================================================== */}
      <footer className="w-full h-16 sm:h-[68px] bg-black border-t border-neutral-800/80 px-4 sm:px-6 flex items-center justify-between z-30 flex-shrink-0">
        {/* Left Section: Coolwalk Grid Launcher + Assistant Microphone */}
        <div className="flex items-center gap-3">
          {/* Coolwalk Dashboard grid icon */}
          <button
            onClick={() => setShowCoolwalkSplit(!showCoolwalkSplit)}
            className={`p-2.5 rounded-2xl transition ${
              showCoolwalkSplit
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
            }`}
            title="Alternar visualização dividida Coolwalk"
          >
            <CoolwalkGridIcon size={24} className="text-white" />
          </button>

          {/* Google Assistant Microphone */}
          <button
            onClick={toggleAssistant}
            className="p-2.5 text-neutral-300 hover:text-white hover:bg-neutral-900 rounded-2xl transition"
            title="Google Assistente"
          >
            <AssistantMicIcon size={24} className="text-white" />
          </button>
        </div>

        {/* Center Section: 4 Monochrome App Icons */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* 1. Google Maps App */}
          <button
            onClick={() => {
              setShowCoolwalkSplit(false);
              showToast('Google Maps ativo na tela', 'info');
            }}
            className="hover:scale-110 active:scale-95 transition-transform"
            title="Google Maps"
          >
            <GoogleMapsAppIcon size={42} />
          </button>

          {/* 2. Spotify App */}
          <button
            onClick={() => {
              setShowCoolwalkSplit(true);
              showToast('Spotify aberto no Coolwalk', 'info');
            }}
            className="hover:scale-110 active:scale-95 transition-transform"
            title="Spotify"
          >
            <SpotifyAppIcon size={42} />
          </button>

          {/* 3. Phone App */}
          <button
            onClick={() => showToast('Discador telefônico Android Auto', 'info')}
            className="hover:scale-110 active:scale-95 transition-transform"
            title="Telefone / Contatos"
          >
            <PhoneCallAppIcon size={42} />
          </button>

          {/* 4. Car / OEM App (Steering Wheel) - Return to Standby */}
          <button
            onClick={() => {
              disconnect();
            }}
            className="hover:scale-110 active:scale-95 transition-transform"
            title="Sair da Projeção e Retornar ao Painel (OEM Car)"
          >
            <SteeringWheelAppIcon size={42} />
          </button>
        </div>

        {/* Right Section: Notification pill, 5G, Cellular, Battery, Clock */}
        <div className="flex items-center gap-3 sm:gap-4 text-white">
          {/* Notification badge with number 2 */}
          <button
            onClick={() => showToast('2 notificações: WhatsApp e Atualização de tráfego', 'info')}
            className="w-8 h-8 rounded-full bg-white text-black font-black text-sm flex items-center justify-center shadow hover:scale-105 transition"
            title="Notificações (2 novas)"
          >
            2
          </button>

          {/* Cellular Network & Signal */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-bold text-[11px] tracking-tight">5G</span>
            <CellularSignalIcon size={14} className="text-white" />
          </div>

          {/* Battery Status */}
          <BatteryIndicatorIcon size={22} className="text-white" />

          {/* Clock matching Page 5 (8:41) */}
          <div className="text-sm font-bold tracking-tight text-white pl-1">
            8:41
          </div>
        </div>
      </footer>
    </div>
  );
};
