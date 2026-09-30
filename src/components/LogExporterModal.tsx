import React from 'react';
import { useApp } from '../context/AppContext';
import { X, FileText, Download, Trash2, Copy } from 'lucide-react';

export const LogExporterModal: React.FC = () => {
  const { logs, clearLogs, setActiveModal, showToast } = useApp();

  const handleCopy = () => {
    const formatted = logs.map((l) => `[${l.timestamp}] [${l.level}] [${l.tag}]: ${l.message}`).join('\n');
    navigator.clipboard.writeText(formatted);
    showToast('Logs copiados para a área de transferência', 'success');
  };

  const handleDownload = () => {
    const formatted = logs.map((l) => `[${l.timestamp}] [${l.level}] [${l.tag}]: ${l.message}`).join('\n');
    const blob = new Blob([formatted], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CS_Multimedia_Logs_${new Date().toISOString().slice(0, 10)}.log`;
    a.click();
    showToast('Arquivo de log exportado com sucesso', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-3xl bg-[#14161d] border border-neutral-800 rounded-3xl shadow-2xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Logs & Diagnósticos da Central</h3>
              <p className="text-xs text-neutral-400">Rastreamento de eventos de conexão e handshake</p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Log Viewer Canvas */}
        <div className="bg-black border border-neutral-800 rounded-2xl p-4 h-80 overflow-y-auto font-mono text-xs space-y-1.5 select-text">
          {logs.length === 0 ? (
            <div className="text-neutral-500 italic">Nenhum registro de log capturado.</div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="flex gap-2">
                <span className="text-neutral-500 font-semibold">[{log.timestamp}]</span>
                <span className="text-neutral-300 font-bold">[{log.level}]</span>
                <span className="text-neutral-400 font-semibold">[{log.tag}]:</span>
                <span className="text-neutral-200">{log.message}</span>
              </div>
            ))
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 font-semibold text-xs flex items-center gap-1.5 border border-neutral-700 transition"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copiar</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3.5 py-2 rounded-xl bg-neutral-200 hover:bg-white text-black font-semibold text-xs flex items-center gap-1.5 shadow-md transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Arquivo</span>
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={clearLogs}
              className="px-3.5 py-2 rounded-xl hover:bg-neutral-800 text-neutral-400 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition border border-neutral-800"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpar Logs</span>
            </button>

            <button
              onClick={() => setActiveModal(null)}
              className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold border border-neutral-800"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
