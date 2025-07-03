/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from "react";
import { Plus, Search, Calendar, MapPin, Edit, Trash2, Eye, Filter } from "lucide-react";
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

const AdminProjects: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [showFilters, setShowFilters] = useState(false);
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

    // Memoized filtered projects for better performance
    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            const matchesSearch = !searchTerm ||
                project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (project.client_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.location.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesType = !filterType || project.type === filterType;
            const matchesStatus = !filterStatus || project.status === filterStatus;

            return matchesSearch && matchesType && matchesStatus;
        });
    }, [projects, searchTerm, filterType, filterStatus]);

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
            <Div className="min-h-screen flex items-center justify-center animate-fade-in">
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
                title="Admin"
                subtitle="Projects"
                description="Manage your architectural visualization projects with our comprehensive project management system. Add, edit, and track all your projects in one place."
                backgroundImage="https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1200"
                primaryButtonText="Add New Project"
                primaryButtonLink="/add-edit-project"
                secondaryButtonText="View Portfolio"
                secondaryButtonLink="/projects"
                height="md"
            />

            {/* Filters and Search */}
            <Div className="py-8 px-4 animate-fade-in">
                <GlassCard className="p-6 mb-8 transform transition-all duration-500 hover:scale-[1.01]">
                    <Flex className="flex-col gap-4">
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
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowFilters(!showFilters)}
                                label="Filters"
                                icon={<Filter size={16} className="mr-2" />}
                                className="w-full md:w-auto transition-all duration-300 hover:scale-105"
                            />
                            <Link to="/add-edit-project">
                                <Button
                                    type="button"
                                    variant="primary"
                                    label="Add Project"
                                    icon={<Plus size={16} className="mr-2" />}
                                    className="w-full md:w-auto transition-all duration-300 hover:scale-105"
                                />
                            </Link>
                        </Flex>

                        {showFilters && (
                            <Div className="overflow-hidden animate-slide-down">
                                <Flex className="flex-col md:flex-row gap-4 pt-4 border-t border-neutral-200">
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
                                </Flex>
                            </Div>
                        )}
                    </Flex>
                </GlassCard>
            </Div>

            {/* Projects Grid */}
            <Div className="py-8 px-4">
                <Div className="flex justify-between items-center mb-8 animate-slide-up">
                    <Div>
                        <h2 className="text-24 md:text-32 font-bold text-secondary-800 font-display">
                            <GradientText>Your</GradientText> Projects
                        </h2>
                        <p className="text-secondary-600 mt-2">
                            {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} found
                        </p>
                    </Div>
                </Div>

                {filteredProjects.length === 0 ? (
                    <Div className="text-center py-16 animate-fade-in">
                        <Div className="text-64 mb-4 animate-bounce-gentle">🏗️</Div>
                        <h3 className="text-24 font-bold text-secondary-700 mb-2">
                            {projects.length === 0 ? "No Projects Found" : "No Matching Projects"}
                        </h3>
                        <p className="text-secondary-600 mb-6">
                            {projects.length === 0
                                ? "Start by adding your first project to showcase your work."
                                : "Try adjusting your search criteria or filters."
                            }
                        </p>
                        {projects.length === 0 && (
                            <Link to="/add-edit-project">
                                <Button
                                    type="button"
                                    variant="primary"
                                    label="Add Your First Project"
                                    icon={<Plus size={16} className="mr-2" />}
                                    className="transition-all duration-300 hover:scale-105"
                                />
                            </Link>
                        )}
                    </Div>
                ) : (
                    <Div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <Div
                                key={project.$id}
                                className="group animate-scale-in"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <GlassCard className="overflow-hidden h-full group-hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2">
                                    <Div className="relative overflow-hidden">
                                        {project.images && project.images.length > 0 ? (
                                            <img
                                                src={project.images[0]}
                                                alt={project.title}
                                                className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <Div className="w-full h-56 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                                                <Div className="text-center">
                                                    <Div className="text-48 mb-2 animate-bounce-gentle">🏗️</Div>
                                                    <p className="text-primary-600 font-medium">No Image</p>
                                                </Div>
                                            </Div>
                                        )}
                                        <Div className="absolute inset-0 bg-gradient-to-t from-secondary-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Status Badge */}
                                        <Div className="absolute top-4 left-4 animate-float">
                                            <span className={`text-12 px-3 py-1 rounded-full font-medium ${getStatusColor(project.status)}`}>
                                                {project.status ? project.status.charAt(0).toUpperCase() + project.status.slice(1).replace("-", " ") : "New"}
                                            </span>
                                        </Div>

                                        {/* Type Badge */}
                                        <Div className="absolute top-4 right-4 bg-primary-base/90 backdrop-blur-sm text-white text-12 px-3 py-1 rounded-full font-medium animate-float" style={{ animationDelay: "0.5s" }}>
                                            {project.type}
                                        </Div>

                                        {/* Action Buttons */}
                                        <Div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 flex space-x-2">
                                            <button className="bg-white/90 backdrop-blur-sm text-primary-base p-2 rounded-full hover:bg-white transition-all duration-300 hover:scale-110 shadow-lg">
                                                <Eye size={16} />
                                            </button>
                                            <Link
                                                to={`/add-edit-project/${project.$id}`}
                                                className="bg-white/90 backdrop-blur-sm text-primary-base p-2 rounded-full hover:bg-white transition-all duration-300 hover:scale-110 shadow-lg"
                                            >
                                                <Edit size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteProject(project.$id!, project.title)}
                                                className="bg-white/90 backdrop-blur-sm text-error-600 p-2 rounded-full hover:bg-white transition-all duration-300 hover:scale-110 shadow-lg"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </Div>
                                    </Div>

                                    <Div className="p-6">
                                        <h3 className="text-18 font-bold text-secondary-800 group-hover:text-primary-base transition-colors duration-300 mb-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-14 text-secondary-600 mb-3 line-clamp-2">
                                            {project.description}
                                        </p>

                                        <Div className="space-y-2 mb-4">
                                            <Div className="flex items-center text-12 text-secondary-500 transition-colors duration-300 group-hover:text-secondary-600">
                                                <MapPin size={14} className="mr-2 text-primary-base" />
                                                {project.location}
                                            </Div>
                                            {project.start_date && (
                                                <Div className="flex items-center text-12 text-secondary-500 transition-colors duration-300 group-hover:text-secondary-600">
                                                    <Calendar size={14} className="mr-2 text-primary-base" />
                                                    Start: {formatDate(project.start_date)}
                                                </Div>
                                            )}
                                        </Div>

                                        <Div className="flex justify-between items-center pt-4 border-t border-neutral-200">
                                            <span className="text-12 text-secondary-500 transition-colors duration-300 group-hover:text-secondary-600">
                                                Client: {project.client_name}
                                            </span>
                                            {project.budget && project.budget > 0 && (
                                                <span className="text-12 font-medium text-primary-base">₹{project.budget.toLocaleString()}</span>
                                            )}
                                        </Div>
                                    </Div>
                                </GlassCard>
                            </Div>
                        ))}
                    </Div>
                )}
            </Div>

            {/* CTA Section */}
            <CTASection
                title="Ready to Add Your Next Project?"
                description="Continue building your portfolio by adding new projects and showcasing your architectural expertise."
                primaryButtonText="Add New Project"
                primaryButtonLink="/add-edit-project"
                backgroundGradient="primary"
            />
        </Div>
    );
};

export default AdminProjects;