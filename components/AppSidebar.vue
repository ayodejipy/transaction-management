<script setup lang="ts">
const links = [
    {
        label: 'Reports',
        icon: 'ReportsIcon',
        to: '/',
    },
    {
        label: 'Transactions',
        icon: 'TransactionsIcon',
        to: '/transactions',
    },
    // {
    //     label: 'User Management',
    //     icon: 'i-ph-users-three-light',
    //     to: '/components/command-palette',
    // },
    {
        label: 'Settings',
        icon: 'SettingsIcon',
        to: '/settings',
    },
]

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
                <UVerticalNavigation
                    :links="links"
                    :ui="{
                        base: 'flex items-center gap-2.5 mb-4',
                        padding: 'px-2.5 py-2.5',
                        active: 'text-white/80 dark:text-white before:bg-brand-green dark:before:bg-gray-800',
                        inactive:
                            'text-gray-600 dark:text-gray-400 hover:text-gray-100 dark:hover:text-white hover:before:bg-brand-green dark:hover:before:bg-green-800/50',
                        label: 'truncate relative font-semibold',
                        size: 'text-base',
                        icon: {
                            active: 'text-white/80 dark:text-gray-200',
                            inactive:
                                'text-icon-gray/80 dark:text-gray-500 group-hover:text-white/80 dark:group-hover:text-gray-200',
                        },
                    }"
                >
                    <template #icon="{ link }">
                        <Icon class="w-5 h-6 text-icon-gray/80 dark:text-gray-500 group-hover:text-white/80 dark:group-hover:text-gray-200" :name="link.icon" />
                    </template>
                </UVerticalNavigation>

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
