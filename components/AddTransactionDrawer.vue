<script setup lang="ts">
const isOpen = ref<boolean>(false)

const transaction = reactive({
    amount: '',
    type: '',
    category: '',
    date: '',
    description: '',
})

const onCloseModal = () => {
    isOpen.value = !isOpen.value
}
</script>

<template>
    <div>
        <UButton label="Open" @click="isOpen = true" />

        <USlideover v-model="isOpen">
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

                <div class="space-y-6">
                    <UFormGroup size="xl" label="Amount">
                        <UInput
                            placeholder="Enter user name"
                            v-model="transaction.amount"
                        />
                    </UFormGroup>

                    <UFormGroup size="xl" label="Type">
                        <UInput
                            placeholder="Enter user email address"
                            v-model="transaction.type"
                        />
                    </UFormGroup>

                    <UFormGroup size="xl" label="Category">
                        <UInput
                            placeholder="Select category"
                            v-model="transaction.category"
                        />
                    </UFormGroup>

                    <UFormGroup size="xl" label="Date">
                        <UInput
                            placeholder="Enter user password"
                            v-model="transaction.date"
                        />
                    </UFormGroup>

                    <UFormGroup size="xl" label="Description">
                        <UInput
                            placeholder="Enter user password"
                            v-model="transaction.description"
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
                            @click="onCloseModal"
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
