# Head Unit Revived (Web Edition)

An Android Auto Head Unit Receiver ported to React & TypeScript with Vite, preserving all original features, connection modes, auto-connect workflows, and configuration options.

## Features Ported

- **Self Mode Projection**:
  - Run Android Auto locally on the head unit screen with full turn-by-turn navigation, interactive media player, audio spectrum visualizer, phone dialer, and Google Assistant voice controls.
  - HUD Mirroring (windshield flip) & custom screen insets calibration.
  - Live FPS, bitrate, and video decoder metrics overlay.
  - Driving safety lock (Parked vs Driving mode).

- **USB Connection Mode**:
  - USB OTG accessory detection and auto-connect priority sequence.
  - Device list dialog for selecting connected Android phones.

- **Wi-Fi & Wireless Connection**:
  - Headunit Server IP address manager & scanner.
  - Wireless Helper launcher mode with Hotspot QR Code generation and Google Nearby device discovery.
  - Native Android Auto Wireless Bluetooth pairing flow.

- **Comprehensive Settings**:
  - Video resolution presets (Auto, 480p, 720p, 1080p, 1440p, 2160p), FPS limits, and video codecs (H.264, HEVC, VP9).
  - Audio sink, separated streams (Media, Speech, Nav), microphone sample rates, volume offsets, echo cancellation, and noise suppression.
  - Steering wheel key mapping for rebinding physical media & navigation buttons.
  - Vehicle handshake profile (Make, Model, Year, Unit ID).
  - Dark mode themes, monochrome icon toggle, and custom loading screen options.
  - Diagnostics system log viewer and file exporter.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React Icons
