<script setup lang="ts">
import { useForm } from "vee-validate";
import { string, object } from "zod";
import { toTypedSchema } from "@vee-validate/zod";

import CModal from "./lib/CModal.vue";
import { useChoreSets } from "@/stores/chore-sets.store";
import CInput from "./lib/CInput.vue";
import { useDisclosures } from "@/stores/disclosures.store";


const props = defineProps<{
  groupId: string;
}>();

const disclosures = useDisclosures();
const choreSets = useChoreSets();

const { handleSubmit, defineField, resetForm, setFieldError, errors } = useForm({
  validationSchema: toTypedSchema(
    object({
      displayName: string().min(3, "Display Name must contain at least 3 characters"),
    })
  ),
});

const [displayName, dispayNameProps] = defineField("displayName", {
  props: (state) => ({
    errorText: state.errors[0],
    label: "Display Name",
    helpText: "Give your Chore Set a descriptive name"
  }),
  validateOnModelUpdate: false,
});

const onSubmit = handleSubmit(async ({ displayName }) => {
  try {
    await choreSets.createChoreSet(props.groupId, displayName);
    await choreSets.refreshChoreSetList();
    closeModal();
  } catch (error) {
    setFieldError("displayName", (error as any).message);
  }
});

function closeModal() {
  resetForm();
  disclosures.hideModal();
}

</script>

<template>
  <CModal :isOpen="disclosures.showModal === 'chore-set-create'" @close="closeModal">
    <form @submit="onSubmit">
      <CInput v-model="displayName" v-bind="dispayNameProps"  />
    </form>
  </CModal>
</template>