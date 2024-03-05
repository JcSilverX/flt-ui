"use client";

import CarouselContext from "@/context/carousel-context-provider";
import cn from "@/lib/utils/cn";
import { AnimatePresence, PanInfo, motion, useMotionValue } from "framer-motion";
import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { CarouselControl } from "./carousel-control";
import { CarouselIndicators } from "./carousel-indicators";


const TRESHOLD: number = 10000 as const;

type CarouselProps = React.HTMLAttributes<HTMLDivElement> & {
};

export default function Carousel({
  children,
  className }: CarouselProps) {
  const [page, setPage] = React.useState<number>(0);
  const [direction, setDirection] = React.useState<number>(0);
  const carouselContentRef = React.useRef<HTMLDivElement>(null);
  const childCount = useChildCount(carouselContentRef);

  const dragX = useMotionValue(0);

  const paginate = (newDirection: number): void => {
  };

  // event handlers / actions
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
    const x = Math.abs(dragX.get());

    if (x > TRESHOLD) {
      if (dragX.get() < 0) {
        paginate(1); // Next page
      } else {
        paginate(-1); // Previous page
      }
    }
  };


  return (
    <CarouselContext.Provider
      value={{
        page,
        direction,
        childCount,
        carouselContentRef,
        dragX,
        handleDragEnd,
      }}
    >
      <AnimatePresence>
        <motion.div key={"carousel"} className={cn("relative overflow-clip", className)}>
          {
            true &&
            <CarouselIndicators>
              {
                Array.from({ length: childCount }).map((_, index) => (
                  <span key={index} onClick={() => setPage(index)}>
                    {index + 1}
                  </span>
                ))
              }
            </CarouselIndicators>
          }
          {children}
          {
            true && <>
              <CarouselControl onClick={() => setPage((prev) => (prev - 1 + childCount) % childCount)} className="left-0" aria-controls="" aria-label=""><ChevronLeftIcon width={32} height={32} /></CarouselControl>
              <CarouselControl onClick={() => setPage((prev) => (prev + 1) % childCount)} className="right-0" aria-controls="" aria-label=""><ChevronRightIcon width={32} height={32} /></CarouselControl>
            </>
          }
        </motion.div>
      </AnimatePresence>
    </CarouselContext.Provider >
  );
}

// utils / hooks
function useChildCount(ref: React.RefObject<HTMLElement>) {
  const [numberOfCols, setNumberOfCols] = React.useState<number>(0);

  React.useEffect(() => {
    const parentElement = ref.current!;

    // guard against `ref.current` being null.
    if (!parentElement) return;

    // function to update the child count.
    // const updateChildCount = (): void => setNumberOfCols(parentElement.childElementCount);
    if (parentElement.childElementCount === 0) return;

    setNumberOfCols(parentElement.childElementCount)

    // // observer function to track mutations
    // const observer = new MutationObserver(updateChildCount);
    // observer.observe(parentElement, { childList: true, subtree: true });

    // // cleanup function
    // return (() => observer.disconnect());
  }, [ref]);

  return numberOfCols;
}
