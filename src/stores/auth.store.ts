import { ref } from "vue";
import { defineStore } from "pinia";
import type { User } from "@supabase/supabase-js";

const useAuth = defineStore("auth", () => {
    const user = ref<User>();

    return { user };
});

export { useAuth };
