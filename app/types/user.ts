export interface IProfile {
    id: string;
    updated_at: string | null;
    email: string;
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
    website: string | null;
    is_admin: boolean | null;
    role: string | null;
}
