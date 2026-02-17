import { ProtectedRoute } from '~/components/ProtectedRoute';
import { useSearchParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Div, Flex, FlexColumn } from '~/components/general/BaseComponents';
import TextInput from '~/components/general/TextInput';
import Button from '~/components/buttons/Button';
import { wrapperBaseClass } from '~/utils/constants';
import { X, Upload, ArrowLeft } from 'lucide-react';

import ServiceQuery from '~/apiService/service/serviceQuery';

function AddEditServiceContent() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const serviceId = searchParams.get('id');
    const isEditMode = !!serviceId;
    const [loading, setLoading] = useState(false);

    const { data: serviceData } = ServiceQuery.useQueryGetService(serviceId || undefined);
    const createMutation = ServiceQuery.useMutationCreateService();
    const updateMutation = ServiceQuery.useMutationUpdateService();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image_url: '',
        tag: '',
        icon: '',
        features: [] as string[],
        button_title: 'Explore',
    });

    useEffect(() => {
        if (isEditMode && serviceData) {
            setFormData({
                title: serviceData.title || '',
                description: serviceData.description || '',
                image_url: serviceData.image_url || '',
                tag: serviceData.tag || '',
                icon: serviceData.icon || '',
                features: serviceData.features || [],
                button_title: serviceData.button_title || 'Explore',
            });
        }
    }, [isEditMode, serviceData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFeatureAdd = () => {
        const feature = prompt("Enter feature:");
        if (feature) {
            setFormData(prev => ({ ...prev, features: [...prev.features, feature] }));
        }
    };

    const handleFeatureRemove = (index: number) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setLoading(true);
            const { api } = await import('~/lib/api');
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;
            const formData = new FormData();
            formData.append('file', file);
            formData.append('bucket', 'service-images');
            formData.append('path', filePath);

            const token = api.getToken();
            const response = await fetch(`${import.meta.env.VITE_API_URL}/storage/upload`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });

            if (!response.ok) throw new Error('Upload failed');
            const data = await response.json() as any;
            setFormData(prev => ({ ...prev, image_url: data.publicUrl }));
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { ...formData };
        const options = {
            onSuccess: () => {
                alert(isEditMode ? 'Service updated!' : 'Service created!');
                navigate('/services');
            },
            onError: (err: any) => alert('Error: ' + err.message)
        };

        if (isEditMode && serviceId) {
            updateMutation.mutate({ ...payload, id: serviceId }, options);
        } else {
            createMutation.mutate(payload, options);
        }
    };

    return (
        <FlexColumn className="w-full items-center">
            <Div className={`${wrapperBaseClass} max-w-4xl w-full`}>
                <Flex className="w-full items-center mb-6 gap-4">
                    <button
                        onClick={() => navigate('/admin/services')}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        type="button"
                    >
                        <ArrowLeft size={24} className="text-gray-600" />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isEditMode ? 'Edit Service' : 'Add New Service'}
                    </h1>
                </Flex>

                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextInput label="Title" name="title" value={formData.title} onChange={handleChange} required />
                        <TextInput label="Tag (e.g. Popular)" name="tag" value={formData.tag} onChange={handleChange} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className="w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-base/20 outline-none" />
                    </div>

                    <div className="border-t pt-4">
                        <label className="block text-sm font-medium mb-2 text-gray-700">Service Image</label>
                        <Flex className="gap-4 items-center">
                            <TextInput className="w-full" label="Image URL" name="image_url" value={formData.image_url} onChange={handleChange} />
                            <div className="relative overflow-hidden inline-[button] bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm font-medium text-gray-700">
                                <Upload size={16} className="inline mr-2" /> Upload
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} accept="image/*" />
                            </div>
                        </Flex>
                        {formData.image_url && <img src={formData.image_url} alt="Preview" className="h-32 mt-2 rounded-lg border object-cover" />}
                    </div>

                    <div className="border-t pt-4">
                        <Flex className="justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-700">Features</label>
                            <button type="button" onClick={handleFeatureAdd} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">Add Feature</button>
                        </Flex>
                        <ul className="list-disc pl-5 space-y-1">
                            {formData.features.map((feat, idx) => (
                                <li key={idx} className="flex items-center justify-between text-sm py-1">
                                    <span>{feat}</span>
                                    <button type="button" onClick={() => handleFeatureRemove(idx)}><X size={14} className="text-red-500 hover:text-red-700" /></button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Flex className="gap-4 pt-4 justify-end">
                        <Button type="button" onClick={() => navigate('/admin/services')} variant="dark_outlined" height="medium">Cancel</Button>
                        <Button type="submit" variant="primary_filled" height="medium" disabled={loading}>
                            {isEditMode ? 'Update Service' : 'Create Service'}
                        </Button>
                    </Flex>
                </form>
            </Div>
        </FlexColumn>
    );
}

export default function AddEditService() {
    return <ProtectedRoute><AddEditServiceContent /></ProtectedRoute>;
}
