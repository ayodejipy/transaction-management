<script setup lang="ts">
import type { IColumn, IInvitedUsersData, InvitedUserInterface } from '~/types'

const toast = useToast()
const isOpen = ref<boolean>(false)

const inviteStore = useInviteStore()
const { resendInvite } = inviteStore
const { invitedUsers } = storeToRefs(inviteStore)

const usersInvitedUrl = useEndpoints('userInviteUrl')
const {
    pending: loading,
    data,
    refresh,
} = await useAppFetch<IInvitedUsersData>(usersInvitedUrl, {
    pick: ['content', 'status'],
})

const shouldPaginate = computed(() => !!data.value?.paging)

const searchTerm = ref<string>('')

const searchedUsers = computed(() => {
    if (!searchTerm.value) return invitedUsers.value

    return invitedUsers.value.filter((user) => {
        return Object.values(user).some((value) => {
            return String(value)
                .toLowerCase()
                .includes(searchTerm.value.toLowerCase())
        })
    })
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

const columns: IColumn[] = [
    {
        key: 'id',
        label: 'ID',
    },
    {
        key: 'email',
        label: 'Email',
    },
    {
        key: 'firstName',
        label: 'First Name',
    },
    {
        key: 'lastName',
        label: 'Last Name',
    },
    {
        key: 'phone',
        label: 'Phone',
    },
    {
        key: 'isAccepted',
        label: 'Status',
    },
    {
        key: 'actions',
    },
]

const actionsOption = (row: InvitedUserInterface) => [
    [
        {
            label: 'Resend invite',
            icon: 'i-heroicons-arrow-path',
            click: () => onResendInvite(row),
        },
    ],
    // [
    //     {
    //         label: 'Delete',
    //         icon: 'i-heroicons-trash-20-solid',
    //         click: () => onDeleteCategory(row.id),
    //     },
    // ],
]

async function onResendInvite({ id, email }: InvitedUserInterface) {
    try {
        const data = await resendInvite(id)
        if (data.success) {
            toast.add({
                title: 'Invite resent successful',
                color: 'green',
                description: `Invite successfully sent to ${email}`,
                icon: 'i-heroicons-outline-check-badge',
            })
            await refresh()
        }
    } catch {
        toast.add({
            title: `Failed to send invite to ${email}`,
            color: 'red',
            icon: 'i-heroicons-outline-exclaimation-circle',
        })
    }
}

watch(
    data,
    async (newData) => {
        if (newData && newData.content) {
            invitedUsers.value = newData.content
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
                label="Add New User"
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
                    <h3 class="font-semibold text-xl">Users</h3>
                    <UBadge
                        color="green"
                        variant="subtle"
                        :ui="{
                            rounded: 'rounded-full',
                        }"
                    >
                        {{ invitedUsers.length }}
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
                        placeholder="Search for user..."
                    />

                    <USelect
                        trailing-icon="i-ci-filter-off-outline"
                        color="white"
                        size="lg"
                        padding="lg"
                        placeholder="Filter"
                        :options="['Active', 'None Active']"
                        :ui="uiConfig"
                    />
                </div>
            </div>

            <AppTable
                :loading
                :columns
                :data="searchedUsers"
                :paginate="shouldPaginate"
                :paging="data?.paging"
            >
                <template #isAccepted="{ row }">
                    <UBadge v-if="row.isAccepted" color="primary" variant="soft">
                        <Icon name="i-ic-round-circle" class="w-2 h-2 mr-2" />
                        Active
                    </UBadge>
                    <UBadge v-else color="red" variant="soft">
                        <Icon name="i-ic-round-circle" class="w-2 h-2 mr-2" />
                        Inactive</UBadge>
                </template>

                <template #actions="{ row }">
                    <UDropdown :items="actionsOption(row)">
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-ellipsis-horizontal-20-solid"
                        />
                    </UDropdown>
                </template>
            </AppTable>
        </section>

        <ModalsAddUser v-model="isOpen" :refresh-data="refresh" />
    </section>
</template>
