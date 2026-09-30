import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  AppSettings,
  DEFAULT_SETTINGS,
  ConnectionType,
  UsbDeviceItem,
  NetworkAddressItem,
  NearbyEndpoint,
  LogEntry
} from '../types';
import {
  validateProductKey,
  TRIAL_TOTAL_DURATION_SECONDS,
  LICENSE_STORAGE_KEY
} from '../utils/license';

interface Toast {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'warn' | 'error';
}

export type StandbyState = 'awaiting' | 'ready' | 'reconnecting';

interface LicenseState {
  isLicensed: boolean;
  licenseKey: string | null;
  activatedAt: string | null;
  trialSecondsRemaining: number;
}

interface AppContextType {
  settings: AppSettings;
  updateSettings: (partial: Partial<AppSettings>) => void;
  resetSettings: () => void;

  // License & Trial System
  isLicensed: boolean;
  licenseKey: string | null;
  activatedAt: string | null;
  trialSecondsRemaining: number;
  isTrialExpired: boolean;
  activateProductKey: (key: string) => { success: boolean; message: string };
  revokeLicense: () => void;
  setTrialRemainingForTesting: (seconds: number) => void;

  // Boot lifecycle (Page 1)
  isBooting: boolean;
  finishBoot: () => void;

  // Standby lifecycle (Page 2: awaiting, Page 3: ready, Page 4: reconnecting)
  standbyState: StandbyState;
  setStandbyState: (state: StandbyState) => void;

  // Active projection lifecycle (Page 5: connected)
  activeConnection: ConnectionType;
  connectionStatus: 'disconnected' | 'connecting' | 'connected';
  connectionTarget: string;
  isScanning: boolean;

  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;

  logs: LogEntry[];
  addLog: (level: LogEntry['level'], tag: string, message: string) => void;
  clearLogs: () => void;

  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;

  usbDevices: UsbDeviceItem[];
  refreshUsbDevices: () => void;

  networkAddresses: NetworkAddressItem[];
  addNetworkAddress: (ip: string, port?: number) => void;
  removeNetworkAddress: (id: string) => void;

  nearbyEndpoints: NearbyEndpoint[];

  // Event triggers
  handleArrowAction: () => void;
  startSelfMode: () => void;
  requestWebUsbDevice: () => Promise<void>;
  connectUsbDevice: (device: UsbDeviceItem) => void;
  connectNetworkAddress: (item: NetworkAddressItem) => void;
  connectNearbyEndpoint: (endpoint: NearbyEndpoint) => void;
  simulateUnexpectedDrop: () => void;
  disconnect: () => void;
}

const STORAGE_KEY = 'android_auto_settings_v4';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to parse settings from localStorage', e);
    }
    return DEFAULT_SETTINGS;
  });

  // Page 1: Boot splash is active on cold start
  const [isBooting, setIsBooting] = useState<boolean>(true);

  // License & Trial System State (Fully unlocked / No trial limits)
  const [license, setLicense] = useState<LicenseState>(() => {
    return {
      isLicensed: true,
      licenseKey: 'CSAA-PREMIUM-FULL-ACCESS',
      activatedAt: new Date().toISOString(),
      trialSecondsRemaining: 3600,
    };
  });

  const isTrialExpired = false;

  // Standby state: Page 2 (awaiting), Page 3 (ready), Page 4 (reconnecting)
  const [standbyState, setStandbyState] = useState<StandbyState>('awaiting');

  const [activeConnection, setActiveConnection] = useState<ConnectionType>('none');
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [connectionTarget, setConnectionTarget] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const [toasts, setToasts] = useState<Toast[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      timestamp: new Date().toLocaleTimeString(),
      level: 'INFO',
      tag: 'System',
      message: 'Central Multimídia Car Specialties inicializada.',
    }
  ]);

  const reconnectTimerRef = useRef<NodeJS.Timeout | null>(null);

  // USB Devices
  const [usbDevices] = useState<UsbDeviceItem[]>([
    {
      id: 'usb-1',
      vendorId: 0x18d1, // Google
      productId: 0x2d00, // Android Auto Accessory
      productName: 'Google Pixel (Android Auto)',
      manufacturerName: 'Google',
      serialNumber: 'PX99201A',
      isInAccessoryMode: true,
      isAndroidDevice: true,
      hasPermission: true,
    },
    {
      id: 'usb-2',
      vendorId: 0x04e8, // Samsung
      productId: 0x6860, // MTP Device
      productName: 'Samsung Galaxy Phone',
      manufacturerName: 'Samsung Electronics',
      serialNumber: 'SM90129X',
      isInAccessoryMode: false,
      isAndroidDevice: true,
      hasPermission: true,
    }
  ]);

  // Network Addresses
  const [networkAddresses, setNetworkAddresses] = useState<NetworkAddressItem[]>([
    { id: 'net-1', ip: '192.168.1.105', port: 5277, label: 'Celular (Wi-Fi Local)', status: 'online' },
    { id: 'net-2', ip: '192.168.43.1', port: 5277, label: 'Hotspot / Roteador 5GHz', status: 'online' },
  ]);

  const [nearbyEndpoints] = useState<NearbyEndpoint[]>([
    { id: 'end-1', name: 'Smartphone Android (Sem Fio)', rssi: -42 },
  ]);

  const finishBoot = () => {
    setIsBooting(false);
    addLog('INFO', 'Boot', 'Inicialização concluída. Central em modo de espera.');
  };

  const updateSettings = (partial: Partial<AppSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...partial };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save settings to localStorage', e);
      }
      return updated;
    });
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to reset settings', e);
    }
    showToast('Configurações redefinidas para o padrão de fábrica', 'info');
  };

  const addLog = (level: LogEntry['level'], tag: string, message: string) => {
    const entry: LogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      level,
      tag,
      message,
    };
    setLogs((prev) => [entry, ...prev].slice(0, 150));
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const showToast = (message: string, type: Toast['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const activateProductKey = (rawKey: string): { success: boolean; message: string } => {
    const res = validateProductKey(rawKey);
    if (!res.isValid) {
      addLog('WARN', 'License', `Tentativa de ativação falhou: Chave inválida (${rawKey})`);
      return { success: false, message: res.errorMessage || 'Chave inválida' };
    }

    const updated: LicenseState = {
      isLicensed: true,
      licenseKey: res.formattedKey,
      activatedAt: new Date().toISOString(),
      trialSecondsRemaining: 0,
    };

    setLicense(updated);
    try {
      localStorage.setItem(LICENSE_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save activated license', e);
    }

    addLog('INFO', 'License', `Licença ativada com sucesso! Chave: ${res.formattedKey}`);
    showToast('Licença ativada com sucesso! Uso ilimitado desbloqueado.', 'success');
    return { success: true, message: 'Licença ativada com sucesso!' };
  };

  const revokeLicense = () => {
    const resetState: LicenseState = {
      isLicensed: false,
      licenseKey: null,
      activatedAt: null,
      trialSecondsRemaining: TRIAL_TOTAL_DURATION_SECONDS,
    };
    setLicense(resetState);
    try {
      localStorage.setItem(LICENSE_STORAGE_KEY, JSON.stringify(resetState));
    } catch (e) {
      console.error('Failed to save revoked license', e);
    }
    addLog('INFO', 'License', 'Licença desativada. Período de teste restaurado para 10 minutos.');
    showToast('Licença desativada. Teste de 10 minutos restaurado.', 'info');
  };

  const setTrialRemainingForTesting = (seconds: number) => {
    setLicense((prev) => {
      const updated = {
        ...prev,
        isLicensed: false,
        trialSecondsRemaining: seconds,
      };
      try {
        localStorage.setItem(LICENSE_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save test trial', e);
      }
      return updated;
    });
    showToast(`Tempo de teste ajustado para ${seconds} segundos`, 'info');
  };

  const refreshUsbDevices = () => {
    setIsScanning(true);
    addLog('INFO', 'USB', 'Varrendo portas USB para dispositivos AOA 2.0...');
    setTimeout(() => {
      setIsScanning(false);
      showToast('Dispositivo USB detectado na porta 1', 'info');
    }, 600);
  };

  const addNetworkAddress = (ip: string, port = 5277) => {
    const newAddr: NetworkAddressItem = {
      id: Math.random().toString(36).substring(2, 9),
      ip,
      port,
      label: `Manual (${ip})`,
      status: 'online',
    };
    setNetworkAddresses((prev) => [newAddr, ...prev]);
    showToast(`Endereço ${ip}:${port} adicionado`, 'success');
  };

  const removeNetworkAddress = (id: string) => {
    setNetworkAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  // Connection Event Handlers
  const startSelfMode = () => {
    setActiveConnection('self_mode');
    setConnectionStatus('connecting');
    setConnectionTarget('Smartphone Android');
    addLog('INFO', 'AndroidAuto', 'Iniciando handshake AOA 2.0...');

    setTimeout(() => {
      setConnectionStatus('connected');
      addLog('INFO', 'Projection', 'Sessão Android Auto estabelecida com sucesso.');
      showToast('Android Auto conectado!', 'success');
    }, 600);
  };

  /**
   * Main Event-Driven Handler for the 3D Navigation Arrow
   * Drives transition between Page 2, Page 3, and Page 5 naturally
   */
  const handleArrowAction = () => {
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }

    if (standbyState === 'awaiting') {
      // Event: Device detected upon user connection/interaction
      if (settings.autoStartOnUsb) {
        // Direct to Page 5 if auto-start is enabled in settings
        addLog('INFO', 'AutoStart', 'Início automático ativado: iniciando projeção diretamente.');
        startSelfMode();
      } else {
        // Move to Page 3 (Ready / Iniciar Conexão) as device is recognized
        setStandbyState('ready');
        addLog('INFO', 'USB', 'Dispositivo conectado detectado. Aguardando confirmação do usuário.');
        showToast('Dispositivo conectado. Toque para iniciar.', 'info');
      }
    } else if (standbyState === 'ready') {
      // Event: User clicked "INICIAR CONEXÃO" -> Connect to Page 5
      startSelfMode();
    } else if (standbyState === 'reconnecting') {
      // Event: User tapped arrow to force immediate reconnection
      addLog('INFO', 'Reconnection', 'Tentando restabelecer conexão imediatamente...');
      startSelfMode();
    }
  };

  const connectUsbDevice = (device: UsbDeviceItem) => {
    setActiveConnection('usb');
    setConnectionStatus('connecting');
    setConnectionTarget(device.productName);
    addLog('INFO', 'USB', `Conectando ao dispositivo: ${device.productName}...`);

    setTimeout(() => {
      setConnectionStatus('connected');
      addLog('INFO', 'USB', 'Handshake AOA 2.0 concluído. Projeção iniciada.');
      showToast(`Conectado a ${device.productName}`, 'success');
    }, 700);
  };

  const connectNetworkAddress = (item: NetworkAddressItem) => {
    setActiveConnection('wifi');
    setConnectionStatus('connecting');
    setConnectionTarget(`${item.ip}:${item.port}`);

    setTimeout(() => {
      setConnectionStatus('connected');
      addLog('INFO', 'Wireless', 'Stream estabelecido.');
      showToast(`Android Auto Sem Fio conectado (${item.ip})`, 'success');
    }, 800);
  };

  const connectNearbyEndpoint = (endpoint: NearbyEndpoint) => {
    setActiveConnection('nearby');
    setConnectionStatus('connecting');
    setConnectionTarget(endpoint.name);

    setTimeout(() => {
      setConnectionStatus('connected');
      showToast(`Conectado a ${endpoint.name}`, 'success');
    }, 800);
  };

  /**
   * Event: Unexpected connection drop / cable disconnection
   * Automatically drops from Page 5 to Page 4 ("Reconectando")
   * and attempts automatic reconnection back to Page 5
   */
  const simulateUnexpectedDrop = () => {
    setConnectionStatus('disconnected');
    setStandbyState('reconnecting');
    addLog('WARN', 'Connection', 'Aviso: Conexão interrompida inesperadamente.');
    showToast('Conexão perdida. Tentando reconectar...', 'warn');

    // Automatically attempt reconnection after 3.5 seconds
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
    }
    reconnectTimerRef.current = setTimeout(() => {
      addLog('INFO', 'Reconnection', 'Sinal recuperado. Restaurando sessão Android Auto...');
      startSelfMode();
    }, 3500);
  };

  /**
   * Event: Normal voluntary exit from Projection (OEM Steering wheel button)
   * Disconnects cleanly and returns to Page 2 ("AGUARDANDO CONEXÃO")
   */
  const disconnect = () => {
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }
    setConnectionStatus('disconnected');
    setActiveConnection('none');
    setConnectionTarget('');
    setStandbyState('awaiting');
    addLog('INFO', 'Session', 'Sessão encerrada pelo usuário. Retornando ao modo de espera.');
    showToast('Android Auto desconectado', 'info');
  };

  const requestWebUsbDevice = async () => {
    try {
      const navUsb = (navigator as unknown as { usb?: { requestDevice: (opt: unknown) => Promise<{ productName?: string }> } }).usb;
      if (!navUsb) {
        showToast('WebUSB não suportado neste navegador. Use Chrome ou Edge.', 'warn');
        return;
      }
      const device = await navUsb.requestDevice({ filters: [] });
      if (device) {
        addLog('INFO', 'WebUSB', `Dispositivo selecionado: ${device.productName || 'Aparelho USB'}`);
        if (settings.autoStartOnUsb) {
          startSelfMode();
        } else {
          setStandbyState('ready');
          showToast(`Dispositivo conectado: ${device.productName || 'USB'}. Toque para iniciar.`, 'info');
        }
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      if (!errorMsg.includes('No device selected') && !errorMsg.includes('User cancelled')) {
        addLog('WARN', 'WebUSB', `Acesso USB cancelado ou erro: ${errorMsg}`);
      }
    }
  };

  /**
   * Listen for native USB plug-in and unplug events when running in WebUSB-capable browsers
   */
  useEffect(() => {
    const navUsb = (navigator as unknown as {
      usb?: {
        addEventListener: (name: string, fn: (e: { device?: { productName?: string } }) => void) => void;
        removeEventListener: (name: string, fn: (e: { device?: { productName?: string } }) => void) => void;
      };
    }).usb;

    if (!navUsb) return;

    const handleConnect = (e: { device?: { productName?: string } }) => {
      addLog('INFO', 'WebUSB', `Cabo USB inserido: ${e.device?.productName || 'Dispositivo USB'}`);
      if (settings.autoStartOnUsb) {
        startSelfMode();
      } else {
        setStandbyState('ready');
        showToast('Dispositivo USB plugado. Toque para iniciar.', 'info');
      }
    };

    const handleDisconnect = (e: { device?: { productName?: string } }) => {
      addLog('WARN', 'WebUSB', `Cabo USB desconectado: ${e.device?.productName || 'Dispositivo USB'}`);
      simulateUnexpectedDrop();
    };

    navUsb.addEventListener('connect', handleConnect);
    navUsb.addEventListener('disconnect', handleDisconnect);

    return () => {
      navUsb.removeEventListener('connect', handleConnect);
      navUsb.removeEventListener('disconnect', handleDisconnect);
    };
  }, [settings.autoStartOnUsb]);

  useEffect(() => {
    return () => {
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
      }
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
        isLicensed: license.isLicensed,
        licenseKey: license.licenseKey,
        activatedAt: license.activatedAt,
        trialSecondsRemaining: license.trialSecondsRemaining,
        isTrialExpired,
        activateProductKey,
        revokeLicense,
        setTrialRemainingForTesting,
        isBooting,
        finishBoot,
        standbyState,
        setStandbyState,
        activeConnection,
        connectionStatus,
        connectionTarget,
        isScanning,
        activeModal,
        setActiveModal,
        logs,
        addLog,
        clearLogs,
        toasts,
        showToast,
        usbDevices,
        refreshUsbDevices,
        networkAddresses,
        addNetworkAddress,
        removeNetworkAddress,
        nearbyEndpoints,
        handleArrowAction,
        startSelfMode,
        requestWebUsbDevice,
        connectUsbDevice,
        connectNetworkAddress,
        connectNearbyEndpoint,
        simulateUnexpectedDrop,
        disconnect,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
