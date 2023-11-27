<script setup lang="ts">
import { onMounted, watch } from "vue";
import { RouterView, useRouter } from "vue-router";

import { supabase } from "./supabase-client";
import { useAuth } from "./stores/auth.store";

const router = useRouter();
const auth = useAuth();

onMounted(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
        auth.user = session?.user;
    });
});

// watch(() => auth.user, (user) => {
//     if (!user) {
//         router.push("/");
//     }
// });
</script>

<template>
    <RouterView />
</template>
