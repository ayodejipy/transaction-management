<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import type { IAuthData, TSchema } from '~/types';
import { acceptInviteSchema } from '~/utils'

definePageMeta({
    layout: false,
})

const authStore = useAuthStore()
const { accessToken, refreshToken } = storeToRefs(authStore)
const { user } = storeToRefs(useUserStore())

const router = useRouter()
const route = useRoute()

const toast = useToast()

const { $customFetch } = useNuxtApp()


const loading = ref<boolean>(false)
const form = reactive({
    email: '',
    password: '',
    confirmPassword: '',
})

const token = computed<string>(() => route.query.token as string)

const isButtonEnabled = computed<boolean>(() => !!token.value)

async function handleAcceptInvite(event: FormSubmitEvent<TSchema>) {
    loading.value = true
    const acceptInviteUrl = useEndpoints('userInviteAcceptUrl')
    const body = {
        ...event.data,
        token: token.value,
	}
	
    try {
        const data = await $customFetch<IAuthData>(acceptInviteUrl, {
            method: 'POST',
            body,
        })
        user.value = data.content.user
		accessToken.value = data.content.token
		refreshToken.value = data.content.refreshToken

        toast.add({
            title: 'Account created Successfully',
            color: 'green',
            description: 'Welcome onboard! Your account is ready',
            icon: 'i-heroicons-outline-check-badge',
		})
		
		console.log({ data })
		
		router.push('/')
    } catch {
        toast.add({
            title: 'Account Setup Failed',
            color: 'red',
            description: 'Email or password incorrect.',
            icon: 'i-heroicons-outline-exclaimation-circle',
        })
        // throw new Error('Failed authenticate user. Please try again.')
    } finally {
        loading.value = !loading.value
    }
}

onMounted(() => {
    form.email = route.query.email as string
})
</script>

<template>
    <section
        class="w-full min-h-screen bg-gray-900 flex justify-center items-center"
    >
        <section class="w-2/6 bg-white flex flex-col px-10 py-12 rounded-3xl">
            <div class="mx-auto mb-6">
                <img
                    class="w-16 h-16"
                    src="~/assets/logo.svg"
                    alt="application logo"
                >
            </div>
            <div class="text-center space-y-3">
                <h3 class="text-brand-gray text-3xl font-semibold">
                    Setup your account
                </h3>
                <p class="text-dark-gray font-light">
                    Welcome! Please enter your password to create your account.
                </p>
            </div>

            <div class="mt-6">
                <UForm
                    :schema="acceptInviteSchema"
                    :state="form"
                    class="space-y-6"
                    @submit="handleAcceptInvite"
                >
                    <UFormGroup size="xl" label="Email" name="email">
                        <UInput
                            v-model="form.email"
                            placeholder="Enter your email"
                        />
                    </UFormGroup>

                    <UFormGroup size="xl" label="Password" name="password">
                        <UInput
                            v-model="form.password"
                            type="password"
                            placeholder="Enter your password"
                        />
                    </UFormGroup>

                    <UFormGroup size="xl" label="Confirm Password" name="confirmPassword">
                        <UInput
                            v-model="form.confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
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
                        Create account
                    </UButton>
                </UForm>
            </div>
        </section>
    </section>
</template>
