<script setup lang="ts">
import { useForm } from "@/composables/use-form";
import CModal from "./lib/CModal.vue";
import { useDisclosures } from "@/stores/disclosures.store";
import { useChoreSets } from "@/stores/chore-sets.store";
import CInput from "./lib/CInput.vue";
import { useGroups } from "@/stores/groups.store";

const choreSets = useChoreSets();
const groups = useGroups();

const disclosures = useDisclosures();

const props = defineProps<{
  groupId: string; 
}>();

const form = useForm({
  displayName: ""
});

const createChoreSet = form.createSubmitHandler(
  async (_, { displayName }) => {
    try {
      await choreSets.createChoreSet(displayName, props.groupId);
      await groups.refreshGroupDetail(props.groupId);
      form.reset();
      disclosures.hideModal();
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
  <CModal :isOpen="disclosures.showModal === 'create-chore-set'" :onClose="disclosures.hideModal">
    <template #title>
      Create Chore Set
    </template>
    <form @submit="createChoreSet" class="space-y-4">
      <CInput v-model="form.fields.displayName" label="Name" />
      <button class="button bg-blue-500 text-white"  type="submit">Save</button>
    </form>
  </CModal>
</template>