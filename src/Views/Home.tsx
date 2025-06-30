import React from "react";
import { Award, Users, Clock, Building2, PenTool, Image, Home, Layout, Sparkles, CheckCircle, MapPin, Lightbulb, Target } from "lucide-react";
import { Div } from "../components/general/BaseComponents";
import HeroSection from "../components/sections/HeroSection";
import StatsSection from "../components/sections/StatsSection";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import WhyChooseUsSection from "../components/sections/WhyChooseUsSection";
import CTASection from "../components/sections/CTASection";

const HomePage: React.FC = () => {
    // Stats data
    const stats = [
        { icon: <Award size={24} />, number: "150+", label: "Projects Completed", description: "Successfully delivered" },
        { icon: <Users size={24} />, number: "98%", label: "Client Satisfaction", description: "Happy customers" },
        { icon: <Clock size={24} />, number: "5+", label: "Years Experience", description: "In the industry" },
        { icon: <Building2 size={24} />, number: "50+", label: "Happy Clients", description: "Across Kashmir" },
    ];

    // How it works steps
    const howItWorksSteps = [
        {
            number: 1,
            title: "Consultation",
            description: "We start with understanding your vision, requirements, and project goals through detailed consultation.",
            icon: <Users size={20} className="text-primary-base" />,
            details: ["Initial meeting", "Requirement analysis", "Budget discussion"]
        },
        {
            number: 2,
            title: "Design & Planning",
            description: "Our team creates detailed designs and plans that bring your vision to life with precision.",
            icon: <PenTool size={20} className="text-primary-base" />,
            details: ["Concept development", "3D modeling", "Technical drawings"]
        },
        {
            number: 3,
            title: "Review & Refine",
            description: "We present the designs for your review and make refinements based on your feedback.",
            icon: <CheckCircle size={20} className="text-primary-base" />,
            details: ["Design presentation", "Client feedback", "Revisions"]
        },
        {
            number: 4,
            title: "Final Delivery",
            description: "We deliver the final designs with all necessary documentation and support.",
            icon: <Sparkles size={20} className="text-primary-base" />,
            details: ["Final files", "Documentation", "Ongoing support"]
        }
    ];

    // Why choose us features
    const whyChooseUsFeatures = [
        {
            title: "Local Expertise",
            description: "Our team brings deep knowledge of Kashmiri architecture and design aesthetics to each project, ensuring authentic and culturally rich designs.",
            icon: <MapPin size={20} className="text-primary-base" />
        },
        {
            title: "Cutting-Edge Technology",
            description: "We use the latest software and techniques to deliver stunning visual representations that exceed industry standards.",
            icon: <Lightbulb size={20} className="text-primary-base" />
        },
        {
            title: "Client-Focused Approach",
            description: "We prioritize your vision and requirements throughout the design process, ensuring complete satisfaction and collaboration.",
            icon: <Target size={20} className="text-primary-base" />
        },
        {
            title: "Timely Delivery",
            description: "We understand the importance of deadlines and ensure prompt delivery of all projects without compromising quality.",
            icon: <Clock size={20} className="text-primary-base" />
        }
    ];

    return (
        <Div className="max-w-[1200px] mx-auto overflow-hidden">
            {/* Hero Section */}
            <HeroSection
                title="Transforming Spaces in"
                subtitle="Kashmir"
                description="We create exceptional architectural visualizations that bring your vision to life, from concept to completion, with a distinct Kashmiri touch and modern innovation."
                backgroundImage="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200"
                primaryButtonText="Explore Our Services"
                primaryButtonLink="/services"
                secondaryButtonText="Request a Quote"
                secondaryButtonLink="/contact"
            />

            {/* Stats Section */}
            <StatsSection stats={stats} />

            {/* How It Works Section */}
            <HowItWorksSection
                title="How We"
                subtitle="Work"
                description="Our streamlined process ensures your project is completed efficiently and to your satisfaction, from initial consultation to final delivery."
                steps={howItWorksSteps}
            />

            {/* Why Choose Us Section */}
            <WhyChooseUsSection
                title="Why Choose"
                subtitle="Aiwaan"
                features={whyChooseUsFeatures}
                image="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600"
            />

            {/* CTA Section */}
            <CTASection
                title="Ready to Transform Your Space?"
                description="Contact us today to discuss your project needs and discover how our architectural visualization services can bring your vision to life in Sopore and beyond. Let's create something extraordinary together."
                primaryButtonText="Get Started Today"
                primaryButtonLink="/contact"
            />
        </Div>
    );
};

export default HomePage;