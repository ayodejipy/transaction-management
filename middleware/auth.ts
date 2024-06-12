export default defineNuxtRouteMiddleware((to, from) => { 
	const authStore = useAuthStore()
	const { isAuthenticated } = storeToRefs(authStore)
	
	const LOGIN_PATH = '/auth/login'

	if(to.path !== LOGIN_PATH && !isAuthenticated.value) {
		return navigateTo(LOGIN_PATH)
	}
})