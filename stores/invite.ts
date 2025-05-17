import type {
    InvitedUserInterface,
    IDataResponse,
    InviteUserForm,
} from '~/types'
import getEndpoints from '~/utils/endpoints'

export const useInviteStore = defineStore('invite', () => {
    const userInviteUrl = getEndpoints('userInviteUrl')
    const invitedUsers = ref<InvitedUserInterface[]>([])

    async function invite(
        body: InviteUserForm
    ): Promise<IDataResponse<string>> {
        const { $customFetch } = useNuxtApp()

        const data = await $customFetch<IDataResponse<string>>(userInviteUrl, {
            method: 'POST',
            body,
        })

        return data
	}
	
	async function resendInvite(
		id: number
    ): Promise<IDataResponse<string>> {
        const { $customFetch } = useNuxtApp()

        const data = await $customFetch<IDataResponse<string>>(`${userInviteUrl}/${id}/resend`, {
            method: 'POST'
        })

        return data
    }

    return { invitedUsers, invite, resendInvite }
})
