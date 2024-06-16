import type { IUser, IUserData } from '~/types'

export const useUserStore = defineStore(
    'users',
    () => {
        const userProfileUrl = useEndpoints('userProfileUrl')
        const user = ref<IUser | null>(null)

        const isAdmin = computed(() => user.value?.type === 'admin')

        async function getProfile(): Promise<IUserData> {
            const { $customFetch } = useNuxtApp()

            const data = await $customFetch<IUserData>(userProfileUrl)

            if (data.success) {
                user.value = data.content
            }

            return data
        }

        return { user, isAdmin, getProfile }
    },
    {
        persist: {
            storage: persistedState.localStorage,
        },
    }
)
