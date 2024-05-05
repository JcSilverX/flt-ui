import cn from "@/lib/utils/cn";
import React from "react";

type SkeletonProps = React.HTMLAttributes<HTMLSpanElement> & {
  reference?: React.RefObject<HTMLSpanElement> | undefined;
};

export default function Skeleton({ className, ...props }: SkeletonProps) {
  const { reference: ref } = props;

  return (
    <span
      ref={ref}
      className={cn(
        "block rounded-md bg-black/10 animate-pulse",
        className,
        {}
      )}
      {...props}
    />
  );
}
