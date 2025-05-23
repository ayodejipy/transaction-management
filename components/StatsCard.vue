<script setup lang="ts">
    defineProps<{
        stats: {
            title: string
            figure: number | string
        }
    }>()
</script>

<template>
    <div
        class="relative bg-white dark:bg-gray-800 shadow-xs border border-gray-100 dark:border-gray-600 rounded-lg px-4 py-5 sm:px-6"
    >
        <div class="absolute top-px right-0.5">
            <img
                class="w-full h-full object-cover"
                src="~/assets/looper_bg.svg"
                alt="background illustration"
            />
        </div>
        <div class="flex">
            <div class="min-w-0 flex-1 space-y-3.5">
                <p
                    class="text-sm font-medium text-dark-gray dark:text-gray-400"
                >
                    {{ stats.title }}
                </p>
                <p
                    class="text-3xl font-semibold text-brand-gray dark:text-gray-200"
                >
                    {{ stats.figure }}
                </p>
            </div>
        </div>
    </div>
</template>
