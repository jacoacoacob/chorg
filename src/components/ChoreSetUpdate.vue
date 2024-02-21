<script setup lang="ts">
import { computed, watch } from "vue";
import CModal from "./lib/CModal.vue";
import { useChoreSets } from "@/stores/chore-sets.store";
import CInput from "./lib/CInput.vue";
import { useSyncRemote } from "@/composables/use-remote-model";

const choreSets = useChoreSets();

const props = defineProps<{
  choreSetId?: string; 
}>();

defineEmits(["close"]);

const detail = computed(() => choreSets.detail[props.choreSetId ?? ""]);

const {
  data: displayName,
  error: displayNameError,
  init: initDisplayName
} = useSyncRemote(
  () => detail.value?.display_name ?? "", 
  async (value) => {
    if (value.length < 3) {
      throw new Error("Name must have 3 or more letters");
    }
    if (props.choreSetId) {
      await choreSets.updateChoreSet(props.choreSetId, value)
    }
  },
);

watch(() => props.choreSetId, async (choreSetId) => {
  if (choreSetId) {
    await choreSets.refreshChoreSetDetail(choreSetId);
    initDisplayName();
  }
}, { immediate: true });

</script>

<template>
  <CModal
    :isOpen="Boolean(choreSetId)"
    :onClose="() => $emit('close')"
    class="space-y-8"
  >
    <template #title>
      <CInput
        label="Name"
        helpText="Give your chore set a descriptive name"
        :errorText="displayNameError"
        v-model="displayName"
      />
    </template>
  </CModal>
</template>