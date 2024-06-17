<script setup lang="ts">
const route = useRoute()
// const router = useRouter()

useHead({
    title: 'Settings'
})

definePageMeta({
    key: (route) => route.fullPath,
    title: 'Settings',
    middleware: ['auth']
})

const ADMIN_PATH = '/admin'
const appendedUrl = computed(() => route.path.startsWith(ADMIN_PATH) ? ADMIN_PATH : '')

const links = [
    {
        label: 'Categories',
        icon: 'i-heroicons-chart-bar',
        to: `${appendedUrl.value}/settings/categories`,
    },
    {
        label: 'Types',
        icon: 'i-heroicons-chart-bar',
        to: `${appendedUrl.value}/settings/types`,
    },
    {
        label: 'User Management',
        icon: 'i-heroicons-chart-bar',
        to: `${appendedUrl.value}/settings/users`,
    }
]

// onMounted(() => router.push(links[0].to))
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
