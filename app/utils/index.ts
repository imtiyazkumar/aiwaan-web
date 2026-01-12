export interface ISearchSortFilter {
    search?: string;
    sort?: string;
    filter?: string;
    page?: number;
    perPage?: number;
}

export const apiQueryGenerator = (params: ISearchSortFilter) => {
    // Basic implementation for now, or just a placeholder if not strictly used by Supabase client directly in the same way as axios
    // Since we use Supabase client, we might not need a query string generator, but the user's example had it. 
    // I'll include a simple one or just the type for now as the example showed it used in axios.get(`...${apiQueryGenerator(params)}`)
    // For Supabase we usually chain methods.
    // However, to keep consistent with the requested "format", I'll include the interface.
    return "";
};
