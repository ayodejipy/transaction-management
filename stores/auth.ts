import type { IAuthData, IDataResponse } from '~/types'
import getEndpoints from '~/utils/endpoints'

export const useAuthStore = defineStore('auth', () => {
    const LOGIN_PATH: string = '/auth/login'
    const ADMIN_PATH: string = '/admin'
    const USER_PATH: string = '/transactions'

    const { user } = storeToRefs(useUserStore())

    const forgotPasswordUrl = getEndpoints('forgotPasswordUrl')

    const accessToken = useCookie('opabid-access')
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
        const tokensRefreshUrl = getEndpoints('refreshTokenUrl')

        try {
            const data = await $customFetch<IAuthData>(tokensRefreshUrl, {
                method: 'POST',
                body: {
                    refreshToken: refreshToken.value,
                },
            })

            setTokens(data.content.token, data.content.refreshToken)

            return data
        } catch (error) {
            const errorData = getErrorObject(error as Error)
            if (errorData?.status === 500 && errorData?.title === 'Timeout') {
                user.value = null
                setTokens(null, null)
                router.push(LOGIN_PATH)
            }

            throw new Error('Failed to refresh token. Please try again.')
        }
    }

    async function forgotPassword(body: string) {
        const { $customFetch } = useNuxtApp()

        const data = await $customFetch<IDataResponse<string>>(
            forgotPasswordUrl,
            {
                method: 'POST',
                body,
            }
        )
        return data
    }

    async function handleLogout(uid: string) {
        const router = useRouter()
        const { $customFetch } = useNuxtApp()
        const authUrl = getEndpoints('authUrl')

        const data = await $customFetch<IAuthData>(`${authUrl}/${uid}/logout`)

        if (data.success) {
            setTokens(null, null)
            user.value = null
            router.push(LOGIN_PATH)
        }

        return data
    }

    return {
        adminPath: unref(ADMIN_PATH),
        userPath: unref(USER_PATH),
        accessToken,
        refreshToken,
        isAuthenticated,
        setTokens,
        getRefreshedToken,
        forgotPassword,
        handleLogout,
    }
})


// "postinstall": "nuxt prepare",