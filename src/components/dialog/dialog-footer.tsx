import cn from "@/lib/utils/cn";

export type DialogFooterProps = React.HTMLAttributes<HTMLDivElement> & {};

export default function DialogFooter({ children, className }: DialogFooterProps) {
  return (
    <div className={cn("flex flex-shrink-0 flex-wrap items-center justify-end p-[calc(1rem_-_.5rem_*_.5)] bg-inherit rounded-b-full border-t", className)}>
      {children}
    </div>
  );
}
