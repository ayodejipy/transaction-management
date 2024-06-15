<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types'

import type { ITypes, TransactionTypeSchemaType } from '~/types'

const isOpen = defineModel({ type: Boolean, default: false })

const toast = useToast()
const categoryStore = useCategoryStore()
const { addCategory, updateCategory } = categoryStore
const { category } = storeToRefs(categoryStore)

// const isError = ref<boolean>(false)
const loading = ref<boolean>(false)

const formElement = ref<HTMLFormElement | null>(null)
const defaultFormState: Partial<ITypes> = {
    name: '',
    description: '',
}
const form: Partial<ITypes> = reactive({ ...defaultFormState })

const isEnabled = computed<boolean>(() => !!form.name)

const $resetForm = () => {
    Object.assign(form, defaultFormState)
}

const onCloseModal = () => {
    $resetForm()
    isOpen.value = !isOpen.value
}

async function onSubmit(event: FormSubmitEvent<TransactionTypeSchemaType>) {
    loading.value = true
    const categoryId = category.value?.id
    try {
        const data = categoryId ? await updateCategory(categoryId, event.data) : await addCategory(event.data)

        if (data.success) {
            toast.add({
                title: 'Category created Successfully',
                color: 'green',
                description:
                    "You've successfully added a new transaction category",
                icon: 'i-heroicons-outline-check-badge',
            })

            // close and reset
            onCloseModal()
        }
    } catch {
        toast.add({
            title: 'Category Creation Failed',
            color: 'red',
            description: 'Unable to create your category at this moment.',
            icon: 'i-heroicons-outline-exclaimation-circle',
        })
        // throw new Error('Failed authenticate user. Please try again.')
    } finally {
        loading.value = !loading.value
    }
}

watch(category, (data) => {
    if (data) {
        Object.assign(form, data)
    }
})
</script>

<template>
    <UModal
        v-model="isOpen"
        :ui="{
            width: 'sm:max-w-2xl',
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
                        Add New Category
                    </h3>
                    <p class="text-dark-gray font-light">
                        Add a new category for transactions.
                    </p>
                </div>
            </template>

            <div class="w-full">
                <UForm
                    ref="formElement"
                    :schema="TransactionTypeSchema"
                    :state="form"
                    class="space-y-6"
                    @submit="onSubmit"
                >
                    <UFormGroup size="xl" label="Name" name="name">
                        <UInput
                            v-model="form.name"
                            placeholder="Category name"
                        />
                    </UFormGroup>

                    <UFormGroup
                        size="xl"
                        label="Description"
                        name="description"
                        hint="Optional"
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
                            @click="onCloseModal"
                        >
                            Cancel
                        </UButton>

                        <UButton
                            type="submit"
                            :loading
                            size="xl"
                            padding="md"
                            :disabled="!isEnabled"
                            :ui="{
                                rounded: 'rounded-lg',
                                font: 'font-semibold',
                            }"
                        >
                            Create category
                        </UButton>
                    </div>
                </UForm>
            </div>

            <!-- <template #footer>
               
            </template> -->
        </UCard>
    </UModal>
</template>
