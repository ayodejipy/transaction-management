import type { IUser, IUserData } from '~/types'
import getEndpoints from '~/utils/endpoints'

export const useUserStore = defineStore(
    'users',
    () => {
        const userProfileUrl = getEndpoints('userProfileUrl')
        const user = ref<IUser | null>(null)

        const isLoggedIn = computed(() => !!user.value)
        const isAdmin = computed(() => user.value?.roles[0] === userRoles.SuperAdmin)

        async function getProfile(): Promise<IUserData> {
            const { $customFetch } = useNuxtApp()

            const data = await $customFetch<IUserData>(userProfileUrl)

            if (data.success) {
                user.value = data.content
            }

            return data
        }

        return { user, isAdmin, isLoggedIn, getProfile }
    },
    {
        persist: {
            storage: persistedState.localStorage,
        },
    }
)
