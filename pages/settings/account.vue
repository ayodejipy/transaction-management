<script setup lang="ts">
const route = useRoute()

const props = defineProps(['foobar'])

console.log(props.foobar)
</script>

<template>
    <section class="w-full">
        <p class="font-semibold text-2xl text-center my-3">
            Account settings page...work in progress
        </p>
    </section>
</template>
