import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/utils/helper";
import React from "react";

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    loading?: boolean;
}

const buttonVariants = cva(
    "print:hidden rounded-full px-6 py-3 cursor-pointer font-medium text-16 flex justify-center items-center gap-2 select-none transition-all duration-300 text-center shadow-glow hover:shadow-glow-lg hover:scale-105",
    {
        variants: {
            variant: {
                primary_filled: "bg-primary text-white hover:bg-primary-600",
                dark_filled:
                    "bg-dark text-white hover:bg-neutral-700 active:bg-neutral-800",
                secondary_filled:
                    "bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-slate-base",
                dark_outlined:
                    "bg-transparent border border-dark text-dark hover:bg-neutral-300 active:bg-neutral-400 hover:scale-100 shadow-none"
            },
            width: {
                auto: "w-auto",
                full: "w-full"
            },
            height: {
                large: "h-14",
                medium: "h-12 text-sm",
                small: "h-8 text-xs"
            }
        },
        defaultVariants: {
            variant: "primary_filled",
            width: "auto",
            height: "medium"
        }
    }
);

const Button: React.FC<ButtonProps> = ({ className, variant, width, height, disabled, loading, children, ...props }) => {
    return (
        <button
            disabled={disabled || loading}
            className={cn("group", buttonVariants({ variant, width, height }), className,
                {
                    "cursor-not-allowed opacity-70": disabled || loading,
                    "bg-neutral-400 text-neutral-600": (disabled || loading) && (variant === "primary_filled" || variant === "dark_filled"),
                    "text-neutral-500 border-neutral-400": (disabled || loading) && variant === "dark_outlined"
                }
            )}
            {...props}
        >
            {loading ?
                <span className="animate-spin mr-2 border-2 border-white border-t-transparent rounded-full w-4 h-4"></span> :
                <span>{children}</span>
            }
        </button>
    );
};

export default Button;
