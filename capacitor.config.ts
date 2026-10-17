import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.headunit.revived',
  appName: 'Headunit Revived',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
