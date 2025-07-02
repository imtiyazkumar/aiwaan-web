import React from "react";
import { Div } from "../general/BaseComponents";
import GlassCard from "../ui/GlassCard";

interface Stat {
    icon: React.ReactNode;
    number: string;
    label: string;
    description?: string;
}

interface StatsSectionProps {
    stats: Stat[];
    columns?: 2 | 3 | 4;
    backgroundColor?: "transparent" | "gradient" | "white";
}

const StatsSection: React.FC<StatsSectionProps> = ({
    stats,
    columns = 4,
    backgroundColor = "transparent"
}) => {
    const columnClasses = {
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-3",
        4: "grid-cols-2 md:grid-cols-4"
    };

    const backgroundClasses = {
        transparent: "",
        gradient: "bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl mx-2 my-8 py-12",
        white: "bg-white rounded-2xl mx-2 my-8 shadow-lg py-12"
    };

    return (
        <Div

            className={`py-12 px-2 ${backgroundClasses[backgroundColor]}`}
        >
            <Div className={`grid ${columnClasses[columns]} gap-4`}>
                {stats.map((stat, index) => (
                    <Div
                        key={index}

                    >
                        <GlassCard className="p-4 text-center group hover:shadow-lg transition-all duration-300">
                            <Div className="text-primary-base mb-2 flex justify-center group-hover:scale-110 transition-transform">
                                {stat.icon}
                            </Div>
                            <Div className="text-32 font-bold text-secondary-800 mb-1 group-hover:text-primary-base transition-colors">
                                {stat.number}
                            </Div>
                            <Div className="text-14 text-secondary-600 font-medium mb-1">
                                {stat.label}
                            </Div>
                            {stat.description && (
                                <Div className="text-12 text-secondary-500">
                                    {stat.description}
                                </Div>
                            )}
                        </GlassCard>
                    </Div>
                ))}
            </Div>
        </Div>
    );
};

export default StatsSection;
