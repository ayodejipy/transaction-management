<script setup lang="ts">
    const props = withDefaults(
        defineProps<{
            isRemovable?: boolean
            index: number
        }>(),
        {
            isRemovable: true,
        }
    )
    const emit = defineEmits<{
        (e: 'remove', value: number): void
    }>()

    const modelValue = defineModel<string>()

    function onDelete() {
        emit('remove', props.index)
    }
</script>

<template>
    <div
        class="relative flex items-center gap-2 sm:gap-3 mb-2.5"
        :data-index="index"
    >
        <UInput v-model="modelValue" class="w-full" />
        <UButton
            v-if="isRemovable"
            icon="i-heroicons-x-mark"
            dynamic
            size="xs"
            color="gray"
            variant="ghost"
            :ui="{ rounded: 'rounded-full' }"
            @click="onDelete"
        />
    </div>
</template>
