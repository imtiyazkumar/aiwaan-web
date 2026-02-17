import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProjectAPI from "./projectAPI";
import type { IProject } from "../../types/project";
import type { ISearchSortFilter } from "../../utils";

export const enum PROJECT_Query_Key {
    PROJECT = "project",
}

const useQueryGetProjects = (params?: ISearchSortFilter) => {
    return useQuery({
        queryKey: [PROJECT_Query_Key.PROJECT, params],
        queryFn: () => ProjectAPI.getAll(params),
    });
};

const useQueryGetAdminProjects = () => {
    return useQuery({
        queryKey: [PROJECT_Query_Key.PROJECT, 'admin'],
        queryFn: () => ProjectAPI.getAdminAll(),
    });
};

const useQueryGetProject = (id: string | undefined) => {
    return useQuery({
        queryKey: [PROJECT_Query_Key.PROJECT, id],
        queryFn: () => ProjectAPI.getOne(id!),
        enabled: !!id,
    });
};

const useMutationCreateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (project: Omit<IProject, 'id' | 'created_at'>) => ProjectAPI.create(project),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PROJECT_Query_Key.PROJECT] });
        },
    });
};

const useMutationUpdateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (project: Partial<IProject> & { id: string }) => ProjectAPI.update(project),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: [PROJECT_Query_Key.PROJECT] });
            queryClient.invalidateQueries({ queryKey: [PROJECT_Query_Key.PROJECT, data.id] });
        },
    });
};

const useMutationDeleteProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => ProjectAPI.destroy(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PROJECT_Query_Key.PROJECT] });
        },
    });
};

export default {
    useQueryGetProjects,
    useQueryGetAdminProjects,
    useQueryGetProject,
    useMutationCreateProject,
    useMutationUpdateProject,
    useMutationDeleteProject,
};
