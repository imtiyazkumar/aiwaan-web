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
    project_id?: string | null;
    order_id?: string | null;
    user?: { id: string; full_name: string | null; email: string | null } | null;
    project?: { id: string; title: string } | null;
}
