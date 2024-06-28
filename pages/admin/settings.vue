<script setup lang="ts">
// const route = useRoute()
// const router = useRouter()

useHead({
    title: 'Settings'
})

definePageMeta({
    key: (route) => route.fullPath,
    title: 'Settings',
    middleware: ['auth', 'admin']
})

const ADMIN_PATH = '/admin'
// const appendedUrl = computed(() => route.path.startsWith(ADMIN_PATH) ? ADMIN_PATH : '')

const links = [
    {
        label: 'Categories',
        icon: 'i-heroicons-chart-bar',
        to: `${ADMIN_PATH}/settings/categories`,
    },
    {
        label: 'Types',
        icon: 'i-heroicons-chart-bar',
        to: `${ADMIN_PATH}/settings/types`,
    },
    {
        label: 'User Management',
        icon: 'i-heroicons-chart-bar',
        to: `${ADMIN_PATH}/settings/users`,
    }
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
