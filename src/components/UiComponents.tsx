import React, { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ButtonHTMLAttributes } from "react";

// Text Input component
interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export const TextInput: React.FC<TextInputProps> = ({
    label,
    error,
    className = "",
    id,
    ...props
}) => {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="block text-secondary-700 mb-2">
                    {label}
                </label>
            )}
            <input
                id={id}
                className={`w-full px-4 py-3 border ${error ? "border-red-400" : "border-neutral-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 ${className}`}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};

// Textarea component
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
    label,
    error,
    className = "",
    id,
    rows = 6,
    ...props
}) => {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="block text-secondary-700 mb-2">
                    {label}
                </label>
            )}
            <textarea
                id={id}
                rows={rows}
                className={`w-full px-4 py-3 border ${error ? "border-red-400" : "border-neutral-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 ${className}`}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};

// Select Dropdown component
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: Array<{ value: string; label: string }>;
}

export const Select: React.FC<SelectProps> = ({
    label,
    error,
    options,
    className = "",
    id,
    ...props
}) => {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="block text-secondary-700 mb-2">
                    {label}
                </label>
            )}
            <select
                id={id}
                className={`w-full px-4 py-3 border ${error ? "border-red-400" : "border-neutral-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 bg-white ${className}`}
                {...props}
            >
                <option value="" disabled>Select an option</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};

// Checkbox component
interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
    label,
    className = "",
    id,
    ...props
}) => {
    return (
        <div className="flex items-center">
            <input
                type="checkbox"
                id={id}
                className={`w-4 h-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-400 ${className}`}
                {...props}
            />
            <label htmlFor={id} className="ml-2 text-secondary-600">
                {label}
            </label>
        </div>
    );
};

// Radio component
interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const Radio: React.FC<RadioProps> = ({
    label,
    className = "",
    id,
    ...props
}) => {
    return (
        <div className="flex items-center">
            <input
                type="radio"
                id={id}
                className={`w-4 h-4 text-primary-500 border-neutral-300 focus:ring-primary-400 ${className}`}
                {...props}
            />
            <label htmlFor={id} className="ml-2 text-secondary-600">
                {label}
            </label>
        </div>
    );
};

// Button component
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline";
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    isLoading = false,
    className = "",
    disabled,
    ...props
}) => {
    const baseClasses = "px-8 py-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-70";

    const variantClasses = {
        primary: "bg-[#061C3D] text-white hover:bg-secondary-800",
        secondary: "bg-primary-500 text-white hover:bg-primary-600",
        outline: "border border-primary-500 text-primary-500 hover:bg-primary-50"
    };

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? "Loading..." : children}
        </button>
    );
};

// Form Section Title component
interface FormTitleProps {
    title: string;
    highlight?: string;
    description?: string;
}

export const FormTitle: React.FC<FormTitleProps> = ({
    title,
    highlight,
    description
}) => {
    return (
        <div className="mb-8">
            <div className="flex items-center mb-4">
                <h2 className="text-4xl font-bold text-secondary-900">
                    {title} {highlight && (
                        <span className="bg-primary-100 text-primary-500 px-3 py-1 rounded">{highlight}</span>
                    )}
                </h2>
            </div>
            <div className="relative">
                <div className="h-1 bg-primary-400 w-[200px]"></div>
                <div className="h-1 bg-neutral-200 w-[100px] absolute left-[200px] top-0"></div>
            </div>
            {description && (
                <p className="mt-4 text-secondary-600">{description}</p>
            )}
        </div>
    );
};

// Form group component for 2-column layout
interface FormGroupProps {
    children: React.ReactNode;
    columns?: 1 | 2 | 3;
    className?: string;
}

export const FormGroup: React.FC<FormGroupProps> = ({
    children,
    columns = 2,
    className = ""
}) => {
    const columnClasses = {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-3"
    };

    return (
        <div className={`grid ${columnClasses[columns]} gap-6 ${className}`}>
            {children}
        </div>
    );
};

// Form container
export const FormContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className = ""
}) => {
    return (
        <div className={`w-full mx-auto bg-white rounded-lg shadow-sm p-8 ${className}`}>
            {children}
        </div>
    );
};
