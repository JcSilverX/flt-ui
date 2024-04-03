import useCarouselContext from "@/lib/hooks/use-carousel-context";
import cn from "@/lib/utils/cn";
import React from "react";

type CarouselContentProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
};

export function CarouselContent({ className, ...props }: CarouselContentProps) {
  const { reference: ref } = props;

  const { page, slideWidth, slide, fade, dragDistance, isDragging } =
    useCarouselContext();

  const {
    carouselRef,
    handlePointerEnter,
    handlePointerLeave,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
  } = useCarouselContext();

  return (
    <div
      ref={carouselRef}
      className="overflow-clip"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
    >
      <div
        ref={ref}
        style={{
          transform: `translate3d(${
            -page * slideWidth + dragDistance
          }px, 0px, 0px)`,
        }}
        className={cn(
          "backface-hidden flex touch-pan-x -ml-4 transition-transform duration-500 ease-in-out",
          className,
          {
            "transition-none duration-0 ease-[none]": isDragging,
          }
        )}
        {...props}
      />
    </div>
  );
}
