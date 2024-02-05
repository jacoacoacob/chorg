<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import CreateChoreSet from "@/components/CreateChoreSet.vue";
import { useGroups } from "@/stores/groups.store";
import { useDisclosures } from "@/stores/disclosures.store";

const route = useRoute();
const groups = useGroups();

const group = computed(() =>
  groups.groupDetailDict[route.params.id as string]
);

const disclosures = useDisclosures();

onMounted(async () => {
  await groups.refreshGroupDetail(route.params.id as string);
});
</script>

<template>
  <div class="space-y-4">
    <div class="card">
      <h1 class="card__title">
        {{ group?.display_name }}
      </h1>
    </div>
    
    <div class="card">
      <div class="flex justify-between">
        <h3 class="card__title">Members</h3>
        <button>Add member</button>
      </div>
      <ul>
        <li v-for="member in group?.members">
          {{ member.username }}
        </li>
      </ul>
    </div>

    <div class="card">
      <div class="flex justify-between">
        <h3 class="card__title">Chore Sets</h3>
        <button @click="disclosures.showModal = 'create-chore-set'">Add chore set</button>
      </div>
      <ul>
        <li v-for="choreSet in group?.chore_sets">
          {{ choreSet.display_name }}
        </li>
      </ul>
    </div>

    <CreateChoreSet :groupId="group?.id" />

  </div>
</template>