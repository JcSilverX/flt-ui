import cn from "@/lib/utils/cn";

type CarouselItemProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
};

export function CarouselItem({ className, ...props }: CarouselItemProps) {
  const { reference: ref } = props;

  return (
    <div
      ref={ref}
      className={cn(
        "min-w-0 flex-shrink-0 flex-grow-0 basis-full pl-4",
        className,
        {}
      )}
      role="group"
      aria-roledescription="slide"
      {...props}
    />
  );
}
