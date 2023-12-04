<script setup lang="ts">
import { computed, onMounted, ref, type Ref } from "vue";
import CInput from "@/components/lib/CInput.vue";
import { useForm } from "@/composables/use-form";
import { useAuth } from "@/stores/auth.store";
import { supabase } from "@/supabase-client";
import {  useDiff } from "@/composables/use-diff";

const auth = useAuth();

const updateProfile = useForm({ username: "" });
const currentProfile = ref({ username: "" }) 

const diff = useDiff(currentProfile, updateProfile.fields);

const handleUpdate = updateProfile.createSubmitHandler(async ({ username }) => {

  if (username.trim().length < 3) {
    return { success: false, message: "Username must contain at least 3 characters" };
  } 

  const { error } = await supabase.auth.updateUser({
    data: {
      username,
    }
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true };
});

onMounted(() => {
  updateProfile.fields.username = auth.user?.user_metadata.username ?? "";
  currentProfile.value.username = auth.user?.user_metadata.username ?? "";
});

</script>

<template>
  <form @submit.prevent="handleUpdate" class="space-y-4">
    <CInput v-model="updateProfile.fields.username" label="Username" />
    <button
      class="button button-primary"
      :disabled="diff.length === 0"
    >
      Save changes
    </button>
  </form>
</template>