import useCarouselContext from "@/lib/hooks/use-carousel-context";
import cn from "@/lib/utils/cn";
import React from "react";

type CarouselContentProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
};

export function CarouselContent({
  children,
  className,
  reference: ref,
  ...props
}: CarouselContentProps) {
  const {
    page,
    isTransitioning,
    carouselContentRef,
    handleKeyDown,
    handleMouseEnter,
    handleMouseLeave,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleTransitionEnd,
  } = useCarouselContext();

  return (
    <div
      ref={carouselContentRef}
      className={cn(
        "flex backface-hidden touch-pan-y transition-none duration-0",
        className,
        {
          "transition-transform duration-700 ease-in-out": isTransitioning,
        }
      )}
      {...props}
      style={{
        transform: `translateX(-${page * 100}%)`,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      onTransitionEnd={handleTransitionEnd}
      tabIndex={-1}
    >
      {children}
    </div>
  );
}
