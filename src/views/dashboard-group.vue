<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import ChoreSet from "@/components/v2/ChoreSet.vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { useGroupDetailQuery } from "@/model/group";
import { useChoreSetList } from "@/model/chore-set";

const route = useRoute();

const groupId = computed(() => route.params.groupId as string);

const { data: group } = useGroupDetailQuery(groupId);
const { data: choreSets } = useChoreSetList(groupId);

</script>

<template>
  <div v-if="!group">
    ...loading
  </div>
  <div v-else class="space-y-4">
    <h1>{{ group.display_name }}</h1>
    <section>
      <h2>Members</h2>
      <ul>
        <li v-for="member in group.members">
          {{ member.username }}
        </li>
      </ul>
    </section>
    <section>
      <h2>Chore Sets</h2>
      <ul class="space-y-2">
        <li v-for="choreSet in choreSets">
          <Disclosure>
            <DisclosureButton>
              {{ choreSet.display_name }}
            </DisclosureButton>
            <DisclosurePanel>
              <ChoreSet v-bind="choreSet" />
            </DisclosurePanel>
          </Disclosure>
        </li>
      </ul>
    </section>
  </div>
</template>