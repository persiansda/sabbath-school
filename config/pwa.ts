import type { ModuleOptions } from '@vite-pwa/nuxt'
import { appDescription, appName, appShortName, appThemeColor } from '../constants/app'

export const pwa: ModuleOptions = {
  strategies: 'generateSW',
  injectRegister: 'auto',
  registerType: 'prompt',
  workbox: {
    navigateFallback: '/',
    navigateFallbackDenylist: [/^\/api\//, /^\/login\//, /^\/oauth\//, /^\/signin\//, /^\/web-share-target\//],
    globDirectory: 'public',
    globPatterns: ['**/*.{css,png,svg,ico}'],
    runtimeCaching: [],
  },
  includeAssets: ['/assets/images/favicon.ico', '/assets/images/logo.png'],
  manifest: {
    name: appName,
    short_name: appShortName,
    description: appDescription,
    theme_color: appThemeColor,
    icons: [
      {
        src: '/assets/images/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/assets/images/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/assets/images/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
  client: {
    installPrompt: true,
  },
  devOptions: {
    enabled: true,
    type: 'module',
  },
}
