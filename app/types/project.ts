export interface IProject {
    id: string;
    created_at: string;
    title: string;
    description: string | null;
    type: string | null;
    location: string | null;
    image_url: string | null;
    gallery: string[] | null;
    status: string | null;
    client: string | null;
    year: string | null;
    tags: string[] | null;
    is_featured: boolean | null;
}
