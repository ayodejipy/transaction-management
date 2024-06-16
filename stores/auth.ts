import type { IAuthData } from '~/types'

export const useAuthStore = defineStore('auth', () => {
    // const TOKEN_KEY: string = 'opabid-accessToken'
    const { user } = storeToRefs(useUserStore())

    const accessToken = useCookie('opabid-access', {
        maxAge: 60 * 60,
    })
    const refreshToken = useCookie('opabid-refresh')

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
            const errorData = getErrorObject(error as Error)
            if (errorData?.status === 500 && errorData?.title === 'Timeout') {
                user.value = null
                setTokens(null, null)
                router.push('/auth/login')
            }

            throw new Error('Failed to refresh token. Please try again.')
        }
    }

    async function handleLogout() {
        const router = useRouter()
        // const { $customFetch } = useNuxtApp()
        // const authUrl = useEndpoints('authUrl')

        // const data = await $customFetch<IAuthData>(
        //     `${authUrl}/${ref}/logout`
        // )
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
