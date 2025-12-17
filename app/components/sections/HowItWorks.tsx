import React from "react";
import { Div, Flex, FlexColumn, Span } from "../general/BaseComponents";
import GradientText from "../ui/GradientText";
import StepCard from "~/components/cards/StepCard";
import Title from "~/components/general/Title";
import { ArrowRight, Sparkles, Users } from "lucide-react";
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
    steps: Step[];
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
    steps,
    backgroundColor = "gradient",
    topTitle,
    topIcon
}) => {
    const navigate = useNavigate();

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
                <Div className="hidden lg:block absolute top-24 left-0 right-0 h-1">
                    <Div className="h-full bg-gradient-to-r from-transparent via-primary-200 to-transparent" />
                </Div>

                <Div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                    {steps.map((s, i) => (
                        <StepCard key={s.number} step={s} isLast={i === steps.length - 1} />
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
