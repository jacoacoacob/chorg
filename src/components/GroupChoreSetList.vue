<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import GroupChoreSetListItem from "@/components/GroupChoreSetListItem.vue";
import { useChoreSets } from "@/stores/chore-sets.store";
import { useGroups } from "@/stores/groups.store";
import { useProvideRef } from "@/composables/use-provide-inject-ref";

const { groupId } = defineProps<{ groupId: string }>();

const groups = useGroups();
const choreSets = useChoreSets();

const group = computed(() => groups.detail[groupId]);
const groupChoreSets = computed(() => choreSets
  .list
  .filter((choreSet) => choreSet.group_id === groupId)
  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
)

const shouldFocus = useProvideRef<string | null>("shouldFocus", null);

async function createChoreSet() {
  try {
    const choreSetId = await choreSets.createChoreSet(groupId);
    shouldFocus.value = choreSetId;
  } catch (error) {
    console.error(error);
  }
}

onMounted(async () => {
  await choreSets.refreshChoreSetList();
})
</script>

<template>
  <div class="card">
    <div class="flex justify-between">
      <h3 class="card__title">Chore Sets</h3>
      <button @click="createChoreSet">Add chore set</button>
    </div>
    <ul class="space-y-4">
      <li v-for="{ display_name, id } in groupChoreSets" :key="id">
        <GroupChoreSetListItem :id="id" />
      </li>
    </ul>
  </div>
</template>@/composables/use-provide-inject-ref