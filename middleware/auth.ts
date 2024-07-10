export default defineNuxtRouteMiddleware(async (to) => {
    const LOGIN_PATH = '/auth/login'
    // const ADMIN_PATH = '/admin'
    // const USER_PATH = '/'

    const authStore = useAuthStore()
    const { isAuthenticated } = storeToRefs(authStore)

    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)

    if (import.meta.client) {
        if (!user.value && isAuthenticated.value) {
            await userStore.getProfile()
        }
    }

    if (to.path !== LOGIN_PATH && !isAuthenticated.value) {
        return navigateTo(LOGIN_PATH)
    }
})
