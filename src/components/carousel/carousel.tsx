"use client";

import React from "react";
import cn from "@/lib/utils/cn";
import CarouselContext from "@/context/carousel-context-provider";
import { useChildCount } from "@/lib/hooks/use-child-count";
import { wrap } from "@/lib/utils/wrap";
import { CarouselControl } from "./carousel-control";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

const TRESHOLD = 50 as const;

type CarouselProps = React.HTMLAttributes<HTMLDivElement> & {
  activeIndex?: number;
  controls?: boolean;
  keyboard?: boolean;
  touch?: boolean;
  interval?: number;
  loop?: boolean;
  reference?: React.RefObject<HTMLDivElement>;
};

export default function Carousel({
  children,
  activeIndex = 1,
  controls = true,
  keyboard,
  touch,
  interval = 5000,
  loop,
  className,
  reference: ref,
  ...props
}: CarouselProps) {
  // state
  const [page, setPage] = React.useState<number>(activeIndex);
  const [isTransitioning, setIsTransitioning] = React.useState<boolean>(false);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const [dragStartX, setDragStartX] = React.useState<number>(0);
  const [dragDistance, setDragDistance] = React.useState<number>(0);
  const carouselContentRef = React.useRef<HTMLDivElement>(null);
  const isClonedRef = React.useRef<boolean>(false);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const childCount = useChildCount(carouselContentRef);

  // derived state

  // event handlers / actions
  const paginate = React.useCallback(
    (newDirection: number): void =>
      setPage(wrap(0, childCount, page + newDirection)),
    [childCount, page]
  );

  const startAutoPlay = React.useCallback((): void => {
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true);
      paginate(1);
    }, interval);
  }, [interval, paginate]);

  const stopAutoPlay = React.useCallback((): void => {
    if (!intervalRef.current) return;

    clearInterval(intervalRef.current);
  }, []);

  const handleNext = React.useCallback((): void => {
    setIsTransitioning(true);

    paginate(1);
  }, [paginate]);

  const handlePrev = React.useCallback((): void => {
    setIsTransitioning(true);

    paginate(-1);
  }, [paginate]);

  const handleClick = React.useCallback((newDirection: number): void => {
    setIsTransitioning(true);

    setPage(newDirection);
  }, []);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>): void => {
      if (!keyboard) return;

      setIsTransitioning(true);

      if (event.key === "ArrowRight") {
        paginate(1);
      } else if (event.key === "ArrowLeft") {
        paginate(-1);
      }
    },
    [keyboard, paginate]
  );

  const handleMouseEnter = React.useCallback((): void => {
    const carouselContent = carouselContentRef.current;

    if (!carouselContent) return;

    carouselContentRef.current.focus();

    if (loop) {
      stopAutoPlay();
    }
  }, [loop, stopAutoPlay]);

  const handleMouseLeave = React.useCallback((): void => {
    const carouselContent = carouselContentRef.current;

    if (!carouselContent) return;

    carouselContentRef.current.blur();

    if (loop) {
      startAutoPlay();
    }
  }, [startAutoPlay, loop]);

  const handlePointerDown = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>): void => {
      setIsDragging(true);
      setDragStartX(event.clientX);
      setDragDistance(0);
    },
    []
  );

  const handlePointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>): void => {
      if (!isDragging) return;

      const newDistance = event.clientX - dragStartX;
      setDragDistance(newDistance);
    },
    [dragStartX, isDragging]
  );

  const handlePointerUp = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>): void => {
      const carouselContent = carouselContentRef.current;

      if (!carouselContent) return;

      if (!isDragging) return;

      setIsDragging(false);
      setIsTransitioning(true);

      if (dragDistance > TRESHOLD) {
        paginate(-1);
      } else if (dragDistance < -TRESHOLD) {
        paginate(1);
      }

      setDragDistance(0);
    },
    [dragDistance, isDragging, paginate]
  );

  const handleTransitionEnd = React.useCallback((): void => {
    const carouselContent = carouselContentRef.current;

    if (!carouselContent) return;

    if (page === 0) {
      setIsTransitioning(false);
      setPage(carouselContent.children.length - 2);
    }

    if (page === carouselContent.children.length - 1) {
      setIsTransitioning(false);
      setPage(1);
    }
  }, [page]);

  React.useEffect(() => {
    const carouselContent = carouselContentRef.current;

    if (!carouselContent || isClonedRef.current) return;

    carouselContent.prepend(
      carouselContent.children[carouselContent.children.length - 1].cloneNode(
        true
      )
    );

    carouselContent.append(carouselContent.children[1].cloneNode(true));

    isClonedRef.current = true;
  }, []);

  React.useEffect(() => {
    if (!loop) return;

    startAutoPlay();

    return () => stopAutoPlay();
  }, [startAutoPlay, loop, stopAutoPlay]);

  return (
    <CarouselContext.Provider
      value={{
        page,
        isTransitioning,
        carouselContentRef,
        handleClick,
        handleKeyDown,
        handleMouseEnter,
        handleMouseLeave,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
        handleTransitionEnd,
      }}
    >
      <div
        ref={ref}
        aria-live="off"
        className={cn("relative overflow-clip", className)}
        {...props}
      >
        {children}

        {controls && (
          <>
            {/* controls */}
            <CarouselControl
              onClick={handlePrev}
              className="left-0"
              aria-label="carousel items"
              aria-controls="previous page"
            >
              <ChevronLeftIcon width={32} height={32} />
            </CarouselControl>
            <CarouselControl
              onClick={handleNext}
              className="right-0"
              aria-label="carousel items"
              aria-controls="next page"
            >
              <ChevronRightIcon width={32} height={32} />
            </CarouselControl>
          </>
        )}
      </div>
    </CarouselContext.Provider>
  );
}
