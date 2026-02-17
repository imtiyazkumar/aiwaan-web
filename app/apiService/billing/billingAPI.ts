import { api } from "~/lib/api";
import type { IBill } from "../../types/billing";

const getUserBills = async (userId: string) => {
    const { data } = await api.get<{ data: IBill[] }>('/bills');
    return { bills: data };
};

const getAdminBills = async () => {
    const { data } = await api.get<{ data: IBill[] }>('/bills/admin');
    return { bills: data };
};

const create = async (bill: Partial<IBill>) => {
    const { data } = await api.post<{ data: IBill }>('/bills', bill);
    return data;
};

const update = async (id: string, bill: Partial<IBill>) => {
    const { data } = await api.put<{ data: IBill }>(`/bills/${id}`, bill);
    return data;
};

const destroy = async (id: string) => {
    await api.delete(`/bills/${id}`);
    return true;
};

export default {
    getUserBills,
    getAdminBills,
    create,
    update,
    destroy
};
