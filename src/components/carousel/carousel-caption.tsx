import cn from "@/lib/utils/cn";

type CarouselCaptionProps = React.HTMLAttributes<HTMLDivElement> & {};

export function CarouselCaption({ children, className }: CarouselCaptionProps) {
  return <div className={cn('absolute max-w-[70%] text-center bottom-0 inset-x-0 mx-auto mb-[3rem] z-10', className)}>{children}</div>;
}