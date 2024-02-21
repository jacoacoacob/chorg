<script setup lang="ts">
import { useChoreSets } from "@/stores/chore-sets.store";
import { computed, onMounted, ref } from "vue";
import { useInjectRef } from "@/composables/use-provide-inject-ref";
import CInput from "./lib/CInput.vue";
import { useSyncRemote } from "@/composables/use-remote-model";

const props = defineProps<{ choreSetId: string }>();

defineEmits(["edit"])

const choreSets = useChoreSets();

const detail = computed(() => choreSets.detail[props.choreSetId]);


// const { data: displayName, init: initDisplayName } = useSyncRemote(
//   () =>
//     detail.value?.display_name ?? "", 
//   (value) =>
//     choreSets.updateChoreSet(props.choreSetId, value),
// );

onMounted(async () => {
  await choreSets.refreshChoreSetDetail(props.choreSetId);
  // initDisplayName();
});



</script>

<template>
  <li class="border rounded p-4 relative">
    <button class="absolute top-2 right-4" @click="$emit('edit')">Edit</button>
    {{ detail?.display_name }} 
  </li>
</template>