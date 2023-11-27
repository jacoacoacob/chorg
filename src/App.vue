<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";

import { supabase } from "./supabase-client";
import { useAuth } from "./stores/auth.store";

const auth = useAuth();

onMounted(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
        auth.user = session?.user;
    });
});
</script>

<template>
    <RouterView />
</template>
