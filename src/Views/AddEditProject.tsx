/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, ArrowLeft, Trash2, Image as ImageIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Div } from "../components/general/BaseComponents";
import { Button, FormGroup, FormTitle, Select, TextArea, TextInput } from "../components/UiComponents";
import {
    createProject,
    getProject,
    updateProject,
    deleteProject,
    uploadProjectImage,
    deleteProjectImage,
    Project
} from "../root/services/projectService";
import { useToast } from "../root/providers/ToastProvider";
import AnimatedBackground from "../components/ui/AnimatedBackground";
import GlassCard from "../components/ui/GlassCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const AddEditProject: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditMode = !!id;
    const toast = useToast();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");

    const [formData, setFormData] = useState<Omit<Project, "$id" | "$createdAt" | "$updatedAt">>({
        projectName: "",
        projectDescription: "",
        projectType: "",
        address: "",
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        budget: 0,
        startDate: "",
        estimatedCompletion: "",
        status: "new",
        imageUrl: "",
        imageId: "",
    });

    const projectTypeOptions = [
        { value: "residential-interior", label: "Residential Interior" },
        { value: "residential-exterior", label: "Residential Exterior" },
        { value: "commercial-space", label: "Commercial Space" },
        { value: "office-interior", label: "Office Interior" },
        { value: "landscape-design", label: "Landscape Design" },
        { value: "custom-project", label: "Custom Project" },
    ];

    const statusOptions = [
        { value: "new", label: "New" },
        { value: "in-progress", label: "In Progress" },
        { value: "completed", label: "Completed" },
        { value: "on-hold", label: "On Hold" },
    ];

    useEffect(() => {
        const fetchProject = async () => {
            if (isEditMode && id) {
                setIsLoading(true);
                try {
                    const project = await getProject(id);
                    setFormData({
                        projectName: project.projectName,
                        projectDescription: project.projectDescription,
                        projectType: project.projectType,
                        address: project.address,
                        clientName: project.clientName,
                        clientEmail: project.clientEmail,
                        clientPhone: project.clientPhone,
                        budget: project.budget,
                        startDate: project.startDate,
                        estimatedCompletion: project.estimatedCompletion,
                        status: project.status,
                        imageUrl: project.imageUrl || "",
                        imageId: project.imageId || "",
                    });
                    if (project.imageUrl) {
                        setImagePreview(project.imageUrl);
                    }
                } catch (error) {
                    console.error("Error fetching project:", error);
                    toast.error("Failed to load project data");
                    setTimeout(() => navigate("/projects"), 2000);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchProject();
    }, [id, isEditMode, navigate, toast]);

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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let imageData = { imageUrl: formData.imageUrl, imageId: formData.imageId };

            // Upload new image if selected
            if (imageFile) {
                // Delete old image if exists
                if (formData.imageId) {
                    try {
                        await deleteProjectImage(formData.imageId);
                    } catch (error) {
                        console.warn("Failed to delete old image:", error);
                    }
                }

                // Upload new image
                imageData = await uploadProjectImage(imageFile);
            }

            const projectData = {
                ...formData,
                imageUrl: imageData.imageUrl,
                imageId: imageData.imageId,
            };

            if (isEditMode && id) {
                await updateProject(id, projectData);
                toast.success("Project updated successfully!");
            } else {
                await createProject(projectData);
                toast.success("Project created successfully!");
            }

            navigate("/projects");
        } catch (error: any) {
            console.error("Error saving project:", error);
            toast.error("Failed to save project: " + (error.message || "Unknown error"));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!isEditMode || !id || !window.confirm("Are you sure you want to delete this project?")) {
            return;
        }

        try {
            // Delete image if exists
            if (formData.imageId) {
                try {
                    await deleteProjectImage(formData.imageId);
                } catch (error) {
                    console.warn("Failed to delete project image:", error);
                }
            }

            await deleteProject(id);
            toast.success("Project deleted successfully!");
            navigate("/projects");
        } catch (error: any) {
            console.error("Error deleting project:", error);
            toast.error("Failed to delete project: " + (error.message || "Unknown error"));
        }
    };

    if (isLoading) {
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

            <Div className="container mx-auto px-4 py-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Button
                        variant="outline"
                        onClick={() => navigate("/projects")}
                        className="text-secondary-600 hover:text-secondary-800 mb-6"
                    >
                        <ArrowLeft size={16} className="mr-2" /> Back to Projects
                    </Button>
                </motion.div>
            </Div>

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
                                        id="projectName"
                                        label="Project Name"
                                        placeholder="Enter project name"
                                        value={formData.projectName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <Select
                                        id="projectType"
                                        label="Project Type"
                                        options={projectTypeOptions}
                                        value={formData.projectType}
                                        onChange={(e) => handleSelectChange("projectType", e.target.value)}
                                        required
                                    />
                                </FormGroup>

                                <Div className="mt-6">
                                    <TextArea
                                        id="projectDescription"
                                        label="Project Description"
                                        placeholder="Describe your project in detail..."
                                        rows={4}
                                        value={formData.projectDescription}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Div>

                                <FormGroup className="mt-6">
                                    <TextInput
                                        id="address"
                                        label="Project Location/Address"
                                        placeholder="Enter full address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <TextInput
                                        id="budget"
                                        label="Budget (USD)"
                                        placeholder="Estimated budget"
                                        type="number"
                                        value={formData.budget.toString()}
                                        onChange={handleInputChange}
                                    />
                                </FormGroup>

                                <FormGroup className="mt-6">
                                    <TextInput
                                        id="startDate"
                                        label="Start Date"
                                        type="date"
                                        value={formData.startDate}
                                        onChange={handleInputChange}
                                    />
                                    <TextInput
                                        id="estimatedCompletion"
                                        label="Estimated Completion Date"
                                        type="date"
                                        value={formData.estimatedCompletion}
                                        onChange={handleInputChange}
                                    />
                                </FormGroup>

                                {isEditMode && (
                                    <FormGroup className="mt-6">
                                        <Select
                                            id="status"
                                            label="Project Status"
                                            options={statusOptions}
                                            value={formData.status}
                                            onChange={(e) => handleSelectChange("status", e.target.value)}
                                        />
                                    </FormGroup>
                                )}
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
                                        id="clientName"
                                        label="Client Name"
                                        placeholder="Client's full name"
                                        value={formData.clientName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <TextInput
                                        id="clientEmail"
                                        type="email"
                                        label="Client Email"
                                        placeholder="client@example.com"
                                        value={formData.clientEmail}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </FormGroup>

                                <FormGroup className="mt-6">
                                    <TextInput
                                        id="clientPhone"
                                        label="Client Phone"
                                        placeholder="+1 234 567 8900"
                                        value={formData.clientPhone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </FormGroup>
                            </motion.div>

                            {/* Project Image */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                className="mb-8"
                            >
                                <h3 className="text-18 font-semibold text-secondary-700 mb-4 pb-2 border-b border-neutral-200">
                                    Project Image
                                </h3>

                                <Div className="space-y-4">
                                    <Div className="flex items-center justify-center w-full">
                                        <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-neutral-300 border-dashed rounded-lg cursor-pointer bg-neutral-50 hover:bg-neutral-100 transition-colors">
                                            {imagePreview ? (
                                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                                            ) : (
                                                <Div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <ImageIcon size={48} className="text-neutral-400 mb-4" />
                                                    <p className="mb-2 text-sm text-neutral-500">
                                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                                    </p>
                                                    <p className="text-xs text-neutral-500">PNG, JPG or JPEG (MAX. 10MB)</p>
                                                </Div>
                                            )}
                                            <input
                                                id="image-upload"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </label>
                                    </Div>

                                    {imagePreview && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => {
                                                setImageFile(null);
                                                setImagePreview("");
                                                setFormData(prev => ({ ...prev, imageUrl: "", imageId: "" }));
                                            }}
                                            className="text-error-600 border-error-300 hover:bg-error-50"
                                        >
                                            Remove Image
                                        </Button>
                                    )}
                                </Div>
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
                                    >
                                        <Trash2 size={16} className="mr-2" /> Delete Project
                                    </Button>
                                )}

                                <Button
                                    type="submit"
                                    variant="primary"
                                    disabled={isSubmitting}
                                    className="ml-auto group"
                                >
                                    {isSubmitting ? (
                                        <Div className="flex items-center">
                                            <LoadingSpinner size="sm" color="text-white" />
                                            <span className="ml-2">Saving...</span>
                                        </Div>
                                    ) : (
                                        <>
                                            {isEditMode ? "Update" : "Save"} Project
                                            <Save size={16} className="ml-2 group-hover:scale-110 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </motion.div>
                        </form>
                    </GlassCard>
                </motion.div>
            </Div>
        </Div>
    );
};

export default AddEditProject;
