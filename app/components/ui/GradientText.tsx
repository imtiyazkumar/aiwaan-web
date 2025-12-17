import React from "react";
import { cn } from "../../utils/helper";

interface GradientTextProps {
    children: React.ReactNode;
    className?: string;
    gradient?: "primary" | "secondary" | "accent";
}

const GradientText: React.FC<GradientTextProps> = ({
    children,
    className,
    gradient = "primary"
}) => {
    const gradients = {
        primary: "bg-gradient-to-r from-primary-base to-primary-600",
        secondary: "bg-gradient-to-r from-secondary-500 to-secondary-600",
        accent: "bg-gradient-to-r from-primary-base via-primary-600 to-secondary-500"
    };

    return (
        <span className={cn(
            gradients[gradient],
            "bg-clip-text text-transparent",
            className
        )}>
            {children}
        </span>
    );
};

export default GradientText;
