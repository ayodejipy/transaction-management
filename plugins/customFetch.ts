export default defineNuxtPlugin(() => {
	const config = useRuntimeConfig()
    const tokensRefreshUrl = useEndpoints('refreshTokenUrl')

    const authStore = useAuthStore()
	const { accessToken, refreshToken } = storeToRefs(authStore)
	
	const $customFetch = $fetch.create({ 
        baseURL: config.public.apiBaseURL,
        headers: {
            Accept: 'application/json',
        },
        onRequest: async ({ options }) => {
            if (accessToken.value) {
                // Set the request headers
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${accessToken.value}`,
                }
            }
        },
        onResponse: async ({ response, options }) => {
            if (response.status === 401 && response.url !== tokensRefreshUrl && refreshToken.value) {
                const newAccessToken = await authStore.getRefreshedToken()
                // save this new token to local storage
                // accessToken.value = newAccessToken
                // if new refresh token, save it to httpOnly cookie
                options.headers = {
                    Authorization: `Bearer ${newAccessToken}`,
                }
            }
        },
    })

	return {
		provide: {
			customFetch: $customFetch
		}
	}
})
