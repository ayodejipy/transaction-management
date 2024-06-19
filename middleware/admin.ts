export default defineNuxtRouteMiddleware((to, from) => {
    const LOGIN_PATH = '/auth/login'
    // const ADMIN_PATH = '/admin'
    const USER_PATH = '/'

    // const { isAuthenticated } = storeToRefs(useAuthStore())
    const {isAdmin } = storeToRefs(useUserStore())
    console.log('__from__:: ', from)

    if (to.path !== LOGIN_PATH && !isAdmin.value) {
        return navigateTo(USER_PATH)
    }
})
