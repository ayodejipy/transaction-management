<script setup lang="ts">
interface ILinks {
    label: string
    icon: string
    to: string
}

const props = withDefaults(
    defineProps<{
        links: ILinks[]
    }>(),
    {
        links: () => [],
    }
)

// const route = useRoute()
const router = useRouter()

const ui = {
    base: 'group relative flex items-center gap-2.5 mb-4 px-2.5 py-2.5 focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-1 focus-visible:before:ring-primary-500 dark:focus-visible:before:ring-primary-400 before:absolute before:inset-px before:rounded-md disabled:cursor-not-allowed disabled:opacity-75',
    ring: 'focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
    width: 'w-full',
    rounded: 'rounded-md',
    font: 'font-medium',
    size: 'text-sm',
    label: 'truncate relative',
    active: 'text-white/80 dark:text-white before:bg-brand-green dark:before:bg-brand-green',
}

const isExactLink = (to: string) => {
    const ADMIN_PATH = '/admin'
    const currentPath = router.currentRoute.value.path

    const splitLink = to.split('/')

    if (currentPath.includes(`/${splitLink[1]}/${splitLink[2]}`)) {
        return true
    } else {
        if (currentPath === to && to === ADMIN_PATH) return true
        if (currentPath === to) return true

    }

    return false
}
</script>

<template>
    <nav class="relative">
        <ul>
            <li v-for="{ label, icon, to } in props.links" :key="label">
                <ULink
                    :to
                    :class="[
                        ui.base,
                        ui.ring,
                        ui.width,
                        ui.rounded,
                        ui.font,
                        ui.label,
                        ui.size,
                        { active: isExactLink(to) },
                    ]"
                    :active="isExactLink(to)"
                    :active-class="ui.active"
                    inactive-class="text-gray-600 dark:text-gray-400 hover:text-white/80 dark:hover:text-white hover:before:bg-brand-green dark:hover:before:bg-green-800/50"
                >
                    <Icon class="relative w-5 h-5" :name="icon" />
                    <span :class="[ui.label]">{{ label }}</span>
                </ULink>
            </li>
        </ul>
    </nav>
</template>
