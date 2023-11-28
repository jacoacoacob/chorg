<script setup lang="ts">
import CAlert from '@/components/lib/CAlert.vue';
import CInput from '@/components/lib/CInput.vue';
import CModal from '@/components/lib/CModal.vue';
import { useForm } from '@/composables/use-form';
import { ref } from 'vue';

const createGroupForm = useForm({
    name: "",
    members: [] as string[],
});

const showCreateGroupModal = ref(false);

function closeCreateGroupModal() {
    showCreateGroupModal.value = false;
    createGroupForm.reset();
}

const creatNewGroup = createGroupForm.createSubmitHandler(
    async ({ name, members }) => {


        return { success: false, message: "An unknown error occurred." };
    }
);

</script>

<template>
    <div>
        <button @click="showCreateGroupModal = true">
            Create group
        </button>
        <CModal :isOpen="showCreateGroupModal" :onClose="closeCreateGroupModal">
            <template #title>
                Create a new group
            </template>
            <div class="space-y-4">
                <CAlert level="error" :show="createGroupForm.error.value.length > 0" :message="createGroupForm.error.value" />
                <form @submit.prevent="creatNewGroup">
                    <CInput v-model="createGroupForm.fields.name" />
                    <button type="submit">Create group</button>
                </form>
            </div>
        </CModal>
    </div>
</template>