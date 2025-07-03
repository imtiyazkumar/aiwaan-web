import React, { useState, useMemo } from "react";
import { Search, Calendar, MapPin, Filter, Eye } from "lucide-react";
import { Div, Flex } from "../components/general/BaseComponents";
import { Button, Select, TextInput } from "../components/UiComponents";
import HeroSection from "../components/sections/HeroSection";
import CTASection from "../components/sections/CTASection";
import GlassCard from "../components/ui/GlassCard";
import GradientText from "../components/ui/GradientText";

const Projects: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    // Showcase projects for marketing (static data)
    const showcaseProjects = [
        {
            id: "showcase-1",
            title: "Modern Kashmir Villa",
            type: "Residential",
            description: "A stunning blend of traditional Kashmiri architecture with modern amenities, featuring intricate woodwork and contemporary design elements.",
            location: "Srinagar, Kashmir",
            image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600",
            status: "completed",
            client: "Private Client",
            year: "2024"
        },
        {
            id: "showcase-2",
            title: "Heritage Hotel Design",
            type: "Commercial",
            description: "Restoration and modernization of a heritage property into a boutique hotel, preserving cultural authenticity while adding luxury amenities.",
            location: "Sopore, Kashmir",
            image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
            status: "completed",
            client: "Heritage Hotels Ltd",
            year: "2023"
        },
        {
            id: "showcase-3",
            title: "Contemporary Office Space",
            type: "Commercial",
            description: "Modern office design incorporating natural light and local materials, creating an inspiring workspace for a tech company.",
            location: "Srinagar, Kashmir",
            image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
            status: "completed",
            client: "Tech Innovations",
            year: "2024"
        },
        {
            id: "showcase-4",
            title: "Luxury Apartment Interior",
            type: "Interior",
            description: "Elegant interior design for a luxury apartment, featuring custom furniture and traditional Kashmiri craftsmanship.",
            location: "Srinagar, Kashmir",
            image: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=600",
            status: "completed",
            client: "Private Residence",
            year: "2023"
        },
        {
            id: "showcase-5",
            title: "Garden Landscape Design",
            type: "Landscape",
            description: "Beautiful garden design incorporating traditional Mughal garden elements with contemporary landscaping techniques.",
            location: "Sopore, Kashmir",
            image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600",
            status: "completed",
            client: "Private Estate",
            year: "2024"
        },
        {
            id: "showcase-6",
            title: "Cultural Center Design",
            type: "Commercial",
            description: "Design for a cultural center celebrating Kashmiri arts and crafts, featuring exhibition spaces and workshop areas.",
            location: "Srinagar, Kashmir",
            image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
            status: "completed",
            client: "Cultural Foundation",
            year: "2023"
        },
        {
            id: "showcase-7",
            title: "Mountain Resort Design",
            type: "Residential",
            description: "Eco-friendly mountain resort design that harmonizes with the natural landscape while providing luxury accommodations.",
            location: "Gulmarg, Kashmir",
            image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600",
            status: "completed",
            client: "Mountain Resorts",
            year: "2024"
        },
        {
            id: "showcase-8",
            title: "Traditional Houseboat Renovation",
            type: "Residential",
            description: "Careful renovation of a traditional Kashmiri houseboat, preserving heritage while adding modern comforts.",
            location: "Dal Lake, Srinagar",
            image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
            status: "completed",
            client: "Heritage Tourism",
            year: "2023"
        },
        {
            id: "showcase-9",
            title: "Artisan Workshop Complex",
            type: "Commercial",
            description: "Design for a complex of workshops dedicated to traditional Kashmiri crafts, promoting local artisans and cultural heritage.",
            location: "Sopore, Kashmir",
            image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
            status: "completed",
            client: "Craft Council",
            year: "2024"
        }
    ];

    // Filter options
    const projectTypeOptions = [
        { value: "", label: "All Types" },
        { value: "Interior", label: "Interior Design" },
        { value: "Exterior", label: "Exterior Design" },
        { value: "Residential", label: "Residential" },
        { value: "Commercial", label: "Commercial" },
        { value: "Landscape", label: "Landscape Design" },
    ];

    // Memoized filtered projects for better performance
    const filteredProjects = useMemo(() => {
        return showcaseProjects.filter(project => {
            const matchesSearch = !searchTerm ||
                project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.location.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesType = !filterType || project.type === filterType;

            return matchesSearch && matchesType;
        });
    }, [showcaseProjects, searchTerm, filterType]);

    return (
        <Div className="max-w-[1200px] mx-auto overflow-hidden">
            {/* Hero Section */}
            <HeroSection
                title="Our"
                subtitle="Portfolio"
                description="Explore our collection of architectural visualization projects that showcase the beauty and innovation of Kashmiri design combined with modern techniques."
                backgroundImage="https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1200"
                primaryButtonText="Start Your Project"
                primaryButtonLink="/contact"
                secondaryButtonText="Get Quote"
                secondaryButtonLink="/contact"
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
                        </Flex>

                        {showFilters && (
                            <Div className="overflow-hidden animate-slide-down">
                                <Flex className="pt-4 border-t border-neutral-200">
                                    <Div className="w-full md:w-48">
                                        <Select
                                            id="filterType"
                                            label="Project Type"
                                            options={projectTypeOptions}
                                            value={filterType}
                                            onChange={(e) => setFilterType(e.target.value)}
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
                            <GradientText>Featured</GradientText> Projects
                        </h2>
                        <p className="text-secondary-600 mt-2">
                            {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} showcased
                        </p>
                    </Div>
                </Div>

                {filteredProjects.length === 0 ? (
                    <Div className="text-center py-16 animate-fade-in">
                        <Div className="text-64 mb-4 animate-bounce-gentle">🏗️</Div>
                        <h3 className="text-24 font-bold text-secondary-700 mb-2">No Matching Projects</h3>
                        <p className="text-secondary-600 mb-6">
                            Try adjusting your search criteria to find projects that match your interests.
                        </p>
                    </Div>
                ) : (
                    <Div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <Div
                                key={project.id}
                                className="group animate-scale-in"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <GlassCard className="overflow-hidden h-full group-hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2">
                                    <Div className="relative overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                        <Div className="absolute inset-0 bg-gradient-to-t from-secondary-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Status Badge */}
                                        <Div className="absolute top-4 left-4 animate-float">
                                            <span className="text-12 px-3 py-1 rounded-full font-medium bg-success-100 text-success-700">
                                                Completed
                                            </span>
                                        </Div>

                                        {/* Type Badge */}
                                        <Div className="absolute top-4 right-4 bg-primary-base/90 backdrop-blur-sm text-white text-12 px-3 py-1 rounded-full font-medium animate-float" style={{ animationDelay: "0.5s" }}>
                                            {project.type}
                                        </Div>

                                        {/* View Button */}
                                        <Div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                                            <button className="bg-white/90 backdrop-blur-sm text-primary-base p-3 rounded-full hover:bg-white transition-all duration-300 hover:scale-110 shadow-lg">
                                                <Eye size={18} />
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
                                            <Div className="flex items-center text-12 text-secondary-500 transition-colors duration-300 group-hover:text-secondary-600">
                                                <Calendar size={14} className="mr-2 text-primary-base" />
                                                Year: {project.year}
                                            </Div>
                                        </Div>

                                        <Div className="flex justify-between items-center pt-4 border-t border-neutral-200">
                                            <span className="text-12 text-secondary-500 transition-colors duration-300 group-hover:text-secondary-600">
                                                Client: {project.client}
                                            </span>
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