import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Div } from '../general/BaseComponents';
import AnimatedBackground from '../ui/AnimatedBackground';

interface CTASectionProps {
    title: string;
    description: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    showSecondaryButton?: boolean;
    backgroundGradient?: 'primary' | 'secondary' | 'accent';
}

const CTASection: React.FC<CTASectionProps> = ({
    title,
    description,
    primaryButtonText = "Get Started Today",
    primaryButtonLink = "/contact",
    secondaryButtonText = "Learn More",
    secondaryButtonLink = "/about",
    showSecondaryButton = false,
    backgroundGradient = 'primary'
}) => {
    const gradients = {
        primary: 'bg-gradient-to-r from-primary-base via-primary-600 to-secondary-600',
        secondary: 'bg-gradient-to-r from-secondary-600 via-secondary-700 to-primary-base',
        accent: 'bg-gradient-to-r from-accent-500 via-primary-base to-secondary-600'
    };

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`${gradients[backgroundGradient]} rounded-2xl mx-4 my-16 relative overflow-hidden`}
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
                    {title}
                </motion.h2>
                <motion.p 
                    className="text-16 text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    {description}
                </motion.p>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
                >
                    <Link
                        to={primaryButtonLink}
                        className="group bg-white text-primary-base hover:bg-secondary-500 hover:text-white px-10 py-4 rounded-full transition-all duration-300 inline-flex items-center justify-center font-medium shadow-2xl transform hover:scale-105"
                    >
                        {primaryButtonText}
                        <Sparkles size={18} className="ml-2 group-hover:rotate-12 transition-transform" />
                    </Link>
                    {showSecondaryButton && (
                        <Link
                            to={secondaryButtonLink}
                            className="group border-2 border-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-secondary-500 text-white px-10 py-4 rounded-full transition-all duration-300 inline-flex items-center justify-center font-medium transform hover:scale-105"
                        >
                            {secondaryButtonText}
                            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    )}
                </motion.div>
            </Div>
        </motion.div>
    );
};

export default CTASection;