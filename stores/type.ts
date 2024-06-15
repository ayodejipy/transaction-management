import type { ITypes, TActiveType, TTypeData } from '~/types'

export const useTypeStore = defineStore('type', () => {
    const typesUrl = useEndpoints('typesUrl')
    const type = ref<TActiveType | null>(null)
    const types = ref<TActiveType[]>([])

    async function getTypes() {
        const { $customFetch } = useNuxtApp()

        const data = await $customFetch<TTypeData>(typesUrl)

        if (data.success) {
            types.value = data.content as unknown as ITypes[]
        }

        return data
    }

    async function addType(body: Partial<ITypes>): Promise<TTypeData> {
        const { $customFetch } = useNuxtApp()

        const data = await $customFetch<TTypeData>(typesUrl, {
            method: 'POST',
            body,
        })

        return data
    }

    async function updateType(
        id: number,
        body: Partial<ITypes>
    ): Promise<TTypeData> {
        const { $customFetch } = useNuxtApp()

        const data = await $customFetch<TTypeData>(`${typesUrl}/${id}/update`, {
            method: 'POST',
            body,
        })

        return data
    }

    async function deleteType(id: number): Promise<TTypeData> {
        const { $customFetch } = useNuxtApp()

        const data = await $customFetch<TTypeData>(`${typesUrl}/${id}/remove`)

        return data
    }

    return {
        type,
        types,
        getTypes,
        addType,
        updateType,
        deleteType,
    }
})
