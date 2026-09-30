import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Wifi, Plus, Trash2, Globe, ArrowRight } from 'lucide-react';

export const NetworkListModal: React.FC = () => {
  const {
    networkAddresses,
    addNetworkAddress,
    removeNetworkAddress,
    connectNetworkAddress,
    setActiveModal
  } = useApp();

  const [newIp, setNewIp] = useState('');
  const [showAddInput, setShowAddInput] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIp.trim()) {
      addNetworkAddress(newIp.trim());
      setNewIp('');
      setShowAddInput(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#14161d] border border-neutral-800 rounded-3xl shadow-2xl p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white">
              <Wifi className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Endereços Headunit Server</h3>
              <p className="text-xs text-neutral-400">Endpoints Android Auto via Wi-Fi</p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Network IP List */}
        <div className="space-y-3 max-h-72 overflow-y-auto">
          {networkAddresses.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-600 flex items-center justify-between transition"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-neutral-100 text-sm">{item.label}</div>
                  <div className="text-xs font-mono text-neutral-400">
                    {item.ip}:{item.port}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    connectNetworkAddress(item);
                    setActiveModal(null);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-neutral-200 hover:bg-white text-black font-bold text-xs flex items-center gap-1 shadow-md transition"
                >
                  <span>Conectar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => removeNetworkAddress(item.id)}
                  className="p-2 rounded-xl hover:bg-neutral-800 text-neutral-500 hover:text-neutral-200 transition"
                  title="Remover endereço"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add new IP form */}
        {showAddInput ? (
          <form onSubmit={handleAdd} className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
            <div className="text-xs font-bold text-neutral-300">Adicionar IP do Smartphone</div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="ex: 192.168.43.1"
                value={newIp}
                onChange={(e) => setNewIp(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-black border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:border-neutral-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-neutral-200 hover:bg-white text-black font-bold text-xs transition"
              >
                Salvar
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowAddInput(true)}
            className="w-full py-2.5 rounded-2xl border border-dashed border-neutral-800 hover:border-neutral-600 text-neutral-400 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar IP Manualmente</span>
          </button>
        )}

        {/* Action Bottom Bar */}
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
