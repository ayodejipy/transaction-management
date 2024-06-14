<script setup lang="ts">
const isOpen = ref<boolean>(false)


const columns = [
    {
        key: 'id',
        label: 'ID',
    },
    {
        key: 'name',
        label: 'Name',
    },
    {
        key: 'description',
        label: 'Description',
    },
]

const categories = [
    {
        id: 1233,
        name: 'Income',
        description: 'Books and stationery supplies',
    },
    {
        id: 1234,
        name: 'Expenditure',
        description: 'Books and stationery supplies',
    },
    {
        id: 1235,
        name: 'Expenditure',
        description: 'Books and stationery supplies',
    },
    {
        id: 1236,
        name: 'Expenditure',
        description: 'Books and stationery supplies',
    },
    {
        id: 1235,
        name: 'Expenditure',
        description: 'Books and stationery supplies',
    },
    {
        id: 1236,
        name: 'Expenditure',
        description: 'Books and stationery supplies',
    },
]

</script>

<template>
    <section class="w-full">
        <div class="flex justify-end items-center my-8">
            <UButton
                icon="i-heroicons-plus"
                size="xl"
                label="Add New Category"
                :ui="{
                    rounded: 'rounded-lg',
                    font: 'font-semibold',
                    color: {
                        white: {
                            solid: 'bg-brand-green',
                        },
                    },
                }"
                @click="isOpen = true"
            />
        </div>

        <section class="rounded-lg border border-gray-100 mt-6 space-y-3">
            <div class="flex justify-between items-center py-6 px-6">
                <div class="flex items-center gap-2">
                    <h3 class="font-semibold text-xl">Categories</h3>
                    <UBadge
                        color="green"
                        variant="subtle"
                        :ui="{
                            rounded: 'rounded-full',
                        }"
                    >
                        {{ categories.length }}
                    </UBadge>
                </div>
                <div class="flex items-center gap-2.5">
                    <UInput
                        :ui="{
                            rounded: 'rounded-full',
                            icon: {
                                base: 'text-icon-gray dark:text-gray-500',
                            },
                        }"
                        icon="i-heroicons-magnifying-glass-20-solid"
                        size="lg"
                        color="white"
                        trailing
                        placeholder="Search for categories..."
                    />

                    <!-- <USelect
                        trailing-icon=""
                        color="white"
                        size="lg"
                        padding="lg"
                        :options="['Charity', 'Expenditure', 'Income']"
                        placeholder="Filter"
                        :ui="uiConfig"
                    /> -->
                </div>
            </div>

            <AppTable :columns :data="categories" />
        </section>

        <ModalsAddCategory v-model="isOpen" />
    </section>
</template>
