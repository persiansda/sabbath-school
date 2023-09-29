import { i18n } from './config/i18n'

export default defineNuxtConfig({

  devtools: {
    enabled: true,
  },

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
    viewTransition: true,
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
    // '@vite-pwa/nuxt',
    'nuxt-headlessui',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@pinia-plugin-persistedstate/nuxt',
  ],

  ogImage: {
    fonts: [
      'Noto+Sans+Hebrew:400',
      'Noto+Sans+Bengali:400',
      'Noto+Sans+Thai:400',
      // 'Noto+Sans+Kr:400',
      'Noto+Sans+Georgian:400',
      'Mukta+Vaani:400',
      'Padauk:400',
      'Roboto:400',
      'Cairo:400',
      'Khmer:400',
      'Hind:400',
      // add support: te, ta, si, or, ml, lo, kn, hy
    ],
  },

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
      // siteUrl: 'https://sabbath-school-nuxt-ogpi.vercel.app',
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
