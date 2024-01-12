<script setup lang="ts">
import { useRoute } from "vue-router";
import { useGroups } from "@/stores/groups.store";
import { onMounted } from "vue";

const route = useRoute();
const groups = useGroups();

const group = groups.groupList.find((group) => group.id === route.params.id);

onMounted(async () => {

  await groups.refreshGroupList();
});
</script>

<template>
  <pre>
{{ group }}
  </pre>
</template>