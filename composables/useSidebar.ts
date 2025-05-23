export default function useSidebar() {
    const isOpen = useState<boolean>('open-mobile-nav', () => false)

    const { isAdmin } = storeToRefs(useUserStore())
    const { adminPath } = useAuthStore()

    const appendedUrl = computed(() => (isAdmin.value ? adminPath : ''))

    function toggle() {
        isOpen.value = !isOpen.value
    }

    return {
        appendedUrl,
        isOpen,
        toggle,
    }
}
