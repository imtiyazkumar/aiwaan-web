export interface IChatThread {
    id: string;
    user_id: string;
    subject: string | null;
    created_at: string;
}

export interface IChatMessage {
    id: string;
    thread_id: string;
    sender_id: string | null;
    message: string;
    is_admin: boolean;
    created_at: string;
}
