<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useChoreSets } from "@/stores/chore-sets.store";
import { useDisclosures } from "@/stores/disclosures.store";
import CModal from "@/components/lib/CModal.vue";
import CreateChoreSet from "@/components/CreateChoreSet.vue";

const choreSets = useChoreSets();
const disclosures = useDisclosures();

onMounted(async () => {
    await choreSets.refreshChoreSetList();
});
</script>

<template>
    <div class="space-y-4">
        <div class="card">
            <button @click="disclosures.showModal = 'create-chore-set'" class="button-primary">
                + Create chore set
            </button>
        </div>

        <div class="card">
            <h3 class="card__title">My Chore Sets</h3>
            <ul class="space-y-4">
                <li v-for="choreSet in choreSets.list">
                    {{ choreSet.display_name }}
                </li>
            </ul>
        </div>
    </div>

</template>