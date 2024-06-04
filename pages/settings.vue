<script setup lang="ts">
const route = useRoute()

definePageMeta({
    key: (route) => route.fullPath,
})

const links = [
    {
        label: 'Account',
        icon: 'i-heroicons-home',
        to: '/settings/account',
    },
    {
        label: 'User Management',
        icon: 'i-heroicons-chart-bar',
        to: '/settings/users',
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
