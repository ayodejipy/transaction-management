<script setup lang="ts">
// const route = useRoute()

const { isAdmin, user } = storeToRefs(useUserStore())
const { handleLogout } = useAuthStore()

const ADMIN_PATH = '/admin'
const appendedUrl = computed(() => (isAdmin.value ? ADMIN_PATH : ''))

const roleBasedLinks = computed(() => {
    if (isAdmin.value) {
        return [
            {
                label: 'Reports',
                icon: 'ReportsIcon',
                to: `${ADMIN_PATH}`,
            },
            {
                label: 'Transactions',
                icon: 'TransactionsIcon',
                to: `${ADMIN_PATH}/transactions`,
            },
            {
                label: 'Settings',
                icon: 'SettingsIcon',
                to: `${ADMIN_PATH}/settings/categories`,
            },
        ]
    }
    return [
        {
            label: 'Dashboard',
            icon: 'DashboardIcon',
            to: '/',
        },
        // {
        //     label: 'Transactions',
        //     icon: 'TransactionsIcon',
        //     to: '/transactions',
        // },
    ]
})
</script>

<template>
    <!-- Static sidebar for desktop -->
    <div
        class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"
    >
        <div
            class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4"
        >
            <div class="flex h-16 shrink-0 items-center">
                <ULink :to="appendedUrl">
                    <img
                        class="h-10 w-auto"
                        src="~/assets/logo.svg"
                        alt="Opabid transaction management"
                    >
                </ULink>
                <!-- <ClientOnly>
                    <Icon name="NuxtIcon" size="64" />
                </ClientOnly> -->
            </div>
            <div class="flex flex-1 flex-col pt-6">
                <ClientOnly fallback-tag="div">
                    <NavigationLinks :links="roleBasedLinks" />
                    <!-- <UVerticalNavigation :links="roleBasedLinks" /> -->

                    <template #fallback>
                        <div class="space-y-6">
                            <USkeleton class="h-8 w-40" />
                            <USkeleton class="h-8 w-40" />
                            <USkeleton class="h-8 w-40" />
                        </div>
                    </template>
                </ClientOnly>

                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li
                        class="mt-auto before:absolute before:left-0 before:bottom-16 before:w-full before:h-px before:bg-gray-200"
                    >
                        <UButton
                            color="gray"
                            variant="ghost"
                            size="sm"
                            @click="handleLogout(user?.uid as string)"
                        >
                            <template #leading>
                                <Icon class="relative w-4 h-4" name="LogoutIcon" />
                            </template>
                            Logout
                        </UButton>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
