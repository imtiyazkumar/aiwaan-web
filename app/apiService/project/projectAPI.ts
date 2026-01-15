import { api } from "~/lib/api";
import type { IProject } from "../../types/project";
import type { ISearchSortFilter } from "../../utils";

const getAll = async (params?: ISearchSortFilter) => {
    // Construct query params
    const queryParams: Record<string, any> = {};
    if (params?.search) queryParams.search = params.search;
    // Server handles sorting by default or we can pass it if server supports

    // Note: Server response structure is { data: [...] }
    const { data } = await api.get<{ data: IProject[] }>('/projects', queryParams);
    // The Client expects { projects: [...] } based on previous implementation
    return { projects: data };
};

const getOne = async (id: string) => {
    const { data } = await api.get<{ data: IProject }>(`/projects/${id}`);
    return data;
};

const create = async (project: Omit<IProject, 'id' | 'created_at'>) => {
    const { data } = await api.post<{ data: IProject }>('/projects', project);
    return data;
};

const update = async (project: Partial<IProject> & { id: string }) => {
    const { data } = await api.put<{ data: IProject }>(`/projects/${project.id}`, project);
    return data;
};

const destroy = async (id: string) => {
    await api.delete(`/projects/${id}`);
    return true;
};

export default {
    getAll,
    getOne,
    create,
    update,
    destroy
};
