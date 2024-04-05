import useCarouselContext from "@/lib/hooks/use-carousel-context";
import cn from "@/lib/utils/cn";
import React from "react";

type CarouselContentProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
};

export function CarouselContent({ className, ...props }: CarouselContentProps) {
  const { reference: ref } = props;

  const { page, dimension, slide, dragDistance, isDragging } =
    useCarouselContext();

  const {
    carouselRef,
    handlePointerEnter,
    handlePointerLeave,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
    orientation,
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
          transform:
            orientation === "horizontal"
              ? `translate3d(${-page * dimension + dragDistance}px, 0px, 0px)`
              : `translate3d(0px, ${-page * dimension + dragDistance}px, 0px)`,
        }}
        className={cn(
          "backface-hidden flex transition-transform duration-500 ease-in-out",
          className,
          {
            "transition-none duration-0 ease-[none]": isDragging || !slide,
            "touch-pan-x -ml-4": orientation === "horizontal",
            "flex-col touch-pan-y -mt-1": orientation === "vertical",
          }
        )}
        {...props}
      />
    </div>
  );
}
