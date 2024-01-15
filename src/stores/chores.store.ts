import { ref, computed } from "vue";
import { defineStore } from "pinia";

import { supabase } from "@/supabase-client";
import { makeListFetcher, makeSingleFetcher } from "@/utils/fetcher";
import { assertAuthenticated } from "@/utils/assert-authenticated";

const useChores = defineStore("chores", () => {
  
  return {};
});

export { useChores };
