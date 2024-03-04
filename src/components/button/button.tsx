import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import cn from "@/lib/utils/cn";

const ButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-gray-300",
  {
    variants: {
      variant: {
        default: "bg-gray-900 text-gray-50 shadow hover:bg-gray-900/90",
        destructive: "bg-red-500 text-gray-50 hover:bg-red-500/90 shadow-sm",
        outline:
          "border border-gray-200 bg-transparent hover:bg-gray-100 hover:text-gray-900 shadow-sm",
        primary: "bg-blue-500 text-gray-50 hover:bg-blue-500/90 shadow-sm",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-100/80 shadow-sm",
        ghost: "hover:bg-gray-100 hover:text-gray-900",
        link: "text-gray-900 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof ButtonVariants> & {
    reference?: React.RefObject<HTMLButtonElement>;
  };

export default function Button({
  children,
  variant,
  size,
  className,
  ...props
}: ButtonProps) {
  const { reference: ref } = props;

  return (
    <button
      ref={ref}
      className={cn(ButtonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  );
}
