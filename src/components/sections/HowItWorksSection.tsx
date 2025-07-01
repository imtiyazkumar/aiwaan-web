import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Div } from "../general/BaseComponents";
import GlassCard from "../ui/GlassCard";
import GradientText from "../ui/GradientText";

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
    backgroundColor?: "transparent" | "gradient" | "white";
}

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
    title = "How It",
    subtitle = "Works",
    description = "Our streamlined process ensures your project is completed efficiently and to your satisfaction.",
    steps,
    backgroundColor = "gradient"
}) => {
    const backgroundClasses = {
        transparent: "",
        gradient: "bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl mx-4 my-16",
        white: "bg-white rounded-2xl mx-4 my-16 shadow-lg"
    };

    return (
        <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`py-20 ${backgroundClasses[backgroundColor]}`}
        >
            <Div className="text-center mb-16 px-6">
                <motion.h2
                    className="text-32 md:text-48 font-bold text-secondary-800 mb-4 font-display"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    {title} <GradientText>{subtitle}</GradientText>
                </motion.h2>
                <motion.p
                    className="text-secondary-600 max-w-3xl mx-auto text-16 leading-relaxed"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    {description}
                </motion.p>
            </Div>

            {/* Steps Container */}
            <Div className="relative px-6">
                {/* Desktop Connection Line */}
                <Div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-200 to-transparent" />

                <Div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                            <GlassCard className="p-8 h-full text-center group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 relative overflow-hidden">
                                {/* Hover Background Effect */}
                                <Div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 to-accent-50/0 group-hover:from-primary-50/50 group-hover:to-accent-50/30 transition-all duration-300 rounded-2xl" />

                                {/* Step Number */}
                                <Div className="relative mb-6 z-10">
                                    <Div className="w-16 h-16 bg-gradient-to-br from-primary-base to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-20 mx-auto mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 relative">
                                        {step.number}
                                        {/* Pulse Ring */}
                                        <Div className="absolute inset-0 bg-primary-base rounded-full opacity-0 group-hover:opacity-20 scale-100 group-hover:scale-150 transition-all duration-500" />
                                    </Div>

                                    {step.icon && (
                                        <Div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg border-2 border-primary-100 group-hover:border-primary-200 transition-colors duration-300">
                                            {step.icon}
                                        </Div>
                                    )}
                                </Div>

                                {/* Content */}
                                <Div className="relative z-10">
                                    <h3 className="text-20 font-bold text-secondary-800 mb-4 group-hover:text-primary-base transition-colors duration-300">
                                        {step.title}
                                    </h3>

                                    <p className="text-14 text-secondary-600 leading-relaxed mb-6 group-hover:text-secondary-700 transition-colors duration-300">
                                        {step.description}
                                    </p>

                                    {step.details && (
                                        <Div className="space-y-2">
                                            {step.details.map((detail, i) => (
                                                <Div key={i} className="flex items-center text-12 text-secondary-500 justify-center group-hover:text-secondary-600 transition-colors duration-300">
                                                    <CheckCircle size={14} className="text-primary-base mr-2 flex-shrink-0" />
                                                    <span className="font-medium">{detail}</span>
                                                </Div>
                                            ))}
                                        </Div>
                                    )}
                                </Div>

                                {/* Connection Arrow - Desktop Only */}
                                {index < steps.length - 1 && (
                                    <Div className="hidden lg:block absolute top-20 -right-4 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-primary-100 flex items-center justify-center z-20 group-hover:border-primary-200 group-hover:scale-110 transition-all duration-300">
                                        <ArrowRight size={16} className="text-primary-base" />
                                    </Div>
                                )}
                            </GlassCard>

                            {/* Mobile Connection */}
                            {index < steps.length - 1 && (
                                <Div className="lg:hidden flex justify-center mt-6 mb-2">
                                    <Div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                        <Div className="w-3 h-3 bg-primary-base rounded-full" />
                                    </Div>
                                </Div>
                            )}
                        </motion.div>
                    ))}
                </Div>
            </Div>
        </motion.div>
    );
};

export default HowItWorksSection;
