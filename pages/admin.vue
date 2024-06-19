<script setup lang="ts">
definePageMeta({
    key: (route) => route.fullPath,
    title: 'Reports',
    middleware: ['auth', 'admin']
})

</script>

<template>
    <section class="w-full">
        <NuxtPage />
    </section>
</template>