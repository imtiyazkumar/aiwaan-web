import { api } from "~/lib/api";
import type { ITestimonial } from "~/types/testimonial";

const getAll = async () => {
    const { data } = await api.get<{ data: ITestimonial[] }>('/testimonials');
    return {
        testimonials: data
    };
};

const getFeatured = async () => {
    // Server doesn't have specific featured endpoint, but we can filter on client or add param
    // Let's assume we can filter client side from getAll or simply returning all for now.
    // Ideally update server to support ?is_featured=true
    const { data } = await api.get<{ data: ITestimonial[] }>('/testimonials');
    const featured = data.filter(t => t.is_featured); // Manual filter if type has it
    return {
        testimonials: featured.length > 0 ? featured : data // Fallback
    };
};

const create = async (testimonial: Partial<ITestimonial>) => {
    const { data } = await api.post<{ data: ITestimonial }>('/testimonials', testimonial);
    return data;
};

const update = async (id: string, testimonial: Partial<ITestimonial>) => {
    const { data } = await api.put<{ data: ITestimonial }>(`/testimonials/${id}`, testimonial);
    return data;
};

const destroy = async (id: string) => {
    await api.delete(`/testimonials/${id}`);
    return true;
};

const TestimonialAPI = {
    getAll,
    getFeatured,
    create,
    update,
    destroy
};

export default TestimonialAPI;
