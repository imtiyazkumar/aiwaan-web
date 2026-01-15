import { api } from "~/lib/api";
import type { IBill } from "../../types/billing";

const getUserBills = async (userId: string) => {
    // Server currently has GET /bills (all bills, if admin)
    // Server doesn't seem to have GET /bills?user_id=... or GET /users/:id/bills
    // But GET /bills returns all bills (if admin) or maybe RLS filters it?
    // Let's assume GET /bills returns MY bills if I am user.
    // The server route `bills.get('/', ...)` selects * from bills. 
    // RLS should filter it.
    const { data } = await api.get<{ data: IBill[] }>('/bills');
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
    create,
    update,
    destroy
};
