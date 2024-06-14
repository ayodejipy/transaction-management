export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore()
    const { isAuthenticated } = storeToRefs(authStore)

    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)

    if (import.meta.client) {
        if (!user.value) {
            await userStore.getProfile()
        }
    }

    console.log('from: ', from)

    const LOGIN_PATH = '/auth/login'

    if (to.path !== LOGIN_PATH && !isAuthenticated.value) {
        return navigateTo(LOGIN_PATH)
    }
})
