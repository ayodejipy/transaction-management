<script setup lang="ts">
    import type { IColumn, ITypes, TActiveType, ITypesData } from '~/types'
    import getEndpoints from '~/utils/endpoints'

    const isOpen = ref<boolean>(false)

    const toast = useToast()
    const typesUrl = getEndpoints('typesUrl')

    const typeStore = useTypeStore()
    const { deleteType } = typeStore
    const { types, type } = storeToRefs(typeStore)

    const { data, pending, refresh } = await useAppFetch<ITypesData>(typesUrl, {
        pick: ['content', 'status'],
    })

    const shouldPaginate = computed(() => !!data.value?.paging)

    const searchTerm = ref<string>('')

    const searchedTypes = computed(() => {
        if (!searchTerm.value) return types.value

        return types.value.filter((type) => {
            return Object.values(type).some((value) => {
                return String(value)
                    .toLowerCase()
                    .includes(searchTerm.value.toLowerCase())
            })
        })
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
            click: () => onDelete(row.id),
        },
    ]

    function toggleEdit(item: TActiveType) {
        isOpen.value = !isOpen.value
        type.value = item
    }

    async function onDelete(id: number) {
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
            <div
                class="flex flex-col sm:flex-row justify-between sm:items-center gap-6 sm:gap-0 py-6 px-4 sm:px-6"
            >
                <div class="flex items-center gap-2">
                    <h3 class="font-semibold text-xl">Types</h3>
                    <UBadge
                        color="green"
                        variant="subtle"
                        :ui="{
                            rounded: 'rounded-full',
                        }"
                    >
                        {{ types.length }}
                    </UBadge>
                </div>
                <div class="flex items-center gap-2.5">
                    <UInput
                        v-model="searchTerm"
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

            <AppTable
                :loading="pending"
                :columns
                :data="searchedTypes"
                :paginate="shouldPaginate"
                :paging="data?.paging"
            >
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
