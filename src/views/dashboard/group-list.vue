<script setup lang="ts">
import { onMounted, ref } from "vue";
import CAlert from "@/components/lib/CAlert.vue";
import CInput from "@/components/lib/CInput.vue";
import CModal from "@/components/lib/CModal.vue";
import { useForm } from "@/composables/use-form";
import { useGroups } from "@/stores/groups.store";

const groups = useGroups();

const createGroupForm = useForm({ name: "" });

const showCreateGroupModal = ref(false);

function closeCreateGroupModal() {
    showCreateGroupModal.value = false;
    createGroupForm.reset();
}

const creatNewGroup = createGroupForm.createSubmitHandler(
    async ({ name }) => {
        try {
            await groups.createGroup(name);
        } catch (error) {
            return {
                success: false,
                message: typeof (error as any).message === "string"
                    ? (error as any).message
                    : "An unknown error occurred.",
            };
        }
        return { success: true };
    }
);

onMounted(async () => {
    await groups.getGroupList();
});

</script>

<template>
    <div>
        <button @click="showCreateGroupModal = true">
            Create group
        </button>
        <pre>
{{ groups.groupList }}
        </pre>

        <CModal
            :isOpen="showCreateGroupModal"
            :onClose="closeCreateGroupModal"
        >
            <template #title>
                Create a new group
            </template>
            <div class="space-y-4">
                <CAlert
                    level="error"
                    :show="createGroupForm.error.value.length > 0"
                    :message="createGroupForm.error.value"
                />
                <form @submit.prevent="creatNewGroup">
                    <CInput v-model="createGroupForm.fields.name" />
                    <button type="submit">Create group</button>
                </form>
            </div>
        </CModal>
    </div>
</template>