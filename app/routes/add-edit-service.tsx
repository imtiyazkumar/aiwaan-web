
import { ProtectedRoute } from '~/components/ProtectedRoute';
import { useSearchParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Div, Flex, FlexColumn } from '~/components/general/BaseComponents';
import TextInput from '~/components/general/TextInput';
import Button from '~/components/buttons/Button';
import { wrapperBaseClass } from '~/utils/constants';
import { X, Upload } from 'lucide-react';

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
            formData.append('bucket', 'service-images'); // Ensure this bucket exists
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
        <Flex className="items-center justify-center w-full">
            <Div className={`${wrapperBaseClass} max-w-4xl`}>
                <h1 className="text-2xl font-bold mb-6 text-center">{isEditMode ? 'Edit Service' : 'Add New Service'}</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <TextInput label="Title" name="title" value={formData.title} onChange={handleChange} required />
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className="w-full border rounded-xl px-4 py-2" />
                    </div>
                    <TextInput label="Tag" name="tag" value={formData.tag} onChange={handleChange} />

                    {/* Image Upload */}
                    <div className="border-t pt-4">
                        <label className="block text-sm font-medium mb-2">Service Image</label>
                        <Flex className="gap-4 items-center">
                            <TextInput className="w-full" label="Image URL" name="image_url" value={formData.image_url} onChange={handleChange} />
                            <div className="relative overflow-hidden inline-[button] bg-white border rounded-lg px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm">
                                <Upload size={16} className="inline mr-2" /> Upload
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} accept="image/*" />
                            </div>
                        </Flex>
                        {formData.image_url && <img src={formData.image_url} alt="Preview" className="h-32 mt-2 rounded border" />}
                    </div>

                    {/* Features */}
                    <div className="border-t pt-4">
                        <Flex className="justify-between items-center mb-2">
                            <label className="block text-sm font-medium">Features</label>
                            <button type="button" onClick={handleFeatureAdd} className="text-xs bg-gray-100 px-2 py-1 rounded">Add Feature</button>
                        </Flex>
                        <ul className="list-disc pl-5">
                            {formData.features.map((feat, idx) => (
                                <li key={idx} className="flex items-center justify-between text-sm">
                                    <span>{feat}</span>
                                    <button type="button" onClick={() => handleFeatureRemove(idx)}><X size={12} className="text-red-500" /></button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Flex className="gap-4 pt-4">
                        <Button type="submit" variant="primary_filled" height="medium" disabled={loading}>
                            {isEditMode ? 'Update' : 'Create'}
                        </Button>
                        <Button type="button" onClick={() => navigate('/services')} variant="dark_outlined" height="medium">Cancel</Button>
                    </Flex>
                </form>
            </Div>
        </Flex>
    );
}

export default function AddEditService() {
    return <ProtectedRoute><AddEditServiceContent /></ProtectedRoute>;
}
