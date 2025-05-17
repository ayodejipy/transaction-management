import type {
    ITransaction,
    ITransactionData,
    ITransactionForm,
    ITransactionsData,
} from '~/types'
import getEndpoints from '~/utils/endpoints'

// type TTransaction = Omit<ITransaction, 'categoryId' | 'typeId' | 'createdAtUtc'>

export const useTransactionStore = defineStore('transaction', () => {
    const transactionsUrl = getEndpoints('transactionsUrl')

    const transactions = ref<ITransaction[]>([])
    const transaction = ref<ITransaction | null>(null)

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

    async function updateTransaction(
        id: number,
        body: Partial<ITransaction>
    ): Promise<ITransactionData> {
        const { $customFetch } = useNuxtApp()

        const data = await $customFetch<ITransactionData>(
            `${transactionsUrl}/${id}/update`,
            {
                method: 'POST',
                body,
            }
        )

        return data
    }

    return {
        transaction,
        transactions,
        getTransactions,
        addTransaction,
        updateTransaction,
    }
})
