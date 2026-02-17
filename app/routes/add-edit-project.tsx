import { ProtectedRoute } from '~/components/ProtectedRoute';
import { useSearchParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { useAuth } from '~/contexts/AuthContext';
import { Div, Flex } from '~/components/general/BaseComponents';
import TextInput from '~/components/general/TextInput';
import Button from '~/components/buttons/Button';
import { X, Upload } from 'lucide-react';

import ProjectQuery from '~/apiService/project/projectQuery';
import TitleCard from '~/components/cards/TitleCard';
import SelectInput from '~/components/general/Select';

function AddEditProjectContent() {
    const { profile } = useAuth();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const projectId = searchParams.get('id');
    const isEditMode = !!projectId;
    const [loading, setLoading] = useState(false);

    const { data: projectData } = ProjectQuery.useQueryGetProject(projectId || undefined);
    const createMutation = ProjectQuery.useMutationCreateProject();
    const updateMutation = ProjectQuery.useMutationUpdateProject();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        status: 'active',
        location: '',
        client: '',
        year: new Date().getFullYear().toString(),
        tags: '',
        is_featured: false,
        images: [] as string[],
        coverIndex: null as number | null,
        is_public: false
    });

    useEffect(() => {
        if (isEditMode && projectData) {
            const images = projectData.cover_image
                ? [projectData.cover_image, ...(projectData.gallery || [])]
                : projectData.gallery || [];

            setFormData({
                title: projectData.title || '',
                description: projectData.description || '',
                category: projectData.category || '',
                status: projectData.status || 'active',
                location: projectData.location || '',
                client: projectData.client || '',
                year: projectData.year || '',
                tags: projectData.tags ? projectData.tags.join(', ') : '',
                is_featured: projectData.is_featured || false,
                is_public: projectData.is_public || false,
                images,
                coverIndex: projectData.cover_image ? 0 : null
            });
        }
    }, [isEditMode, projectData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setLoading(true);
            const { api } = await import('~/lib/api');

            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;

            const body = new FormData();
            body.append('file', file);
            body.append('bucket', 'project-images');
            body.append('path', fileName);

            const token = api.getToken();

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/storage/upload`,
                {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` },
                    body
                }
            );

            if (!response.ok) throw new Error('Upload failed');

            const data = await response.json();
            const publicUrl = data.publicUrl;

            setFormData(prev => ({
                ...prev,
                images: [...prev.images, publicUrl],
                coverIndex: prev.coverIndex === null ? 0 : prev.coverIndex
            }));
        } catch (err) {
            alert('Failed to upload image');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const cover_image =
            formData.coverIndex !== null
                ? formData.images[formData.coverIndex]
                : '';

        const gallery =
            formData.coverIndex !== null
                ? formData.images.filter((_, i) => i !== formData.coverIndex)
                : formData.images;

        const payload = {
            title: formData.title,
            description: formData.description,
            category: formData.category,
            status: formData.status,
            cover_image,
            location: formData.location,
            client: formData.client,
            year: formData.year,
            tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
            is_featured: formData.is_featured,
            gallery
        };

        const options = {
            onSuccess: () => {
                alert(isEditMode ? 'Project updated successfully!' : 'Project created successfully!');
                navigate('/admin/projects');
            },
            onError: (error: any) => {
                alert('Failed to save project: ' + error.message);
            }
        };

        if (isEditMode && projectId) {
            updateMutation.mutate({ ...payload, id: projectId }, options);
        } else {
            createMutation.mutate(payload, options);
        }
    };

    return (
        <Div className="w-full rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
                <TitleCard title={isEditMode ? 'Edit Project' : 'Add New Project'} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextInput label="Project Title" name="title" value={formData.title} onChange={handleChange} required />
                    <SelectInput
                        label="Category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        options={[
                            { label: 'Commercial', value: 'commercial' },
                            { label: 'Residential', value: 'residential' },
                        ]}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-base/20 border-secondary-200"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <TextInput label="Client" name="client" value={formData.client} onChange={handleChange} />
                    <TextInput label="Location" name="location" value={formData.location} onChange={handleChange} />
                    <TextInput label="Year" name="year" value={formData.year} onChange={handleChange} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SelectInput
                        label="Status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        options={[
                            { label: 'Active', value: 'active' },
                            { label: 'Completed', value: 'completed' },
                            { label: 'Archived', value: 'archived' }
                        ]}
                    />
                    <TextInput label="Tags (comma-separated)" name="tags" value={formData.tags} onChange={handleChange} />
                </div>

                <Flex className='gap-8'>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange} />
                        <label className="text-sm font-medium text-secondary-700">
                            Feature this project on homepage
                        </label>
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange} />
                        <label className="text-sm font-medium text-secondary-700">
                            Feature this project in public projects.
                        </label>
                    </div>
                </Flex>


                <div className="border-t pt-4">
                    <Flex className="justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-secondary-700">
                            Project Images
                        </label>

                        <div className="relative overflow-hidden inline-[button] bg-white border border-gray-300 rounded-lg px-3 py-1 hover:bg-gray-50 cursor-pointer text-xs font-medium text-gray-700">
                            <Upload size={12} className="inline mr-1" /> Upload
                            <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} />
                        </div>
                    </Flex>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                        {formData.images.map((url, idx) => (
                            <div key={idx} className="relative group rounded-lg overflow-hidden border bg-gray-50 h-64">
                                <img src={url} className="h-full w-full object-cover" />

                                <div className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-xs px-2 py-1 flex items-center justify-between">
                                    <label className="flex items-center gap-1 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.coverIndex === idx}
                                            onChange={() => setFormData(prev => ({ ...prev, coverIndex: idx }))}
                                        />
                                        Cover
                                    </label>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFormData(prev => ({
                                                ...prev,
                                                images: prev.images.filter((_, i) => i !== idx),
                                                coverIndex: prev.coverIndex === idx ? null : prev.coverIndex
                                            }))
                                        }
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Flex className="gap-4 pt-4 justify-end">
                    <Button type="button" onClick={() => navigate('/admin/projects')} variant="dark_outlined" height="medium">
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary_filled" height="medium" disabled={loading}>
                        {isEditMode ? 'Update Project' : 'Create Project'}
                    </Button>
                </Flex>
            </form>
        </Div>
    );
}

export default function AddEditProject() {
    return (
        <ProtectedRoute>
            <AddEditProjectContent />
        </ProtectedRoute>
    );
}
