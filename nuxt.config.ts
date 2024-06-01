import eslint from "vite-plugin-eslint";

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
          charset: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        { 
          name: "msapplication-TileColor",
          content: "#b91d47",
        },
        {
          name: "theme-color",
          content: "#ffffff",
        },
        {
          property: "og:image",
          content: "/clf-og-min.png",
        },
        {
          name: "application-name",
          content: `${process.env.APP_NAME}`,
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
        {
          rel: "icon",
          sizes: "16x16",
          type: "image/png",
          href: "/favicon-16x16.png",
        },
        {
          rel: "icon",
          sizes: "32x32",
          type: "image/png",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          sizes: "192x192",
          type: "image/png",
          href: "/android-chrome-192x192.png",
        },
        {
          rel: "icon",
          sizes: "228x228",
          type: "image/png",
          href: "/favicon-228x228.png",
        },
        {
          rel: "icon",
          sizes: "512x512",
          type: "image/png",
          href: "/android-chrome-512x512.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/favicon-180x180.png",
        },
        {
          rel: "mask-icon",
          href: "/safari-pinned-tab.svg",
          color: "#ffffff",
        },
        {
          rel: "manifest",
          href: "/site.webmanifest",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Exo+2:wght@200;500&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200;300;600&display=swap",
        },
      ],
    },
  },
  modules: ["@pinia/nuxt"],
  router: {
    options: {
      linkActiveClass: "active",
      linkExactActiveClass: "active",
    },
  },
  runtimeConfig: {
    public: {
      appName: process.env.APP_NAME,
      appTitle: process.env.APP_TITLE,
      appEmail: process.env.APP_EMAIL,
      apiUrl: process.env.API_URL,
    },
  },
  vite: {
    plugins: [eslint()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/_variables.scss";',
        },
      },
    },
  },
  css: ["@/assets/scss/_global.scss"],
  plugins: ['@/plugins/apollo-client.js'],
});
