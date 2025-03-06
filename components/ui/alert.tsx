import * as React from "react";

const Alert = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "destructive" }
>(({ className, variant = "default", ...props }, ref) => {
    const variantClasses = {
        default: "bg-white text-black border-gray-300",
        destructive: "border-red-500 text-red-700 bg-red-100",
    };

    return (
        <div
            ref={ref}
            role="alert"
            className={`relative w-full rounded-lg border p-4 ${variantClasses[variant]} ${className || ""}`.trim()}
            {...props}
        />
    );
});
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h5
        ref={ref}
        className={`mb-1 font-medium leading-none tracking-tight ${className || ""}`.trim()}
        {...props}
    />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={`text-sm ${className || ""}`.trim()}
        {...props}
    />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
