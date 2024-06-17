<script setup lang="ts">
import type { IAuthData } from '~/types'

useHead({
    title: 'User login'
})

definePageMeta({
    layout: false,
})

const toast = useToast()
const router = useRouter()

const { $customFetch } = useNuxtApp()

const authStore = useAuthStore()

const loading = ref<boolean>(false)
const form = reactive({
    email: '',
    password: '',
    // stay_logged_in: false,
})

async function handleLogin() {
    loading.value = true
    const loginUrl = useEndpoints('loginUrl')
    try {
        const data = await $customFetch<IAuthData>(loginUrl, {
            method: 'POST',
            body: form,
        })
        authStore.setTokens(data.content.token, data.content.refreshToken)
        router.push('/admin')

        toast.add({
            title: 'Login Successful',
            color: 'green',
            description: 'Welcome, you will be redirected soon...',
            icon: 'i-heroicons-outline-check-badge',
        })
    } catch {
        toast.add({
            title: 'Login failed',
            color: 'red',
            description: 'Email or password incorrect.',
            icon: 'i-heroicons-outline-exclaimation-circle',
        })
        throw new Error('Failed authenticate user. Please try again.')
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
            <div class="mx-auto mb-6">
                <img
                    class="w-16 h-16"
                    src="~/assets/logo.svg"
                    alt="application logo"
                >
            </div>
            <div class="text-center space-y-3">
                <h3 class="text-brand-gray text-3xl font-semibold">
                    Log in to your account
                </h3>
                <p class="text-dark-gray font-light">
                    Welcome back! Please enter your details.
                </p>
            </div>

            <div class="mt-6 space-y-6">
                <UFormGroup size="xl" label="Email" name="email">
                    <UInput
                        v-model="form.email"
                        placeholder="Enter your email"
                    />
                </UFormGroup>

                <UFormGroup size="xl" label="Password" name="label">
                    <UInput
                        v-model="form.password"
                        type="password"
                        placeholder="Enter your password"
                    />
                </UFormGroup>

                <div class="flex items-center justify-between my-6">
                    <UCheckbox
                        name="stayLogged"
                        label="Remember for 30 days"
                        :ui="{
                            label: 'text-gray-500',
                        }"
                    />
                    <ULink
                        to="/"
                        active-class="text-primary"
                        inactive-class="text-sm text-green-500 font-semibold dark:text-gray-400 hover:text-green-600 dark:hover:text-gray-200"
                    >
                        Forgot password
                    </ULink>
                </div>
                <UButton
                    block
                    size="xl"
                    padding="md"
                    :loading="loading"
                    :ui="{
                        rounded: 'rounded-full',
                        font: 'font-semibold',
                    }"
                    @click="handleLogin"
                >
                    Sign in
                </UButton>
            </div>
        </section>
    </section>
</template>
