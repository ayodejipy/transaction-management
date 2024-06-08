import type { UseFetchOptions } from '#app'
import { defu } from "defu";

export default function useAppFetch<T>(
    url: string,
    _options: UseFetchOptions<T> = {}
) {
	// grab essential data, urls, access token etc
    const tokensRefreshUrl = useEndpoints('refreshTokenUrl')
    const accessToken = useStorage('access_token')

    const defaults: UseFetchOptions<T> = {
        baseURL: '',
        key: url,
        headers: {
            Accept: 'application/json',
        },
        onRequest: async ({ request, options }) => {
            if (accessToken) {
                // Set the request headers
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        },
        onResponse: async ({ response, options }) => {
            if (response.status === 401 && response.url !== tokensRefreshUrl) {
                const refresh_token = '123456765' // from a cookie
				const newAccessToken = await getRefreshedToken(refresh_token)
				// save this new token to local storage
				// if new refresh token, save it to httpOnly cookie
				options.headers = {
                    Authorization: `Bearer ${newAccessToken}`,
				}
				// retry request
				useFetch(url, options as UseFetchOptions<T>)
            }
        },
	}
	
	const params = defu(_options, defaults)
    return useFetch(url, params)
}

async function getRefreshedToken(refreshToken: string) {
    const tokensRefreshUrl = useEndpoints('refreshTokenUrl')

    try {
        const { data, status } = await useFetch<{ access_token: string }>(
            tokensRefreshUrl,
            {
                method: 'POST',
                body: {
                    refreshToken,
                },
            }
        )
		return data.value?.access_token
	} catch {
		throw new Error('Failed to refresh token. Please try again.')
	}
}
