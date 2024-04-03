import useCarouselContext from "@/lib/hooks/use-carousel-context";
import Button, { ButtonProps } from "../button/button";
import cn from "@/lib/utils/cn";

type CarouselControlProps = ButtonProps;

export function CarouselControlPrevious({
  className,
  ...props
}: CarouselControlProps) {
  const { handlePrev } = useCarouselContext();

  return (
    <CarouselControl
      onClick={handlePrev}
      className={cn("left-0", className, {})}
      aria-label="carousel items"
      aria-controls="previous page"
      {...props}
    />
  );
}

export function CarouselControlNext({
  className,
  ...props
}: CarouselControlProps) {
  const { handleNext } = useCarouselContext();

  return (
    <CarouselControl
      onClick={handleNext}
      className={cn("right-0", className, {})}
      aria-label="carousel items"
      aria-controls="next page"
      {...props}
    />
  );
}

function CarouselControl({
  variant = "outline",
  className,
  ...props
}: CarouselControlProps) {
  return (
    <Button
      variant={variant}
      size={"icon"}
      className={cn("rounded-full", className, {})}
      {...props}
    />
  );
}
