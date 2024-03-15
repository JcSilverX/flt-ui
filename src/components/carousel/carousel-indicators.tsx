import cn from "@/lib/utils/cn";

type CarouselIndicatorsProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
};

export function CarouselIndicators({
  children,
  className,
  reference: ref,
  ...props
}: CarouselIndicatorsProps) {
  return (
    <div
      ref={ref}
      role="tablist"
      aria-label="slides"
      className={cn(
        "absolute max-w-[70%] grid grid-flow-col-dense place-content-center space-x-2 bottom-0 inset-x-0 mx-auto mb-8 z-10 pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
