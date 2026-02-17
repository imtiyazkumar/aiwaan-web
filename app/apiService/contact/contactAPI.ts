import { api } from "~/lib/api";
import type { IContactMessage } from "~/types/contact";

const create = async (contact: Partial<IContactMessage>) => {
    const { data } = await api.post<{ data: IContactMessage }>('/contact', contact);
    return data;
};

const ContactAPI = {
    create
};

export default ContactAPI;
