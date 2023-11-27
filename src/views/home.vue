<script setup lang="ts">
import { useAuth } from "@/stores/auth.store";

const auth = useAuth();

</script>

<template>
    <div class="flex items-center justify-center min-h-screen">
        <RouterLink v-if="auth.user" :to="{ name: 'group-list' }">
            Dashboard
        </RouterLink>
        <RouterLink v-else :to="{ name: 'sign-in' }">
            Sign in
        </RouterLink>
    </div>
</template>