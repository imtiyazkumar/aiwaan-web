import { api } from "~/lib/api";
import type { IService } from "../../types/service";
import type { ISearchSortFilter } from "../../utils";

export type TApiSuccessResponse<T> = T;

const getAll = async (params: ISearchSortFilter) => {
    // Pass params to server if needed
    const queryParams: Record<string, any> = {};
    if (params.search) queryParams.search = params.search;

    const { data } = await api.get<{ data: IService[] }>('/services', queryParams);

    return {
        services: data,
        total: data.length,
        page: params.page || 1,
        lastPage: 1
    };
};

const getOne = async (id: string) => {
    const { data } = await api.get<{ data: IService }>(`/services/${id}`);
    return data;
};

const create = async (service: Partial<IService>) => {
    const { data } = await api.post<{ data: IService }>('/services', service);
    return data;
};

const update = async (id: string, service: Partial<IService>) => {
    const { data } = await api.put<{ data: IService }>(`/services/${id}`, service);
    return data;
};

const destroy = async (id: string) => {
    await api.delete(`/services/${id}`);
    return true;
};

export default {
    getAll,
    getOne,
    create,
    update,
    destroy
};
