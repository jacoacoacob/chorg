import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

type ModalName =
  "create-chore" |
  "edit-chore-set"
  ;

const useDisclosures = defineStore("disclosures", () => {
  const router = useRouter();

  router.beforeEach(() => {
    hideModal();
  });

  const showModal = ref<ModalName | null>(null);

  function hideModal() {
    showModal.value = null;
  }

  return {
    showModal,
    hideModal,
  };
});

export { useDisclosures };
