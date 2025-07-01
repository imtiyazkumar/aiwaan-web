import React from "react";
import { Building2, Layout, PenTool, Image, Home, Sparkles, CheckCircle, ArrowRight, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Div } from "../components/general/BaseComponents";
import HeroSection from "../components/sections/HeroSection";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import CTASection from "../components/sections/CTASection";
import GlassCard from "../components/ui/GlassCard";

const Services: React.FC = () => {
    // Enhanced services with better descriptions
    const services = [
        {
            icon: <Building2 size={32} className="text-primary-base" />,
            title: "Architectural Design",
            tagline: "Dream. Design. Build.",
            description: "Comprehensive architectural solutions that blend functionality with aesthetic excellence, tailored to your vision and Kashmir's unique landscape.",
            features: ["Custom Design", "3D Visualization", "Technical Drawings", "Site Planning"],
            duration: "2-4 weeks",
            badge: "Most Popular"
        },
        {
            icon: <Layout size={32} className="text-primary-base" />,
            title: "2D Floor Plans",
            tagline: "Precision in Every Line",
            description: "Detailed and precise floor plans that help you visualize your space with accuracy and clarity, perfect for planning and construction.",
            features: ["Detailed Layouts", "Dimension Accuracy", "Multiple Formats", "Revision Support"],
            duration: "3-7 days",
            badge: "Quick Delivery"
        },
        {
            icon: <PenTool size={32} className="text-primary-base" />,
            title: "3D Modeling",
            tagline: "Reality Before Reality",
            description: "Realistic 3D models that bring your project to life before construction begins, allowing you to explore every detail.",
            features: ["Photorealistic Models", "Virtual Walkthroughs", "Material Visualization", "Lighting Studies"],
            duration: "1-2 weeks",
            badge: "High Impact"
        },
        {
            icon: <Image size={32} className="text-primary-base" />,
            title: "3D Rendering",
            tagline: "Picture Perfect Spaces",
            description: "Stunning photorealistic visualizations of interior and exterior spaces that showcase your project in its best light.",
            features: ["High-Quality Renders", "Lighting Simulation", "Multiple Angles", "Post-Processing"],
            duration: "2-5 days",
            badge: "Visual Excellence"
        },
        {
            icon: <Home size={32} className="text-primary-base" />,
            title: "Interior Design",
            tagline: "Where Style Meets Function",
            description: "Creative and functional interior spaces that reflect your lifestyle and preferences while incorporating Kashmiri aesthetics.",
            features: ["Space Planning", "Color Schemes", "Furniture Selection", "Material Specification"],
            duration: "1-3 weeks",
            badge: "Lifestyle Focus"
        },
        {
            icon: <Sparkles size={32} className="text-primary-base" />,
            title: "Landscape Design",
            tagline: "Nature's Perfect Canvas",
            description: "Beautiful outdoor spaces that complement your architecture and enhance your property's natural beauty.",
            features: ["Garden Planning", "Hardscape Design", "Plant Selection", "Irrigation Planning"],
            duration: "1-2 weeks",
            badge: "Eco-Friendly"
        }
    ];

    // Service process steps
    const serviceProcess = [
        {
            number: 1,
            title: "Initial Consultation",
            description: "We discuss your project requirements, timeline, and vision to understand your needs completely.",
            icon: <Users size={20} className="text-primary-base" />,
            details: ["Project briefing", "Site analysis", "Timeline planning"]
        },
        {
            number: 2,
            title: "Concept Development",
            description: "Our team creates initial concepts and design proposals based on your requirements and site conditions.",
            icon: <PenTool size={20} className="text-primary-base" />,
            details: ["Sketches", "Mood boards", "Concept presentation"]
        },
        {
            number: 3,
            title: "Design Development",
            description: "We refine the chosen concept into detailed designs with technical specifications and visualizations.",
            icon: <Building2 size={20} className="text-primary-base" />,
            details: ["Detailed drawings", "3D models", "Material selection"]
        },
        {
            number: 4,
            title: "Final Delivery",
            description: "We deliver all final files, documentation, and provide ongoing support for your project implementation.",
            icon: <CheckCircle size={20} className="text-primary-base" />,
            details: ["Final files", "Documentation", "Implementation support"]
        }
    ];

    return (
        <Div className="max-w-[1200px] mx-auto overflow-hidden">
            {/* Hero Section */}
            <HeroSection
                title="Our"
                subtitle="Services"
                description="Comprehensive architectural visualization services tailored for Kashmiri aesthetics and your unique needs, delivered with precision and creativity by our expert team."
                backgroundImage="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
                primaryButtonText="Get a Quote"
                primaryButtonLink="/get-quote"
                secondaryButtonText="View Portfolio"
                secondaryButtonLink="/projects"
                height="md"
            />

            {/* Services Grid - Redesigned */}
            <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="py-20 px-4"
            >
                <Div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <GlassCard className="relative p-8 h-full group-hover:shadow-2xl group-hover:scale-[1.02] transition-all duration-300 border-2 border-transparent group-hover:border-primary-200 overflow-hidden">
                                {/* Badge */}
                                {service.badge && (
                                    <Div className="absolute top-4 right-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-3 py-1 rounded-full text-12 font-semibold">
                                        {service.badge}
                                    </Div>
                                )}

                                {/* Icon and Header */}
                                <Div className="flex flex-col items-start mb-6">
                                    <Div className="bg-gradient-to-br from-primary-100 to-accent-100 p-4 rounded-2xl mb-4 group-hover:from-primary-200 group-hover:to-accent-200 transition-all duration-300 group-hover:scale-110">
                                        {service.icon}
                                    </Div>

                                    <h3 className="text-22 font-bold text-secondary-800 mb-2 group-hover:text-primary-600 transition-colors">
                                        {service.title}
                                    </h3>

                                    <p className="text-14 font-medium text-primary-600 mb-3 italic">
                                        {service.tagline}
                                    </p>

                                    <p className="text-15 text-secondary-600 leading-relaxed mb-6">
                                        {service.description}
                                    </p>
                                </Div>

                                {/* Features */}
                                <Div className="space-y-3 mb-6">
                                    {service.features.map((feature, i) => (
                                        <Div key={i} className="flex items-center text-14 text-secondary-600 group-hover:text-secondary-700 transition-colors">
                                            <CheckCircle size={16} className="text-primary-500 mr-3 flex-shrink-0" />
                                            <span className="font-medium">{feature}</span>
                                        </Div>
                                    ))}
                                </Div>

                                {/* Timeline */}
                                <Div className="border-t border-gradient-to-r from-neutral-200 to-primary-100 pt-4 mb-6">
                                    <Div className="flex items-center text-14 text-secondary-600">
                                        <Clock size={16} className="text-accent-500 mr-2" />
                                        <span className="font-semibold">Delivery: {service.duration}</span>
                                    </Div>
                                </Div>

                                {/* CTA Button */}
                                <Link
                                    to="/get-quote"
                                    className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-4 rounded-xl transition-all duration-300 inline-flex items-center justify-center font-semibold text-15 group-hover:shadow-lg transform group-hover:-translate-y-0.5"
                                >
                                    Start Your Project
                                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>

                                {/* Decorative gradient overlay */}
                                <Div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 to-accent-50/0 group-hover:from-primary-50/10 group-hover:to-accent-50/10 transition-all duration-300 pointer-events-none rounded-2xl" />
                            </GlassCard>
                        </motion.div>
                    ))}
                </Div>
            </motion.div>

            {/* How It Works Section */}
            <HowItWorksSection
                title="Our"
                subtitle="Process"
                description="We follow a systematic approach to ensure every project is delivered with excellence and meets your expectations."
                steps={serviceProcess}
            />

            {/* CTA Section */}
            <CTASection
                title="Ready to Start Your Project?"
                description="Contact us today to discuss your architectural visualization needs. Our team is ready to transform your vision into stunning reality with our comprehensive services."
                primaryButtonText="Get Started"
                primaryButtonLink="/get-quote"
                secondaryButtonText="View Our Work"
                secondaryButtonLink="/projects"
                showSecondaryButton={true}
                backgroundGradient="accent"
            />
        </Div>
    );
};

export default Services;
