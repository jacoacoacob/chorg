<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import GroupChoreSetList from "@/components/GroupChoreSetList.vue";
import CreateChoreSet from "@/components/CreateChoreSet.vue";
import { useGroups } from "@/stores/groups.store";
import { useDisclosures } from "@/stores/disclosures.store";
import { useChoreSets } from "@/stores/chore-sets.store";
import { useProvideRef } from "@/composables/use-provide-inject-ref";

const route = useRoute();
const groups = useGroups();
const choreSets = useChoreSets();

const group = computed(() =>
  groups.detail[route.params.id as string]
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

    <GroupChoreSetList :groupId="($route.params.id as string)" />

    <CreateChoreSet :groupId="group?.id" />

  </div>
</template>@/composables/use-provide-inject-ref