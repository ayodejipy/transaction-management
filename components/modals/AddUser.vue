<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types'
import type { InviteUserForm, InviteUserSchemaType } from '~/types'

const props = defineProps<{
    refreshData: () => Promise<void> | void
}>()

const isOpen = defineModel({ type: Boolean, default: false })

const toast = useToast()

const inviteStore = useInviteStore()
const { invite } = inviteStore

// const isError = ref<boolean>(false)
const loading = ref<boolean>(false)
const defaultFormState: InviteUserForm = {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
}
const form: InviteUserForm = reactive({...defaultFormState })

const isEnabled = computed<boolean>(() => !!form.email)
// const buttonText = computed(() => type.value?.id ? 'Edit user' : 'Invite user')

const onCloseModal = () => {
    Object.assign(form, defaultFormState)
    isOpen.value = !isOpen.value
}

async function onSubmit(event: FormSubmitEvent<InviteUserSchemaType>) {
	loading.value = true
    // const invitedId = invitedUser.value?.id
	try {
		const data = await invite(event.data)

		if (data.success) {
			toast.add({
				title: 'User invited successfully',
				color: 'green',
				icon: 'i-heroicons-outline-check-badge',
            })

            await props.refreshData();
            onCloseModal()
		}
    } catch {
        toast.add({
            title: 'Failed to invite user',
            color: 'red',
            icon: 'i-heroicons-outline-exclaimation-circle',
        })
        // throw new Error('Failed authenticate user. Please try again.')
    } finally {
        loading.value = !loading.value
    }
}

// watch(type, (data) => {
//     if (data) {
//         Object.assign(form, data)
//     }
// })
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
                        Invite new user to manage transactions.
                    </p>
                </div>
            </template>

            <div class="w-full">
				<UForm
					:schema="InviteUserSchema"
					:state="form"
					class="space-y-6"
					@submit="onSubmit"
				>
                    <UFormGroup size="xl" label="Email" name="email">
                        <UInput
                            v-model="form.email"
                            type="email"
                            placeholder="User email"
                        />
                    </UFormGroup>

                    <UFormGroup size="xl" label="First Name" name="firstName">
                        <UInput
                            v-model="form.firstName"
                            placeholder="First name"
                        />
                    </UFormGroup>

                    <UFormGroup size="xl" label="Last Name" name="lastName">
                        <UInput
                            v-model="form.lastName"
                            placeholder="Last Name"
                        />
                    </UFormGroup>

                    <UFormGroup size="xl" label="Phone" name="phone">
                        <UInput
                            v-model="form.phone"
                            placeholder="Phone"
                        />
                    </UFormGroup>

					 <div class="sm:mt-8 sm:pt-4 border-t border-gray-200 flex justify-between items-center">
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
							Invite user
						</UButton>
					</div>
                </UForm>
            </div>

            <!-- <template #footer>
               
            </template> -->
        </UCard>
    </UModal>
</template>
