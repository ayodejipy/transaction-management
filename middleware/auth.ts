export default defineNuxtRouteMiddleware(async (to) => {
    const LOGIN_PATH = '/auth/login'
    const ADMIN_PATH = '/admin'
    const USER_PATH = '/'
    const publicPaths = [
        '/',
        '/auth/login',
        '/auth/accept-invite',
        '/auth/forgot-password',
    ]
    const authStore = useAuthStore()
    const { isAuthenticated } = storeToRefs(authStore)

    const userStore = useUserStore()
    const { user, isAdmin } = storeToRefs(userStore)

    if (import.meta.client) {
        if (!user.value && isAuthenticated.value) {
            await userStore.getProfile()
        }
    }

    if (!publicPaths.includes(to.path) && !isAuthenticated.value) {
        return navigateTo(LOGIN_PATH)
    }

    if (isAuthenticated.value && publicPaths.includes(to.path)) {
        const redirectPath = isAdmin.value ? ADMIN_PATH : USER_PATH
        return navigateTo(redirectPath)
    }
})
