<script setup lang="ts">
import { useRouter } from "vue-router";

import CInput from "@/components/lib/CInput.vue";
import { useForm } from "@/composables/use-form";
import { supabase } from "@/supabase-client";
import CAlert from "@/components/lib/CAlert.vue";

const router = useRouter();

const signUpForm = useForm({ email: "", password: "", username: "" });

const handleLogin = signUpForm.createSubmitHandler(async (_, { email, password, username }) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username,
            },
        },
    });

    if (error) {
        return { success: false, message: error.message }
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
            <CAlert
                class="w-60"
                level="error"
                :show="signUpForm.error.value.length > 0"
                :message="signUpForm.error.value"
            />
            <form
                @submit.prevent="handleLogin"
                class="space-y-6"
            >
                <h1 class="font-bold text-xl">Create an account</h1>
                <CInput
                    v-model="signUpForm.fields.username"
                    label="Username"
                    helpText="Your username will be your unique public identity in Chorg."
                />
                <CInput
                    type="email"
                    v-model="signUpForm.fields.email"
                    label="Email"
                    helpText="You'll use this email address to login and recieve any account related emails. It will not be visible to any other users in Chorg."
                />
                <CInput
                    type="password"
                    v-model="signUpForm.fields.password"
                    label="Password"
                />
                <button
                    type="submit"
                    class="w-full p-2 rounded bg-slate-200"
                >
                    Submit
                </button>
            </form>
            <RouterLink
                class="self-center text-sm underline"
                to="/sign-in"
            >
                back to sign in
            </RouterLink>
        </div>
    </div>
</template>