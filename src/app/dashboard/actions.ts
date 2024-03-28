"use server";

import { redirect, } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server-client";

async function logout() {
  const serverSupabase = createServerSupabaseClient();

  await serverSupabase.auth.signOut();

  redirect("/");
}

export { logout };
