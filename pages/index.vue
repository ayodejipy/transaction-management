<script setup lang="ts">
const statistics = [
    {
        title: 'All Transactions',
        figure: '100',
    },
    {
        title: 'Credit Transactions',
        figure: '$20,206.20',
    },
    {
        title: 'Debit Transactions',
        figure: '$20,206.20',
    },
    {
        title: 'Net Amount',
        figure: '$40,206.20',
    },
]

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
</script>

<template>
    <section class="w-full">
        <section class="flex justify-between items-center">
            <div class="">
                <span class="text-gray-500 font-medium"
                    >Your total revenue</span
                >
                <p class="text-4xl font-inter font-semibold text-brand-green">
                    $80,000.00
                </p>
            </div>
            <button
                type="button"
                class="flex items-center gap-2 bg-brand-green text-white rounded-lg px-4 py-2.5"
            >
                <Icon name="i-mage-file-upload" />
                Upload new transaction
            </button>
        </section>

        <section class="grid grid-cols-4 gap-3 mt-6">
            <StatsCard v-for="stats in statistics" :key="stats.title" :stats />
        </section>

        <!-- recent transaction table -->
        <section
            class="bg-white rounded-lg border border-gray-100 mt-6 space-y-3"
        >
            <div class="flex justify-between items-center py-8 px-6">
                <div class="flex items-center gap-2">
                    <h3 class="font-semibold text-xl">Recent Transactions</h3>
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
    </section>
</template>
