<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import type { Breadcrumb } from "@/router";

const breadcrumbs = computed(() => {
  const route = useRoute();

  if (route.meta.breadcrumbs) {
    return (route.meta.breadcrumbs as Breadcrumb[]).map((crumb) => ({
      text: typeof crumb.text === "function" ? crumb.text(route) : crumb.text,
      to: typeof crumb.to === "function" ? crumb.to(route) : crumb.to,
    }));
  }

  return [];
});
</script>

<template>
  <ul class="flex space-x-2 pb-4">
    <li v-for="crumb in breadcrumbs" class="space-x-2 font-mono text-sm">
      <div v-if="crumb.to" class="space-x-2">
        <RouterLink :to="crumb.to" class="text-blue-600">{{ crumb.text }}</RouterLink>
        <span>/</span>
      </div>
      <div v-else>{{ crumb.text }}</div>
    </li>
  </ul>
</template>