import eslint from 'vite-plugin-eslint'

export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  ssr: false,
  app: {
    head: {
      title: `${process.env.APP_NAME} | ${process.env.APP_TITLE}`,
      meta: [
        {
          charset: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'msapplication-TileColor',
          content: '#b91d47',
        },
        {
          name: 'theme-color',
          content: '#ffffff',
        },
        {
          property: 'og:image',
          content: '/clf-og-min.png',
        },
        {
          name: 'application-name',
          content: `${process.env.APP_NAME}`,
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
        {
          rel: 'icon',
          sizes: '16x16',
          type: 'image/png',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'icon',
          sizes: '32x32',
          type: 'image/png',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          sizes: '192x192',
          type: 'image/png',
          href: '/android-chrome-192x192.png',
        },
        {
          rel: 'icon',
          sizes: '228x228',
          type: 'image/png',
          href: '/favicon-228x228.png',
        },
        {
          rel: 'icon',
          sizes: '512x512',
          type: 'image/png',
          href: '/android-chrome-512x512.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/favicon-180x180.png',
        },
        {
          rel: 'mask-icon',
          href: '/safari-pinned-tab.svg',
          color: '#ffffff',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Exo+2:wght@200;500&display=swap',
        },
      ],
    },
  },
  runtimeConfig: {
    apiUrl: process.env.API_URL || 'http://localhost:3000',
    appName: process.env.APP_NAME,
    appTitle: process.env.APP_TITLE,
  },
  build: {
    transpile: ['@apollo/client', 'ts-invariant/process'],
  },
  modules: ['@pinia/nuxt'],
  router: {
    options: {
      linkActiveClass: 'active',
      linkExactActiveClass: 'active',
    },
  },
  vite: {
    plugins: [eslint()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/_global.scss";',
        },
      },
    },
  },
})
