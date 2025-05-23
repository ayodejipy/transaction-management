<script setup lang="ts">
    definePageMeta({
        key: (route) => route.fullPath,
        title: 'Reports',
        middleware: ['auth', 'admin'],
    })
</script>

<template>
    <NuxtPage />
</template>
