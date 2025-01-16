// https://nuxt.com/docs/api/configuration/nuxt-config

import Aura from "@primevue/themes/aura";

export default defineNuxtConfig({
  runtimeConfig: {
    apiSecret: "", // can be overridden by NUXT_API_SECRET environment variable
    public: {
      apiBase: "" || "http://localhost:5000",
      urlBase: "" || "http://localhost:3000",
    },
    //NUXT_API_BACKEND_URL
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@primevue/nuxt-module", "@pinia/nuxt"],
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },
  pages: true,
  srcDir: "src/",

  components: {
    dirs: [
      {
        path: "~/components",
        pathPrefix: false,
      },
    ],
  },


  css: [
    "./src/styles/index.scss",
    './src/styles/main.css'
  ],

  build: {
    loaders: {
      scss: {
        implementation: require('sass'), // Asegúrate de usar la implementación correcta de Sass
      },
    },
  },
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});