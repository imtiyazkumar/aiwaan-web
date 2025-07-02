import React from "react";
import { CheckCircle, ArrowRight, Sparkles, Clock, Users, Target } from "lucide-react";
import { Div } from "../general/BaseComponents";
import GlassCard from "../ui/GlassCard";
import GradientText from "../ui/GradientText";

interface Step {
    number: number;
    title: string;
    description: string;
    icon?: React.ReactNode;
    details?: string[];
    duration?: string;
    highlight?: string;
}

interface HowItWorksSectionProps {
    title?: string;
    subtitle?: string;
    description?: string;
    steps: Step[];
    backgroundColor?: "transparent" | "gradient" | "white";
}

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
    title = "How We",
    subtitle = "Work",
    description = "Our streamlined process ensures your project is completed efficiently and to your satisfaction.",
    steps,
    backgroundColor = "gradient"
}) => {
    const backgroundClasses = {
        transparent: "",
        gradient: "bg-gradient-to-br from-primary-50 via-white to-secondary-50 rounded-2xl mx-4 my-16",
        white: "bg-white rounded-2xl mx-4 my-16 shadow-lg"
    };

    return (
        <Div

            className={`py-20 relative overflow-hidden ${backgroundClasses[backgroundColor]}`}
        >
            {/* Floating Background Elements */}
            <Div className="absolute inset-0 overflow-hidden pointer-events-none">
                <Div
                    className="absolute top-10 left-10 w-32 h-32 bg-primary-200/20 rounded-full blur-xl"

                />
                <Div
                    className="absolute bottom-20 right-20 w-24 h-24 bg-secondary-200/20 rounded-full blur-xl"

                />
            </Div>

            {/* Header Section */}
            <Div className="text-center mb-16 px-6 relative z-10">
                <Div

                    className="inline-flex items-center bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-14 font-medium mb-4"
                >
                    <Sparkles size={16} className="mr-2" />
                    Our Process
                </Div>

                <div
                    className="text-32 md:text-48 font-bold text-secondary-800 mb-6 font-display"

                >
                    {title} <GradientText>{subtitle}</GradientText>
                </div>

                <Div
                    className="text-secondary-600 max-w-3xl mx-auto text-16 leading-relaxed"

                >
                    {description}
                </Div>
            </Div>

            {/* Steps Container */}
            <Div className="relative px-6 max-w-7xl mx-auto">
                {/* Desktop Connection Path */}
                <Div className="hidden lg:block absolute top-24 left-0 right-0 h-1 z-0">
                    <Div
                        className="h-full bg-gradient-to-r from-transparent via-primary-300 to-transparent rounded-full"

                    />
                </Div>

                <Div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                    {steps.map((step, index) => (
                        <Div
                            key={step.number}

                            className="relative group"
                        >
                            <GlassCard className="p-8 h-full text-center group-hover:shadow-2xl transition-all duration-500 relative overflow-hidden border-2 border-transparent group-hover:border-primary-200">
                                {/* Animated Background Gradient */}
                                <Div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 via-accent-50/0 to-secondary-50/0 group-hover:from-primary-50/30 group-hover:via-accent-50/20 group-hover:to-secondary-50/30 transition-all duration-500 rounded-2xl" />

                                {/* Floating Particles */}
                                <Div
                                    className="absolute top-4 right-4 w-2 h-2 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100"

                                />

                                {/* Step Number with Enhanced Design */}
                                <Div className="relative mb-6 z-10">
                                    <Div
                                        className="relative w-20 h-20 mx-auto mb-4"

                                    >
                                        {/* Outer Ring */}
                                        <Div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300" />

                                        {/* Main Circle */}
                                        <Div className="absolute inset-2 bg-gradient-to-br from-primary-base to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-20 shadow-lg group-hover:shadow-xl transition-all duration-300">
                                            {step.number}
                                        </Div>

                                        {/* Pulse Ring */}
                                        <Div
                                            className="absolute inset-0 bg-primary-base rounded-full opacity-0 group-hover:opacity-20"

                                        />
                                    </Div>

                                    {/* Icon Badge */}
                                    {step.icon && (
                                        <Div
                                            className="absolute -bottom-2 -right-2 bg-white rounded-full p-3 shadow-lg border-2 border-primary-100 group-hover:border-primary-200 group-hover:scale-110 transition-all duration-300"

                                        >
                                            {step.icon}
                                        </Div>
                                    )}
                                </Div>

                                {/* Content */}
                                <Div className="relative z-10">
                                    <Div
                                        className="text-20 font-bold text-secondary-800 mb-3 group-hover:text-primary-base transition-colors duration-300"

                                    >
                                        {step.title}
                                    </Div>

                                    {step.highlight && (
                                        <Div className="inline-flex items-center bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-12 font-medium mb-3">
                                            <Target size={12} className="mr-1" />
                                            {step.highlight}
                                        </Div>
                                    )}

                                    <Div
                                        className="text-14 text-secondary-600 leading-relaxed mb-6 group-hover:text-secondary-700 transition-colors duration-300"

                                    >
                                        {step.description}
                                    </Div>

                                    {/* Duration Badge */}
                                    {step.duration && (
                                        <Div className="flex items-center justify-center text-12 text-primary-600 bg-primary-50 rounded-full px-3 py-1 mb-4 group-hover:bg-primary-100 transition-colors duration-300">
                                            <Clock size={12} className="mr-1" />
                                            {step.duration}
                                        </Div>
                                    )}

                                    {/* Details List */}
                                    {step.details && (
                                        <Div
                                            className="space-y-2"

                                        >
                                            {step.details.map((detail, i) => (
                                                <Div
                                                    key={i}
                                                    className="flex items-center text-12 text-secondary-500 justify-center group-hover:text-secondary-600 transition-colors duration-300"

                                                >
                                                    <CheckCircle size={14} className="text-primary-base mr-2 flex-shrink-0" />
                                                    <span className="font-medium">{detail}</span>
                                                </Div>
                                            ))}
                                        </Div>
                                    )}
                                </Div>

                                {/* Connection Arrow - Desktop Only */}
                                {index < steps.length - 1 && (
                                    <Div
                                        className="hidden lg:block absolute top-24 -right-4 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-primary-100 flex items-center justify-center z-30 group-hover:border-primary-200 group-hover:scale-110 transition-all duration-300"

                                    >
                                        <ArrowRight size={16} className="text-primary-base" />
                                    </Div>
                                )}
                            </GlassCard>

                            {/* Mobile Connection */}
                            {index < steps.length - 1 && (
                                <Div
                                    className="lg:hidden flex justify-center mt-6 mb-2"

                                >
                                    <Div className="flex flex-col items-center">
                                        <Div
                                            className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mb-2"

                                        >
                                            <ArrowRight size={16} className="text-primary-base rotate-90" />
                                        </Div>
                                        <Div className="w-1 h-8 bg-gradient-to-b from-primary-200 to-transparent rounded-full" />
                                    </Div>
                                </Div>
                            )}
                        </Div>
                    ))}
                </Div>

                {/* Bottom CTA */}
                <Div
                    className="text-center mt-16"

                >
                    <Div className="inline-flex items-center bg-gradient-to-r from-primary-base to-primary-600 text-white px-8 py-4 rounded-full font-medium text-16 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                        <Users size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                        Ready to get started?
                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Div>
                </Div>
            </Div>
        </Div>
    );
};

export default HowItWorksSection;
