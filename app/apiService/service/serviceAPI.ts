/**
 * Project Aiwaan
 *
 * @author     Imtiyaz Ahmad
 * @copyright  Imtiyaz Ahmad
 *
 * Built by Imtiyaz Ahmad
 * @link https://aiwaan.in
 *
 */

import { supabase } from "~/lib/supabase";
import type { IService } from "../../types/service";
import type { ISearchSortFilter } from "../../utils";

// Helper type for API responses if needed, though Supabase returns { data, error }
export type TApiSuccessResponse<T> = T;

const getAll = async (params: ISearchSortFilter) => {
    // Basic implementation: fetch all services. 
    // If pagination/search is needed, we'd add .range() or .ilike() here based on params.
    let query = supabase.from('services').select('*');

    if (params.search) {
        query = query.ilike('title', `%${params.search}%`);
    }

    // Default sort by created_at
    query = query.order('created_at', { ascending: true });

    const { data, error } = await query;

    if (error) {
        throw error;
    }

    return {
        services: data as IService[],
        total: data.length, // accurate count requires { count: 'exact' } in query
        page: params.page || 1,
        lastPage: 1 // TODO: implement real pagination calc if needed
    };
};

export default {
    getAll,
};
