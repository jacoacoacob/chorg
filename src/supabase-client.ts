import { createClient } from "@supabase/supabase-js";

import type { Database } from "./supabase-types";

type TableName = keyof Database["public"]["Tables"];
type TableRow<T extends TableName> = Database["public"]["Tables"][T]["Row"];
type UpdateTableRow<T extends TableName> = Database["public"]["Tables"][T]["Insert"];
type CreateTableRow<T extends TableName> = Database["public"]["Tables"][T]["Update"];
type TableRowRelationships<T extends TableName> = Database["public"]["Tables"][T]["Relationships"];

const supabase = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export { supabase };
export type { Database, TableRow, CreateTableRow, UpdateTableRow, TableName, TableRowRelationships };
