export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()
    const { isAuthenticated } = storeToRefs(authStore)
    // const tokenKey = unref(TOKEN_KEY)

    // if (import.meta.client) {
    //     const defaultValue = localStorage.getItem(tokenKey) as string
    //     accessToken.value = defaultValue
    // }

    // console.log(': ', localStorage.getItem(tokenKey))

    const LOGIN_PATH = '/auth/login'

    if (to.path !== LOGIN_PATH && !isAuthenticated.value) {
        return navigateTo(LOGIN_PATH)
    }
})
