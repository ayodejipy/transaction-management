<script setup lang="ts">
definePageMeta({
    layout: false,
})

const form = reactive({
    email: '',
    password: '',
    stay_logged_in: false,
})
</script>

<template>
    <section
        class="w-full min-h-screen bg-gray-900 flex justify-center items-center"
    >
        <section class="w-2/6 bg-white flex flex-col px-10 py-12 rounded-3xl">
            <div class="mx-auto mb-8">
                <img
                    class="w-16 h-16"
                    src="~/assets/logo.svg"
                    alt="application logo"
                />
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
                <UFormGroup size="xl" label="Email">
                    <UInput
                        placeholder="Enter your email"
                        v-model="form.email"
                    />
                </UFormGroup>

                <UFormGroup size="xl" label="Password">
                    <UInput
						type="password"
                        placeholder="Enter your password"
                        v-model="form.password"
                    />
                </UFormGroup>

                <div class="flex items-center justify-between my-6">
                    <UCheckbox
                        v-model="form.stay_logged_in"
                        name="stayLogged"
                        label="Remember for 30 days"
                        :ui="{
                            label: 'text-gray-500',
                        }"
                    />
                    <ULink
                        to="/auth/resetpassword"
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
					:ui="{ 
						rounded: 'rounded-full',
						font: 'font-semibold'
					}"
				>
                    Sign in
                </UButton>
            </div>
        </section>
    </section>
</template>
