import { supabase } from "~/lib/supabase";
import type { IBill } from "../../types/billing";

const getUserBills = async (userId: string) => {
    const { data, error } = await supabase.from('bills').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (error) throw error;
    return { bills: data as IBill[] };
};

export default {
    getUserBills,
};
