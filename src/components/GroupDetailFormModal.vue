<script setup lang="ts">
import { useGroups } from "@/stores/groups.store";
import {
  Dialog,
  DialogBackdrop,
  DialogDescription,
  DialogOverlay,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot
} from "@headlessui/vue";

const props = defineProps<{
  isOpen?: boolean;
}>();

defineEmits(["close"]);

const groups = useGroups();


</script>

<template>
  <TransitionRoot
    :show="isOpen"
    as="template"
    enter="duration-300 ease-out"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="duration-200 ease-in"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <Dialog @close="$emit('close')">
      <DialogPanel>

      </DialogPanel>
    </Dialog>
  </TransitionRoot>
</template>

rename group
invite member
remove member
add choreset
