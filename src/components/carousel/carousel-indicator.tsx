import Button, { ButtonProps } from "@/components/button/button";
import useCarouselContext from "@/lib/hooks/use-carousel-context";
import cn from "@/lib/utils/cn";

type CarouselIndicatorProps = ButtonProps & {
  to?: number;
};

export function CarouselIndicator({
  variant = "outline",
  to = 0,
  className,
  ...props
}: CarouselIndicatorProps) {
  const { page, handleClick } = useCarouselContext();

  return (
    <Button
      onClick={() => handleClick(to)}
      role={"tab"}
      aria-label={`page ${to + 1}`}
      aria-selected={page === to ? true : false}
      aria-controls={`carousel-item-${to + 1}`}
      variant={variant}
      className={cn("rounded-full", className, {
        "bg-gray-100": page === to,
      })}
      {...props}
    />
  );
}
