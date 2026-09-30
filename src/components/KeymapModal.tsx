import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Key, Save } from 'lucide-react';

export const KeymapModal: React.FC = () => {
  const { setActiveModal, showToast } = useApp();

  const [mappings] = useState([
    { action: 'Play / Pause Media', code: 85, label: 'KEYCODE_MEDIA_PLAY_PAUSE' },
    { action: 'Próxima Faixa', code: 87, label: 'KEYCODE_MEDIA_NEXT' },
    { action: 'Faixa Anterior', code: 88, label: 'KEYCODE_MEDIA_PREVIOUS' },
    { action: 'Google Assistente / Voz', code: 231, label: 'KEYCODE_VOICE_ASSIST' },
    { action: 'Mapa de Navegação', code: 209, label: 'KEYCODE_NAVIGATE' },
    { action: 'Atender Chamada', code: 5, label: 'KEYCODE_CALL' },
    { action: 'Tela Inicial OEM', code: 3, label: 'KEYCODE_HOME' },
  ]);

  const [isListening, setIsListening] = useState<number | null>(null);

  const startListening = (index: number) => {
    setIsListening(index);
    showToast('Pressione qualquer botão no volante ou teclado...', 'info');
    setTimeout(() => {
      setIsListening(null);
      showToast('Comando mapeado com sucesso!', 'success');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl bg-[#14161d] border border-neutral-800 rounded-3xl shadow-2xl p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Mapeamento de Teclas & Volante</h3>
              <p className="text-xs text-neutral-400">Atribua botões físicos da central ou volante</p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Keymap Table */}
        <div className="space-y-2.5 max-h-80 overflow-y-auto">
          {mappings.map((m, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-neutral-100 text-xs sm:text-sm">{m.action}</div>
                <div className="text-[11px] font-mono text-neutral-400">{m.label} ({m.code})</div>
              </div>

              <button
                onClick={() => startListening(idx)}
                className={`px-3.5 py-1.5 rounded-xl font-bold text-xs border transition ${
                  isListening === idx
                    ? 'bg-neutral-200 text-black border-white animate-pulse'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border-neutral-700'
                }`}
              >
                {isListening === idx ? 'Aguardando...' : 'Reconfigurar'}
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-2">
          <button
            onClick={() => showToast('Mapeamento salvo', 'success')}
            className="px-4 py-2.5 rounded-xl bg-neutral-200 hover:bg-white text-black font-bold text-xs flex items-center gap-1.5 shadow-md transition"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Teclas</span>
          </button>

          <button
            onClick={() => setActiveModal(null)}
            className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold border border-neutral-800"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
