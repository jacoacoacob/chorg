<script setup lang="ts">
import { ref } from "vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { useGroupListQuery, useGroupUpdateMutation  } from "@/model/group";


const { data: groupList, refetch } = useGroupListQuery();

const { mutateAsync } = useGroupUpdateMutation();

async function doMutate() {
  await mutateAsync({ groupId: "", display_name: "" });
  await refetch()
}

</script>

<template>
  <div class="p-2 space-x-4 flex">
    <section>
      <h2 class="font-bold text-lg">Groups</h2>
      <ul class="space-y-2">
        <li v-for="group in groupList" :key="group.id">
          <RouterLink class="p-2 border rounded block" :to="`/dashboard/${group.id}`">
            {{ group.display_name }}
          </RouterLink>
        </li>
      </ul>
    </section>
    <section>
      <RouterView></RouterView>
    </section>
  </div>
</template>

<style scoped>
.router-link-active {
  @apply bg-slate-300
}
</style>