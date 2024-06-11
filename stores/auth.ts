import { useStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', () => {
    const { $customFetch } = useNuxtApp()

    const accessToken = useStorage(
        'x-accessToken',
        '1234567890A.BCDEFERTITOMIUYGH'
    )
    const refreshToken = useCookie('xs-rft')

    refreshToken.value = 'proper-refresh-token-from-server'

    // actions
    async function getRefreshedToken() {
        const tokensRefreshUrl = useEndpoints('refreshTokenUrl')

        try {
            const data = await $customFetch<{ access_token: string }>(
                tokensRefreshUrl,
                {
                    method: 'POST',
                    body: {
                        refreshToken,
                    },
                }
            )
            return data.access_token
        } catch {
            throw new Error('Failed to refresh token. Please try again.')
        }
    }

    return {
        accessToken,
        refreshToken,
        getRefreshedToken,
    }
})
