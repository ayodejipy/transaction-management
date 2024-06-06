<script setup lang="ts">
const route = useRoute()

const pageTitle = computed(() => route.meta.title)
</script>

<template>
    <div class="min-h-screen flex">
        <AppSidebar />

        <div class="w-full flex-1">
            <AppHeader :pageTitle />
            <main class="py-10">
                <div class="px-4 sm:px-6">
                    <slot />
                </div>
            </main>
        </div>
    </div>
</template>
