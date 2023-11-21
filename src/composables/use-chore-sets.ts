import { supabase } from "@/supabase-client";

function useChoreSets() {
    const user = supabase.auth.getUser();

    
}

export { useChoreSets };