export interface IService {
    id: string;
    index?: number;

    title: string;
    description: string;

    imageUrl: string;
    images?: string[] | null;

    tag?: string;
    isFeatured: boolean;

    features?: string[];
    buttonTitle?: string;

    icon?: string;
    onClick?: () => void;
}
