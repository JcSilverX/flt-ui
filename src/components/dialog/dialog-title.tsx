import cn from "@/lib/utils/cn";

type DialogTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export default function DialogTitle({ children, className }: DialogTitleProps) {
  return <div className={cn("mb-0 leading-tight", className)}>{children}</div>;
}
