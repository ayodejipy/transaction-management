export default defineNuxtRouteMiddleware((to) => {
    // const USER_PATH = '/transactions'

    // const { isAuthenticated } = storeToRefs(useAuthStore())
    const { adminPath, userPath } = useAuthStore()

    const { isAdmin } = storeToRefs(useUserStore())

    if (to.path === userPath && isAdmin.value) {
        return navigateTo(adminPath)
    }
})
