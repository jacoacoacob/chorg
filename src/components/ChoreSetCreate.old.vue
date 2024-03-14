<script setup lang="ts">
import CModal from "./lib/CModal.vue";
import CInput from "./lib/CInput.vue";
import { useForm } from "@/composables/use-form";
import { useChoreSets } from "@/stores/chore-sets.store";
import { useGroups } from "@/stores/groups.store";

defineEmits(["chore-set:created", "close"]);

const props = defineProps<{
  groupId: string;
  isOpen: boolean;
}>();

const groups = useGroups();
const choreSets = useChoreSets();

const form = useForm({ displayName: "" });

const onSubmit = form.createSubmitHandler(
  async (_, { displayName }) => {
    try {
      if (displayName.length < 3) {
        throw new Error("Name must have 3 or more letters");
      }
      await choreSets.createChoreSet(displayName, props.groupId);
      await groups.refreshGroupDetail(props.groupId);
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
  <CModal :isOpen="isOpen" :onClose="() => $emit('close')" class="space-y-8">
    <template #title>
      Create a new Chore Set
    </template>
    <form @submit="onSubmit">
      <CInput
        label="Name"
        helpText="Create a descriptive name for your Chore Set"
        :errorText="form.error.value"
        v-model="form.fields.displayName"
      />
      <button>Save</button>
    </form>
  </CModal>
</template>