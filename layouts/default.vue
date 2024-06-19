<script setup lang="ts">
const route = useRoute()

const pageTitle = computed<string>(() => route.meta.title as string)
</script>

<template>
    <div class="min-h-screen flex">
        <AppSidebar />

        <div class="lg:pl-72 w-full flex-1">
            <AppHeader :page-title />
            <main class="py-10">
                <div class="px-4 sm:px-6">
                    <slot />
                </div>
            </main>
        </div>
    </div>
</template>
