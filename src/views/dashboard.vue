<script setup lang="ts">
import { useForm } from "@/composables/use-form";
import { supabase } from "@/supabase-client";
import { useRouter } from "vue-router";

const router = useRouter();

const { createSubmitHandler } = useForm();

const onLogout = createSubmitHandler(async () => {
    await supabase.auth.signOut();
    router.push("/");
    return { success: true };
});

</script>

<template>
    <header class="flex justify-between sticky top-0 w-full p-2 bg-sky-950 text-white">
        <h1>Dashboard</h1>
        <div>
            <button @click="onLogout">Logout</button>
        </div>
    </header>
    <RouterView />
</template>