export interface ITeamMember {
    id: string;
    created_at: string;
    name: string;
    role: string;
    bio: string | null;
    image_url: string | null;
    linkedin_url: string | null;
    twitter_url: string | null;
    display_order: number;
}
