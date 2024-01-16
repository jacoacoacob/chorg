import type { PostgrestResponse, PostgrestSingleResponse } from "@supabase/supabase-js";

type Query<Data, Args extends any[]> = (...args: Args) => Promise<PostgrestSingleResponse<Data>>;
type QuerySingle<Data, Args extends any[]> = (...args: Args) => Promise<PostgrestSingleResponse<Data>>
type QueryList<Data, Args extends any[]> = (...args: Args) => Promise<PostgrestResponse<Data>>

function makeListFetcher<Data, Args extends any[]>(query: QueryList<Data, Args>) {
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

function makeSingleFetcher<Data, Args extends any[]>(query: QuerySingle<Data, Args>) {
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

export { makeListFetcher, makeSingleFetcher, makeFetcher };
