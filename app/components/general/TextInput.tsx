import React from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
    ({ label, error, className, ...props }, ref) => {
        return (
            <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                    {label}
                </label>
                <input
                    ref={ref}
                    {...props}
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-primary-base/40 focus:border-primary-base ${error ? "border-red-300" : "border-secondary-200"
                        } ${className || ""}`}
                />
                {error && (
                    <div className="mt-1 text-xs text-red-600">
                        {error}
                    </div>
                )}
            </div>
        );
    }
);

export default TextInput;
