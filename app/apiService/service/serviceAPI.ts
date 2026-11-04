import { api } from "~/lib/api";
import type { IService } from "../../types/service";
import type { ISearchSortFilter } from "../../utils";

const normalizeService = (service: IService & { is_featured?: boolean }) => ({ ...service, imageUrl: service.image_url || '', isFeatured: service.is_featured || false, buttonTitle: service.button_title || 'Explore' });

export type TApiSuccessResponse<T> = T;

const getAll = async (params: ISearchSortFilter) => {
    // Pass params to server if needed
    const queryParams: Record<string, any> = {};
    if (params.search) queryParams.search = params.search;

    const { data } = await api.get<{ data: IService[] }>('/services', queryParams);

    return {
        services: data.map(normalizeService),
        total: data.length,
        page: params.page || 1,
        lastPage: 1
    };
};

const getOne = async (id: string) => {
    const { data } = await api.get<{ data: IService }>(`/services/${id}`);
    return normalizeService(data);
};

const getAdminAll = async () => {
    const { data } = await api.get<{ data: IService[] }>('/services/admin');
    return { services: data.map(normalizeService), total: data.length, page: 1, lastPage: 1 };
};

const create = async (service: Partial<IService>) => {
    const { data } = await api.post<{ data: IService }>('/services', service);
    return normalizeService(data);
};

const update = async (id: string, service: Partial<IService>) => {
    const { data } = await api.put<{ data: IService }>(`/services/${id}`, service);
    return normalizeService(data);
};

const destroy = async (id: string) => {
    await api.delete(`/services/${id}`);
    return true;
};

export default {
    getAll,
    getAdminAll,
    getOne,
    create,
    update,
    destroy
};
