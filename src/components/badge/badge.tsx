import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import cn from "@/lib/utils/cn";

const badgeVariants = cva(
  "inline-block items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-black/50 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-blue-500 text-gray-50 hover:bg-blue-500/90 shadow",
        secondary:
          "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-100/80 shadow",
        destructive:
          "border-transparent bg-red-500 text-gray-50 shadow hover:bg-red-500/90",
        outline: "text-gray-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    reference?: React.RefObject<HTMLSpanElement>;
  };

export default function Badge({ className, variant, ...props }: BadgeProps) {
  const { reference: ref } = props;

  return (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant }), className, {})}
      {...props}
    />
  );
}
