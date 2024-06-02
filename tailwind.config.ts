/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    content: [
        './components/**/*.{js,vue,ts}',
        './composables/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
    ],
    theme: {
        extend: {
            fontFamily: {
                inter: ['"Inter"', 'sans-serif'],
            },
            colors: {
                'brand-gray': '#101828',
                'brand-green': '#17B26A',
                'icon-gray': '#292D32',
                'dark-gray': '#475467',
                'light-gray': '#D0D5DD',
            },
        },
    },
    plugins: [],
}
