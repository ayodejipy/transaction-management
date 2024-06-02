<script setup lang="ts">
const route = useRoute()

const items = [
    [
        {
            label: 'opabid@gmail.com',
            slot: 'account',
            disabled: true,
        },
    ],
    [
        {
            label: 'Sign out',
            icon: 'i-heroicons-arrow-left-on-rectangle',
        },
    ],
]

// console.log({ route })
</script>

<template>
    <div class="sticky top-0 z-40 lg:mx-auto">
        <div
            class="flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-2 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none"
        >
            <!-- <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
            <span class="sr-only">Open sidebar</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button> -->

            <!-- Separator -->
            <div class="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

            <div class="flex items-center justify-between px-4 flex-1">
                <h1 class="text-2xl font-semibold text-brand-gray">Overview</h1>

                <div class="flex items-center gap-x-4 lg:gap-x-4">
                    <button
                        type="button"
                        class="relative w-10 h-10 flex items-center justify-center flex-shrink-0 p-2.5 text-[#667085] font-medium hover:text-gray-500 rounded-full ring-1 ring-gray-300"
                    >
                        <span class="sr-only">View notifications</span>
                        <Icon name="i-solar-bell-bing-linear" size="2em" />
                        <UBadge
                            color="red"
                            variant="solid"
                            :ui="{
                                base: 'inline-flex items-center absolute -top-2 -right-2',
                                rounded: 'rounded-full',
                            }"
                        >
                            5
                        </UBadge>
                    </button>

                    <div class="relative flex items-center">
                        <UDropdown
                            :items="items"
                            :ui="{
                                item: { disabled: 'cursor-text select-text' },
                            }"
                            :popper="{ placement: 'bottom-start' }"
                        >
                            <button
                                type="button"
                                class="flex items-center gap-1.5"
                            >
                                <UAvatar
                                    src="https://avatars.githubusercontent.com/u/739984?v=4"
                                    size="md"
                                    :ui="{
                                        rounded:
                                            'rounded-full ring-1 ring-green-500',
                                    }"
                                />

                                <span
                                    class="hidden lg:flex lg:flex-col lg:items-start"
                                >
                                    <p
                                        class="font-medium leading-6 text-brand-gray"
                                    >
                                        Opawole Olawabiyi
                                    </p>
                                    <span
                                        class="text-sm font-normal leading-6 text-gray-500"
                                        aria-hidden="true"
                                    >
                                        Admin
                                    </span>
                                </span>
                            </button>

                            <template #account="{ item }">
                                <div class="text-left">
                                    <p>Signed in as</p>
                                    <p
                                        class="truncate font-medium text-gray-900 dark:text-white"
                                    >
                                        {{ item.label }}
                                    </p>
                                </div>
                            </template>

                            <template #item="{ item }">
                                <span class="truncate">{{ item.label }}</span>

                                <UIcon
                                    :name="item.icon"
                                    class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
                                />
                            </template>
                        </UDropdown>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
