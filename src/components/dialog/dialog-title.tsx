import cn from "@/lib/utils/cn";

export type DialogTitleProps = React.HtmlHTMLAttributes<HTMLHeadingElement> & {};

export default function DialogTitle({ children, className }: DialogTitleProps) {
  return <div className={cn("mb-0 leading-tight", className)}>{children}</div>;
}
