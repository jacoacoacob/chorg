<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import CAlert from "@/components/lib/CAlert.vue";
import CInput from "@/components/lib/CInput.vue";
import CModal from "@/components/lib/CModal.vue";
import { useForm } from "@/composables/use-form";
import { useGroups } from "@/stores/groups.store";
import GroupListItem from "@/components/GroupListItem.vue";

const groups = useGroups();

const createGroupForm = useForm({ name: "" });

const showCreateGroupModal = ref(false);

function closeCreateGroupModal() {
    showCreateGroupModal.value = false;
    createGroupForm.reset();
}

const creatNewGroup = createGroupForm.createSubmitHandler(
    async (_, { name }) => {
        try {
            if (name.trim().length === 0) {
                throw new Error("Please give your group a name.")
            }
            await groups.createGroup(name);
            closeCreateGroupModal();
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
    await groups.refreshGroupList();
});

</script>

<template>
    <div class="flex flex-col space-y-4">

        <div class="card">
            <button @click="showCreateGroupModal = true" class="button-primary">
                + Create group
            </button>
        </div>

        <div class="card">
            <h3 class="card__title">My groups</h3>
            <ul class="space-y-4">
                <li v-for="group in groups.groupList">
                    <GroupListItem :groupId="group.id" />
                </li>
            </ul>
        </div>


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
                <form @submit="creatNewGroup">
                    <CInput v-model="createGroupForm.fields.name" />
                    <button type="submit">Create group</button>
                </form>
            </div>
        </CModal>
    </div>
</template>