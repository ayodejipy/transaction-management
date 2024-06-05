<script setup lang="ts">
const route = useRoute()

const isOpen = ref<boolean>(false)

const form = reactive({
    name: '',
    description: '',
})

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

const columns = [
    {
        key: 'id',
        label: 'ID',
    },
    {
        key: 'name',
        label: 'Type',
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

const onCloseModal = () => {
    isOpen.value = !isOpen.value

    // for (const property in form) { form[property] = ''};
}
</script>

<template>
    <section class="w-full">
        <div class="flex justify-end items-center my-8">
            <UButton
                icon="i-heroicons-plus"
                size="xl"
                label="Add New Type"
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
                    <h3 class="font-semibold text-xl">Types</h3>
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
                        placeholder="Search for type..."
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

        <UModal
            v-model="isOpen"
            :ui="{
                width: 'sm:max-w-2xl',
            }"
        >
            <UCard
                :ui="{
                    ring: '',
                    divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                    body: {
                        padding: 'sm:p-8',
                    },
                    header: {
                        padding: 'sm:px-8 sm:pt-8',
                    },
                    footer: {
                        padding: 'sm:px-8 sm:pb-10',
                    },
                }"
            >
                <template #header>
                    <div class="space-y-2">
                        <h3 class="text-brand-gray text-2xl font-semibold">
                            Add New Type
                        </h3>
                        <p class="text-dark-gray font-light">
                            Add a new type for transactions.
                        </p>
                    </div>
                </template>

                <div class="space-y-6">
                    <UFormGroup size="xl" label="Name">
                        <UInput
                            placeholder="Type name"
                            v-model="form.name"
                        />
                    </UFormGroup>

                    <UFormGroup size="xl" label="Description">
                        <UTextarea
                            variant="outline"
                            placeholder=""
                            v-model="form.description"
                        />
                    </UFormGroup>
                </div>

                <template #footer>
                    <div class="flex justify-between items-center">
                        <UButton
                            size="xl"
                            color="gray"
                            variant="outline"
                            padding="md"
                            :ui="{
                                rounded: 'rounded-lg',
                                font: 'font-semibold',
                            }"
                            @click="onCloseModal"
                        >
                            Cancel
                        </UButton>

                        <UButton
                            size="xl"
                            padding="md"
                            :ui="{
                                rounded: 'rounded-lg',
                                font: 'font-semibold',
                            }"
                        >
                            Create type
                        </UButton>
                    </div>
                </template>
            </UCard>
        </UModal>
    </section>
</template>
