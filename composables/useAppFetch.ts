import type { UseFetchOptions } from '#app'
import { defu } from 'defu'

export default function useAppFetch<T>(
    url: string | (() => string),
    _options: UseFetchOptions<T> = {}
) {
    const { $customFetch } = useNuxtApp()

    const config = useRuntimeConfig()

    const getKey = typeof url == 'function' ? url() : url

    const defaults: UseFetchOptions<T> = {
        baseURL: config.public.apiBaseURL,
        key: getKey,
        headers: {
            Accept: 'application/json',
        },
    }

    const params = defu(_options, defaults)
    return useFetch(url, {
        ...params,
        $fetch: $customFetch,
    })
}
