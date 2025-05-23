// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    nitro: {
        preset: 'netlify',
    },
    runtimeConfig: {
        public: {
            apiBaseURL: process.env.NUXT_PUBLIC_API_BASE,
        },
    },
    ssr: false,
    colorMode: {
        preference: 'light',
    },
    ui: {
        icons: ['ri', 'ci'],
    },
    imports: {
        dirs: ['utils/**'],
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
    hooks: {
        'pages:extend'(pages) {
            pages.push(
                {
                    name: 'admin-transactions',
                    path: '/admin/transactions',
                    file: '~/pages/transactions/index.vue',
                },
                {
                    name: 'admin-transaction-view',
                    path: '/admin/transactions/:id',
                    file: '~/pages/transactions/[id].vue',
                }
            )
        },
    },
    devtools: { enabled: true },
    modules: [
        '@nuxt/eslint',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        '@nuxt/ui',
        '@nuxtjs/color-mode',
        '@nuxtjs/tailwindcss',
        'nuxt-icon',
        '@nuxtjs/google-fonts',
    ],
})
