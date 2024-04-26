// {
//     "plugins": ["eslint-plugin-nuxt"],
//     "extends": [
//         "@nuxt/eslint-config", // The same as @nuxt/eslint-config
//         "plugin:prettier/recommended",
//         "prettier"
//     ],
//     "rules": {}
// }

module.exports = [
    {
        root: true,
        ignores: ['**/*.config.js'],
        plugins: ['eslint-plugin-nuxt'],
        extends: [
            '@nuxt/eslint-config', // The same as @nuxt/eslint-config
            'plugin:prettier/recommended',
            'prettier',
        ],
    },
]
