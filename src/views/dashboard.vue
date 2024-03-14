<script setup lang="ts">
import { ref } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { createModel } from "@/utils/create-model";

const groupModel = createModel("group");

type Group = Awaited<ReturnType<typeof groupModel.findOne>>;

const activeGroup = ref<Group["id"]>();

const { data: groupList } = useQuery({
  queryKey: ["group-list"],
  queryFn: groupModel.findAll,
});

const { data: groupDetail } = useQuery({
  staleTime: Infinity,
  queryKey: ["group-detail", activeGroup],
  queryFn: () => {
    if (activeGroup.value) {
      return groupModel.findOne(activeGroup.value);
    }
    return null;
  },
});
</script>

<template>
  <div>
    <h2>Groups</h2>
    <ul>
      <li v-for="group in groupList" :key="group.id" @click="activeGroup = group.id">
        {{ group.display_name }}
      </li>
    </ul>
  </div>
</template>