<script setup lang="ts">
import { ref } from "vue";
import { useGroupDetailQuery, useGroupListQuery } from "@/model/group"

const activeGroup = ref<string>();

const { data: groupList } = useGroupListQuery();

const { data: groupDetail } = useGroupDetailQuery(activeGroup);

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