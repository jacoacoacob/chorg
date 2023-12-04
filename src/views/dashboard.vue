<script setup lang="ts">
import { useForm } from "@/composables/use-form";
import { supabase } from "@/supabase-client";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const { createSubmitHandler } = useForm();

const onLogout = createSubmitHandler(async () => {
    await supabase.auth.signOut();
    router.push("/");
    return { success: true };
});

onMounted(() => {
    if (/dashboard\/?$/.test(router.currentRoute.value.path)) {
        router.push({ name: "group-list" });
    }
});

</script>

<template>
    <div class="flex flex-col min-h-screen">
        <header class="flex justify-between sticky top-0 w-full p-2 bg-sky-950 text-white">
            <h1>Dashboard</h1>
            <div class="flex space-x-4">
                <button @click="onLogout">Logout</button>
            </div>
        </header>
        <div class="flex-1 flex">
            <div class="border-r w-[200px] text-slate-950 p-4 flex flex-col justify-between">
                <ul class="space-y-2">
                    <li>
                        <RouterLink :to="{ name: 'group-list' }" class="nav-link">Groups</RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'chore-list' }" class="nav-link">Chores</RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'chore-task-list' }" class="nav-link">Chore Tasks</RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'chore-set-list' }" class="nav-link">Chore Sets</RouterLink>
                    </li>
                    <hr>
                    <li>
                        <RouterLink :to="{ name: 'account' }" class="nav-link">Account</RouterLink>
                    </li>
                </ul>
            </div>
            <div class="p-4">
                <RouterView />
            </div>
        </div>
    </div>
</template>

<style scoped>
.nav-link {
    @apply
        w-full inline-block rounded px-4 py-2 outline-none
        hover:bg-slate-100
        focus:ring-2 focus:ring-blue-500;
}

.router-link-active {
    @apply bg-slate-200 hover:bg-slate-200;
}
</style>