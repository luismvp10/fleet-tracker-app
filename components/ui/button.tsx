import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = "", variant = "default", size = "default", ...props }, ref) => {
        const baseStyles =
            "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

        const variantStyles = {
            default: "bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary-dark dark:text-primary-dark-foreground dark:hover:bg-primary-dark/90",
            destructive: "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:text-white dark:hover:bg-red-700",
            outline: "border border-gray-300 bg-white hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800",
            secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
            ghost: "hover:bg-gray-100 dark:hover:bg-gray-800",
            link: "text-blue-500 underline-offset-4 hover:underline dark:text-blue-400 dark:hover:text-blue-300",
        };

        const sizeStyles = {
            default: "h-10 px-4 py-2",
            sm: "h-8 px-3",
            lg: "h-12 px-6",
            icon: "h-10 w-10",
        };

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";
