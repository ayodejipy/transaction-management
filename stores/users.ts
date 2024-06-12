import type { IUser } from '~/types'

export const useUserStore = defineStore(
    'users',
    () => {
        const user = ref<IUser | null>(null)

        return { user }
    },
    {
        persist: {
            storage: persistedState.localStorage,
        },
    }
)
