import type { PostgrestSingleResponse } from "@supabase/supabase-js";

type SupabaseQuery<Data> = () => Promise<PostgrestSingleResponse<Data>>;

async function handleFetch<Data>(query: SupabaseQuery<Data>) {
  try {
    const { data, error } = await query();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export { handleFetch };
