import type { PostgrestSingleResponse } from "@supabase/supabase-js";

type Query<Data, Args extends any[]> = (...args: Args) => Promise<PostgrestSingleResponse<Data>>;

function makeFetcher<Data, Args extends any[]>(query: Query<Data, Args>) {
  return async (...args: Args) => {
    try {
      const { data, error } = await query(...args);

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export { makeFetcher };
