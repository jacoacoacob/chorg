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
  <div class="space-y-4  ">
    
    <div class="shadow rounded p-4">
      <h1 class="font-bold text-2xl">
        {{ group?.display_name }}
      </h1>
    </div>
    
    <div class="shadow rounded p-4">
      <div class="flex justify-between">
        <h3 class="font-bold text-lg">Members</h3>
        <button>Add member</button>
      </div>
      <ul>
        <li v-for="member in group?.members">
          {{ member.username }}
        </li>
      </ul>
    </div>

    <div class="shadow rounded p-4">
      <div class="flex justify-between">
        <h3 class="font-bold text-lg">Chore Sets</h3>
        <button>Add chore set</button>
      </div>
    </div>

  </div>
</template>