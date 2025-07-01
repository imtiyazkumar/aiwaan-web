import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Calendar, MapPin, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Div, Flex } from "../components/general/BaseComponents";
import { Button, Select, TextInput } from "../components/UiComponents";
import { useProjects } from "../hooks/useProjects";
import { useToast } from "../root/providers/ToastProvider";
import HeroSection from "../components/sections/HeroSection";
import CTASection from "../components/sections/CTASection";
import GlassCard from "../components/ui/GlassCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import GradientText from "../components/ui/GradientText";

const Projects: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const toast = useToast();

    const { useGetDocuments, useDeleteDocument } = useProjects();
    const { data: projects = [], isLoading, error } = useGetDocuments();
    const deleteProject = useDeleteDocument();

    // Filter options
    const projectTypeOptions = [
        { value: "", label: "All Types" },
        { value: "Interior", label: "Interior Design" },
        { value: "Exterior", label: "Exterior Design" },
        { value: "Residential", label: "Residential" },
        { value: "Commercial", label: "Commercial" },
        { value: "Landscape", label: "Landscape Design" },
    ];

    const statusOptions = [
        { value: "", label: "All Status" },
        { value: "new", label: "New" },
        { value: "in-progress", label: "In Progress" },
        { value: "completed", label: "Completed" },
        { value: "on-hold", label: "On Hold" },
    ];

    // Filter projects
    const filteredProjects = projects.filter(project => {
        const matchesSearch = !searchTerm ||
            project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.location.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = !filterType || project.type === filterType;
        const matchesStatus = !filterStatus || project.status === filterStatus;

        return matchesSearch && matchesType && matchesStatus;
    });

    const getStatusColor = (status?: string) => {
        switch (status) {
            case "completed": return "bg-success-100 text-success-700";
            case "in-progress": return "bg-warning-100 text-warning-700";
            case "on-hold": return "bg-error-100 text-error-700";
            default: return "bg-primary-100 text-primary-700";
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "Not set";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };

    const handleDeleteProject = async (projectId: string, projectTitle: string) => {
        if (!window.confirm(`Are you sure you want to delete "${projectTitle}"?`)) {
            return;
        }

        try {
            await deleteProject.mutateAsync(projectId);
            toast.success("Project deleted successfully!");
        } catch (error) {
            console.error("Error deleting project:", error);
            toast.error("Failed to delete project");
        }
    };

    if (isLoading) {
        return (
            <Div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </Div>
        );
    }

    if (error) {
        return (
            <Div className="min-h-screen flex items-center justify-center">
                <Div className="text-center">
                    <h2 className="text-24 font-bold text-error-600 mb-4">Error Loading Projects</h2>
                    <p className="text-secondary-600">Please try again later.</p>
                </Div>
            </Div>
        );
    }

    return (
        <Div className="max-w-[1200px] mx-auto overflow-hidden">
            {/* Hero Section */}
            <HeroSection
                title="Project"
                subtitle="Portfolio"
                description="Explore our collection of architectural visualization projects that showcase the beauty and innovation of Kashmiri design combined with modern techniques."
                backgroundImage="https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1200"
                primaryButtonText="Add New Project"
                primaryButtonLink="/add-edit-project"
                secondaryButtonText="Get Quote"
                secondaryButtonLink="/contact"
                height="md"
            />

            {/* Filters and Search */}
            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="py-8 px-4"
            >
                <GlassCard className="p-6 mb-8">
                    <Flex className="flex-col md:flex-row gap-4 items-start md:items-end">
                        <Div className="flex-1">
                            <TextInput
                                id="search"
                                label="Search Projects"
                                placeholder="Search by project name, client, or location..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                icon={<Search size={20} className="text-neutral-400" />}
                            />
                        </Div>
                        <Div className="w-full md:w-48">
                            <Select
                                id="filterType"
                                label="Project Type"
                                options={projectTypeOptions}
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                            />
                        </Div>
                        <Div className="w-full md:w-48">
                            <Select
                                id="filterStatus"
                                label="Status"
                                options={statusOptions}
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            />
                        </Div>
                        <Link to="/add-edit-project">
                            <Button
                                type="submit"
                                variant="primary"
                                className="ml-auto group"
                                label="Add Project"
                                icon={<Plus size={16} className="mr-2" />}
                            />

                        </Link>
                    </Flex>
                </GlassCard>
            </motion.div>

            {/* Projects Grid */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="py-8 px-4"
            >
                <Div className="flex justify-between items-center mb-8">
                    <Div>
                        <h2 className="text-24 md:text-32 font-bold text-secondary-800 font-display">
                            <GradientText>Projects</GradientText> Collection
                        </h2>
                        <p className="text-secondary-600 mt-2">
                            {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} found
                        </p>
                    </Div>
                </Div>

                {filteredProjects.length === 0 ? (
                    <Div className="text-center py-16">
                        <Div className="text-64 mb-4">🏗️</Div>
                        <h3 className="text-24 font-bold text-secondary-700 mb-2">No Projects Found</h3>
                        <p className="text-secondary-600 mb-6">
                            {projects.length === 0
                                ? "Start by adding your first project to showcase your work."
                                : "Try adjusting your search criteria or filters."
                            }
                        </p>
                        <Link to="/add-edit-project">
                            <Button
                                type="submit"
                                variant="primary"
                                className="ml-auto group"
                                label="Add Your First Project"
                                icon={<Plus size={16} className="mr-2" />}
                            />
                        </Link>
                    </Div>
                ) : (
                    <Div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.$id}
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <GlassCard className="overflow-hidden h-full group">
                                    <Div className="relative overflow-hidden">
                                        {project.images && project.images.length > 0 ? (
                                            <img
                                                src={project.images[0]}
                                                alt={project.title}
                                                className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <Div className="w-full h-56 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                                                <Div className="text-center">
                                                    <Div className="text-48 mb-2">🏗️</Div>
                                                    <p className="text-primary-600 font-medium">No Image</p>
                                                </Div>
                                            </Div>
                                        )}
                                        <Div className="absolute inset-0 bg-gradient-to-t from-secondary-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Status Badge */}
                                        <Div className="absolute top-4 left-4">
                                            <span className={`text-12 px-3 py-1 rounded-full font-medium ${getStatusColor(project.status)}`}>
                                                {project.status ? project.status.charAt(0).toUpperCase() + project.status.slice(1).replace("-", " ") : "New"}
                                            </span>
                                        </Div>

                                        {/* Type Badge */}
                                        <Div className="absolute top-4 right-4 bg-primary-base/90 backdrop-blur-sm text-white text-12 px-3 py-1 rounded-full font-medium">
                                            {project.type}
                                        </Div>

                                        {/* Action Buttons */}
                                        <Div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                                            <Link
                                                to={`/add-edit-project/${project.$id}`}
                                                className="bg-white/90 backdrop-blur-sm text-primary-base p-2 rounded-full hover:bg-white transition-colors"
                                            >
                                                <Edit size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteProject(project.$id!, project.title)}
                                                className="bg-white/90 backdrop-blur-sm text-error-600 p-2 rounded-full hover:bg-white transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </Div>
                                    </Div>

                                    <Div className="p-6">
                                        <h3 className="text-18 font-bold text-secondary-800 group-hover:text-primary-base transition-colors mb-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-14 text-secondary-600 mb-3 line-clamp-2">
                                            {project.description}
                                        </p>

                                        <Div className="space-y-2 mb-4">
                                            <Div className="flex items-center text-12 text-secondary-500">
                                                <MapPin size={14} className="mr-2 text-primary-base" />
                                                {project.location}
                                            </Div>
                                            <Div className="flex items-center text-12 text-secondary-500">
                                                <Calendar size={14} className="mr-2 text-primary-base" />
                                                Start: {formatDate(project.start_date)}
                                            </Div>
                                            {project.estimated_completion_date && (
                                                <Div className="flex items-center text-12 text-secondary-500">
                                                    <Calendar size={14} className="mr-2 text-primary-base" />
                                                    Est. Completion: {formatDate(project.estimated_completion_date)}
                                                </Div>
                                            )}
                                        </Div>

                                        <Div className="flex justify-between items-center pt-4 border-t border-neutral-200">
                                            <span className="text-12 text-secondary-500">Client: {project.client_name}</span>
                                            {project.budget > 0 && (
                                                <span className="text-12 font-medium text-primary-base">₹{project.budget.toLocaleString()}</span>
                                            )}
                                        </Div>
                                    </Div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </Div>
                )}
            </motion.div>

            {/* CTA Section */}
            <CTASection
                title="Have a Project in Mind?"
                description="Ready to bring your architectural vision to life? Contact us today to discuss your project requirements and get a personalized quote for our services."
                primaryButtonText="Start New Project"
                primaryButtonLink="/contact"
                backgroundGradient="primary"
            />
        </Div>
    );
};

export default Projects;
