export interface IContactMessage {
    id: string;
    user_id: string | null;
    name: string | null;
    email: string | null;
    phone: string | null;
    message: string | null;
    source: string | null;
    created_at: string;
}
