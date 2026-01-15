
import { ProtectedRoute } from '~/components/ProtectedRoute';
import { useSearchParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Div, Flex } from '~/components/general/BaseComponents';
import TextInput from '~/components/general/TextInput';
import Button from '~/components/buttons/Button';
import { wrapperBaseClass } from '~/utils/constants';

import OrderQuery from '~/apiService/order/orderQuery';
import ServiceQuery from '~/apiService/service/serviceQuery';
import { api } from '~/lib/api';

function AddEditOrderContent() {
    const navigate = useNavigate();

    // Fetch Services for dropdown
    const { data: serviceData } = ServiceQuery.useQueryGetServices({});
    const services = serviceData?.services || [];

    // Fetch Users
    const [users, setUsers] = useState<any[]>([]);
    useEffect(() => {
        api.get('/users').then(res => setUsers((res.data as any).data || []));
    }, []);

    const createMutation = OrderQuery.useMutationCreateOrder();

    const [formData, setFormData] = useState({
        service_id: '',
        user_id: '',
        amount: 0,
        status: 'pending',
        notes: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            service_id: formData.service_id,
            user_id: formData.user_id,
            amount: Number(formData.amount),
            status: formData.status,
            details: { notes: formData.notes }
        };

        createMutation.mutate(payload as any, {
            onSuccess: () => {
                alert('Order created!');
                navigate('/admin/orders'); // We need to create this page
            },
            onError: (err: any) => alert('Error: ' + err.message)
        });
    };

    return (
        <Flex className="items-center justify-center w-full">
            <Div className={`${wrapperBaseClass} max-w-2xl`}>
                <h1 className="text-2xl font-bold mb-6 text-center">Create New Order</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Service</label>
                        <select name="service_id" value={formData.service_id} onChange={handleChange} required className="border rounded-xl px-4 py-2 bg-white">
                            <option value="">Select Service</option>
                            {services.map(s => (
                                <option key={s.id} value={s.id}>{s.title}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Client / User</label>
                        <select name="user_id" value={formData.user_id} onChange={handleChange} required className="border rounded-xl px-4 py-2 bg-white">
                            <option value="">Select Client</option>
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
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-1 block">Notes</label>
                        <textarea name="notes" value={formData.notes} onChange={handleChange} className="w-full border rounded-xl px-4 py-2" rows={3}></textarea>
                    </div>

                    <Flex className="gap-4 pt-4">
                        <Button type="submit" variant="primary_filled" height="medium" disabled={createMutation.isPending}>
                            {createMutation.isPending ? 'Creating...' : 'Create Order'}
                        </Button>
                        <Button type="button" onClick={() => navigate('/admin/orders')} variant="dark_outlined" height="medium">Cancel</Button>
                    </Flex>
                </form>
            </Div>
        </Flex>
    );
}

export default function AddEditOrder() {
    return <ProtectedRoute><AddEditOrderContent /></ProtectedRoute>;
}
