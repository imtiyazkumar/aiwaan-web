import React from "react";
import { CheckCircle, Clock } from "lucide-react";
import { Div } from "../general/BaseComponents";
import GlassCard from "../ui/GlassCard";

interface Step {
    number: number;
    title: string;
    description: string;
    icon?: React.ReactNode;
    details?: string[];
    duration?: string;
}

interface StepCardProps {
    step: Step;
    isLast: boolean;
}

const StepCard: React.FC<StepCardProps> = ({ step, isLast }) => {
    return (
        <Div className="relative group w-full max-w-90 sm:max-w-100 mx-auto">
            <GlassCard className="p-3 sm:p-6 lg:p-8 h-full text-center rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                <Div className="relative mb-5 sm:mb-6 flex justify-center">
                    <Div className="relative w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 mb-4">
                        <Div className="absolute inset-0 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-all" />
                        <Div className="absolute inset-2 rounded-full bg-primary flex items-center justify-center text-white font-bold text-18 sm:text-20 lg:text-22 shadow-md">
                            {step.number}
                        </Div>
                    </Div>
                    {step.icon && (
                        <Div className="absolute text-primary bottom-0 right-10 sm:right-12 lg:right-16 bg-white rounded-full p-1.5 sm:p-2 shadow-md border border-primary/30">
                            {step.icon}
                        </Div>
                    )}
                </Div>

                <Div className="text-16 sm:text-17 lg:text-18 font-semibold text-secondary-800 mb-2 sm:mb-3 group-hover:text-primary-base transition-colors">
                    {step.title}
                </Div>

                <Div className="text-13 sm:text-14 text-secondary-600 leading-relaxed mb-3 sm:mb-4">
                    {step.description}
                </Div>
                {step.duration && (
                    <Div className="inline-flex items-center justify-center text-11 sm:text-12 text-primary-700 bg-primary/10 rounded-full px-3 py-1 mb-3 sm:mb-4">
                        <Clock size={12} className="mr-1" />
                        {step.duration}
                    </Div>
                )}

                {step.details?.length ? (
                    <Div className="space-y-1.5 sm:space-y-2 text-left">
                        {step.details.map((d, i) => (
                            <Div key={i} className="flex items-start text-12 sm:text-13 text-secondary-600">
                                <CheckCircle size={14} className="text-primary mr-2 mt-0.5 shrink-0" />
                                <span>{d}</span>
                            </Div>
                        ))}
                    </Div>
                ) : null}
            </GlassCard>
            {!isLast && (
                <Div className="hidden lg:flex items-center justify-center absolute top-1/2 -right-3 w-8 h-8 bg-white rounded-full shadow-md border border-primary -translate-y-1/2">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-primary">
                        <path d="M13 5l7 7-7 7M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                </Div>
            )}
            {!isLast && (
                <Div className="lg:hidden hidden md-flex flex-col items-center mt-4">
                    <Div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mb-1">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 text-primary-base rotate-90">
                            <path d="M13 5l7 7-7 7M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </Div>
                    <Div className="w-1 h-8 bg-linear-to-b from-primary-200 to-transparent" />
                </Div>
            )}
        </Div>
    );
};

export default StepCard;
