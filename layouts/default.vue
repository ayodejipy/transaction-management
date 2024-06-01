<template>
    <div class="min-h-screen flex">
        <AppSidebar />

        <div class="w-full flex-1">
            <AppHeader />
            <main class="py-10">
                <div class="px-4 sm:px-6 lg:px-8">
                    <slot />
                </div>
            </main>
        </div>
    </div>
</template>
