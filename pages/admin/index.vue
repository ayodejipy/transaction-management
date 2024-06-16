<script setup lang="ts">
import type {
    IDataResponse,
    IMonthlyTotal,
    ITotalTransaction,
    ITransactionPercentage,
} from '~/types'

definePageMeta({
    title: 'Reports',
    middleware: 'auth',
})

const isOpenAddTransaction = ref<boolean>(false)

const categoryStore = useCategoryStore()
const typeStore = useTypeStore()

const revenueUrl = useEndpoints('totalRevenueUrl')
const totalStatsUrl = useEndpoints('totalStatsUrl')
const monthlyStatsUrl = useEndpoints('monthlyStatsUrl')
const creditDebitPercentageUrl = useEndpoints('percentageStatsUrl')

// Total revenue
const { pending: loadingRevenue, data: revenue } = await useAppFetch<
    IDataResponse<number | undefined>
>(revenueUrl, {
    lazy: true,
    pick: ['content'],
})
const totalRevenue = computed(() => formatCurrency(revenue.value?.content || 0))

// Totals e.g; credit, debit
const { pending: loadingStats, data: total } =
    await useAppFetch<ITotalTransaction>(totalStatsUrl, {
        pick: ['content'],
        lazy: true,
    })

const statistics = computed(() => [
    {
        title: 'All Transactions',
        figure: total.value?.content?.totalTransactions || 0,
    },
    {
        title: 'Credit Transactions',
        figure: formatCurrency(total.value?.content?.totalCredits || 0),
    },
    {
        title: 'Debit Transactions',
        figure: formatCurrency(total.value?.content?.totalDebits || 0),
    },
    {
        title: 'Net Amount',
        figure: formatCurrency(total.value?.content?.netTotal || 0),
    },
])

// Credit OR Debit transactions percentage (20%, 80%)
const { pending: loadingPercentage, data: totalPercentile } =
    await useAppFetch<ITransactionPercentage>(creditDebitPercentageUrl, {
        lazy: true,
    })

const series = computed(() => [
    totalPercentile.value?.content.totalCreditsPercentage || 0,
    totalPercentile.value?.content.totalDebitsPercentage || 0,
])

// Total transactions per month: Jan, Feb...
const { pending: loadingTransactions, data: totalPerMonth } =
    await useAppFetch<IMonthlyTotal>(monthlyStatsUrl, { lazy: true })

const monthsSeries = computed(() =>
    totalPerMonth.value?.content.map((month) => month.monthName)
)
const amountsSeries = computed(() =>
    totalPerMonth.value?.content.map((month) => month.netTotal.toString())
)

const isLoading = computed(
    () =>
        loadingRevenue.value ||
        loadingStats.value ||
        loadingPercentage.value ||
        loadingTransactions.value
)

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

const uiConfig = computed(() => ({
    divide: '',
    ring: 'ring-1 ring-gray-100 dark:ring-gray-800',
    header: {
        padding: 'px-0 sm:p-6',
    },
    body: {
        padding: 'px-0 sm:px-6',
    },
}))

onMounted(async () => {
    // transaction categories and types
    await categoryStore.getCategories()
    await typeStore.getTypes()
})
</script>

<template>
    <section class="w-full">
        <template v-if="!isLoading">
            <section class="flex justify-between items-center">
                <div class="">
                    <span class="text-gray-500 font-medium"
                        >Your total revenue</span
                    >
                    <p
                        class="text-4xl font-inter font-semibold text-brand-green"
                    >
                        {{ totalRevenue }}
                    </p>
                </div>
                <button
                    type="button"
                    class="flex items-center gap-2 bg-brand-green text-white rounded-lg px-4 py-2.5"
                    @click="isOpenAddTransaction = true"
                >
                    <Icon name="i-mage-file-upload" />
                    Upload new transaction
                </button>
            </section>

            <section class="grid grid-cols-4 gap-3 mt-6">
                <StatsCard
                    v-for="stats in statistics"
                    :key="stats.title"
                    :stats
                />
            </section>

            <!-- recent transaction table -->
            <section class="rounded-lg border border-gray-100 mt-6 space-y-3">
                <div class="flex justify-between items-center py-8 px-6">
                    <div class="flex items-center gap-2">
                        <h3 class="font-semibold text-xl">
                            Recent Transactions
                        </h3>
                        <UBadge
                            color="green"
                            variant="subtle"
                            :ui="{
                                rounded: 'rounded-full',
                            }"
                        >
                            10
                        </UBadge>
                    </div>
                    <ULink
                        to="/transactions"
                        active-class="text-primary"
                        inactive-class="text-sm text-green-500 font-semibold dark:text-gray-400 hover:text-green-600 dark:hover:text-gray-200"
                    >
                        View all
                    </ULink>
                </div>

                <AppTable :columns :data="transactions" />
            </section>

            <!-- analysis section -->
            <section class="flex gap-4 mt-6">
                <UCard :ui="{ ...uiConfig, base: 'flex-1 space-y-3' }">
                    <template #header>
                        <div class="flex items-center justify-between gap-2">
                            <h3 class="font-semibold text-xl">
                                Transaction Analytics
                            </h3>
                        </div>
                    </template>

                    <ChartsTransactionAnalytics
                        :categories="monthsSeries"
                        :series="amountsSeries"
                    />
                </UCard>

                <UCard
                    :ui="{
                        ...uiConfig,
                        base: 'w-full sm:w-1/4',
                    }"
                >
                    <template #header>
                        <div class="flex items-center">
                            <h3 class="font-semibold text-xl">
                                Transaction Summary
                            </h3>
                        </div>
                    </template>

                    <div class="mb-4">
                        <ChartsTransactionSummary :series />
                    </div>

                    <template #footer>
                        <div class="flex flex-col gap-4">
                            <UMeter color="black" :value="series[0]" :max="100">
                                <template #indicator="{ percent }">
                                    <div
                                        class="flex items-center justify-between text-sm text-right"
                                    >
                                        <span>Credit Transactions</span>
                                        <span>{{ Math.round(percent) }}%</span>
                                    </div>
                                </template>
                            </UMeter>
                            <UMeter :value="series[1]" :max="100">
                                <template #indicator="{ percent }">
                                    <div
                                        class="flex items-center justify-between text-sm text-right"
                                    >
                                        <span>Debit Transactions</span>
                                        <span>{{ Math.round(percent) }}%</span>
                                    </div>
                                </template>
                            </UMeter>
                        </div>
                    </template>
                </UCard>
            </section>
        </template>

        <template v-else>
            <div class="w-full flex flex-col gap-6">
                <div class="flex items-center justify-between gap-4">
                    <USkeleton v-for="c in 4" :key="c" class="h-20 w-full" />
                </div>

                <div class="flex items-center justify-between gap-4">
                    <USkeleton class="h-60 flex-1" />
                    <USkeleton class="h-60 w-1/4" />
                </div>
            </div>
        </template>

        <AddTransactionDrawer v-model="isOpenAddTransaction" />
    </section>
</template>
