
import { useQuery, useMutation, useQueryClient, type QueryClient } from "@tanstack/react-query";
import TestimonialAPI from "./testimonialAPI";
import type { ITestimonial } from "~/types/testimonial";
import { useAuth } from "~/contexts/AuthContext";

export enum Testimonial_Query_Key {
    TESTIMONIAL = 'TESTIMONIAL',
    FEATURED = 'TESTIMONIAL_FEATURED'
}

const refreshTestimonials = (client: QueryClient) => Promise.all([
    client.invalidateQueries({ queryKey: [Testimonial_Query_Key.TESTIMONIAL] }),
    client.invalidateQueries({ queryKey: [Testimonial_Query_Key.FEATURED] }),
]);

const useQueryGetTestimonials = () => {
    return useQuery({
        queryKey: [Testimonial_Query_Key.TESTIMONIAL],
        queryFn: () => TestimonialAPI.getAll(),
    });
};

const useQueryGetAdminTestimonials = () => {
    return useQuery({
        queryKey: [Testimonial_Query_Key.TESTIMONIAL, 'admin'],
        queryFn: () => TestimonialAPI.getAdminAll(),
    });
};

const useQueryGetFeaturedTestimonials = () => {
    return useQuery({
        queryKey: [Testimonial_Query_Key.FEATURED],
        queryFn: () => TestimonialAPI.getFeatured(),
    });
};

const useQueryGetTestimonialById = (id: string | undefined) => {
    return useQuery({
        queryKey: [Testimonial_Query_Key.TESTIMONIAL, id],
        queryFn: () => TestimonialAPI.getById(id!),
        enabled: !!id,
    });
};

const useQueryGetMyTestimonial = () => {
    const { user, loading } = useAuth();
    return useQuery({
        queryKey: [Testimonial_Query_Key.TESTIMONIAL, 'mine', user?.id],
        queryFn: () => TestimonialAPI.getMine(),
        enabled: !loading && !!user,
        retry: false,
    });
};

const useMutationCreateTestimonial = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: TestimonialAPI.create,
        onSuccess: () => refreshTestimonials(queryClient),
    });
};

const useMutationUpdateTestimonial = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Partial<ITestimonial> & { id: string }) => TestimonialAPI.update(data.id, data),
        onSuccess: () => refreshTestimonials(queryClient),
    });
};

const useMutationDeleteTestimonial = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: TestimonialAPI.destroy,
        onSuccess: () => refreshTestimonials(queryClient),
    });
};

const useMutationVerifyTestimonial = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: TestimonialAPI.verify,
        onSuccess: () => refreshTestimonials(queryClient),
    });
};

const TestimonialQuery = {
    useQueryGetTestimonials,
    useQueryGetTestimonialById,
    useQueryGetMyTestimonial,
    useQueryGetAdminTestimonials,
    useQueryGetFeaturedTestimonials,
    useMutationCreateTestimonial,
    useMutationUpdateTestimonial,
    useMutationVerifyTestimonial,
    useMutationDeleteTestimonial
};

export default TestimonialQuery;
