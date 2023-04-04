import { i18n } from './config/i18n'

export default defineNuxtConfig({

  extends: [
    'nuxt-seo-kit',
  ],

  app: {
    keepalive: true,
  },

  router: {
    options: {
      linkActiveClass: 'active',
      linkExactActiveClass: 'active',
    },
  },

  experimental: {
    componentIslands: true,
  },

  components: [
    '~/components/',
    {
      path: '~/components/shared',
      prefix: 's',
    },
  ],

  modules: [
    'nuxt-icon',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/devtools',
    // '@vite-pwa/nuxt',
    'nuxt-headlessui',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@pinia-plugin-persistedstate/nuxt',
  ],

  i18n,

  // pwa,

  headlessui: {
    prefix: 'Headless',
  },

  colorMode: {
    hid: 'color-mode-script',
    globalName: '__COLOR_MODE__',
    storageKey: 'color-mode',
  },

  tailwindcss: {
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    viewer: false,
  },

  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL,
      apiURL: process.env.API_URL,
      pspdfKey: process.env.PSPDF_KEY,
      googleClientId: process.env.GOOGLE_CLIENT_ID,
    },
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
    },
  },
})
