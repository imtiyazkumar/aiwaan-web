import React from "react";
import { Div, Flex, FlexColumn, Span } from "../general/BaseComponents";
import GradientText from "../ui/GradientText";
import StepCard from "~/components/cards/StepCard";
import Title from "~/components/general/Title";
import { ArrowRight, CheckCircle, PenTool, Sparkles, Users } from "lucide-react";
import Button from "~/components/buttons/Button";
import { useNavigate } from "react-router";
import { wrapperBaseClass } from "~/utils/constants";

interface Step {
    number: number;
    title: string;
    description: string;
    icon?: React.ReactNode;
    details?: string[];
    duration?: string;
}

interface HowItWorksSectionProps {
    title?: string;
    subtitle?: string;
    description?: string;
    backgroundColor?: "transparent" | "gradient" | "white";
    topTitle?: string;
    topIcon?: React.ReactNode;
}

const bgClass = {
    transparent: "",
    gradient: "bg-gradient-to-br from-primary-50 via-white to-secondary-50 rounded-2xl",
    white: "bg-white rounded-2xl shadow-lg"
};

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
    title = "How It",
    subtitle = "Works",
    description = "Our streamlined process ensures a smooth experience every time.",
    backgroundColor = "gradient",
    topTitle,
    topIcon
}) => {
    const navigate = useNavigate();

    const howItWorksSteps = [
        {
            number: 1,
            title: "Consultation",
            description: "We start with understanding your vision, requirements, and project goals through detailed consultation.",
            icon: <Users size={20} className="text-primary-base" />,
            details: ["Initial meeting", "Requirement analysis", "Budget discussion"]
        },
        {
            number: 2,
            title: "Design & Planning",
            description: "Our team creates detailed designs and plans that bring your vision to life with precision.",
            icon: <PenTool size={20} className="text-primary-base" />,
            details: ["Concept development", "3D modeling", "Technical drawings"]
        },
        {
            number: 3,
            title: "Review & Refine",
            description: "We present the designs for your review and make refinements based on your feedback.",
            icon: <CheckCircle size={20} className="text-primary-base" />,
            details: ["Design presentation", "Client feedback", "Revisions"]
        },
        {
            number: 4,
            title: "Final Delivery",
            description: "We deliver the final designs with all necessary documentation and support.",
            icon: <Sparkles size={20} className="text-primary-base" />,
            details: ["Final files", "Documentation", "Ongoing support"]
        }
    ];

    return (
        <FlexColumn className={`${wrapperBaseClass} ${bgClass[backgroundColor]} bg`}>
            <Flex className="items-center bg-primary-light text-primary px-4 py-2 gap-2 rounded-full text-14 font-medium w-max mx-auto">
                {topIcon}
                {topTitle || "Our Process"}
            </Flex>
            <Div className="text-center px-6">
                <Title title={title} subtitle={subtitle} />

                <Div className="text-secondary-600 max-w-3xl mx-auto text-16 leading-relaxed">
                    {description}
                </Div>
            </Div>

            <Div className="relative px-6  mx-auto">
                <Div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                    {howItWorksSteps.map((s, i) => (
                        <StepCard key={s.number} step={s} isLast={i === howItWorksSteps.length - 1} />
                    ))}
                </Div>
            </Div>

            <Button onClick={() => navigate("/contact")} variant="primary_filled" height="large" className="border-2 border-white w-fit mt-4" >
                <Flex>
                    <Users size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                    Ready to get started?
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Flex>

            </Button>
        </FlexColumn>
    );
};

export default HowItWorksSection;
