<script
    setup
    lang="ts"
    generic="T extends Record<string, string | number | boolean>"
>
import type { IColumn, ITransaction, IPaging } from '~/types'

interface IProps {
    columns: IColumn[]
    data: T[]
    loading?: boolean
    paginate?: boolean
    selectable?: boolean
    paging?: IPaging
}

const props = withDefaults(defineProps<IProps>(), {
    columns: () => [],
    data: () => [],
    loading: false,
    paginate: true,
    selectable: false,
    paging: () => defaultPaging,
})

const emit = defineEmits<{
    (e: 'select', value: ITransaction): void
    (e: 'onClickNext' | 'onClickPrev'): void
    (e: 'onPageClick', value: number): void
}>()

// Pagination
const paging = computed(() => props.paging)

// const page = ref<number>(paging.value.pageIndex)
// const pageCount = ref<number>(paging.value.pageSize)

// const rows = computed(() => {
//     return props.data.slice(
//         (paging.value.pageIndex - 1) * pageCount.value,
//         paging.value.pageIndex* paging.value.pageSize
//     )
// })
const rows = computed(() => props.data)

const tableUi = computed(() => ({
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
}))

function onSelect(event: Event) {
    const row = event as unknown as ITransaction
    emit('select', row)
}

function onClickNext() {
    if (paging.value.hasNextPage) {
        emit('onClickNext')
    }
}

function onClickPrev() {
    if (paging.value.hasPreviousPage) {
        emit('onClickPrev')
    }
}

watch(paging, (_updated) => {
    emit('onPageClick', _updated.pageIndex)
})

onUnmounted(() => {
    window.removeEventListener('select', onSelect)
    window.removeEventListener('onClickPrev', onClickPrev)
    window.removeEventListener('onClickNext', onClickNext)
    // window.removeEventListener('onPageClick')
})
</script>

<script lang="ts">
export const defaultPaging: IPaging = {
    pageIndex: 1,
    pageSize: 5,
    totalPages: 2,
    totalItems: 10,
    hasPreviousPage: false,
    hasNextPage: false,
}
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
            v-if="props.selectable"
            :columns
            :rows
            :loading
            class="w-full"
            :ui="tableUi"
            @select="onSelect"
        >
            <template v-if="$slots.actions" #actions-data="{ row }">
                <slot name="actions" :row="row" />
            </template>
        </UTable>
        <UTable v-else :columns :rows :loading class="w-full" :ui="tableUi">
            <template v-if="$slots.actions" #actions-data="{ row }">
                <slot name="actions" :row="row" />
            </template>
        </UTable>

        <div
            v-if="paginate"
            class="w-full flex px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
        >
            <UPagination
                v-model="paging.pageIndex"
                :ui="{
                    wrapper: 'w-full flex items-center',
                }"
                :page-count="paging.pageSize"
                :total="paging.totalItems"
            >
                <template #prev>
                    <UTooltip text="Previous page">
                        <UButton
                            icon="i-heroicons-arrow-small-left-20-solid"
                            color="primary"
                            :ui="{ rounded: 'rounded-lg' }"
                            :disabled="!paging.hasPreviousPage"
                            class="rtl:[&_span:first-child]:rotate-180 me-2"
                            @click="onClickPrev"
                        >
                            Previous
                        </UButton>
                    </UTooltip>
                </template>
                <template #next>
                    <UTooltip text="Next page">
                        <UButton
                            icon="i-heroicons-arrow-small-right-20-solid"
                            trailing
                            color="primary"
                            :ui="{ rounded: 'rounded-lg' }"
                            :disabled="!paging.hasNextPage"
                            class="rtl:[&_span:last-child]:rotate-180 ms-2"
                            @click="onClickNext"
                        >
                            Next
                        </UButton>
                    </UTooltip>
                </template>
            </UPagination>
        </div>
    </UCard>
</template>
