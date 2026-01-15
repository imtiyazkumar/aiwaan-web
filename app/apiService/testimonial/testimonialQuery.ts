
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import TestimonialAPI from "./testimonialAPI";
import type { ITestimonial } from "~/types/testimonial";

export enum Testimonial_Query_Key {
    TESTIMONIAL = 'TESTIMONIAL',
    FEATURED = 'TESTIMONIAL_FEATURED'
}

const useQueryGetTestimonials = () => {
    return useQuery({
        queryKey: [Testimonial_Query_Key.TESTIMONIAL],
        queryFn: () => TestimonialAPI.getAll(),
    });
};

const useQueryGetFeaturedTestimonials = () => {
    return useQuery({
        queryKey: [Testimonial_Query_Key.FEATURED],
        queryFn: () => TestimonialAPI.getFeatured(),
    });
};

const useMutationCreateTestimonial = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: TestimonialAPI.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Testimonial_Query_Key.TESTIMONIAL] });
        },
    });
};

const useMutationUpdateTestimonial = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Partial<ITestimonial> & { id: string }) => TestimonialAPI.update(data.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Testimonial_Query_Key.TESTIMONIAL] });
        },
    });
};

const useMutationDeleteTestimonial = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: TestimonialAPI.destroy,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Testimonial_Query_Key.TESTIMONIAL] });
        },
    });
};

const TestimonialQuery = {
    useQueryGetTestimonials,
    useQueryGetFeaturedTestimonials,
    useMutationCreateTestimonial,
    useMutationUpdateTestimonial,
    useMutationDeleteTestimonial
};

export default TestimonialQuery;
