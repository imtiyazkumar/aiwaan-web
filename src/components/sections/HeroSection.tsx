import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Div } from '../general/BaseComponents';
import AnimatedBackground from '../ui/AnimatedBackground';
import GradientText from '../ui/GradientText';

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
    height?: 'sm' | 'md' | 'lg' | 'xl';
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
    height = 'lg'
}) => {
    const heightClasses = {
        sm: 'min-h-[50vh]',
        md: 'min-h-[60vh]',
        lg: 'min-h-[90vh]',
        xl: 'min-h-screen'
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className={`relative ${heightClasses[height]} flex items-center justify-center overflow-hidden rounded-2xl mb-16`}
        >
            <AnimatedBackground />
            
            {/* Hero Background */}
            <Div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-secondary-800/80 to-primary-600/90 z-10" />
            <Div className="absolute inset-0">
                <img
                    src={backgroundImage}
                    alt="Hero background"
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
                        {title}{" "}
                        {subtitle && (
                            <GradientText gradient="accent" className="text-48 md:text-64">
                                {subtitle}
                            </GradientText>
                        )}
                    </motion.h1>
                    
                    <motion.p 
                        className="text-18 md:text-20 text-neutral-100 mb-10 max-w-3xl mx-auto leading-relaxed"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        {description}
                    </motion.p>
                    
                    {showButtons && (
                        <motion.div 
                            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            <Link
                                to={primaryButtonLink}
                                className="group bg-primary-base hover:bg-primary-600 text-white px-8 py-4 rounded-full transition-all duration-300 text-center font-medium text-16 shadow-glow hover:shadow-glow-lg transform hover:scale-105"
                            >
                                {primaryButtonText}
                                <ArrowRight size={18} className="ml-2 inline group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to={secondaryButtonLink}
                                className="group border-2 border-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-secondary-500 text-white px-8 py-4 rounded-full transition-all duration-300 text-center font-medium text-16 transform hover:scale-105"
                            >
                                {secondaryButtonText}
                                <Sparkles size={18} className="ml-2 inline group-hover:rotate-12 transition-transform" />
                            </Link>
                        </motion.div>
                    )}
                </motion.div>
            </Div>
        </motion.div>
    );
};

export default HeroSection;