<script setup lang="ts">
import { useChoreSetList, useUpdateChoreSet, type ChoreSetListItem } from "@/model/chore-set";
import { useCreateChore, useUpdateChore } from "@/model/chore";
import { computed } from "vue";


const props = defineProps<{ groupId: string; choreSetId: string }>();

const choreSets = useChoreSetList(props.groupId);

const data = computed(
  () => (choreSets.data.value || []).find((choreSet) => choreSet.id === props.choreSetId)
);

</script>

<template>
  <div>
    {{ props }}
  </div>
</template>