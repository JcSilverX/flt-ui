import cn from "@/lib/utils/cn";

type CarouselCaptionProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
};

export function CarouselCaption({
  children,
  className,
  reference: ref,
  ...props
}: CarouselCaptionProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-10 max-w-[70%] text-center bottom-0 inset-x-0 mx-auto mb-14",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
