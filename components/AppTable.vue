<script setup lang="ts">
import type { IColumn } from '~/types';

interface IProps {
    columns: IColumn[]
    data: []
    paginate?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
    columns: () => [],
    data: () => [],
    paginate: true,
})

// Pagination
const page = ref<number>(1)
const pageCount = ref<number>(5)
// const pageTotal = ref<number>(20) // This value should be dynamic coming from the API
// const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1)
// const pageTo = computed(() =>
//     Math.min(page.value * pageCount.value, pageTotal.value)
// )

const rows = computed(() => {
    return props.data.slice(
        (page.value - 1) * pageCount.value,
        page.value * pageCount.value
    )
})
</script>

<template>
    <UCard
        :ui="{
            ring: '',
            body: {
                padding: 'px-0 sm:p-0',
            },
        }"
    >
        <UTable
            :columns
            :rows
            class="w-full"
            :ui="{
                th: {
                    base: 'bg-[#F9FAFB]',
                    padding: 'px-8 py-3.5',
                    color: 'text-brand-gray dark:text-white',
                    font: 'font-medium',
                    size: 'text-sm',
                },
                td: {
                    padding: 'px-8 py-6',
                    color: 'text-gray-500 dark:text-gray-400',
                    font: 'font-light',
                    size: 'text-sm',
                },
            }"
        />

        <div
            v-if="paginate"
            class="w-full flex px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
        >
            <UPagination
                v-model="page"
                :ui="{
                    wrapper: 'w-full flex items-center',
                }"
                :page-count="pageCount"
                :total="data.length"
            >
                <template #prev="{ onClick }">
                    <UTooltip text="Previous page">
                        <UButton
                            icon="i-heroicons-arrow-small-left-20-solid"
                            color="primary"
                            :ui="{ rounded: 'rounded-full' }"
                            class="rtl:[&_span:first-child]:rotate-180 me-2"
                            @click="onClick"
                        >
                            Previous
                        </UButton>
                    </UTooltip>
                </template>
                <template #next="{ onClick }">
                    <UTooltip text="Next page">
                        <UButton
                            icon="i-heroicons-arrow-small-right-20-solid"
                            color="primary"
                            :ui="{ rounded: 'rounded-full' }"
                            class="rtl:[&_span:last-child]:rotate-180 ms-2"
                            @click="onClick"
                        >
                            Next
                        </UButton>
                    </UTooltip>
                </template>
                23456666
            </UPagination>
        </div>
    </UCard>
</template>
