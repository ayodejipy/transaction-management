<script setup lang="ts">
import { format } from 'date-fns'
import type {
    IColumn,
    IDaysOptionFilter,
    ITransaction,
    ITransactionsData,
} from '~/types'

definePageMeta({
    title: 'Transactions',
    middleware: ['auth', 'admin'],
})

const { $dayjs } = useNuxtApp()
const router = useRouter()

const { isAdmin } = storeToRefs(useUserStore())

const correctPageTitle = computed(() =>
    isAdmin.value ? 'Transactions' : 'Dashboard'
)

useHead({
    title: correctPageTitle,
})

const searchTerm = ref<string>('')
const page = ref<number>(1)
const selected = ref({
    start: '' as unknown as Date,
    end: '' as unknown as Date,
})

const { transactions, transaction } = storeToRefs(useTransactionStore())
const transactionsUrl = useEndpoints('transactionsUrl')

const newTransactionUrl = computed(() => {
    const params = new URLSearchParams()

    if (searchTerm.value) params.append('SearchQuery', searchTerm.value)
    if (selected.value.start && selected.value.end) {
        params.append('FromDate', selected.value.start.toISOString())
        params.append('ToDate', selected.value.end.toISOString())
    }
    if (page.value) params.append('PageIndex', page.value.toString())

    return `${transactionsUrl}?${params.toString()}`
})

const {
    pending: loading,
    data,
    refresh,
} = await useAppFetch<ITransactionsData>(() => newTransactionUrl.value, {
    pick: ['content', 'paging', 'status'],
})

const shouldPaginate = computed(() => !!data.value?.paging)

const dataForTable = computed(() =>
    data.value?.content?.map((transaction: ITransaction) => ({
        id: transaction.id,
        typeName: transaction.typeName,
        categoryName: transaction.categoryName,
        transactionDateUtc: $dayjs(transaction.transactionDateUtc).format(
            'DD/MM/YYYY'
        ),
        amount: formatCurrency(transaction.amount as number),
        description: transaction.description,
    }))
)

// const hasPagination = computed(() => !!data.value?.paging)
const isOpenAddTransaction = ref<boolean>(false)
const isViewTransaction = ref<boolean>(false)

const columns: IColumn[] = [
    {
        key: 'id',
        label: 'Transaction ID',
    },
    {
        key: 'typeName',
        label: 'Transaction Type',
    },
    {
        key: 'categoryName',
        label: 'Transaction Category',
    },
    {
        key: 'transactionDateUtc',
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
    { key: 'actions' },
]

const uiConfig = computed(() => ({
    placeholder: 'text-icon-gray dark:text-gray-500',
    rounded: 'rounded-full',
    color: {
        white: {
            outline:
                'shadow-sm bg-white dark:bg-gray-900 text-black dark:text-white ring-1 ring-inset ring-light-gray dark:ring-gray-700 focus:ring-2 focus:ring-gray-600 dark:focus:ring-gray-300',
        },
    },
    icon: {
        base: 'text-icon-gray dark:text-gray-500',
    },
}))

// days filters i.e 'Past 30days'
const daysOption = ref<string>('')
const daysOptionFilter = computed<IDaysOptionFilter[]>(() => [
    {
        label: 'Past 30 days',
        value: $dayjs().subtract(30, 'days'),
    },
    {
        label: 'Past week',
        value: $dayjs().subtract(7, 'days'),
    },
    {
        label: 'Past 6 months',
        value: $dayjs().subtract(6, 'months'),
    },
])

// Transactions filter i.e: Income, Expenditure
const handleExport = () => {
    console.log('click')
}

function $clearFilters() {
    searchTerm.value = ''
    selected.value.start = '' as unknown as Date
    selected.value.end = '' as unknown as Date
}

function onSelect(row: ITransaction) {
    transaction.value = row
    router.push(`${isAdmin.value ? '/admin' : ''}/transactions/${row.id}`)
}

function getNextList() {
    if (data.value?.paging?.hasNextPage) {
        page.value++
    }
}
function getPrevList() {
    if (data.value?.paging?.hasPreviousPage) {
        page.value--
    }
}
function getClickedPage(value: number) {
    page.value = toRef(value).value
}

watch(
    data,
    async (newData) => {
        if (newData && newData.content) {
            transactions.value = newData.content as ITransaction[]
        } else {
            await refresh()
        }
    },
    { immediate: true }
)
</script>

<template>
    <section class="w-full">
        <section class="flex justify-end items-center">
            <button
                type="button"
                class="flex items-center gap-2 bg-brand-green text-white rounded-lg px-4 py-2.5"
                @click="isOpenAddTransaction = true"
            >
                <Icon name="i-mage-file-upload" />
                Add new transaction
            </button>
        </section>

        <!-- transactions table -->
        <section
            class="bg-white rounded-lg border border-gray-100 mt-6 space-y-3"
        >
            <div class="flex justify-between items-center py-8 px-6">
                <div class="flex items-center gap-2">
                    <h3 class="font-semibold text-xl">All Transactions</h3>
                    <UBadge
                        color="green"
                        variant="subtle"
                        :ui="{
                            rounded: 'rounded-full',
                        }"
                    >
                        {{ transactions.length }}
                    </UBadge>
                </div>
                <div class="flex items-center gap-2.5">
                    <UInput
                        v-model.lazy="searchTerm"
                        :ui="{
                            rounded: 'rounded-full',
                            icon: {
                                base: 'text-icon-gray dark:text-gray-500',
                            },
                        }"
                        icon="i-ri-search-2-line"
                        size="lg"
                        color="white"
                        trailing
                        placeholder="Search..."
                    />
                    <USelect
                        v-model="daysOption"
                        icon="i-heroicons-calendar"
                        color="white"
                        size="lg"
                        padding="lg"
                        :options="daysOptionFilter"
                        placeholder="Past 30 days"
                        :ui="uiConfig"
                    />
                    <!-- <USelect
                        color="white"
                        size="lg"
                        padding="lg"
                        :options="['United States', 'Canada', 'Mexico']"
                        placeholder="Date Range"
                        :ui="uiConfig"
                    /> -->

                    <UPopover>
                        <UButton
                            icon="i-heroicons-calendar-days-20-solid"
                            size="lg"
                            color="white"
                            variant="outline"
                            :ui="{ rounded: 'rounded-full' }"
                        >
                            <span v-if="selected.start && selected.end">
                                {{ format(selected.start, 'd MMM, yyy') }} -
                                {{ format(selected.end, 'd MMM, yyy') }}
                            </span>
                            <span v-else>Date Range</span>
                        </UButton>

                        <template #panel="{ close }">
                            <DatePicker
                                v-model="selected"
                                is-required
                                @close="close"
                            />
                        </template>
                    </UPopover>

                    <USelect
                        trailing-icon="i-ci-filter-off-outline"
                        color="white"
                        size="lg"
                        padding="lg"
                        :options="['Charity', 'Expenditure', 'Income']"
                        placeholder="All Transactions"
                        :ui="uiConfig"
                    />

                    <UButton
                        color="white"
                        variant="outline"
                        size="lg"
                        :ui="{
                            font: 'font-normal',
                            rounded: 'rounded-full',
                            color: {
                                white: {
                                    outline:
                                        'shadow-sm bg-white dark:bg-gray-900 text-icon-gray dark:text-white ring-1 ring-inset ring-light-gray dark:ring-gray-700 focus:ring-2 focus:ring-gray-600 dark:focus:ring-gray-300',
                                },
                            },
                        }"
                        @click="handleExport"
                    >
                        <template #leading>
                            <Icon
                                name="i-line-md-downloading-loop"
                                class="w-4 h-4"
                            />
                        </template>
                        Export
                    </UButton>
                    <UButton
                        icon="i-heroicons-x-mark"
                        dynamic
                        size="xs"
                        color="gray"
                        variant="ghost"
                        :ui="{ rounded: 'rounded-full' }"
                        @click="$clearFilters"
                    >
                        Clear filters
                    </UButton>
                </div>
            </div>

            <AppTable
                :loading
                :columns
                :data="dataForTable"
                :selectable="true"
                :paginate="shouldPaginate"
                :paging="data?.paging"
                @select="onSelect"
                @on-click-next="getNextList"
                @on-click-prev="getPrevList"
                @on-page-click="getClickedPage"
            >
                <!-- <template #actions="{ row }">
                    <UDropdown :items="actionsOption(row)">
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-ellipsis-horizontal-20-solid"
                        />
                    </UDropdown>
                </template> -->
            </AppTable>
        </section>

        <AddTransactionDrawer v-model="isOpenAddTransaction" :refresh />
        <TransactionDetailDrawer v-model="isViewTransaction" />
    </section>
</template>
