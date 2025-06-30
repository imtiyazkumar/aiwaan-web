import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Building2, PenTool, Image, Home, Layout, CheckCircle, Sparkles, Award, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Div } from "../components/general/BaseComponents";
import { AppRoutes } from "../routes/routes";
import AnimatedBackground from "../components/ui/AnimatedBackground";
import GlassCard from "../components/ui/GlassCard";
import GradientText from "../components/ui/GradientText";

const HomePage: React.FC = () => {
    // Example project data with better images
    const featuredProjects = [
        {
            id: 1,
            title: "Modern Kashmiri Villa",
            type: "Residential",
            image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600",
            completion: "2024",
            description: "Luxury villa blending modern architecture with traditional Kashmiri elements"
        },
        {
            id: 2,
            title: "Sopore Business Hub",
            type: "Commercial",
            image: "https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=600",
            completion: "2023",
            description: "Contemporary commercial space designed for modern businesses"
        },
        {
            id: 3,
            title: "Traditional Houseboat",
            type: "Interior",
            image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
            completion: "2024",
            description: "Elegant interior design preserving Kashmir's heritage"
        },
        {
            id: 4,
            title: "Dal Lake Pavilion",
            type: "Public Space",
            image: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=600",
            completion: "2023",
            description: "Stunning pavilion enhancing the natural beauty of Dal Lake"
        },
    ];

    // Enhanced services with better descriptions
    const services = [
        {
            icon: <Building2 size={32} className="text-primary-base" />,
            title: "Architectural Design",
            description: "Comprehensive architectural solutions that blend functionality with aesthetic excellence, tailored to your vision.",
            features: ["Custom Design", "3D Visualization", "Technical Drawings"]
        },
        {
            icon: <Layout size={32} className="text-primary-base" />,
            title: "2D Floor Plans",
            description: "Detailed and precise floor plans that help you visualize your space with accuracy and clarity.",
            features: ["Detailed Layouts", "Dimension Accuracy", "Multiple Formats"]
        },
        {
            icon: <PenTool size={32} className="text-primary-base" />,
            title: "3D Modeling",
            description: "Realistic 3D models that bring your project to life before construction begins.",
            features: ["Photorealistic Models", "Virtual Walkthroughs", "Material Visualization"]
        },
        {
            icon: <Image size={32} className="text-primary-base" />,
            title: "3D Rendering",
            description: "Stunning photorealistic visualizations of interior and exterior spaces.",
            features: ["High-Quality Renders", "Lighting Simulation", "Multiple Angles"]
        },
        {
            icon: <Home size={32} className="text-primary-base" />,
            title: "Interior Design",
            description: "Creative and functional interior spaces that reflect your lifestyle and preferences.",
            features: ["Space Planning", "Color Schemes", "Furniture Selection"]
        },
        {
            icon: <Sparkles size={32} className="text-primary-base" />,
            title: "Landscape Design",
            description: "Beautiful outdoor spaces that complement your architecture and enhance your property.",
            features: ["Garden Planning", "Hardscape Design", "Plant Selection"]
        }
    ];

    // Stats data
    const stats = [
        { icon: <Award size={24} />, number: "150+", label: "Projects Completed" },
        { icon: <Users size={24} />, number: "98%", label: "Client Satisfaction" },
        { icon: <Clock size={24} />, number: "5+", label: "Years Experience" },
        { icon: <Building2 size={24} />, number: "50+", label: "Happy Clients" },
    ];

    return (
        <Div className="max-w-[1200px] mx-auto overflow-hidden">
            {/* Enhanced Hero Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative min-h-[90vh] flex items-center justify-center overflow-hidden rounded-2xl mb-16"
            >
                <AnimatedBackground />
                
                {/* Hero Background */}
                <Div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-secondary-800/80 to-primary-600/90 z-10" />
                <Div className="absolute inset-0">
                    <img
                        src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200"
                        alt="Architecture background"
                        className="w-full h-full object-cover"
                    />
                </Div>

                {/* Hero Content */}
                <Div className="container mx-auto px-6 py-24 md:py-32 relative z-20 text-center">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.h1 
                            className="text-48 md:text-64 font-bold text-white leading-tight mb-6 font-display"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            Transforming Spaces in{" "}
                            <GradientText gradient="accent" className="text-48 md:text-64">
                                Kashmir
                            </GradientText>{" "}
                            Through Expert Design
                        </motion.h1>
                        
                        <motion.p 
                            className="text-18 md:text-20 text-neutral-100 mb-10 max-w-3xl mx-auto leading-relaxed"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            We create exceptional architectural visualizations that bring your vision to life, 
                            from concept to completion, with a distinct Kashmiri touch and modern innovation.
                        </motion.p>
                        
                        <motion.div 
                            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            <Link
                                to="/services"
                                className="group bg-primary-base hover:bg-primary-600 text-white px-8 py-4 rounded-full transition-all duration-300 text-center font-medium text-16 shadow-glow hover:shadow-glow-lg transform hover:scale-105"
                            >
                                Explore Our Services
                                <ArrowRight size={18} className="ml-2 inline group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/contact"
                                className="group border-2 border-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-secondary-500 text-white px-8 py-4 rounded-full transition-all duration-300 text-center font-medium text-16 transform hover:scale-105"
                            >
                                Request a Quote
                                <Sparkles size={18} className="ml-2 inline group-hover:rotate-12 transition-transform" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </Div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="py-16 px-4"
            >
                <Div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <GlassCard className="p-6 text-center">
                                <Div className="text-primary-base mb-3 flex justify-center">
                                    {stat.icon}
                                </Div>
                                <Div className="text-32 font-bold text-secondary-800 mb-2">
                                    {stat.number}
                                </Div>
                                <Div className="text-14 text-secondary-600">
                                    {stat.label}
                                </Div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </Div>
            </motion.div>

            {/* Featured Projects */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="py-16 px-4"
            >
                <Div className="flex justify-between items-end mb-12">
                    <Div>
                        <motion.h2 
                            className="text-32 md:text-48 font-bold text-secondary-800 font-display"
                            initial={{ x: -30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            Featured <GradientText>Projects</GradientText>
                        </motion.h2>
                        <motion.p 
                            className="text-secondary-600 mt-3 text-16"
                            initial={{ x: -30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            Our recent work showcasing Kashmiri design excellence
                        </motion.p>
                    </Div>
                    <Link
                        to="/projects"
                        className="hidden md:flex items-center text-primary-base hover:text-primary-600 font-medium group"
                    >
                        View All <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </Div>

                <Div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Link to={`/projects/${project.id}`} className="group block">
                                <GlassCard className="overflow-hidden h-full">
                                    <Div className="relative overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <Div className="absolute inset-0 bg-gradient-to-t from-secondary-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <Div className="absolute top-4 left-4 bg-primary-base/90 backdrop-blur-sm text-white text-12 px-3 py-1 rounded-full font-medium">
                                            {project.type}
                                        </Div>
                                        <Div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <ArrowUpRight size={20} className="text-white transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </Div>
                                    </Div>
                                    <Div className="p-6">
                                        <h3 className="text-18 font-bold text-secondary-800 group-hover:text-primary-base transition-colors mb-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-14 text-secondary-600 mb-3 line-clamp-2">
                                            {project.description}
                                        </p>
                                        <Div className="flex justify-between items-center">
                                            <span className="text-12 text-secondary-500">Completed {project.completion}</span>
                                            <Div className="w-2 h-2 bg-primary-base rounded-full animate-pulse"></Div>
                                        </Div>
                                    </Div>
                                </GlassCard>
                            </Link>
                        </motion.div>
                    ))}
                </Div>

                <Div className="md:hidden flex justify-center mt-10">
                    <Link
                        to="/projects"
                        className="flex items-center text-primary-base hover:text-primary-600 font-medium group"
                    >
                        View All Projects <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </Div>
            </motion.div>

            {/* Enhanced Services Section */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl mx-4 my-16"
            >
                <Div className="text-center mb-16">
                    <motion.h2 
                        className="text-32 md:text-48 font-bold text-secondary-800 mb-4 font-display"
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Our <GradientText>Services</GradientText>
                    </motion.h2>
                    <motion.p 
                        className="text-secondary-600 max-w-3xl mx-auto text-16 leading-relaxed"
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        Comprehensive architectural visualization services tailored for Kashmiri aesthetics 
                        and your unique needs, delivered with precision and creativity.
                    </motion.p>
                </Div>

                <Div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <GlassCard className="p-8 h-full group cursor-pointer">
                                <Div className="flex items-start mb-6">
                                    <Div className="bg-primary-100 p-4 rounded-2xl mr-4 group-hover:bg-primary-200 transition-colors">
                                        {service.icon}
                                    </Div>
                                    <Div className="flex-1">
                                        <h3 className="text-20 font-bold text-secondary-800 mb-3 group-hover:text-primary-base transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-14 text-secondary-600 leading-relaxed mb-4">
                                            {service.description}
                                        </p>
                                        <Div className="space-y-2">
                                            {service.features.map((feature, i) => (
                                                <Div key={i} className="flex items-center text-12 text-secondary-500">
                                                    <CheckCircle size={14} className="text-primary-base mr-2" />
                                                    {feature}
                                                </Div>
                                            ))}
                                        </Div>
                                    </Div>
                                </Div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </Div>

                <motion.div 
                    className="mt-16 text-center"
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <Link
                        to="/services"
                        className="group bg-primary-base hover:bg-primary-600 text-white px-8 py-4 rounded-full transition-all duration-300 inline-flex items-center font-medium shadow-glow hover:shadow-glow-lg transform hover:scale-105"
                    >
                        All Services <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </motion.div>

            {/* Enhanced Why Choose Us */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="py-20 px-4"
            >
                <Div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-32 md:text-48 font-bold text-secondary-800 mb-8 font-display">
                            Why Choose <GradientText>Aiwaan</GradientText>
                        </h2>

                        <Div className="space-y-8">
                            {[
                                {
                                    title: "Local Expertise",
                                    description: "Our team brings deep knowledge of Kashmiri architecture and design aesthetics to each project, ensuring authentic and culturally rich designs."
                                },
                                {
                                    title: "Cutting-Edge Technology",
                                    description: "We use the latest software and techniques to deliver stunning visual representations that exceed industry standards."
                                },
                                {
                                    title: "Client-Focused Approach",
                                    description: "We prioritize your vision and requirements throughout the design process, ensuring complete satisfaction and collaboration."
                                },
                                {
                                    title: "Timely Delivery",
                                    description: "We understand the importance of deadlines and ensure prompt delivery of all projects without compromising quality."
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ x: -30, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-start group"
                                >
                                    <Div className="bg-primary-100 p-3 rounded-full mt-1 mr-6 group-hover:bg-primary-200 transition-colors">
                                        <CheckCircle size={20} className="text-primary-base" />
                                    </Div>
                                    <Div>
                                        <h3 className="text-20 font-bold text-secondary-800 mb-2 group-hover:text-primary-base transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-14 text-secondary-600 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </Div>
                                </motion.div>
                            ))}
                        </Div>

                        <motion.div 
                            className="mt-10"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <Link
                                to="/about"
                                className="text-primary-base hover:text-primary-600 font-medium flex items-center group"
                            >
                                Learn More About Us <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        className="relative"
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <Div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-primary-200 to-primary-300 rounded-2xl z-0 animate-float"></Div>
                        <img
                            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt="Architecture team working"
                            className="w-full h-auto rounded-2xl shadow-2xl relative z-10 transform hover:scale-105 transition-transform duration-500"
                        />
                        <Div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-tl from-secondary-200 to-secondary-300 rounded-2xl z-0 animate-float" style={{ animationDelay: '1s' }}></Div>
                    </motion.div>
                </Div>
            </motion.div>

            {/* Enhanced CTA Section */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-primary-base via-primary-600 to-secondary-600 rounded-2xl mx-4 my-16 relative overflow-hidden"
            >
                <AnimatedBackground />
                <Div className="container mx-auto px-8 py-16 text-center relative z-10">
                    <motion.h2 
                        className="text-32 md:text-48 font-bold text-white mb-6 font-display"
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        Ready to Transform Your Space?
                    </motion.h2>
                    <motion.p 
                        className="text-16 text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        Contact us today to discuss your project needs and discover how our architectural 
                        visualization services can bring your vision to life in Sopore and beyond. 
                        Let's create something extraordinary together.
                    </motion.p>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            to={AppRoutes.ContactUs}
                            className="group bg-white text-primary-base hover:bg-secondary-500 hover:text-white px-10 py-4 rounded-full transition-all duration-300 inline-flex items-center font-medium shadow-2xl transform hover:scale-105"
                        >
                            Get Started Today
                            <Sparkles size={18} className="ml-2 group-hover:rotate-12 transition-transform" />
                        </Link>
                    </motion.div>
                </Div>
            </motion.div>
        </Div>
    );
};

export default HomePage;