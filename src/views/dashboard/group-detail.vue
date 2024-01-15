<script setup lang="ts">
import { useRoute } from "vue-router";
import { useGroups } from "@/stores/groups.store";
import { computed, onMounted } from "vue";

const route = useRoute();
const groups = useGroups();

const group = computed(() =>
  groups.groupDetailDict[route.params.id as string]
);

onMounted(async () => {
  await groups.refreshGroupDetail(route.params.id as string);
});
</script>

<template>
  <div>
    {{ group?.display_name }}
  </div>
  <div>
    <h3>Members</h3>
    <ul>
      <li v-for="member in group?.members">
        {{ member.username }}
      </li>
    </ul>
  </div>
  <pre>
{{ group }}
  </pre>
</template>