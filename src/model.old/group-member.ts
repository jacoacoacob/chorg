import { supabase } from "@/supabase-client";
import { makeFetcher } from "@/utils/fetcher";

const fetchAddGroupMember = makeFetcher(
  async (groupId: string, userId: string) => supabase
      .from("group_member")
      .insert({ group_id: groupId, user_id: userId })
);

const fetchRemoveGroupMember = makeFetcher(
  async (groupId: string, userId: string) => supabase
      .from("group_member")
      .delete()
      .eq("group_id", groupId)
      .eq("user_id", userId)
);

export { fetchAddGroupMember, fetchRemoveGroupMember };
