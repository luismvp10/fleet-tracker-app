import * as React from "react";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className = "", ...props }, ref) => (
        <div
            ref={ref}
            className={`rounded-lg border bg-white text-black shadow-sm ${className}`.trim()}
            {...props}
        />
    )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className = "", ...props }, ref) => (
        <div ref={ref} className={`flex flex-col space-y-2 p-4 ${className}`.trim()} {...props} />
    )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className = "", ...props }, ref) => (
        <h3 ref={ref} className={`text-xl font-semibold ${className}`.trim()} {...props} />
    )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className = "", ...props }, ref) => (
        <p ref={ref} className={`text-sm text-gray-600 ${className}`.trim()} {...props} />
    )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className = "", ...props }, ref) => (
        <div ref={ref} className={`p-4 ${className}`.trim()} {...props} />
    )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className = "", ...props }, ref) => (
        <div ref={ref} className={`flex items-center p-4 ${className}`.trim()} {...props} />
    )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
