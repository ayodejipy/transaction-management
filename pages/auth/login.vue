<script setup lang="ts">
    import getEndpoints from '~/utils/endpoints'
    import type { IAuthData } from '~/types'

    useHead({
        title: 'Login',
    })

    definePageMeta({
        layout: false,
        middleware: ['auth'],
    })

    const toast = useToast()
    const route = useRoute()
    const router = useRouter()

    const { $customFetch } = useNuxtApp()

    const authStore = useAuthStore()
    const { userPath, adminPath } = authStore

    const loading = ref<boolean>(false)
    const form = reactive({
        email: '',
        password: '',
        // stay_logged_in: false,
    })

    async function handleLogin() {
        loading.value = true
        const loginUrl = getEndpoints('loginUrl')
        try {
            const data = await $customFetch<IAuthData>(loginUrl, {
                method: 'POST',
                body: form,
            })
            authStore.setTokens(data.content.token, data.content.refreshToken)

            if (route.redirectedFrom) {
                router.push(route.redirectedFrom.fullPath)
            } else if (data.content.roles[0] == userTypes.admin) {
                router.push(adminPath)
            } else {
                router.push(userPath)
            }

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
        <section
            class="w-full mx-6 md:mx-0 md:w-2/6 bg-white flex flex-col px-6 sm:px-10 py-12 rounded-3xl"
        >
            <div class="mx-auto mb-6">
                <img
                    class="w-16 h-16"
                    src="~/assets/logo.svg"
                    alt="application logo"
                />
            </div>
            <div class="text-center space-y-3">
                <h3 class="text-brand-gray text-xl md:text-3xl font-semibold">
                    Log in to your account
                </h3>
                <p class="text-dark-gray font-light text-sm sm:text-base">
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

                <div
                    class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-0 my-6"
                >
                    <UCheckbox
                        name="stayLogged"
                        label="Remember for 30 days"
                        :ui="{
                            label: 'text-gray-500 text-sm sm:text-base',
                        }"
                    />
                    <ULink
                        to="/auth/forgot-password"
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
