<script setup lang="ts">
import { useChoreSets } from "@/stores/chore-sets.store";
import { computed, onMounted } from "vue";
import { useInjectRef } from "@/composables/use-provide-inject-ref";
import CInput from "./lib/CInput.vue";
import { useSyncRemote } from "@/composables/use-remote-model";


const props = defineProps<{ id: string }>();

const choreSets = useChoreSets();

const detail = computed(() => choreSets.detail[props.id]);

const shouldFocus = useInjectRef<string | null>("shouldFocus");

const { data: displayName, init: initDisplayName } = useSyncRemote(
  () => detail.value?.display_name ?? "", 
  (value) => choreSets.updateChoreSet(props.id, value),
  250
);

onMounted(async () => {
  await choreSets.refreshChoreSetDetail(props.id);
  initDisplayName();
});

</script>

<template>
  <div>
    <CInput :shouldFocus="shouldFocus === id" label="Name" v-model="displayName" /> 
  </div>
</template>