export interface IInquiry {
    id: string;
    created_at: string;
    name: string;
    email: string;
    subject: string | null;
    message: string;
    status: 'new' | 'read' | 'replied';
}
