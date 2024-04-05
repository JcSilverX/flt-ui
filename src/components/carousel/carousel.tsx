"use client";

import CarouselContext, {
  TKeyboardEvent,
  TPointerEvent,
} from "@/context/carousel-context-provider";
import { useMeasure } from "@/lib/hooks/use-measure";
import cn from "@/lib/utils/cn";
import { wrap } from "framer-motion";
import React from "react";

type CarouselProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
  activeIndex?: number;
  keyboard?: boolean;
  touch?: boolean;
  interval?: number;
  autoPlay?: boolean;
  loop?: boolean;
  direction?: "backward" | "forward";
  orientation?: "horizontal" | "vertical";
  slide?: boolean;
};

export default function Carousel({
  activeIndex = 0,
  keyboard,
  touch,
  interval = 5000,
  autoPlay = false,
  loop,
  direction = "forward",
  orientation = "horizontal",
  slide = true,
  className,
  ...props
}: CarouselProps) {
  const { children, reference: ref } = props;

  // state
  const [page, setPage] = React.useState<number>(activeIndex);
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const { width = 0, height = 0 } = useMeasure(carouselRef);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState<boolean>(autoPlay);

  // drag state
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const [dragStart, setDragStart] = React.useState<number>(0);
  const [dragDistance, setDragDistance] = React.useState<number>(0);
  const [startTime, setStartTime] = React.useState<number>(0);

  let slideCount = 1;

  forEach(children, (child, index) => slideCount++);

  // derived state
  const dimension = orientation === "horizontal" ? width + 16 : height;
  const canScrollPrev = loop || page > 0;
  const canScrollNext = loop || page < slideCount - 1;

  // event handlers / actions
  const paginate = React.useCallback(
    (newDirection: number): void => {
      setPage(wrap(0, slideCount, page + newDirection));
    },
    [slideCount, page]
  );

  const handlePrev = React.useCallback((): void => {
    paginate(-1);
  }, [paginate]);

  const handleNext = React.useCallback((): void => {
    paginate(1);
  }, [paginate]);

  const handleClick = (newDirection: number): void => setPage(newDirection);

  const handleKeyDown = (evt: TKeyboardEvent): void => {
    if (!keyboard) return;

    if (evt.key === "ArrowLeft") {
      evt.preventDefault();
      paginate(-1);
    } else if (evt.key === "ArrowRight") {
      evt.preventDefault();
      paginate(1);
    }
  };

  const handlePointerEnter = (evt: TPointerEvent): void =>
    setIsAutoPlaying(false);

  const handlePointerLeave = (evt: TPointerEvent): void =>
    setIsAutoPlaying(autoPlay && !isAutoPlaying);

  const handlePointerDown = (evt: TPointerEvent): void => {
    setIsDragging(true);

    if (orientation === "horizontal") {
      setDragStart(evt.clientX);
    } else if (orientation === "vertical") {
      setDragStart(evt.clientY);
    }

    setStartTime(new Date().getTime());

    evt.currentTarget.setPointerCapture(evt.pointerId);
    evt.preventDefault();
  };

  const handlePointerMove = (evt: TPointerEvent): void => {
    if (!isDragging) return;

    const newDistance =
      orientation === "horizontal"
        ? evt.clientX - dragStart
        : evt.clientY - dragStart;
    setDragDistance(newDistance);

    evt.preventDefault();
  };

  const handlePointerUp = (evt: TPointerEvent): void => {
    setIsDragging(false);

    const nowTime = new Date().getTime();
    const diffTime = nowTime - startTime;
    const velocity = Math.abs(dragDistance / diffTime);

    const isGesture = velocity > 0.5;

    if (isGesture) {
      if (dragDistance > 0 && canScrollPrev) {
        handlePrev();
      } else if (dragDistance < 0 && canScrollNext) {
        handleNext();
      }
    }

    setDragDistance(0);

    evt.currentTarget.releasePointerCapture(evt.pointerId);
    evt.preventDefault();
  };

  const handlePointerCancel = (evt: TPointerEvent): void => {
    setIsDragging(false);
    setDragDistance(0);
  };

  // useEffect
  React.useEffect(() => {
    if (!isAutoPlaying) return;

    const intervalId = setInterval(() => {
      if (direction === "backward") {
        handlePrev();
      } else if (direction === "forward") {
        handleNext();
      }
    }, interval);

    return () => clearInterval(intervalId);
  }, [direction, handleNext, handlePrev, interval, isAutoPlaying]);

  return (
    <CarouselContext.Provider
      value={{
        page,
        carouselRef,
        dimension,
        slide,
        dragDistance,
        isDragging,
        canScrollPrev,
        canScrollNext,
        orientation,
        handlePrev,
        handleNext,
        handleClick,
        handlePointerEnter,
        handlePointerLeave,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
        handlePointerCancel,
      }}
    >
      <div
        ref={ref}
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      />
    </CarouselContext.Provider>
  );
}

function forEach<T>(
  children: React.ReactNode,
  func: (el: React.ReactElement<T>, index: number) => void
) {
  let index = 0;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement<T>(child)) func(child, index++);
  });
}
