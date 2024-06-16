export default defineNuxtRouteMiddleware(async () => {
    // const LOGIN_PATH = '/auth/login'
    // const ADMIN_PATH = '/admin'
    const USER_PATH = '/'

    const { isAuthenticated } = storeToRefs(useAuthStore())
    const {isAdmin } = storeToRefs(useUserStore())

    if (isAuthenticated.value && !isAdmin.value) {
        return navigateTo(USER_PATH)
    }
})
