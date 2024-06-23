import type { UseFetchOptions } from '#app'
import { defu } from 'defu'

export default function useAppFetch<T>(
    url: string | (() => string),
    _options: UseFetchOptions<T> = {}
) {
    const { $customFetch } = useNuxtApp()

    const config = useRuntimeConfig()

    const authStore = useAuthStore()
    const { accessToken, refreshToken } = storeToRefs(authStore)

    const getKey = typeof url == 'function' ? url() : url

    const defaults: UseFetchOptions<T> = {
        baseURL: config.public.apiBaseURL,
        key: getKey,
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
            if (response.status === 401 && refreshToken.value) {
                console.log('after failed condition')
                const newAccessToken = await authStore.getRefreshedToken()

                // save this new token to local storage
                options.headers = {
                    Authorization: `Bearer ${newAccessToken}`,
                }

                // retry request
                // $customFetch(url)
                // useFetch(url, {
                //     ...(options as UseFetchOptions<T>),
                //     $fetch: $customFetch,
                // })
            }
        },
    }

    const params = defu(_options, defaults)
    return useFetch(url, {
        ...params,
        $fetch: $customFetch,
    })
}
