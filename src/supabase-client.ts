import { createClient } from "@supabase/supabase-js";

import type { Database } from "./supabase-types";

type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"];

const supabase = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export { supabase };
export type { Database, Tables }
