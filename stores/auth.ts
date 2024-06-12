import { useStorage } from '@vueuse/core'
import type { IAuthData } from '~/types'

export const useAuthStore = defineStore('auth', () => {
    const accessToken = useStorage(
        'x-accessToken',
        ''
    )
    const refreshToken = useCookie('XS-TM-RFT', {
        httpOnly: true,
    })

    const isAuthenticated = computed<boolean>(() => !!accessToken.value)
    
    // actions
    function setTokens(token: string | null, refreshT: string | null) {
        accessToken.value = token
        refreshToken.value = refreshT
    }
    async function getRefreshedToken() {
        const { $customFetch } = useNuxtApp()
        const tokensRefreshUrl = useEndpoints('refreshTokenUrl')

        try {
            const data = await $customFetch<IAuthData>(
                tokensRefreshUrl,
                {
                    method: 'POST',
                    body: {
                        refreshToken: refreshToken.value,
                    },
                }
            )

            console.log('...WRITING TO STORAGE...')
            setTokens(data.content.token, data.content.refreshToken)

            return data
        } catch {
            throw new Error('Failed to refresh token. Please try again.')
        }
    }

    function handleLogout() {
        const router = useRouter()
        setTokens(null, null)
        router.push('/auth/login')
    }

    return {
        accessToken,
        refreshToken,
        isAuthenticated,
        setTokens,
        getRefreshedToken,
        handleLogout,
    }
})
