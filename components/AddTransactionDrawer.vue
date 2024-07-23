<script setup lang="ts">
import type { FormSubmitEvent, FormError, FormErrorEvent } from '#ui/types'

import type {
    AddTransactionSchemaType,
    ICategory,
    ITransactionForm,
    TSubCategory,
} from '~/types'

const props = defineProps<{
    refresh?: () => Promise<void> | void
}>()

const isOpen = defineModel({ type: Boolean, default: false })

const { $dayjs } = useNuxtApp()

const toast = useToast()
const transactionStore = useTransactionStore()
const { addTransaction, updateTransaction } = transactionStore
const { transaction } = storeToRefs(transactionStore)

const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)

// const typeStore = useTypeStore()
// const { types } = storeToRefs(typeStore)

// types
// const transactionTypes = computed(() =>
//     types.value.map((type: TActiveType) => ({
//         label: type.name,
//         value: type.id,
//     }))
// )
const transactionTypes = ref(['Credit', 'Debit'])

// categories
const transactionCategories = computed(() =>
    categories.value.map((category: Omit<ICategory, 'isDeleted'>) => ({
        label: category.name,
        value: category.id,
    }))
)

const subCategories = ref<{ label: string; value: number }[]>([])

// const fileRef = ref<HTMLInputElement>()

// function onFileChange(e: Event) {
//     const input = e.target as HTMLInputElement

//     if (!input.files?.length) {
//         return
//     }

//     //   form.attachment = URL.createObjectURL(input.files[0])
// }

const loading = ref<boolean>(false)
const defaultFormState: ITransactionForm = {
    amount: 0,
    type: '',
    categoryId: 0,
    subCategoryId: 0,
    transactionDate: '',
    description: '',
}
const form = ref<ITransactionForm>({ ...toRef(defaultFormState).value })

const validate = (state: ITransactionForm): FormError[] => {
    const errors = []
    if (!state.amount)
        errors.push({ path: 'amount', message: 'Please input an amount' })
    if (!state.type)
        errors.push({ path: 'type', message: 'Please select a type' })
    if (!state.categoryId)
        errors.push({ path: 'categoryId', message: 'Please add a category' })
    //   if (!state.subCategoryId) errors.push({ path: 'subCategoryId', message: 'Required' })
    if (!state.transactionDate)
        errors.push({
            path: 'transactionDate',
            message: 'Please select a date for the transaction',
        })
    if (!state.description)
        errors.push({ path: 'description', message: 'Description is required' })
    return errors
}

async function onError(event: FormErrorEvent) {
    const element = document.getElementById(event.errors[0].id)
    element?.focus()
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const $resetForm = () => {
    Object.assign(form.value, defaultFormState)
}

const onCloseSlide = () => {
    $resetForm()
    transaction.value = null
    isOpen.value = !isOpen.value
}

const getSubCatogories = (categoryId: number): TSubCategory[] | [] => {
    return (
        categories.value.find((category) => category.id == categoryId)
            ?.subCategories ?? []
    )
}

async function onSubmit(event: FormSubmitEvent<AddTransactionSchemaType>) {
    loading.value = true
    const transactionId = transaction.value?.id
    try {
        const data = transactionId
            ? await updateTransaction(transactionId, event.data)
            : await addTransaction(event.data)

        if (data.success) {
            toast.add({
                title: 'Transaction uploaded successfully',
                color: 'green',
                description: "You've successfully uploaded a new transaction",
                icon: 'i-heroicons-outline-check-badge',
            })

            if (props.refresh) {
                await props.refresh()
            }

            onCloseSlide()
        }
    } catch {
        toast.add({
            title: 'Transaction Upload Failed',
            color: 'red',
            description:
                'Sorry, we are unable to upload your transaction at this moment.',
            icon: 'i-heroicons-outline-exclaimation-circle',
        })
        throw new Error('Failed add a ew transaction. Please try again.')
    } finally {
        loading.value = !loading.value
    }
}

watch(transaction, (_updated) => {
    if (_updated) {
        const { amount, typeId, categoryId, transactionDateUtc, description } =
            _updated
        Object.assign(form.value, {
            amount,
            typeId,
            categoryId,
            description,
            transactionDate: $dayjs(transactionDateUtc).format('YYYY-MM-DD'),
        })
    }
})

watch(isOpen, (_isOpen) => {
    if (!_isOpen) {
        $resetForm()
        transaction.value = null
    }
})

watch(
    () => form.value.categoryId,
    (updated) => {
        const categories = getSubCatogories(updated)
        subCategories.value = categories.map((sub) => ({
            value: sub.id as number,
            label: sub.name,
        }))
    }
)

onMounted(async () => {
    // transaction categories and types
    await categoryStore.getCategories()
})
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
                    shadow: '',
                    divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                    body: {
                        base: 'overflow-hidden sm:h-[44.063]',
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
                            {{
                                transaction
                                    ? 'Update Transaction'
                                    : 'New Transaction'
                            }}
                        </h3>
                        <p class="text-dark-gray font-light">
                            Add new transactions by filling this form.
                        </p>
                    </div>
                </template>

                <div class="space-y-4 h-[44rem]">
                    <UForm
                        :validate
                        :schema="AddTransactionSchema"
                        :state="form"
                        class="space-y-6"
                        @submit="onSubmit"
                        @error="onError"
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
                                id="typeId"
                                v-model.number="form.type"
                                :options="transactionTypes"
                                placeholder="Select transaction type"
                            />
                        </UFormGroup>

                        <UFormGroup size="xl" label="Category" name="category">
                            <USelect
                                v-model.number="form.categoryId"
                                :options="transactionCategories"
                                placeholder="Select transaction category"
                            />
                        </UFormGroup>

                        <UFormGroup
                            v-if="subCategories.length > 0"
                            size="xl"
                            label="Sub Category"
                            name="subCategory"
                        >
                            <USelect
                                v-model.number="form.subCategoryId"
                                :options="subCategories"
                                placeholder="Select sub category"
                            />
                        </UFormGroup>

                        <UFormGroup size="xl" label="Date" name="date">
                            <UInput
                                v-model="form.transactionDate"
                                type="date"
                                placeholder=""
                                :max="$dayjs().format('YYYY-MM-DD')"
                            />
                        </UFormGroup>

                        <!-- <UFormGroup
                            size="xl"
                            label="Attachments"
                            name="attachments"
                            help="JPG, PNG or PDF. 1MB Max."
                            :ui="{ help: 'mt-1 text-sm' }"
                        >
                            <UInput type="file" icon="i-heroicons-folder" />
                        </UFormGroup> -->

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
                                :loading
                                size="xl"
                                padding="md"
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
