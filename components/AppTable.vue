<script setup lang="ts">

interface IProps {
    columns: []
	data: []
    paginate: boolean
}

withDefaults(defineProps<IProps>(), {
    columns: () => [],
	data: () => [],
    paginate: true
})

const columns = [
    {
        key: 'id',
        label: 'Transaction ID',
    },
    {
        key: 'type',
        label: 'Transaction Type',
    },
    {
        key: 'category',
        label: 'Transaction Category',
    },
    {
        key: 'date',
        label: 'Transaction Date',
    },
    {
        key: 'amount',
        label: 'Amount',
    },
    {
        key: 'description',
        label: 'Description',
    },
]

const transactions = [
    {
        id: 1233,
        type: 'Income',
        category: 'Charity',
        date: '13/05/2024',
        amount: '$10,000',
        description: 'Books and stationery supplies',
    },
    {
        id: 1234,
        type: 'Expenditure',
        category: 'Charity',
        date: '13/05/2024',
        amount: '$10,000',
        description: 'Books and stationery supplies',
    },
    {
        id: 1235,
        type: 'Expenditure',
        category: 'Charity',
        date: '13/05/2024',
        amount: '$10,000',
        description: 'Books and stationery supplies',
    },
    {
        id: 1236,
        type: 'Expenditure',
        category: 'Charity',
        date: '13/05/2024',
        amount: '$10,000',
        description: 'Books and stationery supplies',
    },
]

// Pagination
const page = ref<number>(1)
const pageCount = ref<number>(5)
const pageTotal = ref<number>(20) // This value should be dynamic coming from the API
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1)
const pageTo = computed(() => Math.min(page.value * pageCount.value, pageTotal.value))

const rows = computed<[]>(() => {
  return data.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})
</script>

<template>
	<UCard
        :ui="{
            ring: '',
            body: {
                padding: 'px-0 sm:p-0'
            }
        }"
    >
		<UTable 
			:columns 
			:rows="data"
			class="w-full"
			:ui="{
				th: {
					base: 'bg-[#F9FAFB]',
					padding: 'px-8 py-3.5',
					color: 'text-brand-gray dark:text-white',
					font: 'font-medium',
					size: 'text-sm'
				},
				td: {
					padding: 'px-8 py-6',
					color: 'text-gray-500 dark:text-gray-400',
					font: 'font-light',
					size: 'text-sm',
				},
			}" 
		/>

		<div v-if="paginate" class="flex px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
			<UPagination v-model="page" :page-count="pageCount" :total="data.length" />
		</div>
	</UCard>
</template>
