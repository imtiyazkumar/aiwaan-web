export interface ITestimonial {
    id: string;
    created_at: string;
    client_name: string;
    user_id?: string | null;
    content: string;
    rating: number;
    verified_at: string | null;
    verified_by: string | null;
    // Keeping for legacy or if needed, though not in new schema
    image_url?: string | null;
    name?: string;
    role?: string | null;
    is_featured?: boolean;
}
