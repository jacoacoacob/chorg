import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./database.types";

const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_ANON_KEY!,
);

export { supabase };
