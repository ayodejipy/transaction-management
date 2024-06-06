<script setup lang="ts">
const route = useRoute()

definePageMeta({
    key: (route) => route.fullPath,
    title: 'Settings'
})

const links = [
    {
        label: 'Account',
        icon: 'i-heroicons-home',
        to: '/settings',
    },
    {
        label: 'User Management',
        icon: 'i-heroicons-chart-bar',
        to: '/settings/users',
    },
    {
        label: 'Categories',
        icon: 'i-heroicons-chart-bar',
        to: '/settings/categories',
    },
    {
        label: 'Types',
        icon: 'i-heroicons-chart-bar',
        to: '/settings/types',
    },
]
</script>

<template>
    <section class="w-full">
        <UHorizontalNavigation
            :links="links"
            class="border-b border-gray-200 dark:border-gray-800"
        />

        <NuxtPage />
    </section>
</template>
