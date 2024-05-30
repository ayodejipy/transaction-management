// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            bodyAttrs: {
                class: 'h-full bg-white'
            }
        }
    },
    devtools: { enabled: true },
    modules: [
        '@nuxt/eslint',
        '@pinia/nuxt',
        '@nuxt/ui',
        '@nuxtjs/color-mode',
        '@nuxtjs/tailwindcss',
        'nuxt-icon',
    ],
    // eslint: {
    //   lintOnStart: false,
    // },
})
