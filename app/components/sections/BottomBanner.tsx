import React from "react";
// import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Div } from "../general/BaseComponents";
import { Link } from "react-router";
import { wrapperBaseClass } from "~/utils/constants";

interface ButtonBannerProps {
    title: string;
    description: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    showSecondaryButton?: boolean;
    backgroundGradient?: "primary" | "secondary" | "accent";
}

const ButtonBanner: React.FC<ButtonBannerProps> = ({
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
        primary: "bg-gradient-to-r from-primary-300 via-primary-600 to-secondary-800",
        secondary: "bg-gradient-to-r from-secondary-light via-secondary to-primary",
        accent: "bg-gradient-to-r from-accent-500 via-primary to-secondary"
    };

    return (
        <Div className={`${gradients[backgroundGradient]} ${wrapperBaseClass}`}>
            <Div className="container mx-auto px-6 py-12 text-center relative z-10">
                <Div className="text-32 md:text-48 font-bold text-white mb-4 font-display" >
                    {title}
                </Div>
                <Div className="text-16 text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
                    {description}
                </Div>
                <Div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <Link to={primaryButtonLink} className="group bg-white text-primary-base hover:bg-secondary-800 hover:text-white px-8 py-3 rounded-full transition-all duration-300 inline-flex items-center justify-center font-medium shadow-2xl transform hover:scale-105">
                        {primaryButtonText}
                        <Sparkles size={18} className="ml-2 group-hover:rotate-12 transition-transform" />
                    </Link>
                    {showSecondaryButton && (
                        <Link
                            to={secondaryButtonLink}
                            className="group border-2 border-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-secondary-800 text-white px-8 py-3 rounded-full transition-all duration-300 inline-flex items-center justify-center font-medium transform hover:scale-105"
                        >
                            {secondaryButtonText}
                            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    )}
                </Div>
            </Div>
        </Div>
    );
};

export default ButtonBanner;
