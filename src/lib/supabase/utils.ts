import type { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

type Supabase = SupabaseClient<Database>;

type TableName = keyof Database["public"]["Tables"];
type TableRow<T extends TableName> = Database["public"]["Tables"][T]["Row"];

function isPostgrestError(error: unknown): error is PostgrestError {
  if (typeof error !== "undefined") {
    return (
      Object.prototype.hasOwnProperty.call(error, "code") &&
      Object.prototype.hasOwnProperty.call(error, "message") &&
      Object.prototype.hasOwnProperty.call(error, "details") &&
      Object.prototype.hasOwnProperty.call(error, "hint")
    );
  }
  return false;
}

const ErrorCodeMessage: Record<string, (fieldNname: string, value: any) => string> = {
  "23505": (fieldNname, value) => `${fieldNname} ${JSON.stringify(value)} already exists`,
};

export { isPostgrestError, ErrorCodeMessage };
export type { Supabase, TableName, TableRow };
