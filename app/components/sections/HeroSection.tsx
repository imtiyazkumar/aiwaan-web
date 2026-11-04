import React, { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import GradientText from "../ui/GradientText";
import { Div } from "~/components/general/BaseComponents";
import { useNavigate } from "react-router";
import Button from "~/components/buttons/Button";

interface HeroSectionProps {
    title: string;
    subtitle?: string;
    description: string;
    backgroundImage: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    showButtons?: boolean;
    height?: "sm" | "md" | "lg" | "xl";
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, description, backgroundImage, primaryButtonText, primaryButtonLink, secondaryButtonText, secondaryButtonLink, showButtons = true, height = "lg" }) => {
    const heightClasses = {
        sm: "min-h-[50vh]",
        md: "min-h-[60vh]",
        lg: "min-h-[90vh]",
        xl: "min-h-screen"
    };

    const navigate = useNavigate();
    const [loadedImage, setLoadedImage] = useState<string | null>(null);

    return (
        <Div className={`relative ${heightClasses[height]} flex w-full items-center justify-center overflow-hidden rounded-md lg:rounded-2xl mb-8`}  >
            <Div className="absolute inset-0">
                <img
                    key={backgroundImage}
                    src={backgroundImage}
                    alt=""
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    onLoad={() => setLoadedImage(backgroundImage)}
                    className={`w-full h-full object-cover transition-[opacity,transform] duration-[1400ms] ease-out motion-reduce:transition-none ${loadedImage === backgroundImage ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.025]'}`}
                />
            </Div>
            <Div className="absolute inset-0 bg-linear-to-br from-primary-900/90 via-secondary-800/80 to-primary-600/90 z-10" />
            <Div className="container mx-auto px-4 py-16 md:py-24 relative z-20 text-center text-white">
                <Div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl sm:text-48 md:text-64 font-bold leading-tight mb-4 font-display hero-enter">
                        {title}{" "}
                        {subtitle &&
                            <GradientText gradient="accent" className="text-48 md:text-64">
                                {subtitle}
                            </GradientText>
                        }
                    </h1>
                    <Div className="text-18 md:text-20 mb-8 max-w-3xl mx-auto leading-relaxed hero-enter hero-enter-description">
                        {description}
                    </Div>
                    {showButtons && (
                        <Div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 hero-enter hero-enter-actions">
                            <Button onClick={() => navigate(primaryButtonLink)} variant="primary_filled" height="large"  >
                                {primaryButtonText}
                                <ArrowRight size={18} className="ml-2 inline transition-transform duration-300 group-hover:translate-x-1.5"
                                />
                            </Button>

                            <Button onClick={() => navigate(secondaryButtonLink)} variant="secondary_filled" height="large" className="border-2 border-white" >
                                {secondaryButtonText}
                                <Sparkles size={18} className="ml-2 inline group-hover:rotate-12 transition-transform" />
                            </Button>
                        </Div>
                    )}
                </Div>
            </Div>
        </Div>
    );
};

export default HeroSection;
