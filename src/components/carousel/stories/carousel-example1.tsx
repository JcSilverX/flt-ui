"use client";

import cn from "@/lib/utils/cn";
import { wrap } from "@/lib/utils/wrap";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import React from "react";
import { CarouselContent } from "../carousel-content";
import {
  CarouselControlNext,
  CarouselControlPrevious,
} from "../carousel-control";
import { CarouselIndicator } from "../carousel-indicator";
import { CarouselItem } from "../carousel-item";
import CarouselContext, {
  TKeyboardEvent,
  TPointerEvent,
} from "@/context/carousel-context-provider";
import { useMeasure } from "@/lib/hooks/use-measure";

const SLIDE_COUNT = 5 as const;
const SLIDES = Array.from({ length: SLIDE_COUNT });

export function CarouselExample1() {
  return (
    <Carousel className="w-full max-w-md mx-auto">
      <div className="flex justify-center space-x-2">
        {SLIDES.map((_, index) => (
          <CarouselIndicator key={index} to={index} />
        ))}
      </div>

      <CarouselContent>
        {SLIDES.map((_, index) => (
          <CarouselItem key={index} id={`${index + 1}`}>
            <div className="pl-1">
              <div className="rounded-xl border shadow">
                <div className="flex aspect-video items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselControlPrevious>
        <ChevronLeftIcon width={24} height={24} />
      </CarouselControlPrevious>
      <CarouselControlNext>
        <ChevronRightIcon width={24} height={24} />
      </CarouselControlNext>
    </Carousel>
  );
}

type CarouselProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
  activeIndex?: number;
  keyboard?: boolean;
  touch?: boolean;
  interval?: number;
  autoPlay?: boolean;
  loop?: boolean;
  pause?: boolean;
  direction?: "backward" | "forward";
  orientation?: "horizontal" | "vertical";
  slide?: boolean;
  fade?: boolean;
};

export function Carousel({
  activeIndex = 0,
  keyboard,
  touch,
  interval = 5000,
  autoPlay = false,
  loop,
  pause,
  direction = "forward",
  orientation = "horizontal",
  slide = true,
  fade,
  className,
  ...props
}: CarouselProps) {
  const { children, reference: ref } = props;

  // state
  const [page, setPage] = React.useState<number>(activeIndex);
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const { width = 0, height = 0 } = useMeasure(carouselRef);
  const [isTransitioning, setIsTransitioning] = React.useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState<boolean>(autoPlay);

  // drag state
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const [dragStart, setDragStart] = React.useState<number>(0);
  const [dragDistance, setDragDistance] = React.useState<number>(0);
  const [startTime, setStartTime] = React.useState<number>(0);

  // derived state
  const dimension = orientation === "horizontal" ? width + 16 : height;
  const canScrollPrev = loop || page > 0;
  const canScrollNext = loop || page < SLIDE_COUNT - 1;

  // event handlers / actions
  const paginate = React.useCallback(
    (newDirection: number): void => {
      setPage(wrap(0, SLIDE_COUNT, page + newDirection));
    },
    [page]
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
        isTransitioning,
        slide,
        fade,
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
