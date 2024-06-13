export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()
    const { isAuthenticated } = storeToRefs(authStore)

    // if (import.meta.client) {
    //     const tokenKey = unref(TOKEN_KEY)
    //     const defaultValue = localStorage.getItem(tokenKey) as string
    //     accessToken.value = defaultValue
    // }

    const LOGIN_PATH = '/auth/login'

    if (to.path !== LOGIN_PATH && !isAuthenticated.value) {
        return navigateTo(LOGIN_PATH)
    }
})
