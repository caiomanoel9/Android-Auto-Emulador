import React from 'react';
import { useApp } from '../context/AppContext';
import { X, BookOpen, Smartphone, Usb, Wifi, ExternalLink } from 'lucide-react';

export const InstructionsModal: React.FC = () => {
  const { setActiveModal, startSelfMode, showToast } = useApp();

  const handleCopyContact = () => {
    navigator.clipboard.writeText('8291232244');
    showToast('WhatsApp (82) 9123-2244 copiado!', 'success');
  };

  const handleOpenSite = () => {
    window.open('https://carspecialties.mercadoshops.com.br', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none font-sans">
      <div className="w-full max-w-2xl bg-[#14161d] border border-neutral-800 rounded-3xl shadow-2xl p-6 space-y-6 text-neutral-100 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white uppercase tracking-wide">
                Instruções de Projeção CarSpecialties
              </h3>
              <p className="text-xs text-neutral-400 font-mono">
                Otimizado para Central Multimídia Android 4.1+ • Tela 1200×720
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 rounded-xl hover:bg-neutral-800 text-neutral-400 hover:text-white transition active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Instructions Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Self Mode */}
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 text-white flex items-center justify-center mb-2">
                <Smartphone className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">1. Self Mode (Direto)</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Rode o Android Auto diretamente na tela de 1200×720 desta central multimídia, sem necessidade de cabo ou outro aparelho.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveModal(null);
                startSelfMode();
              }}
              className="w-full mt-3 py-2 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-white font-bold text-xs transition active:scale-95 shadow-md flex items-center justify-center gap-1.5"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Iniciar Self Mode</span>
            </button>
          </div>

          {/* 2. USB OTG */}
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 text-white flex items-center justify-center mb-2">
                <Usb className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">2. Cabo USB (OTG)</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Conecte o smartphone à porta USB OTG da central. O aplicativo detectará o aparelho e iniciará a projeção com baixa latência.
              </p>
            </div>
            <button
              onClick={() => setActiveModal('usb_list')}
              className="w-full mt-3 py-2 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-white font-bold text-xs transition active:scale-95 shadow-md flex items-center justify-center gap-1.5"
            >
              <Usb className="w-3.5 h-3.5" />
              <span>Ver Dispositivos USB</span>
            </button>
          </div>

          {/* 3. Wi-Fi Sem Fio */}
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 text-white flex items-center justify-center mb-2">
                <Wifi className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">3. Wi-Fi (Sem Fio)</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Ative o Hotspot Wi-Fi no celular e inicie o Headunit Server no app do Android Auto em Configurações do Desenvolvedor.
              </p>
            </div>
            <button
              onClick={() => setActiveModal('network_list')}
              className="w-full mt-3 py-2 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-white font-bold text-xs transition active:scale-95 shadow-md flex items-center justify-center gap-1.5"
            >
              <Wifi className="w-3.5 h-3.5" />
              <span>Conexão Wi-Fi / IP</span>
            </button>
          </div>
        </div>

        {/* Support & Version Box */}
        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="font-extrabold text-sm text-white flex items-center justify-center sm:justify-start gap-2">
              <span>Suporte CarSpecialties</span>
              <span className="px-2 py-0.5 rounded bg-white text-black font-mono text-[10px] font-extrabold">
                Versão 7.2.3
              </span>
            </div>
            <div className="text-xs text-neutral-400 mt-0.5">
              WhatsApp: <span className="text-white font-bold">(82) 9123-2244</span> • Atualização 25/09/2024
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyContact}
              className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs transition active:scale-95 border border-neutral-700"
            >
              Copiar WhatsApp
            </button>
            <button
              onClick={handleOpenSite}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-extrabold text-xs transition active:scale-95 flex items-center gap-1"
            >
              <span>Loja Oficial</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setActiveModal(null)}
          className="w-full py-3 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-bold text-sm tracking-wide transition active:scale-95 border border-neutral-800"
        >
          FECHAR INSTRUÇÕES
        </button>
      </div>
    </div>
  );
};
