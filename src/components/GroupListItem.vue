<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";

import { useGroups } from "@/stores/groups.store";

const props = defineProps<{ groupId: string }>();

const groups = useGroups();

const group = computed(() => groups.groupListDict[props.groupId]);

</script>

<template>
  <div class="flex justify-between">
    <RouterLink :to="{ name: 'group-detail', params: { id: groupId }}" class="font-semibold">
      {{ group.display_name }}
    </RouterLink>
  </div>
</template>