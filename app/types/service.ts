export interface IService {
    id: string;
    title: string;
    description: string;
    image_url: string | null;
    tag: string | null;
    features: string[] | null;
    created_at: string;
    updated_at: string;
    // adding legacy compatibility if needed
    imageUrl?: string;
    buttonTitle?: string;
    button_title?: string | null;
}
