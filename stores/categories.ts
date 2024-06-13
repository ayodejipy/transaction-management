import type { ICategory, TCategoryData } from '~/types'

export const useCategoryStore = defineStore('category', () => {
	const categoriesUrl = useEndpoints('categoriesUrl')
    const categories = ref<ICategory[]>([])

	async function getCategories() {
		const { $customFetch } = useNuxtApp()
		
		const data = await $customFetch<TCategoryData>(categoriesUrl)

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
