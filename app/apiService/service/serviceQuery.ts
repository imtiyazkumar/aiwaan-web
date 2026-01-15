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

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ServiceAPI from "./serviceAPI";
import type { IService } from "../../types/service";
import type { ISearchSortFilter } from "../../utils";

export const enum Service_Query_Key {
    SERVICE = "service",
}

const useQueryGetServices = (params: ISearchSortFilter) => {
    return useQuery({
        queryKey: [Service_Query_Key.SERVICE, params],
        queryFn: () => ServiceAPI.getAll(params),
    });
};

const useQueryGetService = (id?: string) => {
    return useQuery({
        queryKey: [Service_Query_Key.SERVICE, id],
        queryFn: () => ServiceAPI.getOne(id!),
        enabled: !!id,
    });
};

const useMutationCreateService = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ServiceAPI.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Service_Query_Key.SERVICE] });
        },
    });
};

const useMutationUpdateService = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (service: Partial<IService> & { id: string }) => ServiceAPI.update(service.id, service),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Service_Query_Key.SERVICE] });
        },
    });
};

const useMutationDeleteService = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ServiceAPI.destroy,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Service_Query_Key.SERVICE] });
        },
    });
};

export default {
    useQueryGetServices,
    useQueryGetService,
    useMutationCreateService,
    useMutationUpdateService,
    useMutationDeleteService,
};
