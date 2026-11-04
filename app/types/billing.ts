export interface IBill {
    id: string;
    created_at: string;
    user_id: string;
    amount: number;
    final_amount?: number | null;
    discount?: number | null;
    invoice_id?: string | null;
    status: 'pending' | 'paid' | 'overdue' | string | null;
    due_date: string | null;
    paid_at: string | null;
    reference_id: string | null;
}
