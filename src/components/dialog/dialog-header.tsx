import cn from "@/lib/utils/cn";

export type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement> & {};

export default function DialogHeader({ children, className }: DialogHeaderProps) {
  return (
    <div className={cn("flex flex-shrink-0 items-center justify-between p-4 rounded-t-full border-b", className)}>
      {children}
    </div>
  );
}
