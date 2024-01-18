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

</template>

rename group
invite member
remove member
add choreset
