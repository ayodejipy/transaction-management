<script setup>
const navigation = [
    { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
    { name: 'Team', href: '#', icon: UsersIcon, current: false },
    { name: 'Projects', href: '#', icon: FolderIcon, current: false },
    { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
    {
        name: 'Documents',
        href: '#',
        icon: DocumentDuplicateIcon,
        current: false,
    },
    { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]
const teams = [
    { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
    { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
    { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
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
            <!-- <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" class="-mx-2 space-y-1">
                            <li v-for="item in navigation" :key="item.name">
                                <a
                                    :href="item.href"
                                    :class="[
                                        item.current
                                            ? 'bg-gray-50 text-indigo-600'
                                            : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                                    ]"
                                >
                                    <component
                                        :is="item.icon"
                                        :class="[
                                            item.current
                                                ? 'text-indigo-600'
                                                : 'text-gray-400 group-hover:text-indigo-600',
                                            'h-6 w-6 shrink-0',
                                        ]"
                                        aria-hidden="true"
                                    />
                                    {{ item.name }}
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div
                            class="text-xs font-semibold leading-6 text-gray-400"
                        >
                            Your teams
                        </div>
                        <ul role="list" class="-mx-2 mt-2 space-y-1">
                            <li v-for="team in teams" :key="team.name">
                                <a
                                    :href="team.href"
                                    :class="[
                                        team.current
                                            ? 'bg-gray-50 text-indigo-600'
                                            : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                                    ]"
                                >
                                    <span
                                        :class="[
                                            team.current
                                                ? 'text-indigo-600 border-indigo-600'
                                                : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                            'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white',
                                        ]"
                                        >{{ team.initial }}</span
                                    >
                                    <span class="truncate">{{
                                        team.name
                                    }}</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="mt-auto">
                        <a
                            href="#"
                            class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                        >
                            <Cog6ToothIcon
                                class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                                aria-hidden="true"
                            />
                            Settings
                        </a>
                    </li>
                </ul>
            </nav> -->
        </div>
    </div>
</template>
