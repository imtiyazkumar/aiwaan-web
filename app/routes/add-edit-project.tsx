

import { ProtectedRoute } from '~/components/ProtectedRoute';
import { useSearchParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Div, Flex, FlexColumn } from '~/components/general/BaseComponents';
import TextInput from '~/components/general/TextInput';
import Button from '~/components/buttons/Button';
import { wrapperBaseClass } from '~/utils/constants';
// import { supabase } from '~/lib/supabase'; // Removed
import { X, Upload } from 'lucide-react';

import ProjectQuery from '~/apiService/project/projectQuery';

function AddEditProjectContent() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const projectId = searchParams.get('id');
    const isEditMode = !!projectId;
    const [loading, setLoading] = useState(false);

    // Query for existing project
    const { data: projectData, isLoading: isProjectLoading } = ProjectQuery.useQueryGetProject(projectId || undefined);

    // Mutations
    const createMutation = ProjectQuery.useMutationCreateProject();
    const updateMutation = ProjectQuery.useMutationUpdateProject();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        status: 'active',
        cover_image: '',
        location: '',
        client: '',
        year: new Date().getFullYear().toString(),
        tags: '',
        is_featured: false,
        gallery: [] as string[]
    });

    useEffect(() => {
        if (isEditMode && projectData) {
            setFormData({
                title: projectData.title || '',
                description: projectData.description || '',
                category: projectData.category || '',
                status: projectData.status || 'active',
                cover_image: projectData.cover_image || '',
                location: projectData.location || '',
                client: projectData.client || '',
                year: projectData.year || '',
                tags: projectData.tags ? projectData.tags.join(', ') : '',
                is_featured: projectData.is_featured || false,
                gallery: projectData.gallery || []
            });
        }
    }, [isEditMode, projectData]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if ((e.target as HTMLInputElement).type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleGalleryAdd = () => {
        const url = prompt("Enter image URL for gallery:");
        if (url) {
            setFormData(prev => ({ ...prev, gallery: [...prev.gallery, url] }));
        }
    };

    const handleGalleryRemove = (index: number) => {
        setFormData(prev => ({
            ...prev,
            gallery: prev.gallery.filter((_, i) => i !== index)
        }));
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'cover_image' | 'gallery') => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setLoading(true);
            const { api } = await import('~/lib/api');

            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            // We need to send FormData for file upload or just use the body if api helper supports text/blob?
            // api.post implementation stringifies body. We need a way to upload File.
            // Let's assume we can fetch directly or modify api.ts. 
            // For now, let's use standard fetch to our server proxy endpoint.
            // The api.ts we created does JSON.stringify by default.
            // We should use raw fetch here for FormData.

            const formData = new FormData();
            formData.append('file', file);
            formData.append('bucket', 'project-images');
            formData.append('path', filePath);

            const token = api.getToken();

            const response = await fetch(`${import.meta.env.VITE_API_URL}/storage/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                const err = await response.json() as any;
                throw new Error(err.message || 'Upload failed');
            }

            const data = await response.json() as any;
            const publicUrl = data.publicUrl;

            if (field === 'cover_image') {
                setFormData(prev => ({ ...prev, cover_image: publicUrl }));
            } else {
                setFormData(prev => ({ ...prev, gallery: [...prev.gallery, publicUrl] }));
            }

        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const projectPayload = {
            title: formData.title,
            description: formData.description,
            category: formData.category,
            status: formData.status,
            cover_image: formData.cover_image,
            location: formData.location,
            client: formData.client,
            year: formData.year,
            tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
            is_featured: formData.is_featured,
            gallery: formData.gallery,
            created_by: null
        };

        const options = {
            onSuccess: () => {
                alert(isEditMode ? 'Project updated successfully!' : 'Project created successfully!');
                navigate('/admin/projects');
            },
            onError: (error: any) => {
                console.error('Error saving project:', error);
                alert('Failed to save project: ' + error.message);
            }
        };

        if (isEditMode && projectId) {
            updateMutation.mutate({ ...projectPayload, id: projectId }, options);
        } else {
            createMutation.mutate(projectPayload, options);
        }
    };

    return (
        <Flex className="items-center justify-center w-full">
            <Div className={`${wrapperBaseClass} max-w-4xl`}>
                <FlexColumn className="text-center gap-2 mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900">
                        {isEditMode ? 'Edit Project' : 'Add New Project'}
                    </h1>
                </FlexColumn>

                <form onSubmit={handleSubmit} className="space-y-6 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextInput
                            label="Project Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                        <TextInput
                            label="Category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Residential, Commercial"
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
                            required
                            rows={4}
                            className="w-full rounded-xl border px-4 py-2.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-primary-base/40 focus:border-primary-base border-secondary-200"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <TextInput
                            label="Client"
                            name="client"
                            value={formData.client}
                            onChange={handleChange}
                        />
                        <TextInput
                            label="Location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                        <TextInput
                            label="Year"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-secondary-700 mb-1">
                                Status
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full rounded-xl border px-4 py-2.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-primary-base/40 focus:border-primary-base border-secondary-200 bg-white"
                            >
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>
                        <TextInput
                            label="Tags (comma-separated)"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="e.g., react, nodejs, design"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="is_featured"
                            name="is_featured"
                            checked={formData.is_featured}
                            onChange={handleChange}
                            className="w-4 h-4 text-primary-base border-gray-300 rounded focus:ring-primary-base"
                        />
                        <label htmlFor="is_featured" className="text-sm font-medium text-secondary-700">
                            Feature this project on homepage
                        </label>
                    </div>

                    <div className="border-t pt-4">
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                            Featured Image
                        </label>
                        <Flex className="gap-4 items-center mb-2">
                            <TextInput
                                className="w-full"
                                label="Cover Image URL"
                                name="cover_image"
                                value={formData.cover_image}
                                onChange={handleChange}
                                placeholder="Image URL"
                            />
                            <div className="relative overflow-hidden inline-[button] bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm font-medium text-gray-700">
                                <Upload size={16} className="inline mr-2" /> Upload
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, 'cover_image')} accept="image/*" />
                            </div>
                        </Flex>
                        {formData.cover_image && (
                            <img src={formData.cover_image} alt="Preview" className="h-32 w-auto object-cover rounded-lg border" />
                        )}
                    </div>

                    <div className="border-t pt-4">
                        <Flex className="justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-secondary-700">
                                Project Gallery
                            </label>
                            <div className="flex gap-2">
                                <button type="button" onClick={handleGalleryAdd} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">Add URL</button>
                                <div className="relative overflow-hidden inline-[button] bg-white border border-gray-300 rounded-lg px-3 py-1 hover:bg-gray-50 cursor-pointer text-xs font-medium text-gray-700">
                                    <Upload size={12} className="inline mr-1" /> Upload
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, 'gallery')} accept="image/*" />
                                </div>
                            </div>
                        </Flex>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                            {formData.gallery.map((url, idx) => (
                                <div key={idx} className="relative group rounded-lg overflow-hidden border bg-gray-50 h-24">
                                    <img src={url} alt={`Gallery ${idx}`} className="h-full w-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => handleGalleryRemove(idx)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Flex className="gap-4 pt-4">
                        <Button
                            type="submit"
                            variant="primary_filled"
                            height="medium"
                            disabled={loading}
                        >
                            {createMutation.isPending || updateMutation.isPending || loading ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Project' : 'Create Project')}
                        </Button>
                        <Button
                            type="button"
                            onClick={() => navigate('/admin/projects')}
                            variant="dark_outlined"
                            height="medium"
                        >
                            Cancel
                        </Button>
                    </Flex>
                </form>
            </Div>
        </Flex>
    );
}

export default function AddEditProject() {
    return (
        <ProtectedRoute>
            <AddEditProjectContent />
        </ProtectedRoute>
    );
}
