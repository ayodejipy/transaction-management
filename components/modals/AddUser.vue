<script setup lang="ts">
const isOpen = ref<boolean>(false)

const form = reactive({
    fullname: '',
    email: '',
    password: '',
})

const onCloseModal = () => {
    isOpen.value = !isOpen.value
}

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
                        Add New User
                    </h3>
                    <p class="text-dark-gray font-light">
                        Add new user for transaction upload.
                    </p>
                </div>
            </template>

            <div class="space-y-6">
                <UFormGroup size="xl" label="Full Name">
                    <UInput
                        v-model="form.fullname"
                        placeholder="Enter user name"
                    />
                </UFormGroup>

                <UFormGroup size="xl" label="Email Address">
                    <UInput
                        v-model="form.email"
                        placeholder="Enter user email address"
                    />
                </UFormGroup>

                <UFormGroup size="xl" label="Set User Password">
                    <UInput
                        v-model="form.password"
                        type="password"
                        placeholder="Enter user password"
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
                            rounded: 'rounded-lg',
                            font: 'font-semibold',
                        }"
                    >
                        Create user
                    </UButton>
                </div>
            </template>
        </UCard>
    </UModal>
</template>
