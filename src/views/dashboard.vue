<script setup lang="ts">
import { supabase } from "@/supabase-client";

</script>

<template>
    <header class="flex justify-between sticky top-0 w-full p-2 bg-sky-950 text-white">
        <h1>Dashboard</h1>
        <div>
            <button @click="supabase.auth.signOut">Logout</button>
        </div>
    </header>
    <RouterView />
</template>