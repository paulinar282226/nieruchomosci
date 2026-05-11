// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@vite-pwa/nuxt'],
  css: ['~/assets/scss/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['if-function'],
        },
      },
    },
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit'],
    },
  },
  app: {
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap',
        },
      ],
    },
  },
  pwa: {
    manifest: {
      name: 'nieruchomości-online.pl',
      short_name: 'Nieruchomości',
      description: 'Portal ogłoszeń nieruchomości',
      theme_color: '#3273dc',
      background_color: '#ffffff',
      display: 'standalone',
      scope: '/',
      start_url: '/',
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/icon-maskable-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: '/icon-maskable-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico,webp,woff,woff2}'],
      globIgnores: ['**/node_modules/**/*', '.nuxt/**/*'],
      navigateFallback: '/',
      cacheId: 'nieruchomosci-online',
      runtimeCaching: [
        {
          urlPattern: '^https://fonts.(?:googleapis|gstatic).com/.*',
          handler: 'CacheFirst',
          method: 'GET',
          options: {
            cacheName: 'google-fonts',
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 365 * 24 * 60 * 60,
            },
          },
        },
        {
          urlPattern: '^https://images.unsplash.com/.*',
          handler: 'CacheFirst',
          method: 'GET',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 60 * 60 * 24 * 30,
            },
          },
        },
      ],
    },
    registerType: 'autoUpdate',
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico,webp}'],
    },
  },
})
