import type { IAuthData, ITypes, TTypeData } from '~/types'

export const useTypeStore = defineStore('type', () => {
	const typesUrl = useEndpoints('typesUrl')
	const type = ref<ITypes | null>(null)
	const types = ref<ITypes[]>([])

	async function getTypes(body: ITypes) {
        const { $customFetch } = useNuxtApp()

        const data = await $customFetch<TTypeData>(typesUrl, {
            body,
        })

        if (data.success) {
            types.value = data.content as unknown as ITypes[]
        }

        return data
    }
	
	async function addType(body: ITypes): Promise<TTypeData> {
        const { $customFetch } = useNuxtApp()

        const data = await $customFetch<TTypeData>(typesUrl, {
            method: 'POST',
            body,
        })

        return data
    }

	return {
		type,
        types,
		getTypes,
        addType,
    }
})