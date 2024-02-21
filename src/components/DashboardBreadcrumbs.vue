<script setup lang="ts">
import { computed, isRef } from "vue";
import { useRoute } from "vue-router";
import type { Breadcrumb } from "@/router";

const route = useRoute();

const breadcrumbs = computed(() => {
  if (route.meta.breadcrumbs) {
    return (route.meta.breadcrumbs as Breadcrumb[]).map((crumb) => ({
      text: isRef(crumb.text) ? crumb.text.value(route) : crumb.text,
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