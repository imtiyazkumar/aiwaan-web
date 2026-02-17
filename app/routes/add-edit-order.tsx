import { ProtectedRoute } from '~/components/ProtectedRoute';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { useAuth } from '~/contexts/AuthContext';
import { Div, Flex } from '~/components/general/BaseComponents';
import TextInput from '~/components/general/TextInput';
import Button from '~/components/buttons/Button';
import TitleCard from '~/components/cards/TitleCard';
import SelectInput from '~/components/general/Select';

import OrderQuery from '~/apiService/order/orderQuery';
import ServiceQuery from '~/apiService/service/serviceQuery';
import ProjectQuery from '~/apiService/project/projectQuery';
import { api } from '~/lib/api';

function AddEditOrderContent() {
    const { profile } = useAuth();
    const navigate = useNavigate();

    const { data: serviceData } = ServiceQuery.useQueryGetServices({});
    const { data: projectData } = ProjectQuery.useQueryGetProjects({});
    const services = serviceData?.services || [];
    const projects = projectData?.projects || [];

    const [users, setUsers] = useState<any[]>([]);
    useEffect(() => {
        api.get('/users').then((res: any) => setUsers(res.data || []));
    }, []);

    const createMutation = OrderQuery.useMutationCreateOrder();

    const [formData, setFormData] = useState({
        service_id: '',
        project_id: '',
        user_id: '',
        amount: '',
        status: 'pending',
        notes: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            service_id: formData.service_id,
            project_id: formData.project_id || null,
            user_id: formData.user_id,
            amount: Number(formData.amount),
            status: formData.status,
            details: { notes: formData.notes }
        };

        createMutation.mutate(payload as any, {
            onSuccess: () => {
                alert('Order created successfully!');
                navigate('/admin/orders');
            },
            onError: (err: any) => {
                alert('Failed to create order: ' + err.message);
            }
        });
    };

    return (
        <Div className="w-full rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden">
            <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100"
            >
                <TitleCard title="Create New Order" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SelectInput
                        label="Service"
                        name="service_id"
                        value={formData.service_id}
                        onChange={handleChange}
                        options={[
                            { label: 'Select Service', value: '' },
                            ...services.map(s => ({ label: s.title, value: s.id }))
                        ]}
                    />

                    <SelectInput
                        label="Project"
                        name="project_id"
                        value={formData.project_id}
                        onChange={handleChange}
                        options={[
                            { label: 'Select Project (optional)', value: '' },
                            ...projects.map(p => ({ label: p.title, value: p.id }))
                        ]}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SelectInput
                        label="Client / User"
                        name="user_id"
                        value={formData.user_id}
                        onChange={handleChange}
                        options={[
                            { label: 'Select Client', value: '' },
                            ...users.map(u => ({
                                label: u.full_name || u.email || u.id,
                                value: u.id
                            }))
                        ]}
                    />

                    <TextInput
                        label="Amount"
                        name="amount"
                        type="number"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SelectInput
                        label="Status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        options={[
                            { label: 'Pending', value: 'pending' },
                            { label: 'Completed', value: 'completed' },
                            { label: 'Cancelled', value: 'cancelled' }
                        ]}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                        Notes
                    </label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={4}
                        className="w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-base/20 border-secondary-200"
                    />
                </div>

                <Flex className="gap-4 pt-4 justify-end">
                    <Button
                        type="button"
                        onClick={() => navigate('/admin/orders')}
                        variant="dark_outlined"
                        height="medium"
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        variant="primary_filled"
                        height="medium"
                        disabled={createMutation.isPending}
                    >
                        {createMutation.isPending ? 'Creating Order...' : 'Create Order'}
                    </Button>
                </Flex>
            </form>
        </Div>
    );
}

export default function AddEditOrder() {
    return (
        <ProtectedRoute>
            <AddEditOrderContent />
        </ProtectedRoute>
    );
}
