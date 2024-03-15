import useCarouselContext from "@/lib/hooks/use-carousel-context";
import cn from "@/lib/utils/cn";

type CarouselItemProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
};

export function CarouselItem({
  children,
  className,
  reference: ref,
  ...props
}: CarouselItemProps) {
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "relative min-w-0 flex-shrink-0 flex-grow-0 basis-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
