<script setup lang="ts">
// const route = useRoute()

const { isAdmin } = storeToRefs(useUserStore())

const ADMIN_PATH = '/admin'
const appendedUrl = computed(() => (isAdmin.value ? ADMIN_PATH : ''))

const roleBasedLinks = computed(() => {
    if (isAdmin.value) {
        return [
            {
                label: 'Reports',
                icon: 'ReportsIcon',
                to: `${appendedUrl.value}`,
            },
            {
                label: 'Transactions',
                icon: 'TransactionsIcon',
                to: `${appendedUrl.value}/transactions`,
            },
            {
                label: 'Settings',
                icon: 'SettingsIcon',
                to: `${appendedUrl.value}/settings`,
            },
        ]
    }
    return [
        {
            label: 'Dashboard',
            icon: 'i-ph-users-three-light',
            to: '/',
        },
        {
            label: 'Transactions',
            icon: 'TransactionsIcon',
            to: '/transactions',
        },
    ]
})

// const userNavigation = [
//     { name: 'Your profile', href: '#' },
//     { name: 'Sign out', href: '#' },
// ]

// const sidebarOpen = ref(false)
</script>

<template>
    <!-- Static sidebar for desktop -->
    <div class="hidden lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div
            class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4"
        >
            <div class="flex h-16 shrink-0 items-center">
                <!-- <img
                    class="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=600"
                    alt="Your Company"
                /> -->
                <ClientOnly>
                    <Icon name="NuxtIcon" size="64" />
                </ClientOnly>
            </div>
            <div class="flex flex-1 flex-col pt-6">
                <ClientOnly fallback-tag="div">
                    <NavigationLinks :links="roleBasedLinks" />

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
                        class="mt-auto before:w-full before:h-px before:bg-gray-300"
                    >
                        <button
                            type="button"
                            class="group flex items-center gap-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-green-600"
                        >
                            <ClientOnly>
                                <Icon
                                    class="shrink-0 text-gray-400 group-hover:text-green-600"
                                    aria-hidden="true"
                                    name="i-octicon-sign-out-16"
                                />
                            </ClientOnly>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
