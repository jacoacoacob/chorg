<script setup lang="ts">
import { useRouter } from "vue-router";
import CInput from "@/components/lib/CInput.vue";
import { useForm } from "@/composables/use-form";

import { useAuth } from "@/stores/auth.store";
import { supabase } from "@/supabase-client";

const router = useRouter();
const auth = useAuth();

const loginForm = useForm({ email: "", password: "" });

const handleLogin = loginForm.createSubmitHandler(async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (data.user) {
        router.push("/dashboard");
        return { success: true };
    }

    return { success: false, message: error?.message };
});
</script>

<template>
    <div class="flex items-center justify-center min-h-screen">
        <RouterLink v-if="auth.user" :to="{ name: 'dashboard' }">
            Dashboard
        </RouterLink>

        <div v-else>
            <form @submit.prevent="handleLogin" class="card">
                <h1 class="font-bold text-xl">Sign in</h1>
                <CInput type="email" v-model="loginForm.fields.email" label="Email" />
                <CInput type="password" v-model="loginForm.fields.password" label="Password" />
                <button type="submit" class="w-full p-2 rounded bg-slate-200">Submit</button>
                <RouterLink to="/register">Create account</RouterLink>
            </form>
        </div>
    </div>
</template>