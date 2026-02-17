import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { Div, Flex } from '~/components/general/BaseComponents';
import Button from '~/components/buttons/Button';
import TextInput from '~/components/general/TextInput';
import TitleCard from '~/components/cards/TitleCard';
import { api } from '~/lib/api';
import userQuery from '~/apiService/user/userQuery';
import SelectInput from '~/components/general/Select';

export default function EditUser() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const userid = searchParams.get('id');
    const [loading, setLoading] = useState(false);

    const { data: user, isLoading } = userQuery.useQueryGetUser(userid ?? '');

    const [formData, setFormData] = useState({
        email: '',
        full_name: '',
        role: 'user',
        is_admin: 'false'
    });

    useEffect(() => {
        if (!userid) {
            navigate('/admin/users');
            return;
        }

        if (user) {
            setFormData({
                email: user.email ?? '',
                full_name: user.full_name ?? '',
                role: user.role ?? 'user',
                is_admin: user.is_admin ? 'true' : 'false'
            });
        }
    }, [userid, user, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.put(`/users/admin/${userid}`, {
                full_name: formData.full_name,
                role: formData.role
            });
            alert('User updated successfully');
            navigate('/admin/users');
        } catch (error: any) {
            alert(error.response?.data?.error || error.message);
        } finally {
            setLoading(false);
        }
    };

    if (isLoading) {
        return (
            <Div className="w-full py-20 text-center text-gray-600">
                Loading...
            </Div>
        );
    }

    return (
        <Div className="w-full rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden">
            <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100"
            >
                <TitleCard title="Edit User" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextInput
                        label="Full Name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        placeholder="John Doe"
                    />

                    <TextInput
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        disabled
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SelectInput
                        label="Role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        options={[
                            { label: 'User', value: 'user' },
                            { label: 'Admin', value: 'admin' }
                        ]}
                    />

                    <TextInput
                        label="Is admin"
                        name="is_admin"
                        type="boolean"
                        value={formData.role === 'admin' ? 'true' : 'false'}
                        disabled
                    />
                </div>


                <Flex className="gap-4 pt-4 justify-end">
                    <Button
                        type="button"
                        variant="dark_outlined"
                        onClick={() => navigate('/admin/users')}
                        height="medium"
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        variant="primary_filled"
                        disabled={loading}
                        height="medium"
                    >
                        {loading ? 'Updating...' : 'Update User'}
                    </Button>
                </Flex>
            </form>
        </Div>
    );
}
