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
  <ul class="flex space-x-2">
    <li v-for="crumb in breadcrumbs">
      <RouterLink v-if="crumb.to" :to="crumb.to">{{ crumb.text }}</RouterLink>
      <span v-else>{{ crumb.text }}</span>
    </li>
  </ul>
</template>