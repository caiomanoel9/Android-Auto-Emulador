export type ConnectionType = 'none' | 'self_mode' | 'usb' | 'wifi' | 'nearby' | 'native_aa';

export type ViewMode = 'surface' | 'texture' | 'gles';
export type ScreenOrientation = 'system' | 'auto' | 'landscape' | 'landscape_reverse' | 'portrait' | 'portrait_reverse';
export type FullscreenMode = 'none' | 'immersive' | 'status_only' | 'immersive_with_notch';
export type AppTheme = 'automatic' | 'clear' | 'dark' | 'extreme_dark' | 'auto_sunrise' | 'manual_time' | 'light_sensor';
export type NightMode = 'auto' | 'day' | 'night' | 'manual_time' | 'light_sensor' | 'car_signal';
export type SoftwareVideoDecoder = 'device_mediacodec' | 'bundled_ffmpeg';

export interface ResolutionOption {
  id: number;
  label: string;
  width: number;
  height: number;
}

export const RESOLUTION_PRESETS: ResolutionOption[] = [
  { id: 0, label: 'Auto (Nativo 1200x720)', width: 1200, height: 720 },
  { id: 1, label: '1200x720 Automotivo Panorâmico', width: 1200, height: 720 },
  { id: 2, label: '480p WVGA (800x480)', width: 800, height: 480 },
  { id: 3, label: '720p HD Padrão (1280x720)', width: 1280, height: 720 },
  { id: 4, label: '1080p Full HD (1920x1080)', width: 1920, height: 1080 },
];

export interface UsbDeviceItem {
  id: string;
  vendorId: number;
  productId: number;
  productName: string;
  manufacturerName: string;
  serialNumber?: string;
  isInAccessoryMode: boolean;
  isAndroidDevice: boolean;
  hasPermission: boolean;
}

export interface NetworkAddressItem {
  id: string;
  ip: string;
  port: number;
  label?: string;
  lastConnected?: string;
  status: 'online' | 'offline' | 'unknown';
}

export interface NearbyEndpoint {
  id: string;
  name: string;
  rssi?: number;
}

export interface SwcKeyBinding {
  actionId: string;
  actionName: string;
  androidKeyCode: number;
  keyLabel: string;
  resistanceOhm?: number;
  source: 'keyboard' | 'canbus' | 'resistor_key1' | 'resistor_key2' | 'gamepad';
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
  tag: string;
  message: string;
}

export interface AppSettings {
  // Display & Video (Android Auto)
  androidAutoVideoQuality: 'light_720p30' | 'medium_1080p30' | 'max_1080p60';
  resolutionId: number;
  videoCodec: string; // 'Auto' | 'H264' | 'H265' | 'VP9'
  fpsLimit: number; // 30 | 60
  stretchToFill: boolean;
  hudMirroring: boolean;
  viewMode: ViewMode;
  screenOrientation: ScreenOrientation;
  dpiPixelDensity: number; // 0 for Auto
  pixelAspectRatioE4: number; // 10000 = 1.0
  insetLeft: number;
  insetTop: number;
  insetRight: number;
  insetBottom: number;
  fullscreenMode: FullscreenMode;
  forceSoftwareDecoding: boolean;
  softwareVideoDecoder: SoftwareVideoDecoder;
  rightHandDrive: boolean;
  showFpsCounter: boolean;
  android41LegacyMode: boolean;
  headunitFrame1200x720: boolean;

  // Audio & Mic
  enableAudioSink: boolean;
  staticAudioFocus: boolean;
  separateAudioStreams: boolean;
  micSampleRate: number; // 16000, 44100, etc.
  audioLatencyMultiplier: number;
  audioQueueCapacity: number;
  useAacAudio: boolean;
  micEchoCanceler: boolean;
  micNoiseSuppressor: boolean;
  micAutoGainControl: boolean;
  mediaVolumeOffset: number;
  assistantVolumeOffset: number;
  navigationVolumeOffset: number;

  // Connection & Wireless
  wifiConnectionMode: number;
  helperConnectionStrategy: number;
  autoConnectLastSession: boolean;
  autoConnectSingleUsbDevice: boolean;
  autoConnectPriorityOrder: string[];
  lastConnectionType: string;
  lastConnectionIp: string;
  lastConnectionUsbDevice: string;
  useLibusb: boolean;
  useNativeSsl: boolean;
  staticBSSID: string;

  // Automation & Auto-Start
  autoStartSelfMode: boolean;
  autoStartOnUsb: boolean;
  autoStartOnBoot: boolean;
  autoStartOnScreenOn: boolean;
  autoStartOnWifi: boolean;
  autoStartWifiSsid: string;
  listenForUsbDevices: boolean;
  autoStartBluetoothMacs: string[];

  // Steering Wheel Controls (SWC / Comandos do Volante)
  swcBindings: SwcKeyBinding[];

  // Appearance & UI
  appTheme: AppTheme;
  monochromeIcons: boolean;
  useExtremeDarkMode: boolean;
  useGradientBackground: boolean;
  nightMode: NightMode;
  nightModeThresholdLux: number;
  nightModeThresholdBrightness: number;
  nightModeManualStart: number;
  nightModeManualEnd: number;
  showToastMessages: boolean;
  reopenOnReconnection: boolean;
  hasAcceptedDisclaimer: boolean;
  hasCompletedSetupWizard: boolean;
  appLanguage: string;
}

export const DEFAULT_SETTINGS: AppSettings = {
  androidAutoVideoQuality: 'max_1080p60',
  resolutionId: 3, // 720p / 1200x720
  videoCodec: 'H264',
  fpsLimit: 60,
  stretchToFill: true,
  hudMirroring: false,
  viewMode: 'texture',
  screenOrientation: 'landscape',
  dpiPixelDensity: 0,
  pixelAspectRatioE4: 10000,
  insetLeft: 0,
  insetTop: 0,
  insetRight: 0,
  insetBottom: 0,
  fullscreenMode: 'immersive',
  forceSoftwareDecoding: false,
  softwareVideoDecoder: 'device_mediacodec',
  rightHandDrive: false,
  showFpsCounter: true,
  android41LegacyMode: false,
  headunitFrame1200x720: true,

  enableAudioSink: true,
  staticAudioFocus: false,
  separateAudioStreams: true,
  micSampleRate: 16000,
  audioLatencyMultiplier: 4,
  audioQueueCapacity: 0,
  useAacAudio: true,
  micEchoCanceler: true,
  micNoiseSuppressor: true,
  micAutoGainControl: true,
  mediaVolumeOffset: 0,
  assistantVolumeOffset: 0,
  navigationVolumeOffset: 0,

  wifiConnectionMode: 1,
  helperConnectionStrategy: 2,
  autoConnectLastSession: false,
  autoConnectSingleUsbDevice: true,
  autoConnectPriorityOrder: ['last-session', 'self-mode', 'single-usb'],
  lastConnectionType: '',
  lastConnectionIp: '',
  lastConnectionUsbDevice: '',
  useLibusb: true,
  useNativeSsl: true,
  staticBSSID: '0',

  autoStartSelfMode: false,
  autoStartOnUsb: true,
  autoStartOnBoot: false,
  autoStartOnScreenOn: false,
  autoStartOnWifi: false,
  autoStartWifiSsid: '',
  listenForUsbDevices: true,
  autoStartBluetoothMacs: [],

  // Default Steering Wheel Controls
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

  appTheme: 'automatic',
  monochromeIcons: false,
  useExtremeDarkMode: false,
  useGradientBackground: true,
  nightMode: 'auto',
  nightModeThresholdLux: 100,
  nightModeThresholdBrightness: 100,
  nightModeManualStart: 1140,
  nightModeManualEnd: 420,
  showToastMessages: true,
  reopenOnReconnection: true,
  hasAcceptedDisclaimer: true,
  hasCompletedSetupWizard: true,
  appLanguage: 'pt',
};
