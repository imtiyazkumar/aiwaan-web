export interface Project {
    $id?: string;
    title: string;
    type: string;
    description: string;
    location: string;
    client_name: string;
    client_email: string;
    budget: number;
    start_date: string;
    estimated_completion_date: string;
    client_phone: string;
    care_of: string;
    images?: string[];
    created_at?: string;
    updated_at?: string;
}

export interface ContactMessage {
    $id?: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    type: string;
    size?: string;
    description: string;
    new_to_architecture: boolean;
    subject?: string;
    message?: string;
    $createdAt?: string;
    $updatedAt?: string;
}

export interface Invoice {
    $id?: string;
    project_id: string;
    invoice_number: string;
    client_name: string;
    client_email: string;
    amount: number;
    status: string
    due_date: string;
    services: string[];
    notes?: string;
    $createdAt?: string;
    $updatedAt?: string;
}
