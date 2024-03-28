"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server-client";
import type { LoginFormFields } from "./login-form";
import type { SignupFormFields } from "./signup-form";

async function login(fields: LoginFormFields) {
  const { email, password } = fields;

  const supabase = createServerSupabaseClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("[login]", error);
    redirect("/error");
  }

  revalidatePath("/dashboard", "layout");
  redirect("/dashboard");
}

async function signup(fields: SignupFormFields) {
  const { username, email, password } = fields;

  const supabase = createServerSupabaseClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
          username,
      },
    },
  });

  if (error) {
    console.error("[signup]", error);
    redirect("/error");
  }

  revalidatePath("/dashboard", "layout");
  redirect("/dashboard");
}

export { login, signup };
