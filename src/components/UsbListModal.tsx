import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Usb, RefreshCw, Smartphone, ArrowRight } from 'lucide-react';

export const UsbListModal: React.FC = () => {
  const { usbDevices, refreshUsbDevices, requestWebUsbDevice, connectUsbDevice, isScanning, setActiveModal } = useApp();

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#14161d] border border-neutral-800 rounded-3xl shadow-2xl p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white">
              <Usb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Dispositivos USB</h3>
              <p className="text-xs text-neutral-400">Selecione o smartphone Android conectado</p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* USB Devices List */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {usbDevices.map((device) => (
            <div
              key={device.id}
              className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-600 flex items-center justify-between transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-neutral-100 text-sm">{device.productName}</div>
                  <div className="text-xs text-neutral-400">
                    Vendor: <span className="font-mono text-neutral-300">0x{device.vendorId.toString(16)}</span> •
                    Product: <span className="font-mono text-neutral-300">0x{device.productId.toString(16)}</span>
                  </div>
                  {device.isInAccessoryMode && (
                    <span className="inline-block mt-1 text-[10px] bg-neutral-900 text-neutral-300 border border-neutral-700 px-1.5 py-0.5 rounded font-mono">
                      Accessory Mode Ready
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  connectUsbDevice(device);
                  setActiveModal(null);
                }}
                className="px-3.5 py-2 rounded-xl bg-neutral-200 hover:bg-white text-black font-bold text-xs flex items-center gap-1 shadow-md transition"
              >
                <span>Conectar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Action Bottom Bar */}
        <div className="pt-2 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={refreshUsbDevices}
              disabled={isScanning}
              className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 font-semibold text-xs flex items-center gap-2 border border-neutral-700 transition disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin text-white' : ''}`} />
              <span>Escanear USB</span>
            </button>

            <button
              onClick={async () => {
                await requestWebUsbDevice();
                setActiveModal(null);
              }}
              className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs flex items-center gap-1.5 border border-neutral-600 shadow-md transition"
              title="Detectar cabo USB conectado ao computador via navegador"
            >
              <Usb className="w-3.5 h-3.5" />
              <span>Parear Celular USB Real</span>
            </button>
          </div>

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
