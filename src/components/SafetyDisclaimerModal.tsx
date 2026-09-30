import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert, Check } from 'lucide-react';

export const SafetyDisclaimerModal: React.FC = () => {
  const { updateSettings, setActiveModal } = useApp();

  const handleAccept = () => {
    updateSettings({ hasAcceptedDisclaimer: true });
    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-lg bg-[#14161d] border border-neutral-700 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-700 text-white flex items-center justify-center mx-auto shadow-xl">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-black text-white tracking-wide">Aviso de Segurança no Trânsito</h2>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Mantenha atenção total às condições da via enquanto dirige.
            Nunca interaja com a central multimídia de maneira que tire sua concentração da direção segura.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-black border border-neutral-800 text-left text-xs text-neutral-400 space-y-2">
          <div className="font-semibold text-neutral-200">Ao prosseguir, você concorda que:</div>
          <ul className="list-disc list-inside space-y-1">
            <li>Irá respeitar todas as leis de trânsito locais e do CTB.</li>
            <li>Assume total responsabilidade pela condução segura do veículo.</li>
            <li>Ajustará configurações apenas com o veículo devidamente parado.</li>
          </ul>
        </div>

        <button
          onClick={handleAccept}
          className="w-full py-3.5 rounded-2xl bg-neutral-200 hover:bg-white text-black font-black text-sm uppercase tracking-wider shadow-xl transition transform hover:scale-[1.01] flex items-center justify-center gap-2"
        >
          <Check className="w-5 h-5 stroke-[3]" />
          <span>Eu Aceito & Concordo</span>
        </button>
      </div>
    </div>
  );
};
