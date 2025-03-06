import * as React from "react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className = "", type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={`h-10 w-full rounded-md border bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 
                dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-400 ${className}`.trim()}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };
