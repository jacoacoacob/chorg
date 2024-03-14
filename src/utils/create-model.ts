import { supabase, type Database, type TableName } from "@/supabase-client";
import { makeFetcher } from "./fetcher";

type CreateOptions<Table extends TableName> = Database["public"]["Tables"][Table]["Insert"];
type UpdateOptions<Table extends TableName> = Database["public"]["Tables"][Table]["Update"];

function createModel<Table extends TableName>(table: Table) {

  return {
    findOne(id: string) {
      return makeFetcher(async () => supabase
        .from(table)
        .select("*")
        .eq("id", id)
        .single()
      )();
    },
    findAll() {
      return makeFetcher(
        async () => supabase.from(table).select("*")
      )();
    },
    create(options: CreateOptions<Table>) {
      return makeFetcher(
        async () => supabase
          .from(table)
          .insert(options as any)
          .select()
          .single()
      )();
    },
    update(options: UpdateOptions<Table>) {
      return makeFetcher(
        async () => supabase
          .from(table)
          .update(options as any)
          .select()
          .single()
      )();
    },
    destroy(id: string) {
      return makeFetcher(
        async () => supabase.from(table).delete().eq("id", id)
      )();
    },
  };
}

export { createModel };
