import useCarouselContext from "@/lib/hooks/use-carousel-context";
import cn from "@/lib/utils/cn";

type CarouselItemProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
};

export function CarouselItem({ className, ...props }: CarouselItemProps) {
  const { reference: ref } = props;

  const { orientation } = useCarouselContext();

  return (
    <div
      ref={ref}
      className={cn("min-w-0 flex-shrink-0 flex-grow-0 basis-full", className, {
        "pl-4": orientation === "horizontal",
        "pt-4": orientation === "vertical",
      })}
      role="group"
      aria-roledescription="slide"
      {...props}
    />
  );
}
