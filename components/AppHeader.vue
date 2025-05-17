<script setup lang="ts">
withDefaults(
    defineProps<{
        pageTitle: string
    }>(),
    {
        pageTitle: 'Default Page Title',
    }
)

const authStore = useAuthStore()

const userStore = useUserStore()
const { user, isAdmin } = storeToRefs(userStore)

const { isOpen, toggle, appendedUrl } = useSidebar()

const menuIcon = computed(() =>
    isOpen.value ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'
)

const fullname = computed<string>(
    () => user.value?.firstName + ' ' + user.value?.lastName
)

const userType = computed(() =>
    isAdmin.value ? userTypes.admin : userTypes.user
)

const items = [
    [
        {
            label: `${user.value?.email}`,
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
</script>

<template>
    <div class="sticky top-0 z-40 lg:mx-auto">
        <div
            class="flex h-16 items-center gap-x-2.5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-2 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none"
        >
            <div class="flex sm:hidden h-16 shrink-0 items-center">
                <ULink :to="appendedUrl">
                    <img
                        class="h-11 w-auto"
                        src="~/assets/logo.svg"
                        alt="Opabid transaction management"
                    >
                </ULink>
            </div>

            <!-- Separator -->
            <div class="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

            <div class="flex items-center justify-between sm:px-4 flex-1">
                <h1 class="text-xl sm:text-2xl font-semibold text-brand-gray dark:text-gray-200">
                    {{ pageTitle }}
                </h1>

                <div class="flex items-center lg:gap-x-4">
                    <!-- <button
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
                    </button> -->

                    <div class="relative flex items-center">
                        <ClientOnly>
                            <UDropdown
                                :items="items"
                                :ui="{
                                    item: {
                                        disabled: 'cursor-text select-text',
                                    },
                                }"
                                :popper="{ placement: 'bottom-start' }"
                            >
                                <button
                                    type="button"
                                    class="flex items-center gap-1.5"
                                >
                                    <UAvatar
                                        size="md"
                                        :alt="fullname"
                                        :ui="{
                                            rounded:
                                                'rounded-full ring-1 ring-green-500',
                                        }"
                                    />

                                    <span
                                        class="hidden lg:flex lg:flex-col lg:items-start"
                                    >
                                        <p
                                            class="font-medium leading-6 text-brand-gray dark:text-gray-200"
                                        >
                                            {{ fullname }}
                                        </p>
                                        <span
                                            class="text-sm font-normal leading-6 text-gray-500"
                                            aria-hidden="true"
                                        >
                                            {{ userType }}
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
                                    <UButton
                                        color="primary"
                                        variant="ghost"
                                        size="sm"
                                        block
                                        :ui="{
                                            block: 'w-full flex justify-between items-center',
                                        }"
                                        @click="
                                            authStore.handleLogout(
                                                user?.uid as string
                                            )
                                        "
                                    >
                                        <span class="truncate">
                                            {{ item.label }}
                                        </span>

                                        <UIcon
                                            :name="item.icon"
                                            class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
                                        />
                                    </UButton>
                                </template>
                            </UDropdown>

                            <template #fallback>
                                <div class="flex items-center space-x-4">
                                    <USkeleton
                                        class="h-10 w-10"
                                        :ui="{ rounded: 'rounded-full' }"
                                    />
                                    <USkeleton class="h-8 w-28" />
                                </div>
                            </template>
                        </ClientOnly>
                    </div>
                    <UButton
                        size="sm"
                        color="gray"
                        variant="ghost"
                        :ui="{
                            base: 'text-gray-700 lg:hidden',
                            rounded: 'rounded-full',
                        }"
                        @click="toggle"
                    >
                        <Icon :name="menuIcon" size="1.75em" />
                    </UButton>
                </div>
            </div>
        </div>
    </div>
</template>
