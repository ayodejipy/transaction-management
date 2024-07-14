<script setup lang="ts">
import type { ICategoriesData, ICategory, IColumn } from '~/types'

const toast = useToast()

const isOpen = ref<boolean>(false)
const activeCategories = ref<Omit<ICategory, 'isDeleted'>[]>([])

const categoriesUrl = useEndpoints('categoriesUrl')

const categoryStore = useCategoryStore()
const { deleteCategory } = categoryStore
const { category } = storeToRefs(categoryStore)

const { data, pending, refresh } = await useAppFetch<ICategoriesData>(
    categoriesUrl,
    {
        pick: ['content', 'paging', 'status'],
    }
)

const shouldPaginate = computed(() => !!data.value?.paging)

const columns: IColumn[] = [
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
    {
        key: 'actions',
    },
]

const actionOptions = (row: Omit<ICategory, 'isDeleted'>) => [
    [
        {
            label: 'Edit',
            icon: 'i-heroicons-pencil-square-20-solid',
            click: () => toggleEdit(row),
        },
    ],
    [
        {
            label: 'Delete',
            icon: 'i-heroicons-trash-20-solid',
            click: () => onDeleteCategory(row.id),
        },
    ],
]

async function onDeleteCategory(id: number) {
    try {
        const data = await deleteCategory(id)
        if (data.success) {
            toast.add({
                title: 'Category deleted Successfully',
                color: 'green',
                description:
                    "You've successfully removed a transaction category",
                icon: 'i-heroicons-outline-check-badge',
            })
            await refresh()
        }
    } catch {
        toast.add({
            title: 'Deletion Failed.',
            color: 'red',
            description: 'Unable to delete your category at this moment.',
            icon: 'i-heroicons-outline-exclaimation-circle',
        })
    }
}

function toggleEdit(item: Omit<ICategory, 'isDeleted'>) {
    isOpen.value = !isOpen.value
    category.value = item
}

function getActiveCategories(categories: ICategory[]) {
    activeCategories.value = categories
        .filter((category: ICategory) => !category.isDeleted)
        .map((category: ICategory) => ({
            id: category.id,
            name: category.name,
            description: category.description,
        }))
}

watch(
    data,
    async (newData) => {
        if (newData && newData.content) {
            getActiveCategories(newData.content)
        } else {
            await refresh()
        }
    },
    { immediate: true }
)
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
            <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-6 sm:gap-0 py-6 px-4 sm:px-6">
                <div class="flex items-center gap-2">
                    <h3 class="font-semibold text-xl">Categories</h3>
                    <UBadge
                        color="green"
                        variant="subtle"
                        :ui="{
                            rounded: 'rounded-full',
                        }"
                    >
                        {{ activeCategories.length }}
                    </UBadge>
                </div>
                <div class="flex items-center gap-2.5">
                    <UInput
                        :ui="{
                            base: 'w-full',
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

            <AppTable
                :loading="pending"
                :columns
                :data="activeCategories"
                :paginate="shouldPaginate"
                :paging="data?.paging"
            >
                <template #actions="{ row }">
                    <UDropdown :items="actionOptions(row)">
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-ellipsis-horizontal-20-solid"
                        />
                    </UDropdown>
                </template>
            </AppTable>
        </section>

        <ModalsAddCategory v-model="isOpen" :refresh />
    </section>
</template>
