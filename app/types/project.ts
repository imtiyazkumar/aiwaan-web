export interface IProject {
    id: string;
    created_at: string;
    title: string;
    description: string | null;
    category: string | null;
    location: string | null;
    cover_image: string | null;
    gallery: string[] | null;
    status: string | null;
    client: string | null;
    year: string | null;
    tags: string[] | null;
    is_featured: boolean | null;
    is_public?: boolean | null;
    created_by?: string | null;
}
