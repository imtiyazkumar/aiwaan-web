import { supabase } from "~/lib/supabase";
import type { IProject } from "../../types/project";
import type { ISearchSortFilter } from "../../utils";

const getAll = async (params?: ISearchSortFilter) => {
    let query = supabase.from('projects').select('*');

    if (params?.search) {
        query = query.ilike('title', `%${params.search}%`);
    }

    // Default sort
    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;
    if (error) throw error;
    return { projects: data as IProject[] };
};

const getOne = async (id: string) => {
    const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
    if (error) throw error;
    return data as IProject;
};

const create = async (project: Omit<IProject, 'id' | 'created_at'>) => {
    const { data, error } = await supabase.from('projects').insert(project).select().single();
    if (error) throw error;
    return data as IProject;
};

const update = async (project: Partial<IProject> & { id: string }) => {
    const { data, error } = await supabase.from('projects').update(project).eq('id', project.id).select().single();
    if (error) throw error;
    return data as IProject;
};

const destroy = async (id: string) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
    return true;
};

export default {
    getAll,
    getOne,
    create,
    update,
    destroy
};
