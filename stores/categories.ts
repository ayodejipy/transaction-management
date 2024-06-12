import type { IAuthData, ICategory, TCategoryData } from '~/types'

export const useCategoryStore = defineStore('category', () => {
	const categoriesUrl = useEndpoints('categoriesUrl')
    const categories = ref<ICategory[]>([])

	async function getCategories(body: ICategory) {
		const { $customFetch } = useNuxtApp()
		
		const data = await $customFetch<TCategoryData>(categoriesUrl, {
            body,
        })

		if (data.success) {
			categories.value = data.content as unknown as ICategory[]
		}

       return data
	}
	
	async function addCategory(body: ICategory) {
        const { $customFetch } = useNuxtApp()

		const data = await $customFetch<TCategoryData>(categoriesUrl, {
            method: 'POST',
            body,
        })

       return data
    }

	return {
        categories,
		getCategories,
        addCategory,
    }
})
