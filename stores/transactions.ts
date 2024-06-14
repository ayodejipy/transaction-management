import type { ITransaction, ITransactionData } from '~/types'

export const useTransactionStore = defineStore('transaction', () => {
    const transactionUrl = useEndpoints('transactionUrl')
    const transactions = ref<ITransaction[]>([])

    async function getTransactions(): Promise<ITransactionData> {
        const { $customFetch } = useNuxtApp()

        const data = await $customFetch<ITransactionData>(transactionUrl)

        if (data.success) {
            transactions.value = data.content as unknown as ITransaction[]
        }

        return data
    }

    async function addTransaction(
        body: ITransaction
    ): Promise<ITransactionData> {
        const { $customFetch } = useNuxtApp()

        const data = await $customFetch<ITransactionData>(transactionUrl, {
            method: 'POST',
            body,
        })

        return data
    }

    return {
        getTransactions,
        addTransaction,
    }
})
