import Button, { ButtonProps } from "@/components/button/button";
import useCarouselContext from "@/lib/hooks/use-carousel-context";
import cn from "@/lib/utils/cn";

type CarouselIndicatorProps = ButtonProps & {
  to?: number;
};

export function CarouselIndicator({
  children,
  reference: ref,
  to,
  className,
  ...props
}: CarouselIndicatorProps) {
  const { handleClick } = useCarouselContext();

  return (
    <Button
      reference={ref}
      role="tab"
      aria-label={`page ${to}`}
      aria-selected={false}
      aria-controls={`carousel-item-${to}`}
      tabIndex={-1}
      size={"sm"}
      onClick={() => handleClick(to as number)}
      className={cn(
        "bg-gray-50 h-[.2175rem] w-[1.875rem] border-0 rounded-none pointer-events-auto",
        className
      )}
      {...props}
    />
  );
}
