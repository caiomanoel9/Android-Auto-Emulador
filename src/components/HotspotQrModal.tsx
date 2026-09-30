import React from 'react';
import { useApp } from '../context/AppContext';
import { X, QrCode, Share2 } from 'lucide-react';

export const HotspotQrModal: React.FC = () => {
  const { setActiveModal, showToast } = useApp();

  const hotspotSsid = 'CS_Multimedia_5G';
  const hotspotPass = 'carspecialties2026';

  const copyCredentials = () => {
    navigator.clipboard.writeText(`SSID: ${hotspotSsid}, Password: ${hotspotPass}`);
    showToast('Credenciais do Hotspot copiadas', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-[#14161d] border border-neutral-800 rounded-3xl shadow-2xl p-6 space-y-5 text-center">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-white" />
            <h3 className="text-base font-bold text-white">Conexão Wi-Fi Wireless</h3>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* QR Code Graphic representation in pure black and white */}
        <div className="p-4 bg-white rounded-3xl w-52 h-52 mx-auto flex items-center justify-center shadow-xl border-4 border-neutral-700">
          <div className="w-full h-full border-4 border-black p-2 grid grid-cols-6 gap-1 bg-black">
            {Array.from({ length: 36 }).map((_, i) => (
              <div
                key={i}
                className={`${
                  (i * 7 + 3) % 4 === 0 ? 'bg-black' : (i % 2 === 0 ? 'bg-white' : 'bg-neutral-800')
                } rounded-sm`}
              />
            ))}
          </div>
        </div>

        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 text-left space-y-2 font-mono text-xs">
          <div className="flex justify-between">
            <span className="text-neutral-400">Rede Wi-Fi (SSID):</span>
            <span className="text-white font-bold">{hotspotSsid}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Senha:</span>
            <span className="text-white font-bold">{hotspotPass}</span>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={copyCredentials}
            className="flex-1 py-2.5 rounded-xl bg-neutral-200 hover:bg-white text-black font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
          >
            <Share2 className="w-4 h-4" />
            <span>Copiar Credenciais</span>
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
