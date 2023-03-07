import type { ModuleOptions } from '@vite-pwa/nuxt'

export const pwa: ModuleOptions = {
  registerType: 'autoUpdate',
  includeAssets: ['/assets/images/favicon.ico', '/assets/images/logo.png'],
  manifest: {
    name: 'Sabbath School',
    short_name: 'Sabbath School',
    theme_color: '#ffffff',
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
    enabled: false,
    type: 'module',
  },
}
