// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    colorMode: {
        preference: 'light',
    },
    ui: {
        icons: ['ri', 'ci']
    },
    app: {
        head: {
            htmlAttrs: {
                class: 'h-full',
            },
            bodyAttrs: {
                class: 'h-screen bg-white dark:bg-gray-800 text-base',
            },
            link: [
                {
                    rel: 'preconnect',
                    href: 'https://fonts.googleapis.com',
                },
                {
                    rel: 'preconnect',
                    href: 'https://fonts.gstatic.com',
                },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap',
                    crossorigin: '',
                },
            ],
        },
    },
    devtools: { enabled: true },
    modules: [
        '@nuxt/eslint',
        '@pinia/nuxt',
        '@nuxt/ui',
        '@nuxtjs/color-mode',
        '@nuxtjs/tailwindcss',
        'nuxt-icon',
        '@nuxtjs/google-fonts',
    ],
    // googleFonts: {
    //     families: {
    //         Inter: '100..900',
    //     },
    // },
    // eslint: {
    //   lintOnStart: false,
    // },
})
