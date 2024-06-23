import type { ITransaction, ITransactionData, ITransactionForm, ITransactionsData } from '~/types'

type TTransaction = Omit<ITransaction, 'categoryId' | 'typeId' | 'createdAtUtc'>

export const useTransactionStore = defineStore('transaction', () => {
    const transactionsUrl = useEndpoints('transactionsUrl')

    const transactions = ref<ITransaction[]>([])
    const transaction = ref<TTransaction | null>(null)

    async function getTransactions(): Promise<ITransactionsData> {
        const { $customFetch } = useNuxtApp()

        const data = await $customFetch<ITransactionsData>(transactionsUrl)

        if (data.success) {
            transactions.value = data.content
        }

        return data
    }

    async function addTransaction(
        body: ITransactionForm
    ): Promise<ITransactionData> {
        const { $customFetch } = useNuxtApp()

        const data = await $customFetch<ITransactionData>(transactionsUrl, {
            method: 'POST',
            body,
        })

        return data
    }

    return {
        transaction,
        transactions,
        getTransactions,
        addTransaction,
    }
})
