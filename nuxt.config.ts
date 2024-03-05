// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  devtools: { enabled: true },

  modules: ["@element-plus/nuxt", "@pinia/nuxt"],

  // elementPlus: { /** Options */ }
  plugins: [
    {
      src: "~/plugins/element-plus",
    },
  ],

  runtimeConfig: {
    // apiSecret: process.env.NUXT_API_SECRET,
    public: {
      // apiBase: process.env.NUXT_PUBLIC_API_BASE || SERVER_BASE_API,
      apiBase: "http://localhost:3000",
    },
  },

  nitro: {
    devProxy: {
      "/api/": {
        // target: process.env.API_TARGET,
        target: "http://localhost:8081/api",
        changeOrigin: true,
      },
    },
  },
});
