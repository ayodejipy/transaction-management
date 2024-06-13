<script setup lang="ts">
const route = useRoute()

const pageTitle = computed<string>(() => route.meta.title as string)

const { accessToken, TOKEN_KEY } = storeToRefs(useAuthStore())

if (import.meta.client) {
    const tokenKey = unref(TOKEN_KEY)
    const defaultValue = localStorage.getItem(tokenKey) as string
    accessToken.value = defaultValue
}
</script>

<template>
    <div class="min-h-screen flex">
        <AppSidebar />

        <div class="w-full flex-1">
            <AppHeader :page-title />
            <main class="py-10">
                <div class="px-4 sm:px-6">
                    <slot />
                </div>
            </main>
        </div>
    </div>
</template>
