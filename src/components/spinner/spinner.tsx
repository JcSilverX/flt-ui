import React from "react";
import cn from "@/lib/utils/cn";

export function SpinnerExample() {
  return (
    <>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </>
  );
}

type SpinnerProps = React.HTMLAttributes<HTMLSpanElement> & {
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
      className={cn(
        "inline-block border-black border-r-[transparent] rounded-full animate-spin",
        className,
        {
          "h-8 w-8 border-[.25em]": size === "sm",
          "h-16 w-16 border-[.35em]": size === "md",
          "h-32 w-32 border-[.50em]": size === "lg",
        }
      )}
      {...props}
    >
      <span className="invisible">Loading...</span>
    </span>
  );
}
