// https://nuxt.com/docs/api/configuration/nuxt-config
const load = require("./env");
load();

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
    // apiSecret: process.env.API_SECRET,
    public: {
      apiBase: process.env.BASE_URL,
    },
  },

  nitro: {
    devProxy: {
      "/api/": {
        target: process.env.API_URL,
        changeOrigin: true,
      },
    },
  },

  build: {
    transpile: ["echarts", "zrender", "tslib"],
  },
});
