<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import type {
    AddTransactionSchemaType,
    ICategory,
    ITransaction,
    ITypes,
} from '~/types'

const isOpen = defineModel({ type: Boolean, default: false })

const { addTransaction } = useTransactionStore()

const { categories } = storeToRefs(useCategoryStore())
const { types } = storeToRefs(useTypeStore())

const toast = useToast()

const formElement = ref(null)

// types
const transactionTypes = computed(() =>
    types.value.map((type: ITypes) => ({ label: type.name, value: type.id }))
)

// categories
const transactionCategories = computed(() =>
    categories.value.map((category: ICategory) => ({
        label: category.name,
        value: category.id,
    }))
)

const loading = ref<boolean>(false)
const defaultFormState: ITransaction = {
    amount: 0,
    typeId: 0,
    categoryId: 0,
    transactionDate: '',
    description: '',
}
const form: ITransaction = reactive({...defaultFormState })

const resetForm = () => {
  Object.assign(form, defaultFormState);
};

const onCloseSlide = () => {
    console.log('__form elem:___ ', formElement.value)
    resetForm()
    isOpen.value = !isOpen.value
}

async function onSubmit(event: FormSubmitEvent<AddTransactionSchemaType>) {
    // loading.value = true
    console.log({ event })

    try {
        const data = await addTransaction(event.data)

        if (data.success) {
            toast.add({
                title: 'Transaction upload Successfully',
                color: 'green',
                description: "You've successfully uploaded a new transaction",
                icon: 'i-heroicons-outline-check-badge',
            })
        }
    } catch {
        toast.add({
            title: 'Transaction Upload Failed',
            color: 'red',
            description: 'Sorry, we are unable to upload your transaction at this moment.',
            icon: 'i-heroicons-outline-exclaimation-circle',
        })
        throw new Error('Failed add a ew transaction. Please try again.')
    } finally {
        loading.value = !loading.value
    }
}
</script>

<template>
    <div>
        <USlideover
            v-model="isOpen"
            :ui="{
                width: 'max-w-xl',
            }"
        >
            <UCard
                :ui="{
                    ring: '',
                    divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                    body: {
                        padding: 'sm:p-8',
                    },
                    header: {
                        padding: 'sm:px-8 sm:pt-8',
                    },
                    footer: {
                        padding: 'sm:px-8 sm:pb-10',
                    },
                }"
            >
                <template #header>
                    <div class="space-y-2">
                        <h3 class="text-brand-gray text-2xl font-semibold">
                            New Transaction
                        </h3>
                        <p class="text-dark-gray font-light">
                            Upload new transactions by filling this form.
                        </p>
                    </div>
                </template>

                <div class="space-y-4">
                    <UForm
                        ref="formElement"
                        :schema="AddTransactionSchema"
                        :state="form"
                        class="space-y-6"
                        @submit="onSubmit"
                    >
                        <UFormGroup size="xl" label="Amount" name="amount">
                            <UInput
                                v-model="form.amount"
                                type="number"
                                placeholder="Enter amount"
                            />
                        </UFormGroup>

                        <UFormGroup size="xl" label="Type" name="type">
                            <USelect
                                v-model="form.typeId"
                                :options="transactionTypes"
                                placeholder="Select transaction type"
                            />
                        </UFormGroup>

                        <UFormGroup size="xl" label="Category" name="category">
                            <USelect
                                v-model="form.categoryId"
                                :options="transactionCategories"
                                placeholder="Select transaction category"
                            />
                        </UFormGroup>

                        <UFormGroup size="xl" label="Date" name="date">
                            <UInput
                                v-model="form.transactionDate"
                                type="date"
                                placeholder=""
                            />
                        </UFormGroup>

                        <UFormGroup
                            size="xl"
                            label="Description"
                            name="description"
                        >
                            <UTextarea
                                v-model="form.description"
                                variant="outline"
                                placeholder=""
                            />
                        </UFormGroup>

                        <div
                            class="sm:mt-8 sm:pt-4 border-t border-gray-200 flex justify-between items-center"
                        >
                            <UButton
                                size="xl"
                                color="gray"
                                variant="outline"
                                padding="md"
                                :ui="{
                                    rounded: 'rounded-lg',
                                    font: 'font-semibold',
                                }"
                                @click="onCloseSlide"
                            >
                                Cancel
                            </UButton>

                            <UButton
                                type="submit"
                                size="xl"
                                padding="md"
                                :loading
                                :ui="{
                                    base: 'bg-brand-green',
                                    rounded: 'rounded-lg',
                                    font: 'font-semibold',
                                }"
                            >
                                Upload
                            </UButton>
                        </div>
                    </UForm>
                </div>
            </UCard>
        </USlideover>
    </div>
</template>
