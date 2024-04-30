import React from "react";
import cn from "@/lib/utils/cn";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  reference?: React.RefObject<HTMLTextAreaElement>;
};

export default function Textarea({ className, ...props }: TextareaProps) {
  const { reference: ref } = props;

  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[3.75rem] w-full rounded-md border border-black/10 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-900/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/50 disabled:cursor-not-allowed disabled:opacity-50",
        className,
        {}
      )}
      {...props}
    />
  );
}
