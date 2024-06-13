import { useStorage } from '@vueuse/core'
import type { IAuthData } from '~/types'

export const useAuthStore = defineStore('auth', () => {
    const TOKEN_KEY: string = 'x-accessToken'
    const { user } = storeToRefs(useUserStore())

    const accessToken = useStorage(TOKEN_KEY, '')

    // const computedToken = computed<string>({
    //     get: () => {
    //         if (import.meta.client) {
    //             const defaultValue = localStorage.getItem(TOKEN_KEY)
    //             accessToken.value = defaultValue
    //             return accessToken as unknown as string
    //         }
    //     },
    //     set: (value: string) => {
    //         accessToken.value = value
    //     },
    // })

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
        } catch (error) {
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
        TOKEN_KEY,
        accessToken,
        refreshToken,
        isAuthenticated,
        setTokens,
        getRefreshedToken,
        handleLogout,
    }
})
