<script setup lang="ts">
import { onMounted, watch } from "vue";
import { RouterLink, RouterView, useRouter } from "vue-router";

import { supabase } from "./supabase-client";
import { useAuth } from "./stores/auth.store";

const router = useRouter();
const auth = useAuth();

onMounted(() => {
    supabase.auth.onAuthStateChange((event, session) => {
        auth.user = session?.user;
    });
});

watch(() => auth.user, (user) => {
    if (!user) {
        router.push("/logout");
    }
});
</script>

<template>
    <RouterView />
</template>
