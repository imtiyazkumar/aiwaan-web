import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Filter, Search, Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Div, Flex } from "../components/general/BaseComponents";
import { Button, Select, TextInput } from "../components/UiComponents";
import { getProjects, Project } from "../root/services/projectService";
import { useToast } from "../root/providers/ToastProvider";
import HeroSection from "../components/sections/HeroSection";
import CTASection from "../components/sections/CTASection";
import GlassCard from "../components/ui/GlassCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import GradientText from "../components/ui/GradientText";

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const toast = useToast();

    // Filter options
    const projectTypeOptions = [
        { value: "", label: "All Types" },
        { value: "residential-interior", label: "Residential Interior" },
        { value: "residential-exterior", label: "Residential Exterior" },
        { value: "commercial-space", label: "Commercial Space" },
        { value: "office-interior", label: "Office Interior" },
        { value: "landscape-design", label: "Landscape Design" },
        { value: "custom-project", label: "Custom Project" },
    ];

    const statusOptions = [
        { value: "", label: "All Status" },
        { value: "new", label: "New" },
        { value: "in-progress", label: "In Progress" },
        { value: "completed", label: "Completed" },
        { value: "on-hold", label: "On Hold" },
    ];

    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
        filterProjects();
    }, [projects, searchTerm, filterType, filterStatus]);

    const fetchProjects = async () => {
        try {
            const projectsData = await getProjects();
            setProjects(projectsData);
        } catch (error) {
            console.error("Error fetching projects:", error);
            toast.error("Failed to load projects");
        } finally {
            setIsLoading(false);
        }
    };

    const filterProjects = () => {
        let filtered = projects;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(project =>
                project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.address.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Type filter
        if (filterType) {
            filtered = filtered.filter(project => project.projectType === filterType);
        }

        // Status filter
        if (filterStatus) {
            filtered = filtered.filter(project => project.status === filterStatus);
        }

        setFilteredProjects(filtered);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-success-100 text-success-700';
            case 'in-progress': return 'bg-warning-100 text-warning-700';
            case 'on-hold': return 'bg-error-100 text-error-700';
            default: return 'bg-primary-100 text-primary-700';
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'Not set';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (isLoading) {
        return (
            <Div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </Div>
        );
    }

    return (
        <Div className="max-w-[1200px] mx-auto overflow-hidden">
            {/* Hero Section */}
            <HeroSection
                title="Our"
                subtitle="Projects"
                description="Explore our portfolio of architectural visualization projects that showcase the beauty and innovation of Kashmiri design combined with modern techniques."
                backgroundImage="https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1200"
                primaryButtonText="Add New Project"
                primaryButtonLink="/add-edit-project"
                secondaryButtonText="Get Quote"
                secondaryButtonLink="/get-quote"
                height="md"
            />

            {/* Filters and Search */}
            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="py-8 px-4"
            >
                <Div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
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
                            <Button variant="primary" className="w-full md:w-auto">
                                <Plus size={16} className="mr-2" />
                                Add Project
                            </Button>
                        </Link>
                    </Flex>
                </Div>
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
                            <GradientText>Projects</GradientText> Portfolio
                        </h2>
                        <p className="text-secondary-600 mt-2">
                            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
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
                            <Button variant="primary">
                                <Plus size={16} className="mr-2" />
                                Add Your First Project
                            </Button>
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
                                <Link to={`/add-edit-project/${project.$id}`} className="group block">
                                    <GlassCard className="overflow-hidden h-full">
                                        <Div className="relative overflow-hidden">
                                            {project.imageUrl ? (
                                                <img
                                                    src={project.imageUrl}
                                                    alt={project.projectName}
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
                                            <Div className="absolute top-4 left-4">
                                                <span className={`text-12 px-3 py-1 rounded-full font-medium ${getStatusColor(project.status)}`}>
                                                    {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                                                </span>
                                            </Div>
                                            <Div className="absolute top-4 right-4 bg-primary-base/90 backdrop-blur-sm text-white text-12 px-3 py-1 rounded-full font-medium">
                                                {project.projectType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                            </Div>
                                            <Div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <ArrowUpRight size={20} className="text-white transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                            </Div>
                                        </Div>
                                        <Div className="p-6">
                                            <h3 className="text-18 font-bold text-secondary-800 group-hover:text-primary-base transition-colors mb-2">
                                                {project.projectName}
                                            </h3>
                                            <p className="text-14 text-secondary-600 mb-3 line-clamp-2">
                                                {project.projectDescription}
                                            </p>
                                            
                                            <Div className="space-y-2 mb-4">
                                                <Div className="flex items-center text-12 text-secondary-500">
                                                    <MapPin size={14} className="mr-2 text-primary-base" />
                                                    {project.address}
                                                </Div>
                                                <Div className="flex items-center text-12 text-secondary-500">
                                                    <Calendar size={14} className="mr-2 text-primary-base" />
                                                    Start: {formatDate(project.startDate)}
                                                </Div>
                                                {project.estimatedCompletion && (
                                                    <Div className="flex items-center text-12 text-secondary-500">
                                                        <Calendar size={14} className="mr-2 text-primary-base" />
                                                        Est. Completion: {formatDate(project.estimatedCompletion)}
                                                    </Div>
                                                )}
                                            </Div>

                                            <Div className="flex justify-between items-center pt-4 border-t border-neutral-200">
                                                <span className="text-12 text-secondary-500">Client: {project.clientName}</span>
                                                {project.budget > 0 && (
                                                    <span className="text-12 font-medium text-primary-base">₹{project.budget.toLocaleString()}</span>
                                                )}
                                            </Div>
                                        </Div>
                                    </GlassCard>
                                </Link>
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
                primaryButtonLink="/get-quote"
                backgroundGradient="primary"
            />
        </Div>
    );
};

export default Projects;