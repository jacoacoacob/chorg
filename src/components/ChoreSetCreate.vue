<script setup lang="ts">
import { useForm } from "@/composables/use-form";
import { useChoreSets } from "@/stores/chore-sets.store";
import { useGroups } from "@/stores/groups.store";

defineEmits(["chore-set:created"]);

const { groupId } = defineProps<{ groupId: string }>();

const groups = useGroups();
const choreSets = useChoreSets();

const form = useForm({ displayName: "" });

const onSubmit = form.createSubmitHandler(
  async (_, { displayName }) => {
    try {
      await choreSets.createChoreSet(displayName, groupId);
      await groups.refreshGroupDetail(groupId);
    } catch (error) {
      return {
        success: false,
        message: typeof (error as any).message === "string"
          ? (error as any).message
          : "An unknown error occurred.",
      }
    }
  }
);

</script>

<template>

</template>