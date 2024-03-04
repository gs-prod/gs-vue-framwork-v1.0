// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ["@element-plus/nuxt"],
  // elementPlus: { /** Options */ }
  plugins: [
    {
      src: "~/plugins/element-plus",
    },
  ],
});
