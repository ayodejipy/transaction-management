import type { UseFetchOptions } from '#app'
import { defu } from 'defu'

export default function useAppFetch<T>(
    url: string,
    _options: UseFetchOptions<T> = {}
) {
    const { $customFetch } = useNuxtApp()

    const config = useRuntimeConfig()
    const tokensRefreshUrl = useEndpoints('refreshTokenUrl')

    const authStore = useAuthStore()
    const { accessToken, refreshToken } = storeToRefs(authStore)

    const defaults: UseFetchOptions<T> = {
        baseURL: config.public.apiBaseURL,
        key: url,
        headers: {
            Accept: 'application/json',
        },
        onRequest: async ({ request, options }) => {
            if (accessToken) {
                // Set the request headers
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${accessToken.value}`,
                }
            }
        },
        onResponse: async ({ response, options }) => {
            console.log('res: ', response)
            if (
                response.status === 401 &&
                response.url !== tokensRefreshUrl &&
                refreshToken.value
            ) {
                const newAccessToken = await authStore.getRefreshedToken()
                // save this new token to local storage
                // if new refresh token, save it to httpOnly cookie
                options.headers = {
                    Authorization: `Bearer ${newAccessToken}`,
                }
                // retry request
                useFetch(url, {
                    ...(options as UseFetchOptions<T>),
                    $fetch: $customFetch,
                })
            }
        },
    }

    const params = defu(_options, defaults)
    return useFetch(url, {
        ...params,
        $fetch: $customFetch,
    })
}
