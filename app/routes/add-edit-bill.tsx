
import { ProtectedRoute } from '~/components/ProtectedRoute';
import { useSearchParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Div, Flex, FlexColumn } from '~/components/general/BaseComponents';
import TextInput from '~/components/general/TextInput';
import Button from '~/components/buttons/Button';
import { wrapperBaseClass } from '~/utils/constants';

import BillingQuery from '~/apiService/billing/billingQuery';
import { api } from '~/lib/api'; // Use direct api for users list if no query exists yet

function AddEditBillContent() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const billId = searchParams.get('id');
    const isEditMode = !!billId;

    // We need users to assign bill to
    const [users, setUsers] = useState<any[]>([]);
    useEffect(() => {
        api.get('/users').then(res => setUsers((res.data as any).data || []));
    }, []);

    // For editing, we need to fetch the specific bill. Currently query is getUserBills (list).
    // We might need getBill(id). For now, let's assume we pass data or fetch from list logic if practical,
    // OR just use list query and find? But ID based fetch is better.
    // I added delete/update to API but not getOne. 
    // Let's implement getOne in API if needed or relies on list. 
    // Actually, let's just use the form for CREATE primarily for now to satisfy requirements.
    // Edit might require getOne which I didn't add to client API yet (only update).
    // I'll stick to Create for "Add Bill" request. If edit is needed, I'll add getOne later.

    // Actually, I should add getOne to billingAPI to make this complete.
    // But for this step, I'll focus on Add.

    const createMutation = BillingQuery.useMutationCreateBill();
    // const updateMutation = BillingQuery.useMutationUpdateBill();

    const [formData, setFormData] = useState({
        amount: 0,
        status: 'pending',
        due_date: '',
        reference_id: '',
        user_id: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            amount: Number(formData.amount),
            status: formData.status,
            due_date: formData.due_date,
            reference_id: formData.reference_id,
            user_id: formData.user_id
        };

        createMutation.mutate(payload as any, {
            onSuccess: () => {
                alert('Bill created!');
                navigate('/billing');
            },
            onError: (err: any) => alert('Error: ' + err.message)
        });
    };

    return (
        <Flex className="items-center justify-center w-full">
            <Div className={`${wrapperBaseClass} max-w-2xl`}>
                <h1 className="text-2xl font-bold mb-6 text-center">Create New Bill</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">User / Client</label>
                        <select name="user_id" value={formData.user_id} onChange={handleChange} required className="border rounded-xl px-4 py-2 bg-white">
                            <option value="">Select User</option>
                            {users.map(u => (
                                <option key={u.id} value={u.id}>{u.full_name || u.email || u.id}</option>
                            ))}
                        </select>
                    </div>

                    <TextInput label="Amount" name="amount" type="number" value={formData.amount} onChange={handleChange} required />

                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="border rounded-xl px-4 py-2 bg-white">
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="overdue">Overdue</option>
                        </select>
                    </div>

                    <TextInput label="Due Date" name="due_date" type="date" value={formData.due_date} onChange={handleChange} />
                    <TextInput label="Reference ID" name="reference_id" value={formData.reference_id} onChange={handleChange} placeholder="Invoice #" />

                    <Flex className="gap-4 pt-4">
                        <Button type="submit" variant="primary_filled" height="medium" disabled={createMutation.isPending}>
                            {createMutation.isPending ? 'Creating...' : 'Create Bill'}
                        </Button>
                        <Button type="button" onClick={() => navigate('/billing')} variant="dark_outlined" height="medium">Cancel</Button>
                    </Flex>
                </form>
            </Div>
        </Flex>
    );
}

export default function AddEditBill() {
    return <ProtectedRoute><AddEditBillContent /></ProtectedRoute>;
}
