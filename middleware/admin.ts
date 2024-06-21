export default defineNuxtRouteMiddleware((to) => {
    // const LOGIN_PATH = '/auth/login'
    const ADMIN_PATH = '/admin'
    const USER_PATH = '/'

    // const { isAuthenticated } = storeToRefs(useAuthStore())
    const { isAdmin } = storeToRefs(useUserStore())

    if (to.path === USER_PATH && isAdmin.value) {
        return navigateTo(ADMIN_PATH)
    }
})
