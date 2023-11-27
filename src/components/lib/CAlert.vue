<script setup lang="ts">
defineProps<{
    show: boolean;
    level: "warning" | "info" | "error";
    message?: string;
}>();
</script>

<template>
    <Transition name="alert">
        <div
            v-if="show"
            class="p-4 rounded text-white"
            :class="{
                'bg-red-400': level === 'error',
                'bg-blue-400': level === 'info',
                'bg-orange-400': level === 'warning',
            }"
        >
            <slot>
                {{ message }}
            </slot>
        </div>
    </Transition>
</template>

<style scoped>
.alert-enter-active,
.alert-leave-active {
  transition: opacity 0.5s ease;
}

.alert-enter-from,
.alert-leave-to {
  opacity: 0;
}
</style>