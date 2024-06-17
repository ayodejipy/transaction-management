<script setup lang="ts">
const { user } = storeToRefs(useUserStore())

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Transaction Management` : 'Transaction Management';
  }
})

onMounted(() => console.log({ user }))
</script>

<template>
    <div class="min-h-screen font-inter">
        <NuxtLoadingIndicator />

        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>

        <UNotifications />
    </div>
</template>
