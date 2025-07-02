import React from "react";
// import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Div } from "../general/BaseComponents";

interface CTASectionProps {
    title: string;
    description: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    showSecondaryButton?: boolean;
    backgroundGradient?: "primary" | "secondary" | "accent";
}

const CTASection: React.FC<CTASectionProps> = ({
    title,
    description,
    primaryButtonText = "Get Started Today",
    primaryButtonLink = "/contact",
    secondaryButtonText = "Learn More",
    secondaryButtonLink = "/about",
    showSecondaryButton = false,
    backgroundGradient = "primary"
}) => {
    const gradients = {
        primary: "bg-gradient-to-r from-primary-base via-primary-600 to-secondary-600",
        secondary: "bg-gradient-to-r from-secondary-600 via-secondary-700 to-primary-base",
        accent: "bg-gradient-to-r from-accent-500 via-primary-base to-secondary-600"
    };

    return (
        <div className={`${gradients[backgroundGradient]} rounded-2xl mx-2 my-8 relative overflow-hidden`}>
            <Div className="container mx-auto px-6 py-12 text-center relative z-10">
                <div
                    className="text-32 md:text-48 font-bold text-white mb-4 font-display"

                >
                    {title}
                </div>
                <Div
                    className="text-16 text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed"

                >
                    {description}
                </Div>
                <div

                    className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4"
                >
                    <Link
                        to={primaryButtonLink}
                        className="group bg-white text-primary-base hover:bg-secondary-500 hover:text-white px-8 py-3 rounded-full transition-all duration-300 inline-flex items-center justify-center font-medium shadow-2xl transform hover:scale-105"
                    >
                        {primaryButtonText}
                        <Sparkles size={18} className="ml-2 group-hover:rotate-12 transition-transform" />
                    </Link>
                    {showSecondaryButton && (
                        <Link
                            to={secondaryButtonLink}
                            className="group border-2 border-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-secondary-500 text-white px-8 py-3 rounded-full transition-all duration-300 inline-flex items-center justify-center font-medium transform hover:scale-105"
                        >
                            {secondaryButtonText}
                            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    )}
                </div>
            </Div>
        </div>
    );
};

export default CTASection;
