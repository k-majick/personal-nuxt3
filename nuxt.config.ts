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
          content: '#ffffff',
        },
        {
          name: 'theme-color',
          content: '#ffffff',
        },
        {
          property: 'og:image',
          content: '/clf-og-min.png',
        },
      ],
      link: [
        {
          rel: 'icon',
          sizes: '32x32',
          type: 'image/png',
          href: '/favicon-32.png',
        },
        {
          rel: 'icon',
          sizes: '128x128', // android
          href: '/favicon-128.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180', // safari
          href: '/favicon-180.png',
        },
        {
          rel: 'icon',
          sizes: '192x192', // android-chrome
          href: '/favicon-192.png',
        },
        {
          rel: 'icon',
          sizes: '228x228', // opera
          href: '/favicon-228.png',
        },
        {
          rel: 'mask-icon',
          href: '/safari-pinned-tab.svg',
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
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL || 'http://localhost:3000',
    appName: process.env.APP_NAME,
    appTitle: process.env.APP_TITLE,
  },
  build: {
    transpile: ['@apollo/client', 'ts-invariant/process'],
  },
  buildModules: ['@pinia/nuxt'],
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
