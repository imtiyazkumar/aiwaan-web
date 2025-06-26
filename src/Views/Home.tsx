import React from "react";
import { ArrowRight, ArrowUpRight, Building2, PenTool, Image, Home, Layout, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Div } from "../components/general/BaseComponents";
import { AppRoutes } from "../routes/routes";

const HomePage: React.FC = () => {
    // Example project data
    const featuredProjects = [
        {
            id: 1,
            title: "Modern Kashmiri Villa",
            type: "Residential",
            image: "/api/placeholder/600/400",
            completion: "2024",
        },
        {
            id: 2,
            title: "Sopore Business Hub",
            type: "Commercial",
            image: "/api/placeholder/600/400",
            completion: "2023",
        },
        {
            id: 3,
            title: "Traditional Houseboat",
            type: "Interior",
            image: "/api/placeholder/600/400",
            completion: "2024",
        },
        {
            id: 4,
            title: "Dal Lake Pavilion",
            type: "Public Space",
            image: "/api/placeholder/600/400",
            completion: "2023",
        },
    ];

    // Services
    const services = [
        {
            icon: <Building2 size={24} className="text-primary-base" />,
            title: "Architectural Design",
            description: "Comprehensive architectural design services focusing on aesthetics and functionality."
        },
        {
            icon: <Layout size={24} className="text-primary-base" />,
            title: "2D Floor Plans",
            description: "Detailed and accurate floor plans to visualize your space effectively."
        },
        {
            icon: <PenTool size={24} className="text-primary-base" />,
            title: "3D Modeling",
            description: "Create realistic 3D models to bring your project to life before construction."
        },
        {
            icon: <Image size={24} className="text-primary-base" />,
            title: "3D Rendering",
            description: "Photorealistic visualization of interior and exterior spaces."
        },
        {
            icon: <Home size={24} className="text-primary-base" />,
            title: "Interior Design",
            description: "Creative and functional interior spaces tailored to your lifestyle."
        }
    ];

    return (
        <Div className="max-w-[1200px] mx-auto">
            {/* Hero Section */}
            <Div className="relative overflow-hidden rounded-lg">
                <Div className="absolute inset-0 bg-gradient-to-r from-secondary-500/90 to-primary-base/80 z-10" />
                <Div className="absolute inset-0">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIj0B6C5YPrE0xzQmS7EEDCl106iWVi9x0Gg&s"
                        alt="Architecture background"
                        className="w-full h-full object-cover"
                    />
                </Div>
                <Div className="container mx-auto px-6 py-24 md:py-32 relative z-20">
                    <Div className="max-w-2xl">
                        <h1 className="text-32 md:text-48 font-bold text-white leading-tight mb-6">
                            Transforming Spaces in
                            <span className="text-primary-200"> Kashmir</span> Through Expert Design
                        </h1>
                        <p className="text-16 md:text-18 text-neutral-100 mb-8">
                            We create exceptional architectural visualizations that bring your vision to life, from concept to completion, with a distinct Kashmiri touch.
                        </p>
                        <Div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <Link
                                to="/services"
                                className="bg-primary-base hover:bg-primary-600 text-white px-6 py-3 rounded-md transition-colors text-center font-medium"
                            >
                                Explore Our Services
                            </Link>
                            <Link
                                to="/contact"
                                className="border border-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-secondary-500 text-white px-6 py-3 rounded-md transition-colors text-center font-medium"
                            >
                                Request a Quote
                            </Link>
                        </Div>
                    </Div>
                </Div>
            </Div>

            {/* Featured Projects */}
            <Div className="py-16 px-4">
                <Div className="flex justify-between items-end mb-10">
                    <Div>
                        <h2 className="text-24 md:text-32 font-bold text-secondary-500">Featured Projects</h2>
                        <p className="text-neutral-600 mt-2">Our recent work showcasing Kashmiri design excellence</p>
                    </Div>
                    <Link
                        to="/projects"
                        className="hidden md:flex items-center text-primary-base hover:text-primary-600 font-medium"
                    >
                        View All <ArrowRight size={16} className="ml-2" />
                    </Link>
                </Div>

                <Div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProjects.map(project => (
                        <Link key={project.id} to={`/projects/${project.id}`} className="group">
                            <Div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                                <Div className="relative overflow-hidden">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIj0B6C5YPrE0xzQmS7EEDCl106iWVi9x0Gg&s"
                                        alt={project.title}
                                        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <Div className="absolute inset-0 bg-gradient-to-t from-secondary-500/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <Div className="absolute top-3 left-3 bg-primary-base text-white text-10 px-2 py-1 rounded">
                                        {project.type}
                                    </Div>
                                </Div>
                                <Div className="p-4">
                                    <h3 className="text-18 font-bold text-secondary-500 group-hover:text-primary-base transition-colors">{project.title}</h3>
                                    <Div className="flex justify-between items-center mt-2">
                                        <span className="text-12 text-neutral-600">Completed {project.completion}</span>
                                        <ArrowUpRight size={16} className="text-primary-base transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </Div>
                                </Div>
                            </Div>
                        </Link>
                    ))}
                </Div>

                <Div className="md:hidden flex justify-center mt-8">
                    <Link
                        to="/projects"
                        className="flex items-center text-primary-base hover:text-primary-600 font-medium"
                    >
                        View All Projects <ArrowRight size={16} className="ml-2" />
                    </Link>
                </Div>
            </Div>

            {/* Services Section */}
            <Div className="py-16 bg-primary-3 px-4">
                <Div className="text-center mb-12">
                    <h2 className="text-24 md:text-32 font-bold text-secondary-500 mb-3">Our Services</h2>
                    <p className="text-neutral-600 max-w-2xl mx-auto">
                        Comprehensive architectural visualization services tailored for Kashmiri aesthetics and your unique needs
                    </p>
                </Div>

                <Div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <Div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                            <Div className="flex items-start">
                                <Div className="bg-primary-100 p-3 rounded-lg mr-4">
                                    {service.icon}
                                </Div>
                                <Div>
                                    <h3 className="text-18 font-bold text-secondary-500 mb-2">{service.title}</h3>
                                    <p className="text-14 text-neutral-600">{service.description}</p>
                                </Div>
                            </Div>
                        </Div>
                    ))}
                </Div>

                <Div className="mt-12 text-center">
                    <Link
                        to="/services"
                        className="bg-primary-base hover:bg-primary-600 text-white px-6 py-3 rounded-md transition-colors inline-flex items-center font-medium"
                    >
                        All Services <ArrowRight size={16} className="ml-2" />
                    </Link>
                </Div>
            </Div>

            {/* Why Choose Us */}
            <Div className="py-16 bg-white px-4">
                <Div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <Div>
                        <h2 className="text-24 md:text-32 font-bold text-secondary-500 mb-6">Why Choose Aiwaan</h2>

                        <Div className="space-y-6">
                            <Div className="flex items-start">
                                <Div className="bg-primary-100 p-2 rounded-full mt-1 mr-4">
                                    <CheckCircle size={20} className="text-primary-base" />
                                </Div>
                                <Div>
                                    <h3 className="text-18 font-bold text-secondary-500">Local Expertise</h3>
                                    <p className="text-14 text-neutral-600">Our team brings deep knowledge of Kashmiri architecture and design aesthetics to each project.</p>
                                </Div>
                            </Div>

                            <Div className="flex items-start">
                                <Div className="bg-primary-100 p-2 rounded-full mt-1 mr-4">
                                    <CheckCircle size={20} className="text-primary-base" />
                                </Div>
                                <Div>
                                    <h3 className="text-18 font-bold text-secondary-500">Cutting-Edge Technology</h3>
                                    <p className="text-14 text-neutral-600">We use the latest software and techniques to deliver stunning visual representations.</p>
                                </Div>
                            </Div>

                            <Div className="flex items-start">
                                <Div className="bg-primary-100 p-2 rounded-full mt-1 mr-4">
                                    <CheckCircle size={20} className="text-primary-base" />
                                </Div>
                                <Div>
                                    <h3 className="text-18 font-bold text-secondary-500">Client-Focused Approach</h3>
                                    <p className="text-14 text-neutral-600">We prioritize your vision and requirements throughout the design process.</p>
                                </Div>
                            </Div>

                            <Div className="flex items-start">
                                <Div className="bg-primary-100 p-2 rounded-full mt-1 mr-4">
                                    <CheckCircle size={20} className="text-primary-base" />
                                </Div>
                                <Div>
                                    <h3 className="text-18 font-bold text-secondary-500">Timely Delivery</h3>
                                    <p className="text-14 text-neutral-600">We understand the importance of deadlines and ensure prompt delivery of all projects.</p>
                                </Div>
                            </Div>
                        </Div>

                        <Div className="mt-8">
                            <Link
                                to="/about"
                                className="text-primary-base hover:text-primary-600 font-medium flex items-center"
                            >
                                Learn More About Us <ArrowRight size={16} className="ml-2" />
                            </Link>
                        </Div>
                    </Div>

                    <Div className="hidden md:block relative">
                        <Div className="absolute -top-6 -left-6 w-24 h-24 bg-primary-1 rounded-lg z-0"></Div>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIj0B6C5YPrE0xzQmS7EEDCl106iWVi9x0Gg&s"
                            alt="Architecture team working"
                            className="w-full h-auto rounded-lg shadow-md relative z-10"
                        />
                        <Div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary-2/30 rounded-lg z-0"></Div>
                    </Div>
                </Div>
            </Div>

            {/* CTA Section */}
            <Div className="bg-gradient-to-r from-primary-base to-primary-600 rounded-lg mx-4 my-12">
                <Div className="container mx-auto px-6 py-12 text-center">
                    <h2 className="text-24 md:text-32 font-bold text-white mb-6">Ready to Transform Your Space?</h2>
                    <p className="text-16 text-white/90 max-w-2xl mx-auto mb-8">
                        Contact us today to discuss your project needs and discover how our architectural visualization services can bring your vision to life in Sopore and beyond.
                    </p>
                    <Link
                        to={AppRoutes.ContactUs}
                        className="bg-white text-primary-base hover:bg-secondary-500 hover:text-white px-8 py-3 rounded-md transition-colors inline-block font-medium"
                    >
                        Get Started
                    </Link>
                </Div>
            </Div>
        </Div>
    );
};

export default HomePage;
