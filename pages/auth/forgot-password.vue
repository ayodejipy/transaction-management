<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import type { TForgotPasswordSchema } from '~/types';

useHead({
    title: 'Forgot Password'
})

definePageMeta({
    layout: false,
})

const { forgotPassword } = useAuthStore()

const toast = useToast()

const loading = ref<boolean>(false)
const form = reactive({
    email: '',
})

const isButtonEnabled = computed<boolean>(() => !!form.email)

async function onSubmit(event: FormSubmitEvent<TForgotPasswordSchema>) {
    loading.value = true
	
    try {
        const data = await forgotPassword(event.data)

		if(data.success) {
			toast.add({
				title: 'Recovery email sent Successfully',
				color: 'green',
				description: 'You will receive a password recovery/reset email soon',
				icon: 'i-heroicons-outline-check-badge',
			})
		}

    } catch(error) {
		const errorLog = getErrorObject(error as Error)
        toast.add({
            title: 'Account Recovery Failed',
            color: 'red',
            description: errorLog?.message ?? 'Cannot send recovery email at this time.',
            icon: 'i-heroicons-outline-exclaimation-circle',
        })
        // throw new Error('Failed authenticate user. Please try again.')
    } finally {
        loading.value = !loading.value
    }
}

</script>

<template>
    <section
        class="w-full min-h-screen bg-gray-900 flex justify-center items-center"
    >
        <section class="w-2/6 bg-white flex flex-col px-10 py-12 rounded-3xl">
            <div class="mx-auto mb-4">
                <img
                    class="w-16 h-16"
                    src="~/assets/logo.svg"
                    alt="application logo"
                >
            </div>
            <div class="text-center space-y-3">
                <h3 class="text-brand-gray text-3xl font-semibold">
                    Forgot your password?
                </h3>
                <p class="text-dark-gray font-light">
                    Enter your email to get a password reset link.
                </p>
            </div>

            <div class="mt-8 sm:mt-16">
                <UForm
                    :schema="ForgotPasswordSchema"
                    :state="form"
                    class="space-y-6"
                    @submit="onSubmit"
                >
                    <UFormGroup size="xl" label="Email" name="email">
                        <UInput
                            v-model="form.email"
                            placeholder="Enter your email"
                        />
                    </UFormGroup>

                    <UButton
                        block
                        type="submit"
                        size="xl"
                        padding="md"
                        :loading="loading"
                        :disabled="!isButtonEnabled"
                        :ui="{
                            rounded: 'rounded-full',
                            font: 'font-semibold',
                        }"
                    >
                        Send recovery email
                    </UButton>
                </UForm>
            </div>

			<div class="mx-auto mt-4">
				<ULink to="/auth/login" class="text-gray-600 font-normal">
					<Icon name="i-solar-login-line-duotone" />
					Back to login
				</ULink>
			</div>
        </section>
    </section>
</template>
