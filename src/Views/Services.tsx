import React from "react";
import { Building2, Layout, PenTool, Image, Home, Sparkles, CheckCircle, ArrowRight, Clock, Award, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Div } from "../components/general/BaseComponents";
import HeroSection from "../components/sections/HeroSection";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import CTASection from "../components/sections/CTASection";
import GlassCard from "../components/ui/GlassCard";
import GradientText from "../components/ui/GradientText";

const Services: React.FC = () => {
    // Enhanced services with better descriptions
    const services = [
        {
            icon: <Building2 size={32} className="text-primary-base" />,
            title: "Architectural Design",
            description: "Comprehensive architectural solutions that blend functionality with aesthetic excellence, tailored to your vision and Kashmir's unique landscape.",
            features: ["Custom Design", "3D Visualization", "Technical Drawings", "Site Planning"],
            price: "Starting from ₹50,000",
            duration: "2-4 weeks"
        },
        {
            icon: <Layout size={32} className="text-primary-base" />,
            title: "2D Floor Plans",
            description: "Detailed and precise floor plans that help you visualize your space with accuracy and clarity, perfect for planning and construction.",
            features: ["Detailed Layouts", "Dimension Accuracy", "Multiple Formats", "Revision Support"],
            price: "Starting from ₹15,000",
            duration: "3-7 days"
        },
        {
            icon: <PenTool size={32} className="text-primary-base" />,
            title: "3D Modeling",
            description: "Realistic 3D models that bring your project to life before construction begins, allowing you to explore every detail.",
            features: ["Photorealistic Models", "Virtual Walkthroughs", "Material Visualization", "Lighting Studies"],
            price: "Starting from ₹25,000",
            duration: "1-2 weeks"
        },
        {
            icon: <Image size={32} className="text-primary-base" />,
            title: "3D Rendering",
            description: "Stunning photorealistic visualizations of interior and exterior spaces that showcase your project in its best light.",
            features: ["High-Quality Renders", "Lighting Simulation", "Multiple Angles", "Post-Processing"],
            price: "Starting from ₹8,000",
            duration: "2-5 days"
        },
        {
            icon: <Home size={32} className="text-primary-base" />,
            title: "Interior Design",
            description: "Creative and functional interior spaces that reflect your lifestyle and preferences while incorporating Kashmiri aesthetics.",
            features: ["Space Planning", "Color Schemes", "Furniture Selection", "Material Specification"],
            price: "Starting from ₹30,000",
            duration: "1-3 weeks"
        },
        {
            icon: <Sparkles size={32} className="text-primary-base" />,
            title: "Landscape Design",
            description: "Beautiful outdoor spaces that complement your architecture and enhance your property's natural beauty.",
            features: ["Garden Planning", "Hardscape Design", "Plant Selection", "Irrigation Planning"],
            price: "Starting from ₹20,000",
            duration: "1-2 weeks"
        }
    ];

    // Service process steps
    const serviceProcess = [
        {
            number: 1,
            title: "Initial Consultation",
            description: "We discuss your project requirements, budget, timeline, and vision to understand your needs completely.",
            icon: <Users size={20} className="text-primary-base" />,
            details: ["Project briefing", "Site analysis", "Budget planning"]
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

            {/* Services Grid */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="py-20 px-4"
            >
                <Div className="text-center mb-16">
                    <motion.h2
                        className="text-32 md:text-48 font-bold text-secondary-800 mb-4 font-display"
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        What We <GradientText>Offer</GradientText>
                    </motion.h2>
                    <motion.p
                        className="text-secondary-600 max-w-3xl mx-auto text-16 leading-relaxed"
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        From initial concept to final visualization, we provide end-to-end architectural services that bring your vision to life.
                    </motion.p>
                </Div>

                <Div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

                                        <Div className="space-y-2 mb-6">
                                            {service.features.map((feature, i) => (
                                                <Div key={i} className="flex items-center text-12 text-secondary-500">
                                                    <CheckCircle size={14} className="text-primary-base mr-2" />
                                                    {feature}
                                                </Div>
                                            ))}
                                        </Div>

                                        <Div className="border-t border-neutral-200 pt-4 space-y-2">
                                            <Div className="flex items-center justify-between text-12 text-secondary-600">
                                                <span className="flex items-center">
                                                    <Award size={14} className="mr-1" />
                                                    {service.price}
                                                </span>
                                                <span className="flex items-center">
                                                    <Clock size={14} className="mr-1" />
                                                    {service.duration}
                                                </span>
                                            </Div>
                                        </Div>
                                    </Div>
                                </Div>

                                <Link
                                    to="/get-quote"
                                    className="w-full bg-primary-base hover:bg-primary-600 text-white py-3 rounded-lg transition-colors inline-flex items-center justify-center font-medium group mt-4"
                                >
                                    Get Quote
                                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
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
