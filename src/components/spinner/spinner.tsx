import React from "react";
import cn from "@/lib/utils/cn";
import { VariantProps, cva } from "class-variance-authority";

const SpinnerVariants = cva(
  "inline-block border-black border-r-[transparent] rounded-full animate-spin",
  {
    variants: {
      size: {
        sm: "h-8 w-8 border-[.25em]",
        md: "h-16 w-16 border-[.35em]",
        lg: "h-32 w-32 border-[.50em]",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
);

export function SpinnerExample() {
  return (
    <>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </>
  );
}

type SpinnerProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof SpinnerVariants> & {
    reference?: React.RefObject<HTMLSpanElement>;
    size?: "sm" | "md" | "lg";
  };

export default function Spinner({
  size = "sm",
  className,
  ...props
}: SpinnerProps) {
  const { children, reference: ref } = props;

  return (
    <span
      ref={ref}
      role="status"
      className={cn(SpinnerVariants({ size, className }))}
      {...props}
    >
      <span className="invisible">Loading...</span>
    </span>
  );
}
