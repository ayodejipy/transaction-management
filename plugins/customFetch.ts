import getEndpoints from '~/utils/endpoints'

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    const tokensRefreshUrl = getEndpoints('refreshTokenUrl')

    const authStore = useAuthStore()
    const { accessToken, refreshToken } = storeToRefs(authStore)

    const $customFetch = $fetch.create({
        baseURL: config.public.apiBaseURL,
        headers: {
            Accept: 'application/json',
        },
        onRequest: async ({ options }) => {
            if (accessToken.value) {
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${accessToken.value}`,
                }
            }
        },
        onResponse: async ({ response, options }) => {
            if (
                response.status === 401 &&
                response.url !== tokensRefreshUrl &&
                refreshToken.value
            ) {
                const newAccessToken = await authStore.getRefreshedToken()

                options.headers = {
                    Authorization: `Bearer ${newAccessToken}`,
                }
            }
        },
    })

    return {
        provide: {
            customFetch: $customFetch,
        },
    }
})
