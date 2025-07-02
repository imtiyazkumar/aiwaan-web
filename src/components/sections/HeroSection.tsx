import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Div } from "../general/BaseComponents";
import GradientText from "../ui/GradientText";
import LazyImage from "../ui/LazyImage";

interface HeroSectionProps {
    title: string;
    subtitle?: string;
    description: string;
    backgroundImage: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    showButtons?: boolean;
    height?: "sm" | "md" | "lg" | "xl";
}

const HeroSection: React.FC<HeroSectionProps> = ({
    title,
    subtitle,
    description,
    backgroundImage,
    primaryButtonText = "Get Started",
    primaryButtonLink = "/contact",
    secondaryButtonText = "Learn More",
    secondaryButtonLink = "/about",
    showButtons = true,
    height = "lg"
}) => {
    const heightClasses = {
        sm: "min-h-[50vh]",
        md: "min-h-[60vh]",
        lg: "min-h-[90vh]",
        xl: "min-h-screen"
    };

    return (
        <Div

            className={`relative ${heightClasses[height]} flex items-center justify-center overflow-hidden rounded-2xl mb-8`}
        >

            {/* Hero Background */}
            <Div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-secondary-800/80 to-primary-600/90 z-10" />
            <Div className="absolute inset-0">
                <LazyImage
                    src={backgroundImage}
                    alt="Hero background"
                    className="w-full h-full object-cover"
                />
            </Div>

            {/* Hero Content */}
            <Div className="container mx-auto px-4 py-16 md:py-24 relative z-20 text-center">
                <Div

                    className="max-w-4xl mx-auto"
                >
                    <Div
                        className="text-48 md:text-64 font-bold text-white leading-tight mb-4 font-display"

                    >
                        {title}{" "}
                        {subtitle && (
                            <GradientText gradient="accent" className="text-48 md:text-64">
                                {subtitle}
                            </GradientText>
                        )}
                    </Div>

                    <Div
                        className="text-18 md:text-20 text-neutral-100 mb-8 max-w-3xl mx-auto leading-relaxed"

                    >
                        {description}
                    </Div>

                    {showButtons && (
                        <Div
                            className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4"

                        >
                            <Link
                                to={primaryButtonLink}
                                className="group bg-primary-base hover:bg-primary-600 text-white px-6 py-3 rounded-full transition-all duration-300 text-center font-medium text-16 shadow-glow hover:shadow-glow-lg transform hover:scale-105"
                            >
                                {primaryButtonText}
                                <ArrowRight size={18} className="ml-2 inline group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to={secondaryButtonLink}
                                className="group border-2 border-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-secondary-500 text-white px-6 py-3 rounded-full transition-all duration-300 text-center font-medium text-16 transform hover:scale-105"
                            >
                                {secondaryButtonText}
                                <Sparkles size={18} className="ml-2 inline group-hover:rotate-12 transition-transform" />
                            </Link>
                        </Div>
                    )}
                </Div>
            </Div>
        </Div>
    );
};

export default HeroSection;
