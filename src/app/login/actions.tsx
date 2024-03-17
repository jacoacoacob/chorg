"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server-client";

async function login(formData: FormData) {
  const supabase = createServerSupabaseClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    console.error("[login]", error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

async function signup(formData: FormData) {
  const supabase = createServerSupabaseClient();

  const { error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
          username: formData.get("username") as string,
      },
  },
  });

  if (error) {
    console.error("[signup]", error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export { login, signup };
