/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Div } from "../components/general/BaseComponents";
import { Button, FormGroup, FormTitle, Select, TextArea, TextInput } from "../components/UiComponents";
import { useProjects } from "../hooks/useProjects";
import { useToast } from "../root/providers/ToastProvider";
import AnimatedBackground from "../components/ui/AnimatedBackground";
import GlassCard from "../components/ui/GlassCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const AddEditProject: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditMode = !!id;
    const toast = useToast();

    const { useGetDocument, useCreateDocument, useUpdateDocument, useDeleteDocument } = useProjects();
    const { data: project, isLoading: loadingProject } = useGetDocument(id || "");
    const createProject = useCreateDocument();
    const updateProject = useUpdateDocument();
    const deleteProject = useDeleteDocument();

    const [formData, setFormData] = useState({
        title: "",
        type: "",
        description: "",
        location: "",
        client_name: "",
        client_email: "",
        client_phone: "",
        budget: 0,
        start_date: "",
        estimated_completion_date: "",
        care_of: "",
        images: [] as string[],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    });

    const projectTypeOptions = [
        { value: "Interior", label: "Interior Design" },
        { value: "Exterior", label: "Exterior Design" },
        { value: "Residential", label: "Residential" },
        { value: "Commercial", label: "Commercial" },
        { value: "Landscape", label: "Landscape Design" },
    ];

    useEffect(() => {
        if (isEditMode && project) {
            setFormData({
                title: project.title || "",
                type: project.type || "",
                description: project.description || "",
                location: project.location || "",
                client_name: project.client_name || "",
                client_email: project.client_email || "",
                client_phone: project.client_phone || "",
                budget: project.budget || 0,
                start_date: project.start_date,
                estimated_completion_date: project.estimated_completion_date,
                care_of: project.care_of || "",
                created_at: project.created_at || new Date().toISOString(),
                updated_at: project.updated_at || new Date().toISOString(),
                images: project.images || [],
            });
        }
    }, [isEditMode, project]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: id === "budget" ? Number(value) : value,
        }));
    };

    const handleSelectChange = (id: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const projectData = {
                ...formData,
                start_date: formData.start_date ? new Date(formData.start_date).toISOString() : "",
                estimated_completion_date: formData.estimated_completion_date ? new Date(formData.estimated_completion_date).toISOString() : "",
            };

            if (isEditMode && id) {
                await updateProject.mutateAsync({ documentId: id, data: projectData });
                toast.success("Project updated successfully!");
            } else {
                await createProject.mutateAsync(projectData);
                toast.success("Project created successfully!");
            }

            navigate("/projects");
        } catch (error: any) {
            console.error("Error saving project:", error);
            toast.error("Failed to save project: " + (error.message || "Unknown error"));
        }
    };

    const handleDelete = async () => {
        if (!isEditMode || !id || !window.confirm("Are you sure you want to delete this project?")) {
            return;
        }

        try {
            await deleteProject.mutateAsync(id);
            toast.success("Project deleted successfully!");
            navigate("/projects");
        } catch (error: any) {
            console.error("Error deleting project:", error);
            toast.error("Failed to delete project: " + (error.message || "Unknown error"));
        }
    };

    if (loadingProject) {
        return (
            <Div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </Div>
        );
    }

    return (
        <Div className="mx-auto relative">
            <AnimatedBackground />

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden rounded-2xl mb-8"
            >
                <Div className="absolute inset-0 bg-gradient-to-r from-secondary-500/90 to-primary-base/80 z-10" />
                <Div className="absolute inset-0">
                    <img
                        src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
                        alt="Project Management"
                        className="w-full h-full object-cover"
                    />
                </Div>
                <Div className="container mx-auto px-6 py-16 relative z-20">
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h1 className="text-32 md:text-48 font-bold text-white leading-tight mb-4 font-display">
                            {isEditMode ? "Edit" : "Add New"} <span className="text-primary-200">Project</span>
                        </h1>
                        <p className="text-16 md:text-18 text-neutral-100">
                            {isEditMode
                                ? "Update the details of your existing project"
                                : "Create a new project with all the necessary details"}
                        </p>
                    </motion.div>
                </Div>
            </motion.div>

            <Div className="py-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <GlassCard className="p-8">
                        <form onSubmit={handleSubmit}>
                            <FormTitle
                                title={isEditMode ? "Edit" : "New"}
                                highlight="Project"
                                description={isEditMode
                                    ? "Update the details of your project"
                                    : "Fill out the form to create a new project"}
                            />

                            {/* Project Information */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="mb-8"
                            >
                                <h3 className="text-18 font-semibold text-secondary-700 mb-4 pb-2 border-b border-neutral-200">
                                    Project Information
                                </h3>

                                <FormGroup>
                                    <TextInput
                                        id="title"
                                        label="Project Title"
                                        placeholder="Enter project title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <Select
                                        id="type"
                                        label="Project Type"
                                        options={projectTypeOptions}
                                        value={formData.type}
                                        onChange={(e) => handleSelectChange("type", e.target.value)}
                                        required
                                    />
                                </FormGroup>

                                <Div className="mt-6">
                                    <TextArea
                                        id="description"
                                        label="Project Description"
                                        placeholder="Describe your project in detail..."
                                        rows={4}
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Div>

                                <FormGroup className="mt-6">
                                    <TextInput
                                        id="location"
                                        label="Project Location"
                                        placeholder="Enter location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <TextInput
                                        id="budget"
                                        label="Budget (₹)"
                                        placeholder="Estimated budget"
                                        type="number"
                                        value={formData.budget.toString()}
                                        onChange={handleInputChange}
                                    />
                                </FormGroup>

                                <FormGroup className="mt-6">
                                    <TextInput
                                        id="start_date"
                                        label="Start Date"
                                        type="date"
                                        value={formData.start_date}
                                        onChange={handleInputChange}
                                    />
                                    <TextInput
                                        id="estimated_completion_date"
                                        label="Estimated Completion Date"
                                        type="date"
                                        value={formData.estimated_completion_date}
                                        onChange={handleInputChange}
                                    />
                                </FormGroup>
                            </motion.div>

                            {/* Client Information */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="mb-8"
                            >
                                <h3 className="text-18 font-semibold text-secondary-700 mb-4 pb-2 border-b border-neutral-200">
                                    Client Information
                                </h3>

                                <FormGroup>
                                    <TextInput
                                        id="client_name"
                                        label="Client Name"
                                        placeholder="Client's full name"
                                        value={formData.client_name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <TextInput
                                        id="client_email"
                                        type="email"
                                        label="Client Email"
                                        placeholder="client@example.com"
                                        value={formData.client_email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </FormGroup>

                                <FormGroup className="mt-6">
                                    <TextInput
                                        id="client_phone"
                                        label="Client Phone"
                                        placeholder="+91 123 456 7890"
                                        value={formData.client_phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <TextInput
                                        id="care_of"
                                        label="Care Of"
                                        placeholder="Architect/Designer name"
                                        value={formData.care_of}
                                        onChange={handleInputChange}
                                    />
                                </FormGroup>
                            </motion.div>

                            {/* Action Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className="flex justify-between items-center"
                            >
                                {isEditMode && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleDelete}
                                        className="text-error-600 border-error-300 hover:bg-error-50"
                                        disabled={deleteProject.isPending}
                                        label="Delete Project"
                                        icon={<Trash2 size={16} className="mr-2" />}
                                    />

                                )}
                                <Button
                                    type="submit"
                                    variant="primary"
                                    disabled={createProject.isPending || updateProject.isPending}
                                    className="ml-auto group"
                                    label={isEditMode ? "Update Project" : "Save Project"}
                                    icon={<LoadingSpinner size="sm" color="text-white" />}
                                    isLoading={createProject.isPending || updateProject.isPending}
                                />
                            </motion.div>
                        </form>
                    </GlassCard>
                </motion.div>
            </Div>
        </Div>
    );
};

export default AddEditProject;
