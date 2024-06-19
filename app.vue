<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Transaction Management` : 'Transaction Management';
  }
})
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
