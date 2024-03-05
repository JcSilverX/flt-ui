import cn from "@/lib/utils/cn";

type CarouselIndicatorsProps = React.HTMLAttributes<HTMLDivElement> & {};

export function CarouselIndicators({ children, className }: CarouselIndicatorsProps) {
  return (
    <div className={cn('absolute max-w-[70%] grid grid-flow-col-dense place-content-center space-x-2 bottom-0 inset-x-0 mx-auto mb-4 z-10', className)}>{children}</div>
  );
}