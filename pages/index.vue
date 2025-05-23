<script lang="ts" setup>
    definePageMeta({
        layout: false,
    })

    const router = useRouter()
</script>

<template>
    <div
        class="min-h-screen flex align-center justify-center font-semibold text-3xl"
    >
        <div
            class="mt-8 sm:mt-20 p-3 sm:p-6 sm:h-40 bg-slate-200 rounded-2xl flex flex-col items-center gap-6"
        >
            <h1 class="font-semibold text-3xl sm:text-4xl text-brand-gray">
                Oops! Only Authenticated member allowed.
            </h1>
            <UButton
                variant="solid"
                size="sm"
                icon="i-hugeicons-login-method"
                class="p-3"
                square
                padded
                @click="router.push('/auth/login')"
            >
                Go to login
            </UButton>
        </div>
    </div>
</template>
