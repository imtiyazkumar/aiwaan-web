import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Div } from '../general/BaseComponents';
import GlassCard from '../ui/GlassCard';
import GradientText from '../ui/GradientText';

interface Step {
    number: number;
    title: string;
    description: string;
    icon?: React.ReactNode;
    details?: string[];
}

interface HowItWorksSectionProps {
    title?: string;
    subtitle?: string;
    description?: string;
    steps: Step[];
    backgroundColor?: 'transparent' | 'gradient' | 'white';
}

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
    title = "How It",
    subtitle = "Works",
    description = "Our streamlined process ensures your project is completed efficiently and to your satisfaction.",
    steps,
    backgroundColor = 'gradient'
}) => {
    const backgroundClasses = {
        transparent: '',
        gradient: 'bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl mx-4 my-16',
        white: 'bg-white rounded-2xl mx-4 my-16 shadow-lg'
    };

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`py-20 ${backgroundClasses[backgroundColor]}`}
        >
            <Div className="text-center mb-16 px-6">
                <motion.h2 
                    className="text-32 md:text-48 font-bold text-secondary-800 mb-4 font-display"
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    {title} <GradientText>{subtitle}</GradientText>
                </motion.h2>
                <motion.p 
                    className="text-secondary-600 max-w-3xl mx-auto text-16 leading-relaxed"
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    {description}
                </motion.p>
            </Div>

            <Div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
                {steps.map((step, index) => (
                    <motion.div
                        key={step.number}
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <GlassCard className="p-8 h-full text-center group cursor-pointer">
                            {/* Step Number */}
                            <Div className="relative mb-6">
                                <Div className="w-16 h-16 bg-gradient-to-br from-primary-base to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-20 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {step.number}
                                </Div>
                                {step.icon && (
                                    <Div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                                        {step.icon}
                                    </Div>
                                )}
                            </Div>

                            <h3 className="text-20 font-bold text-secondary-800 mb-4 group-hover:text-primary-base transition-colors">
                                {step.title}
                            </h3>
                            
                            <p className="text-14 text-secondary-600 leading-relaxed mb-4">
                                {step.description}
                            </p>

                            {step.details && (
                                <Div className="space-y-2 mt-4">
                                    {step.details.map((detail, i) => (
                                        <Div key={i} className="flex items-center text-12 text-secondary-500 justify-center">
                                            <CheckCircle size={14} className="text-primary-base mr-2" />
                                            {detail}
                                        </Div>
                                    ))}
                                </Div>
                            )}

                            {/* Connection Line */}
                            {index < steps.length - 1 && (
                                <Div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary-base to-primary-300 transform -translate-y-1/2 z-10">
                                    <Div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary-base rounded-full"></Div>
                                </Div>
                            )}
                        </GlassCard>
                    </motion.div>
                ))}
            </Div>
        </motion.div>
    );
};

export default HowItWorksSection;