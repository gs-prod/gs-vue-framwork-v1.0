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
