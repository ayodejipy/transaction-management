import { useStorage } from '@vueuse/core'
import type { IAuthData } from '~/types'


export const useAuthStore = defineStore('auth', () => {
    const { user } = storeToRefs(useUserStore())
    
    const accessToken = useStorage('x-accessToken', '')
    const refreshToken = useCookie('XS-TM-RFT')
    
    const isAuthenticated = computed<boolean>(
        () => !!(accessToken.value && refreshToken.value)
    )

    // actions
    function setTokens(token: string | null, refreshT: string | null): void {
        accessToken.value = token
        refreshToken.value = refreshT
    }

    async function getRefreshedToken(): Promise<IAuthData> {
        const router = useRouter()
        const { $customFetch } = useNuxtApp()
        const tokensRefreshUrl = useEndpoints('refreshTokenUrl')

        try {
            const data = await $customFetch<IAuthData>(tokensRefreshUrl, {
                method: 'POST',
                body: {
                    refreshToken: refreshToken.value,
                },
            })

            console.log('...WRITING TO STORAGE...')
            setTokens(data.content.token, data.content.refreshToken)

            return data
        } catch (error: any) {
            const errorData = getErrorObject(error)
            if (errorData?.status === 500 && errorData?.title === 'Timeout') {
                user.value = null
                setTokens(null, null)
                router.push('/auth/login')
            }

            throw new Error('Failed to refresh token. Please try again.')
        }
    }

    function handleLogout(): void {
        const router = useRouter()
        setTokens(null, null)
        user.value = null
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
