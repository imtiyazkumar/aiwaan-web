export interface IService {
    id: string;
    index?: number;

    title: string;
    description: string;

    imageUrl: string;
    image_url?: string; // DB field
    images?: string[] | null;

    tag?: string;
    isFeatured: boolean;

    features?: string[];
    buttonTitle?: string;
    button_title?: string; // DB field

    icon?: string;
    onClick?: () => void;
}
