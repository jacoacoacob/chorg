<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import ChoreSetUpdate from "./ChoreSetUpdate.vue";
import GroupChoreSetListItem from "@/components/GroupChoreSetListItem.vue";
import { useChoreSets } from "@/stores/chore-sets.store";
import { useGroups } from "@/stores/groups.store";
import { useProvideRef } from "@/composables/use-provide-inject-ref";

const { groupId } = defineProps<{ groupId: string }>();

const choreSets = useChoreSets();

const groupChoreSets = computed(() => choreSets
  .list
  .filter((choreSet) => choreSet.group_id === groupId)
  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
)

const shouldFocus = useProvideRef<string | null>("shouldFocus", null);

const editChoreSetId = ref<string>();

async function createChoreSet() {
  try {
    editChoreSetId.value = await choreSets.createChoreSet(groupId);
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
      <GroupChoreSetListItem
        v-for="choreSet in groupChoreSets"
        :key="choreSet.id"
        :choreSetId="choreSet.id"
        @edit="editChoreSetId = choreSet.id"
      />
    </ul>
  </div>

  <ChoreSetUpdate :choreSetId="editChoreSetId" @close="editChoreSetId = undefined" />
</template>