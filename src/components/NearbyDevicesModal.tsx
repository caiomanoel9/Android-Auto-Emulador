import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Radio, ArrowRight, Activity } from 'lucide-react';

export const NearbyDevicesModal: React.FC = () => {
  const { nearbyEndpoints, connectNearbyEndpoint, setActiveModal } = useApp();

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-[#14161d] border border-neutral-800 rounded-3xl shadow-2xl p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Dispositivos Próximos (Nearby)</h3>
              <p className="text-xs text-neutral-400">Buscando smartphones Android sem fio...</p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live scanner indicator */}
        <div className="flex items-center gap-3 p-3 bg-neutral-900 border border-neutral-800 rounded-2xl text-xs text-neutral-300">
          <Activity className="w-4 h-4 animate-spin text-white flex-shrink-0" />
          <span>Buscando canais Bluetooth e Wi-Fi Direct...</span>
        </div>

        {/* Nearby list */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {nearbyEndpoints.map((endpoint) => (
            <div
              key={endpoint.id}
              className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-600 flex items-center justify-between transition"
            >
              <div>
                <div className="font-bold text-neutral-100 text-sm">{endpoint.name}</div>
                <div className="text-xs text-neutral-400 font-mono">Sinal: {endpoint.rssi || -50} dBm</div>
              </div>

              <button
                onClick={() => {
                  connectNearbyEndpoint(endpoint);
                  setActiveModal(null);
                }}
                className="px-3.5 py-2 rounded-xl bg-neutral-200 hover:bg-white text-black font-bold text-xs flex items-center gap-1 shadow-md transition"
              >
                <span>Parear</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => setActiveModal(null)}
            className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold border border-neutral-800"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
