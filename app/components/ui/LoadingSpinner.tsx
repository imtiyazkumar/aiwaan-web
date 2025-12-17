import React from "react";
import { Div } from "../general/BaseComponents";

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg";
    color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = "md",
    color = "text-primary-base"
}) => {
    const sizes = {
        sm: "w-4 h-4",
        md: "w-8 h-8",
        lg: "w-12 h-12"
    };

    return (
        <Div
            className={`${sizes[size]} ${color}`}

        >
            <svg
                className="w-full h-full"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="31.416"
                    strokeDashoffset="31.416"
                    className="opacity-25"
                />
                <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="31.416"
                    strokeDashoffset="23.562"
                    className="opacity-75"
                />
            </svg>
        </Div>
    );
};

export default LoadingSpinner;
