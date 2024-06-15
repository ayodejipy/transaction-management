<script setup lang="ts">
import type { IColumn, ITypes, TActiveType, ITypesData } from '~/types'

const isOpen = ref<boolean>(false)

const toast = useToast()
const typesUrl = useEndpoints('typesUrl')

const typeStore = useTypeStore()
const { deleteType } = typeStore
const { types, type } = storeToRefs(typeStore)

const { data, pending, refresh } = await useAppFetch<ITypesData>(typesUrl, {
    pick: ['content', 'status'],
})

const columns: IColumn[] = [
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
    {
        key: 'actions',
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

const actionOptions = (row: TActiveType) => [
    {
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        color: 'gray',
        click: () => toggleEdit(row),
    },
    {
        label: 'Delete',
        color: 'red',
        icon: 'i-heroicons-trash-20-solid',
        click: () => onDeleteCategory(row.id),
    },
]

function toggleEdit(item: TActiveType) {
    isOpen.value = !isOpen.value
    type.value = item
}

async function onDeleteCategory(id: number) {
    try {
        const data = await deleteType(id)
        if (data.success) {
            toast.add({
                title: 'Type deleted Successfully',
                color: 'green',
                icon: 'i-heroicons-outline-check-badge',
            })
            await refresh()
        }
    } catch {
        toast.add({
            title: 'Deletion Failed.',
            color: 'red',
            icon: 'i-heroicons-outline-exclaimation-circle',
        })
    }
}

function getActiveTypes(toFilterTypes: ITypes[]) {
    types.value = toFilterTypes
        .filter((type: ITypes) => !type.isDeleted)
        .map((type: ITypes) => ({
            id: type.id,
            name: type.name,
            description: type.description,
        }))
}

watch(
    data,
    async (newData) => {
        if (newData && newData.content) {
            getActiveTypes(newData.content)
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

            <AppTable :loading="pending" :columns :data="types">
                <template #actions="{ row }">
                    <div class="flex items-center gap-2">
                        <UButton
                            v-for="{
                                label,
                                color,
                                icon,
                                click,
                            } in actionOptions(row)"
                            :key="label"
                            :color
                            variant="ghost"
                            :icon
                            @click="click"
                        />
                    </div>
                </template>
            </AppTable>
        </section>

        <ModalsAddType v-model="isOpen" :refresh-types="refresh" />
    </section>
</template>
