import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

type Supabase = SupabaseClient<Database>;

type TableName = keyof Database["public"]["Tables"];
type TableRow<T extends TableName> = Database["public"]["Tables"][T]["Row"];

export type { Supabase, TableName, TableRow };
