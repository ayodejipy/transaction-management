<script setup lang="ts">
    import getEndpoints from '~/utils/endpoints'
    import { format, isSameDay, sub } from 'date-fns'
    import type {
        ICategory,
        IColumn,
        IDaysOptionFilter,
        RangeOption,
        ITransaction,
        ITransactionsData,
        RangeDuration,
    } from '~/types'

    definePageMeta({
        title: 'Transactions',
        middleware: ['auth', 'admin'],
    })

    const { $dayjs } = useNuxtApp()
    const router = useRouter()
    const route = useRoute()

    const { isAdmin } = storeToRefs(useUserStore())

    const correctPageTitle = computed(() =>
        isAdmin.value ? 'Transactions' : 'Dashboard'
    )

    useHead({
        title: correctPageTitle,
    })

    const searchTerm = ref<string>('')
    const debouncedSearchTerm = useDebounce(searchTerm, 800)
    const page = ref<number>(1)
    const catId = ref<number | undefined>()
    const selected = ref<Omit<IDaysOptionFilter, 'label' | 'value'>>({
        start: '' as unknown as Date | null,
        end: '' as unknown as Date | null,
    })

    const categoryStore = useCategoryStore()
    const { categories } = storeToRefs(categoryStore)

    const { transaction } = storeToRefs(useTransactionStore())
    const transactionsUrl = getEndpoints('transactionsUrl')

    const newTransactionUrl = computed(() => {
        const params = new URLSearchParams()

        if (debouncedSearchTerm.value)
            params.append('SearchQuery', debouncedSearchTerm.value)
        if (selected.value.start && selected.value.end) {
            params.append('FromDate', selected.value.start.toISOString())
            params.append('ToDate', selected.value.end.toISOString())
        }
        if (page.value) params.append('PageIndex', page.value.toString())

        if (catId.value) params.append('CategoryId', catId.value.toString())

        return `${transactionsUrl}?${params.toString()}`
    })

    const {
        pending: loading,
        data,
        refresh,
    } = await useAppFetch<ITransactionsData>(() => newTransactionUrl.value, {
        watch: [newTransactionUrl],
        pick: ['content', 'paging', 'status'],
    })

    const shouldPaginate = computed(() => !!data.value?.paging)

    const dataForTable = computed(() =>
        data.value?.content.map((transaction: ITransaction) => ({
            id: transaction.id,
            type: transaction.type,
            categoryName: transaction.categoryName,
            transactionDateUtc: $dayjs(transaction.transactionDateUtc).format(
                'DD/MM/YYYY'
            ),
            amount: formatCurrency(transaction.amount as number),
            description: transaction.description,
        }))
    )

    const transactionCategories = computed(() =>
        categories.value.map((category: Omit<ICategory, 'isDeleted'>) => ({
            label: category.name,
            value: category.id,
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
            key: 'type',
            label: 'Transaction Type',
            sortable: true,
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

    function isRangeSelected(duration: Duration) {
        return (
            isSameDay(
                selected.value.start as Date,
                sub(new Date(), duration)
            ) && isSameDay(selected.value.end as Date, new Date())
        )
    }

    function selectRange(duration: RangeDuration) {
        if (duration.start && duration.end) {
            selected.value = { start: duration.start, end: duration.end }
        } else {
            selected.value = {
                start: sub(new Date(), duration),
                end: new Date(),
            }
        }
    }

    const ranges: RangeOption[] = [
        { label: 'Last 7 days', duration: { days: 7 } },
        { label: 'Last 6 months', duration: { months: 6 } },
        { label: 'Last year', duration: { years: 1 } },
        {
            label: 'First quarter (Q1)',
            duration: {
                start: $dayjs().quarter(1).startOf('quarter').toDate(),
                end: $dayjs().quarter(1).endOf('quarter').toDate(),
            },
        },
        {
            label: 'Second quarter (Q2)',
            duration: {
                start: $dayjs().quarter(2).startOf('quarter').toDate(),
                end: $dayjs().quarter(2).endOf('quarter').toDate(),
            },
        },
        {
            label: 'Third quarter (Q3)',
            duration: {
                start: $dayjs().quarter(3).startOf('quarter').toDate(),
                end: $dayjs().quarter(3).endOf('quarter').toDate(),
            },
        },
        {
            label: 'Fourth quarter (Q4)',
            duration: {
                start: $dayjs().quarter(4).startOf('quarter').toDate(),
                end: $dayjs().quarter(4).endOf('quarter').toDate(),
            },
        },
    ]

    // Transactions filter i.e: Income, Expenditure
    const handleExport = () => {
        console.log('click')
    }

    function $clearFilters() {
        catId.value = undefined
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
        [page, searchTerm, selected, catId],
        () => {
            const newQuery: Record<string, string | number> = {}

            if (debouncedSearchTerm.value)
                newQuery.query = debouncedSearchTerm.value
            if (selected.value.start)
                newQuery.start_date = $dayjs(selected.value.start)
                    .format('YYYY-MM-DD')
                    .toString()
            if (selected.value.end)
                newQuery.end_date = $dayjs(selected.value.end).format(
                    'YYYY-MM-DD'
                )
            if (page.value) newQuery.page = page.value
            if (catId.value) newQuery.category_id = catId.value

            router.replace({ path: route.path, query: newQuery })
        },
        { deep: true }
    )

    onMounted(async () => {
        await categoryStore.getCategories()

        if (route.query.query) searchTerm.value = route.query.query as string

        if (route.query.start_date || route.query.end_date) {
            selected.value = {
                start: route.query.start_date
                    ? $dayjs(route.query.start_date as string).toDate()
                    : null,
                end: route.query.end_date
                    ? $dayjs(route.query.end_date as string).toDate()
                    : null,
            }
        }

        if (route.query.page) page.value = Number(route.query.page)
        if (route.query.category_id)
            catId.value = Number(route.query.category_id)
    })
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
            class="bg-white dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-700 mt-6 space-y-3"
        >
            <div
                class="flex flex-col sm:flex-row justify-between sm:items-center gap-6 sm:gap-0 py-8 px-3 sm:px-6"
            >
                <div class="flex items-center gap-2">
                    <h3 class="font-semibold text-xl">All Transactions</h3>
                    <UBadge
                        color="green"
                        variant="subtle"
                        :ui="{
                            rounded: 'rounded-full',
                        }"
                    >
                        {{ dataForTable?.length || 0 }}
                    </UBadge>
                </div>
                <div class="flex flex-wrap md:flex-nowrap items-center gap-2.5">
                    <UInput
                        v-model="searchTerm"
                        :ui="{
                            base: 'flex-1',
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

                    <UPopover>
                        <UButton
                            icon="i-heroicons-calendar-days-20-solid"
                            size="lg"
                            color="white"
                            variant="outline"
                            :ui="{ rounded: 'rounded-full' }"
                            class="text-gray-400 dark:text-gray-500 ring-gray-300 dark:ring-gray-700"
                        >
                            <span v-if="selected.start && selected.end">
                                {{
                                    format(selected.start as Date, 'd MMM, yyy')
                                }}
                                -
                                {{ format(selected.end as Date, 'd MMM, yyy') }}
                            </span>
                            <span v-else>Select a date Range</span>
                        </UButton>

                        <template #panel="{ close }">
                            <div
                                class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800"
                            >
                                <div class="hidden sm:flex flex-col py-4">
                                    <UButton
                                        v-for="(range, index) in ranges"
                                        :key="index"
                                        :label="range.label"
                                        color="gray"
                                        variant="ghost"
                                        class="rounded-none px-6"
                                        :class="[
                                            isRangeSelected(range.duration)
                                                ? 'bg-gray-100 dark:bg-gray-800'
                                                : 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
                                        ]"
                                        truncate
                                        @click="selectRange(range.duration)"
                                    />
                                </div>

                                <DatePicker
                                    v-model="selected"
                                    is-required
                                    @close="close"
                                />
                            </div>
                        </template>
                    </UPopover>

                    <USelect
                        v-model="catId"
                        leading-icon="i-ci-filter-off-outline"
                        color="white"
                        size="lg"
                        padding="lg"
                        :options="transactionCategories"
                        placeholder="All Transactions"
                        class="text-gray-400 dark:text-gray-500"
                        :ui="uiConfig"
                    />

                    <UButton
                        color="white"
                        variant="outline"
                        size="lg"
                        class="text-gray-400 dark:text-gray-500 ring-gray-300 dark:ring-gray-700"
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
                :data="dataForTable || []"
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
