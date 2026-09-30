import React from 'react';
import { useApp } from '../context/AppContext';
import { CarSpecialtiesHeader } from './CarSpecialtiesLogo';
import { AndroidAutoArrow } from './AndroidAutoArrow';
import { DocumentSettingsGear } from './DocumentIcons';

export const HomeDashboard: React.FC = () => {
  const {
    standbyState,
    handleArrowAction,
    setActiveModal
  } = useApp();

  return (
    <div className="w-full h-full bg-black text-slate-100 flex flex-col justify-between p-6 sm:p-8 select-none relative overflow-hidden font-sans">
      {/* Top Header Bar: carspecialties brand on right */}
      <div className="w-full flex items-center justify-end z-20">
        <CarSpecialtiesHeader />
      </div>

      {/* Main Center Area: Left 3D Arrow + Right Instructions Card (Pages 2, 3, 4) */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-around px-2 sm:px-8 z-10 gap-8 my-auto">
        {/* Left: 3D Android Auto Arrow + Action Text */}
        <div
          onClick={handleArrowAction}
          className="flex flex-col items-center justify-center cursor-pointer group hover:scale-105 active:scale-95 transition-all duration-200"
          title={
            standbyState === 'awaiting'
              ? 'Conectar dispositivo Android'
              : standbyState === 'ready'
              ? 'Iniciar Projeção Android Auto'
              : 'Tentar reconectar'
          }
        >
          <div className="relative p-2">
            <AndroidAutoArrow
              size={132}
              glow={standbyState === 'ready'}
              className="transition-transform group-hover:-translate-y-1"
            />
          </div>

          {/* Action text matching PDF pages */}
          {standbyState === 'awaiting' && (
            <div className="text-center font-bold tracking-wider text-white text-base sm:text-lg uppercase leading-tight mt-4 group-hover:text-neutral-300 transition-colors">
              AGUARDANDO
              <br />
              CONEXÃO
            </div>
          )}

          {standbyState === 'ready' && (
            <div className="text-center font-bold tracking-wider text-white text-base sm:text-lg uppercase whitespace-nowrap mt-4 group-hover:text-neutral-300 transition-colors">
              INICIAR CONEXÃO
            </div>
          )}

          {standbyState === 'reconnecting' && (
            <div className="text-center font-bold tracking-normal text-white text-base sm:text-lg mt-4 flex items-center gap-2 group-hover:text-neutral-300 transition-colors">
              <span className="animate-pulse">Reconectando</span>
            </div>
          )}
        </div>

        {/* Right: Floating Instructions / Tip Card */}
        <div className="w-full max-w-[430px] bg-[#1f2126] border border-neutral-800/40 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-sm text-slate-100">
          {standbyState === 'awaiting' && (
            <div>
              <h2 className="text-white font-black text-base sm:text-lg tracking-wider uppercase mb-3">
                INSTRUÇÕES
              </h2>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                Nenhum dispositivo Android foi encontrado.
                <br />
                Por favor, conecte o dispositivo via USB assim
                <br />
                que for seguro.
              </p>
            </div>
          )}

          {standbyState === 'ready' && (
            <div>
              <h2 className="text-white font-black text-base sm:text-lg tracking-wider uppercase mb-3">
                DICA
              </h2>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                Você pode ativar a conexão automática na
                <br />
                guia de configurações.
              </p>
              <div className="mt-3.5 flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-200">
                <DocumentSettingsGear size={16} className="text-neutral-300 flex-shrink-0" />
                <span>&gt; Início automático ao conectar &gt; Sim</span>
              </div>
            </div>
          )}

          {standbyState === 'reconnecting' && (
            <div>
              <h2 className="text-white font-black text-base sm:text-lg tracking-wider uppercase mb-3">
                DICA
              </h2>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                A conexão foi interrompida inesperadamente.
                <br />
                Verifique se o dispositivo está corretamente
                <br />
                conectado e utilize cabos de boa qualidade.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Controls Bar: Settings Gear on Left */}
      <div className="w-full flex items-end justify-between z-20">
        {/* Bottom Left: Authentic Settings Gear Button */}
        <button
          onClick={() => setActiveModal('settings')}
          className="p-3 text-neutral-400 hover:text-white hover:bg-neutral-900/80 rounded-2xl transition-all group"
          title="Abrir Configurações da Central"
        >
          <DocumentSettingsGear
            size={36}
            className="group-hover:rotate-45 transition-transform duration-300 text-neutral-300 group-hover:text-white"
          />
        </button>
      </div>
    </div>
  );
};
