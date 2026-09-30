import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { HomeDashboard } from './components/HomeDashboard';
import { ProjectionView } from './components/ProjectionView';
import { BootSplashScreen } from './components/BootSplashScreen';
import { SettingsModal } from './components/SettingsModal';
import { KeymapModal } from './components/KeymapModal';
import { LogExporterModal } from './components/LogExporterModal';
import { UsbListModal } from './components/UsbListModal';
import { NetworkListModal } from './components/NetworkListModal';
import { HotspotQrModal } from './components/HotspotQrModal';
import { NearbyDevicesModal } from './components/NearbyDevicesModal';
import { SafetyDisclaimerModal } from './components/SafetyDisclaimerModal';
import { InstructionsModal } from './components/InstructionsModal';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

const ToastRenderer: React.FC = () => {
  const { toasts } = useApp();

  return (
    <div className="fixed bottom-12 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto p-3 rounded-2xl shadow-2xl border border-neutral-700 bg-neutral-900/95 text-neutral-100 text-xs font-semibold flex items-center gap-2.5 backdrop-blur-xl animate-fade-in transition"
        >
          {toast.type === 'success' && <CheckCircle className="w-4 h-4 text-white flex-shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-neutral-400 flex-shrink-0" />}
          {toast.type === 'warn' && <AlertTriangle className="w-4 h-4 text-neutral-300 flex-shrink-0" />}
          {(!toast.type || toast.type === 'info') && <Info className="w-4 h-4 text-neutral-300 flex-shrink-0" />}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};

const MainContent: React.FC = () => {
  const {
    connectionStatus,
    activeModal,
    isBooting,
    finishBoot
  } = useApp();

  return (
    <div className="min-h-screen bg-black text-slate-100 flex items-center justify-center p-0 sm:p-2">
      {/* 1200x720 Automotive Horizontal Landscape Frame */}
      <div className="w-full max-w-[1200px] h-screen sm:h-[720px] max-h-[100vh] bg-black border-0 sm:border border-neutral-800/80 sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden relative">
        {/* Page 1: Boot Splash Screen (Always appears upon opening the app) */}
        {isBooting ? (
          <BootSplashScreen
            durationMs={1900}
            onFinish={finishBoot}
          />
        ) : (
          /* Main Application: Flow is driven exclusively by internal events */
          <main className="flex-1 relative overflow-hidden flex flex-col">
            {connectionStatus === 'connected' ? (
              <ProjectionView />
            ) : (
              <HomeDashboard />
            )}
          </main>
        )}

        {/* System Modals */}
        {activeModal === 'settings' && <SettingsModal />}
        {activeModal === 'keymap' && <KeymapModal />}
        {activeModal === 'log_exporter' && <LogExporterModal />}
        {activeModal === 'usb_list' && <UsbListModal />}
        {activeModal === 'network_list' && <NetworkListModal />}
        {activeModal === 'hotspot_qr' && <HotspotQrModal />}
        {activeModal === 'nearby' && <NearbyDevicesModal />}
        {activeModal === 'disclaimer' && <SafetyDisclaimerModal />}
        {activeModal === 'instructions' && <InstructionsModal />}

        <ToastRenderer />
      </div>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
