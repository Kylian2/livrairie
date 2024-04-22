// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true }, 
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      baseUrl: process.env.NODE_ENV === "production" ? "http://165.232.117.216:3333" : "http://localhost:3333"
    }
  }
})
