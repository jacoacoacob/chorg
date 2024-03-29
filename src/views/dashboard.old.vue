<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "@/supabase-client";
import { useForm } from "@/composables/use-form";
import DashboardBreadcrumbs from "@/components/DashboardBreadcrumbs.vue";

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
        <div class="flex-1 bg-slate-100 flex">
            <div class="border-r w-[200px] text-slate-950 p-4 flex flex-col justify-between">
                <ul class="space-y-2">
                    <li>
                        <RouterLink :to="{ name: 'group-list' }" class="nav-link">Groups</RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'account' }" class="nav-link">Account</RouterLink>
                    </li>
                </ul>
            </div>
            <div class="p-4 w-full flex flex-col bg-slate-50">
                <DashboardBreadcrumbs class="self-start" />
                <div class="self-center w-[800px] px-2">
                    <RouterView />
                </div> 
            </div>
        </div>
    </div>
</template>

<style scoped>
.nav-link {
    @apply
        w-full inline-block rounded px-4 py-2 outline-none
        hover:bg-slate-200
        focus:ring-2 focus:ring-blue-500;
}

.router-link-active {
    @apply bg-slate-300 hover:bg-slate-300;
}
</style>

`Chore`: A specific, granular task to be completed (e.g. Wash dishes, wipe down counter)

`ChoreSet`: A collection of spatially or thematically related chores (e.g. Kitchen, Bathroom, Bills)

`ChoreChart`: A collection of 1 or more `ChoreSet`s and a record of their `Chore`s' completion

`Group`: A collection of `User`s, `Chore`s, `ChoreSet`s, and `ChoreChart`s.

