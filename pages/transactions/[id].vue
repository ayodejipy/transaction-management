<script setup lang="ts">
import type { ITransactionData } from '~/types'

const route = useRoute()

const id = ref<string>(route.params.id as string)

const pageTitle = computed(() => `Transaction ${id.value}`)

useHead({
    title: pageTitle,
})

definePageMeta({
    title: 'Transaction',
    middleware: ['auth', 'admin'],
})

const { transaction } = storeToRefs(useTransactionStore())
const transactionsUrl = useEndpoints('transactionsUrl')

const isOpenAddTransaction = ref<boolean>(false)

const { pending: loading, data } = await useAppFetch<ITransactionData>(
    () => `${transactionsUrl}/${id.value}`,
    {
        pick: ['content', 'status'],
        watch: [id],
        lazy: true,
    }
)

const result = computed(() => data.value?.content ?? null)

const fullname = computed(
    () =>
        result.value?.createdBy.firstName +
        ' ' +
        result.value?.createdBy.lastName
)

function onToggleEdit() {
    transaction.value = result.value
    isOpenAddTransaction.value = true
}
</script>

<template>
    <section class="w-full sm:max-w-4xl mx-auto">
        <UCard
            :ui="{
                ring: '',
                shadow: '',
                divide: '',
                body: {
                    padding: 'sm:p-8',
                },
                header: {
                    padding: '',
                },
                footer: {
                    padding: 'sm:px-8 sm:pb-10',
                },
            }"
        >
            <template #header>
                <div
                    class="relative overflow-hidden min-h-40 text-center bg-[url('https://preline.co/assets/svg/examples/abstract-bg-1.svg')] bg-no-repeat bg-center"
                >
                    <!-- SVG Background Element -->
                    <figure class="absolute inset-x-0 bottom-0 -mb-px">
                        <svg
                            preserveAspectRatio="none"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            viewBox="0 0 1920 100.1"
                        >
                            <path
                                fill="currentColor"
                                class="fill-white dark:fill-neutral-800"
                                d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
                            />
                        </svg>
                    </figure>
                    <!-- End SVG Background Element -->
                </div>
            </template>

            <div class="relative z-10 -mt-20">
                <!-- Icon -->
                <span
                    class="mx-auto flex justify-center items-center size-[62px] rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400"
                >
                    <svg
                        class="size-6"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z"
                        />
                        <path
                            d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"
                        />
                    </svg>
                </span>
                <!-- End Icon -->
            </div>

            <div class="space-y-4">
                <div v-if="loading" class="p-4 sm:p-7 space-y-4">
                    <div class="mx-auto">
                        <USkeleton class="h-4 w-[250px]" />
                    </div>

                    <div
                        class="mt-5 sm:mt-10 grid grid-cols-2 sm:grid-cols-2 gap-5"
                    >
                        <div class="space-y-2.5">
                            <USkeleton class="h-4 w-[250px]" />
                            <USkeleton class="h-4 w-[200px]" />
                        </div>
                        <div class="space-y-2.5">
                            <USkeleton class="h-4 w-[250px]" />
                            <USkeleton class="h-4 w-[200px]" />
                        </div>
                    </div>

                    <div class="space-y-3 mt-5">
                        <USkeleton class="h-4 w-[250px]" />
                        <USkeleton class="h-8 w-[200px]" />
                    </div>

                    <div class="mt-5 sm:mt-10 space-y-3">
                        <div
                            v-for="c in 4"
                            :key="c"
                            class="flex items-center justify-between w-full"
                        >
                            <USkeleton class="h-6 w-[400px]" />
                            <USkeleton class="h-6 w-[200px]" />
                        </div>
                    </div>
                </div>

                <div
                    v-else-if="!loading && !result"
                    class="flex flex-col gap-4 items-center justify-center py-20 sm:py-28"
                >
                    <UIcon
                        name="i-fluent-cloud-error-28-regular"
                        class="w-10 h-10"
                        dynamic
                    />

                    <p class="text-sm text-gray-600 font-semibold">
                        Unable to load data
                    </p>
                </div>

                <div v-else class="p-4 sm:p-7 overflow-y-auto">
                    <div class="text-center">
                        <h3
                            class="text-lg font-semibold text-gray-800 dark:text-neutral-200"
                        >
                            Transaction for {{ result?.typeName }}
                        </h3>
                        <p class="text-sm text-gray-500 dark:text-neutral-500">
                            Transaction #{{ result?.id }}
                        </p>
                    </div>

                    <!-- Grid -->
                    <div
                        class="mt-5 sm:mt-10 grid grid-cols-2 sm:grid-cols-2 gap-5"
                    >
                        <div>
                            <span
                                class="block text-xs uppercase text-gray-500 dark:text-neutral-500"
                            >
                                Amount paid:
                            </span>
                            <span
                                class="block text-sm font-medium text-gray-800 dark:text-neutral-200"
                            >
                                {{ formatCurrency(result?.amount as number) }}
                            </span>
                        </div>
                        <!-- End Col -->

                        <div>
                            <span
                                class="block text-xs uppercase text-gray-500 dark:text-neutral-500"
                            >
                                Date paid:</span
                            >
                            <span
                                class="block text-sm font-medium text-gray-800 dark:text-neutral-200"
                            >
                                {{
                                    $dayjs(
                                        result?.transactionDateUtc
                                    ).format('MMMM DD, YYYY')
                                }}
                            </span>
                        </div>

                        <!-- End Col -->
                    </div>
                    <!-- End Grid -->

                    <div v-if="result?.description" class="mt-5 sm:mt-10">
                        <h4
                            class="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200"
                        >
                            Description
                        </h4>
                        <p class="text-sm text-gray-500 dark:text-neutral-500">
                            {{ result?.description }}
                        </p>
                    </div>

                    <div class="mt-5 sm:mt-10">
                        <h4
                            class="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200"
                        >
                            Summary
                        </h4>

                        <ul class="mt-3 flex flex-col">
                            <li
                                class="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-neutral-700 dark:text-neutral-200"
                            >
                                <div
                                    class="flex items-center justify-between w-full"
                                >
                                    <span>Type</span>
                                    <span>{{ result?.typeName }}</span>
                                </div>
                            </li>
                            <li
                                class="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-neutral-700 dark:text-neutral-200"
                            >
                                <div
                                    class="flex items-center justify-between w-full"
                                >
                                    <span>Category</span>
                                    <span>
                                        {{ result?.categoryName }}
                                    </span>
                                </div>
                            </li>
                            <li
                                class="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-neutral-700 dark:text-neutral-200"
                            >
                                <div
                                    class="flex items-center justify-between w-full"
                                >
                                    <span>Uploaded by</span>
                                    <span>
                                        {{ fullname }}
                                    </span>
                                </div>
                            </li>
                            <li
                                class="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-semibold bg-gray-50 border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200"
                            >
                                <div
                                    class="flex items-center justify-between w-full"
                                >
                                    <span>Amount paid</span>
                                    <span>
                                        {{
                                            formatCurrency(
                                                result?.amount as number
                                            )
                                        }}</span
                                    >
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- End Body -->
            </div>

            <template #footer>
                <div class="flex justify-between gap-2 items-center">
                    <ULink
                        to="/admin/transactions"
                        class="text-icon-gray flex items-center gap-2"
                    >
                        <UIcon name="i-heroicons-arrow-long-left" />
                        back
                    </ULink>

                    <UButton
                        icon="i-heroicons-pencil-square"
                        size="sm"
                        color="primary"
                        variant="soft"
                        padding="sm"
                        :ui="{
                            rounded: 'rounded-lg',
                            font: 'font-medium',
                        }"
                        @click="onToggleEdit"
                    >
                        Edit
                    </UButton>
                </div>
            </template>
        </UCard>

        <AddTransactionDrawer v-model="isOpenAddTransaction" />
    </section>
</template>
