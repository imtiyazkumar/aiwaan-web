import React from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Div } from "../general/BaseComponents";
import GradientText from "../ui/GradientText";
import { Link } from "react-router";
import Title from "~/components/general/Title";
import { wrapperBaseClass } from "~/utils/constants";

interface Feature {
    title: string;
    description: string;
    icon?: React.ReactNode;
}

interface WhyChooseUsSectionProps {
    title?: string;
    subtitle?: string;
    features: Feature[];
    image?: string;
    learnMoreLink?: string;
    learnMoreText?: string;
    showLearnMore?: boolean;
    imagePosition?: "left" | "right";
}

const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({
    title = "Why Choose",
    subtitle = "Aiwaan",
    features,
    image = "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
    learnMoreLink = "/about",
    learnMoreText = "Learn More About Us",
    showLearnMore = true,
    imagePosition = "right"
}) => {
    return (
        <Div className={`${wrapperBaseClass}`} >
            <Div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${imagePosition === "left" ? "lg:grid-flow-col-dense" : ""}`}>
                <Div className={imagePosition === "left" ? "lg:col-start-2" : ""}>
                    <Title title={title} subtitle={subtitle} />
                    <Div className="space-y-6">
                        {features.map((feature, index) => (
                            <Div key={index} className="flex items-start group" >
                                <Div className="bg-primary-100 p-2 rounded-full mr-4 group-hover:bg-primary-300 transition-colors">
                                    {feature.icon || <CheckCircle size={20} className="text-primary" />}
                                </Div>
                                <Div>
                                    <h3 className="text-20 font-bold text-secondary-800 mb-1 group-hover:text-primary transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-14 text-secondary-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </Div>
                            </Div>
                        ))}
                    </Div>

                    {showLearnMore && (
                        <Div className="mt-8" >
                            <Link to={learnMoreLink} className="text-primary hover:text-primary-dark font-medium flex items-center group" >
                                {learnMoreText} <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Div>
                    )}
                </Div>

                <Div className={`relative ${imagePosition === "left" ? "lg:col-start-1" : ""}`}>
                    <Div className="absolute -top-6 -left-6 w-24 h-24 bg-linear-to-br from-primary-300 to-primary-600 rounded-2xl z-0 animate-float"></Div>
                    <img
                        src={image}
                        alt="Why choose us"
                        className="w-full h-auto rounded-2xl shadow-2xl relative z-10 transform hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                    <Div className="absolute -bottom-6 -right-6 w-24 h-24 bg-linear-to-tl from-secondary-200 to-secondary-300 rounded-2xl z-0 animate-float" style={{ animationDelay: "1s" }}></Div>
                </Div>
            </Div>
        </Div>
    );
};

export default WhyChooseUsSection;
