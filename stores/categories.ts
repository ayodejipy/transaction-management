import type { ICategory, TCategoryData } from '~/types'
import getEndpoints from '~/utils/endpoints'

export const useCategoryStore = defineStore('category', () => {
	const categoriesUrl = getEndpoints('categoriesUrl')
    const categories = ref<Omit<ICategory, 'isDeleted'>[]>([])

    const category = ref<Omit<ICategory, 'isDeleted'> | null>(null)

	async function getCategories(): Promise<TCategoryData> {
        const { $customFetch } = useNuxtApp()

        const data = await $customFetch<TCategoryData>(categoriesUrl)

        if (data.success) {
            categories.value = data.content as unknown as ICategory[]
        }

        return data
    }
	
	async function addCategory(body: Partial<ICategory>): Promise<TCategoryData> {
        const { $customFetch } = useNuxtApp()

		const data = await $customFetch<TCategoryData>(categoriesUrl, {
            method: 'POST',
            body,
        })

       return data
    }

	async function updateCategory(
        id: number,
        body: Partial<ICategory>
    ): Promise<TCategoryData> {
        const { $customFetch } = useNuxtApp()

        const data = await $customFetch<TCategoryData>(
            `${categoriesUrl}/${id}/update`,
            {
                method: 'POST',
                body,
            }
        )

        return data
    }

	async function deleteCategory(id: number): Promise<TCategoryData> {
        const { $customFetch } = useNuxtApp()

		const data = await $customFetch<TCategoryData>(`${categoriesUrl}/${id}/remove`)

       return data
    }

	return {
        category,
        categories,
        getCategories,
        addCategory,
        updateCategory,
        deleteCategory,
    }
})
