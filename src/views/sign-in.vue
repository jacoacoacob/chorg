<script setup lang="ts">
import { useRouter } from "vue-router";
import CInput from "@/components/lib/CInput.vue";
import CAlert from "@/components/lib/CAlert.vue";
import { useForm } from "@/composables/use-form";


import { supabase } from "@/supabase-client";

const router = useRouter();

const loginForm = useForm({ email: "", password: "" });

const handleLogin = loginForm.createSubmitHandler(async (_, { email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { success: false, message: error.message}
    }

    if (data.user) {
        router.push("/dashboard");
        return { success: true };
    }

    return { success: false, message: "An unknown error occurred" };
});
</script>

<template>
    <div class="flex items-center justify-center min-h-screen">
        <div class="card flex flex-col">
            <CAlert level="error" :show="loginForm.error.value.length > 0" :message="loginForm.error.value" />

            <form @submit.prevent="handleLogin" class="space-y-6">
                <h1 class="font-bold text-xl">Sign in</h1>
                <CInput type="email" v-model="loginForm.fields.email" label="Email" />
                <CInput type="password" v-model="loginForm.fields.password" label="Password" />
                <button type="submit" class="w-full p-2 rounded bg-slate-200">Submit</button>
            </form>
            <RouterLink class="self-center text-sm underline" to="/sign-up">Create account</RouterLink>
        </div>
    </div>
</template>