<script setup lang="ts">
import { useAuth } from '@/stores/auth.store';

const auth = useAuth();
</script>

<template>
    <pre>
        {{ auth.user }}
    </pre>
</template>