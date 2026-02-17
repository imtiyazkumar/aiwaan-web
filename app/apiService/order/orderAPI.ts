import { api } from "~/lib/api";

export interface IOrder {
    id: string;
    created_at: string;
    service_id: string;
    amount: number;
    status: string;
    details: Record<string, any>;
    created_by?: string;
}

const getAll = async () => {
    const { data } = await api.get<{ data: IOrder[] }>('/orders');
    return { orders: data };
};

const getAdminAll = async () => {
    const { data } = await api.get<{ data: IOrder[] }>('/orders/admin');
    return { orders: data };
};

const getOne = async (id: string) => {
    const { data } = await api.get<{ data: IOrder }>(`/orders/${id}`);
    return data;
};

const create = async (order: Partial<IOrder>) => {
    const { data } = await api.post<{ data: IOrder }>('/orders', order);
    return data;
};

const update = async (id: string, order: Partial<IOrder>) => {
    const { data } = await api.put<{ data: IOrder }>(`/orders/${id}`, order);
    return data;
};

const destroy = async (id: string) => {
    await api.delete(`/orders/${id}`);
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
