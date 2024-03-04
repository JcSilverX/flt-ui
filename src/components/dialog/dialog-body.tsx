import cn from "@/lib/utils/cn";

export type DialogBodyProps = React.HTMLAttributes<HTMLDivElement> & {};

export default function DialogBody({ children, className }: DialogBodyProps) {
  return <div className={cn("relative flex-auto p-4", className)}>{children}</div>;
}
