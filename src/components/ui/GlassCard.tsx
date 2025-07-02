import React from "react";
import { cn } from "../../utils/helper";
import { Div } from "../general/BaseComponents";

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className, hover = true }) => {
    return (
        <Div
            className={cn(
                "backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-xl",
                hover && "hover:bg-white/20 hover:border-white/30 transition-all duration-300",
                className
            )}

        >
            {children}
        </Div>
    );
};

export default GlassCard;
