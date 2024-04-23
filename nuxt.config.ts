// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  build: {
    transpile: ["vuetify"],
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],

  css: [
    "@/assets/css/main.scss",
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  tailwindcss: {
    configPath: "tailwind.config",
    exposeConfig: {
      level: 2,
    },
    config: {},
    viewer: true,
  },
  colorMode: {
    preference: "coffee", 
    dataValue: "theme",
    classSuffix: "",
  },
});
