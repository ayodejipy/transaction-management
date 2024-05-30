<script setup>
const links = [
    {
        label: 'Reports',
        icon: 'i-heroicons-home',
        to: '/getting-started/installation',
    },
    {
        label: 'Transactions',
        icon: 'i-heroicons-chart-bar',
        to: '/transactions',
    },
    {
        label: 'User Management',
        icon: 'i-heroicons-command-line',
        to: '/components/command-palette',
    },
    {
        label: 'Settings',
        icon: 'i-heroicons-command-line',
        to: '/settings',
    },
]

const userNavigation = [
    { name: 'Your profile', href: '#' },
    { name: 'Sign out', href: '#' },
]

const sidebarOpen = ref(false)
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
                <img
                    class="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
            </div>
            <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <UVerticalNavigation :links="navigation" />
                    <li>
                        <div
                            class="text-xs font-semibold leading-6 text-gray-400"
                        >
                            Your teams
                        </div>
                    </li>
                    <li class="mt-auto">
                        <a
                            href="#"
                            class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                        >
                            <Icon
                                class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                                aria-hidden="true"
                                name="i-heroicons-outline-cog-6-tooth"
                            />
                            Settings
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>
