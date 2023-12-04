import type { Table } from "@/supabase-client";
import { defineStore } from "pinia";
import { ref } from "vue";

const useProfile = defineStore("user-profile", () => {
  const own = ref<Table<"user_profile">>();

  return {  };
});

export { useProfile };
