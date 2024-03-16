"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "./supabase/server-client";

async function assertServerAuthenticated(redirectTo = "/") {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    redirect(redirectTo);
  }

  return data.user;
}

export { assertServerAuthenticated };
