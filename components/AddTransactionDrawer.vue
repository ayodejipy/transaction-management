<script setup lang="ts">
const isOpen = defineModel({ type: Boolean, default: false })

// type
const transactionTypes = ['Project', 'Pledge', 'Offering']

// category
const transactionCategories = ['Income', 'Expenditure']

const transaction = reactive({
    amount: '',
    type: transactionTypes[2],
    category: transactionCategories[0],
    date: '',
    description: '',
})

const onCloseSlide = () => {
    isOpen.value = !isOpen.value
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
                    <UFormGroup size="xl" label="Amount">
                        <UInput
                            v-model="transaction.amount"
                            placeholder="Enter amount"
                        />
                    </UFormGroup>

                    <UFormGroup size="xl" label="Type">
                        <USelect
                            v-model="transaction.type"
                            :options="transactionTypes"
                        />
                    </UFormGroup>

                    <UFormGroup size="xl" label="Category">
                        <USelect
                            v-model="transaction.category"
                            :options="transactionCategories"
                        />
                    </UFormGroup>

                    <UFormGroup size="xl" label="Date">
                        <UInput
                            v-model="transaction.date"
                            type="date"
                            placeholder=""
                        />
                    </UFormGroup>

                    <UFormGroup size="xl" label="Description">
                        <UTextarea
                            v-model="transaction.description"
                            variant="outline"
                            placeholder=""
                        />
                    </UFormGroup>
                </div>

                <template #footer>
                    <div class="flex justify-between items-center">
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
                </template>
            </UCard>
        </USlideover>
    </div>
</template>
