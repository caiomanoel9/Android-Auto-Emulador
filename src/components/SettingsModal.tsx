import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Tv,
  Volume2,
  Wifi,
  Key,
  Sliders,
  RotateCcw,
  ChevronRight,
  FileText
} from 'lucide-react';
import { RESOLUTION_PRESETS } from '../types';

export const SettingsModal: React.FC = () => {
  const {
    settings,
    updateSettings,
    resetSettings,
    setActiveModal,
    showToast,
    simulateUnexpectedDrop,
    logs
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'android_auto' | 'swc' | 'audio' | 'wireless' | 'logs'
  >('android_auto');

  // SWC Key Learning State
  const [learningActionId, setLearningActionId] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (learningActionId) {
        e.preventDefault();
        const detectedCode = e.keyCode || e.which;
        const detectedKey = e.code || e.key;

        const updatedBindings = (settings.swcBindings || []).map((b) => {
          if (b.actionId === learningActionId) {
            return {
              ...b,
              androidKeyCode: detectedCode,
              keyLabel: `${detectedKey} (KeyCode ${detectedCode})`,
              source: 'keyboard' as const,
            };
          }
          return b;
        });

        updateSettings({ swcBindings: updatedBindings });
        showToast(`Comando mapeado para: ${detectedKey}`, 'success');
        setLearningActionId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [learningActionId, settings.swcBindings, updateSettings, showToast]);

  const tabs = [
    { id: 'android_auto', label: 'Android Auto & Vídeo', icon: Tv },
    { id: 'swc', label: 'Comandos do Volante (SWC)', icon: Key },
    { id: 'audio', label: 'Áudio & Microfone', icon: Volume2 },
    { id: 'wireless', label: 'Conexão Sem Fio & USB', icon: Wifi },
    { id: 'logs', label: 'Logs & Diagnóstico', icon: FileText },
  ];

  const applyVideoQualityPreset = (
    quality: 'light_720p30' | 'medium_1080p30' | 'max_1080p60'
  ) => {
    if (quality === 'light_720p30') {
      updateSettings({
        androidAutoVideoQuality: 'light_720p30',
        resolutionId: 3,
        fpsLimit: 30,
        videoCodec: 'H264',
        forceSoftwareDecoding: true,
      });
    } else if (quality === 'medium_1080p30') {
      updateSettings({
        androidAutoVideoQuality: 'medium_1080p30',
        resolutionId: 4,
        fpsLimit: 30,
        videoCodec: 'H264',
        forceSoftwareDecoding: false,
      });
    } else {
      updateSettings({
        androidAutoVideoQuality: 'max_1080p60',
        resolutionId: 4,
        fpsLimit: 60,
        videoCodec: 'H265',
        forceSoftwareDecoding: false,
      });
    }
  };

  const applySwcPreset = (presetType: 'resistive' | 'multimedia') => {
    if (presetType === 'resistive') {
      updateSettings({
        swcBindings: [
          { actionId: 'next_track', actionName: 'Próxima Faixa', androidKeyCode: 87, keyLabel: 'Key1 (1.2kΩ)', resistanceOhm: 1200, source: 'resistor_key1' },
          { actionId: 'prev_track', actionName: 'Faixa Anterior', androidKeyCode: 88, keyLabel: 'Key1 (2.4kΩ)', resistanceOhm: 2400, source: 'resistor_key1' },
          { actionId: 'play_pause', actionName: 'Play / Pause', androidKeyCode: 85, keyLabel: 'Key1 (3.6kΩ)', resistanceOhm: 3600, source: 'resistor_key1' },
          { actionId: 'vol_up', actionName: 'Aumentar Volume', androidKeyCode: 24, keyLabel: 'Key2 (1.0kΩ)', resistanceOhm: 1000, source: 'resistor_key2' },
          { actionId: 'vol_down', actionName: 'Diminuir Volume', androidKeyCode: 25, keyLabel: 'Key2 (2.2kΩ)', resistanceOhm: 2200, source: 'resistor_key2' },
          { actionId: 'mute', actionName: 'Mudo (Mute)', androidKeyCode: 164, keyLabel: 'Key2 (4.7kΩ)', resistanceOhm: 4700, source: 'resistor_key2' },
          { actionId: 'voice_assist', actionName: 'Google Assistente / Voz', androidKeyCode: 231, keyLabel: 'Key1 (5.6kΩ)', resistanceOhm: 5600, source: 'resistor_key1' },
          { actionId: 'answer_call', actionName: 'Atender Chamada', androidKeyCode: 5, keyLabel: 'Key1 (6.8kΩ)', resistanceOhm: 6800, source: 'resistor_key1' },
        ],
      });
      showToast('Padrão Resistivo Universal carregado', 'success');
    } else {
      updateSettings({
        swcBindings: [
          { actionId: 'next_track', actionName: 'Próxima Faixa', androidKeyCode: 176, keyLabel: 'MediaNextTrack', source: 'keyboard' },
          { actionId: 'prev_track', actionName: 'Faixa Anterior', androidKeyCode: 177, keyLabel: 'MediaPreviousTrack', source: 'keyboard' },
          { actionId: 'play_pause', actionName: 'Play / Pause', androidKeyCode: 179, keyLabel: 'MediaPlayPause', source: 'keyboard' },
          { actionId: 'vol_up', actionName: 'Aumentar Volume', androidKeyCode: 175, keyLabel: 'AudioVolumeUp', source: 'keyboard' },
          { actionId: 'vol_down', actionName: 'Diminuir Volume', androidKeyCode: 174, keyLabel: 'AudioVolumeDown', source: 'keyboard' },
          { actionId: 'mute', actionName: 'Mudo (Mute)', androidKeyCode: 173, keyLabel: 'AudioVolumeMute', source: 'keyboard' },
          { actionId: 'voice_assist', actionName: 'Google Assistente', androidKeyCode: 231, keyLabel: 'LaunchAssistant', source: 'keyboard' },
        ],
      });
      showToast('Padrão Teclas Multimídia carregado', 'success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 font-sans">
      <div className="w-full max-w-5xl h-[92vh] max-h-[720px] bg-black border border-neutral-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-neutral-100">
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-[#12141a] border-b border-neutral-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
                Configurações da Central Android Auto
              </h2>
              <p className="text-xs text-neutral-400">
                Ajuste os parâmetros de vídeo, áudio, Wi-Fi e comandos de volante
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (confirm('Deseja redefinir todas as configurações para o padrão de fábrica?')) {
                  resetSettings();
                  showToast('Configurações redefinidas com sucesso', 'info');
                }
              }}
              className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-700 text-xs font-semibold flex items-center gap-1.5 transition"
              title="Restaurar padrões de fábrica"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restaurar Padrões</span>
            </button>

            <button
              onClick={() => setActiveModal(null)}
              className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Left Tab Menu + Right Content Panel */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Tabs */}
          <div className="w-full md:w-64 bg-[#0d0f14] border-r border-neutral-800/80 p-2 sm:p-3 overflow-y-auto flex md:flex-col gap-1.5 flex-shrink-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap md:whitespace-normal w-full text-left ${
                    isActive
                      ? 'bg-neutral-800 border border-neutral-600 text-white shadow-lg'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                  <span className="flex-1">{tab.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-40 hidden md:inline" />
                </button>
              );
            })}
          </div>

          {/* Right Panel */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6 bg-black">
            {/* =========================================================================
                1. ANDROID AUTO & VÍDEO
                ========================================================================= */}
            {activeTab === 'android_auto' && (
              <div className="space-y-5 max-w-3xl">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-2">
                    <Tv className="w-4 h-4 text-white" />
                    Projeção de Vídeo & Resolução
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Configure a qualidade de imagem e taxa de quadros para a tela do seu carro.
                  </p>
                </div>

                {/* Preset Profiles */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'light_720p30', label: 'Leve (720p @ 30 FPS)', desc: 'Ideal para centrais antigas' },
                    { id: 'medium_1080p30', label: 'Equilibrado (1080p @ 30 FPS)', desc: 'Excelente nitidez' },
                    { id: 'max_1080p60', label: 'Máximo (1080p @ 60 FPS)', desc: 'Máxima fluidez e H.265' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => applyVideoQualityPreset(p.id as any)}
                      className={`p-3.5 rounded-2xl border text-left transition ${
                        settings.androidAutoVideoQuality === p.id
                          ? 'bg-neutral-800 border-neutral-500 text-white shadow-md'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <div className="font-bold text-xs text-white">{p.label}</div>
                      <div className="text-[10px] text-neutral-400 mt-1">{p.desc}</div>
                    </button>
                  ))}
                </div>

                {/* Manual Settings Grid */}
                <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Resolução */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-300">Resolução do Display</label>
                      <select
                        value={settings.resolutionId}
                        onChange={(e) => updateSettings({ resolutionId: Number(e.target.value) })}
                        className="w-full bg-black border border-neutral-700 rounded-xl p-2.5 text-xs text-white focus:border-neutral-500"
                      >
                        {RESOLUTION_PRESETS.map((res) => (
                          <option key={res.id} value={res.id}>
                            {res.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Codec */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-300">Codec de Vídeo</label>
                      <select
                        value={settings.videoCodec}
                        onChange={(e) => updateSettings({ videoCodec: e.target.value })}
                        className="w-full bg-black border border-neutral-700 rounded-xl p-2.5 text-xs text-white focus:border-neutral-500"
                      >
                        <option value="H264">H.264 (AVC Padrão Compatível)</option>
                        <option value="H265">H.265 (HEVC Alta Eficiência)</option>
                        <option value="VP9">VP9 (Google Codec)</option>
                      </select>
                    </div>

                    {/* FPS Limit */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-300">Limite de FPS</label>
                      <div className="flex gap-2">
                        {[30, 60].map((fps) => (
                          <button
                            key={fps}
                            onClick={() => updateSettings({ fpsLimit: fps })}
                            className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                              settings.fpsLimit === fps
                                ? 'bg-neutral-800 border-neutral-500 text-white'
                                : 'bg-black border-neutral-800 text-neutral-400 hover:text-white'
                            }`}
                          >
                            {fps} FPS
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Contador de FPS */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-black border border-neutral-800">
                      <div>
                        <div className="text-xs font-bold text-white">Exibir Contador de FPS</div>
                        <div className="text-[10px] text-neutral-400">FPS e Bitrate em tempo real na tela</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.showFpsCounter}
                        onChange={(e) => updateSettings({ showFpsCounter: e.target.checked })}
                        className="w-4 h-4 rounded accent-neutral-400 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                2. COMANDOS DO VOLANTE (SWC)
                ========================================================================= */}
            {activeTab === 'swc' && (
              <div className="space-y-5 max-w-3xl">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-2">
                    <Key className="w-4 h-4 text-white" />
                    Comandos de Volante & Mapeamento de Teclas
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Mapeie os botões físicos do seu volante para controlar músicas, chamadas e o Google Assistente.
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => applySwcPreset('resistive')}
                    className="px-3 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-semibold text-neutral-200"
                  >
                    Carregar Padrão Resistivo (Key1/Key2)
                  </button>
                  <button
                    onClick={() => applySwcPreset('multimedia')}
                    className="px-3 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-semibold text-neutral-200"
                  >
                    Carregar Padrão Multimídia
                  </button>
                </div>

                {learningActionId && (
                  <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-500 text-white text-xs animate-pulse">
                    Pressione o botão físico correspondente no seu teclado ou volante agora...
                  </div>
                )}

                <div className="space-y-2">
                  {(settings.swcBindings || []).map((binding) => (
                    <div
                      key={binding.actionId}
                      className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-xs text-white">{binding.actionName}</div>
                        <div className="text-[10px] text-neutral-400 font-mono">{binding.keyLabel}</div>
                      </div>

                      <button
                        onClick={() => setLearningActionId(binding.actionId)}
                        className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-white text-xs font-semibold"
                      >
                        Aprender Botão
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* =========================================================================
                3. ÁUDIO & MICROFONE
                ========================================================================= */}
            {activeTab === 'audio' && (
              <div className="space-y-5 max-w-3xl">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-white" />
                    Áudio & Microfone do Assistente
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Ajuste o fluxo de som estéreo e sensibilidade do microfone para comandos de voz.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Codec AAC de Alta Fidelidade</div>
                      <div className="text-[10px] text-neutral-400">Áudio estéreo cristalino para Spotify e músicas</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.useAacAudio}
                      onChange={(e) => updateSettings({ useAacAudio: e.target.checked })}
                      className="w-4 h-4 rounded accent-neutral-400 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Cancelamento de Eco no Microfone</div>
                      <div className="text-[10px] text-neutral-400">Evita eco do alto-falante durante chamadas</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.micEchoCanceler}
                      onChange={(e) => updateSettings({ micEchoCanceler: e.target.checked })}
                      className="w-4 h-4 rounded accent-neutral-400 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                4. CONEXÃO SEM FIO & USB
                ========================================================================= */}
            {activeTab === 'wireless' && (
              <div className="space-y-5 max-w-3xl">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-white" />
                    Conexão Sem Fio & USB
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Parâmetros para conexão via Wi-Fi 5GHz e cabo USB com protocolo AOA 2.0.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Início automático ao conectar</div>
                      <div className="text-[10px] text-neutral-400">Inicia a projeção automaticamente ao plugar dispositivo Android (Dica da Página 3)</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-neutral-400">
                        {settings.autoStartOnUsb ? 'Sim' : 'Não'}
                      </span>
                      <input
                        type="checkbox"
                        checked={settings.autoStartOnUsb}
                        onChange={(e) => updateSettings({ autoStartOnUsb: e.target.checked })}
                        className="w-4 h-4 rounded accent-neutral-400 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Porta HeadUnit Server Padrão (5277)</div>
                      <div className="text-[10px] text-neutral-400">Porta oficial do Android Auto para conexões TCP/IP</div>
                    </div>
                    <span className="font-mono text-xs text-white font-bold">5277</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
                    <div>
                      <div className="text-xs font-bold text-white">Simular Interrupção de Cabo / Sinal</div>
                      <div className="text-[10px] text-neutral-400">Gera o evento de queda para disparar a tela de reconexão automática</div>
                    </div>
                    <button
                      onClick={() => {
                        setActiveModal(null);
                        simulateUnexpectedDrop();
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-600 text-xs font-semibold transition"
                    >
                      Simular Queda
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                5. LOGS & DIAGNÓSTICO
                ========================================================================= */}
            {activeTab === 'logs' && (
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                      Logs de Conexão em Tempo Real
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Depuração do protocolo de handshake AOA e streams de mídia.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black border border-neutral-800 font-mono text-xs text-neutral-300 h-64 overflow-y-auto space-y-1.5">
                  {logs.map((log) => (
                    <div key={log.id} className="flex gap-2">
                      <span className="text-neutral-500">[{log.timestamp}]</span>
                      <span className="text-neutral-300 font-bold">[{log.tag}]</span>
                      <span>{log.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
