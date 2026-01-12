import { supabase } from "~/lib/supabase";
import type { IProfile } from "../../types/user";

const getProfile = async (userId: string) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) throw error;
    return data as IProfile;
};

const updateProfile = async (profile: Partial<IProfile> & { id: string }) => {
    const { data, error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', profile.id)
        .select()
        .single();

    if (error) throw error;
    return data as IProfile;
};

export default {
    getProfile,
    updateProfile,
};
