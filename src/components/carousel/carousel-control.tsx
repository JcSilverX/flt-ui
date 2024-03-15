import Button, { ButtonProps } from "../button/button";
import cn from "@/lib/utils/cn";

type CarouselControlProps = ButtonProps;

export function CarouselControl({
  variant = "ghost",
  className,
  ...props
}: CarouselControlProps) {
  return (
    <Button
      variant={variant}
      className={cn(
        "absolute inset-y-0 my-auto z-10 text-gray-950/50 hover:bg-transparent",
        className
      )}
      {...props}
    />
  );
}
