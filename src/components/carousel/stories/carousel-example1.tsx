"use client";

import Button from "@/components/button/button";
import { useDebounce } from "@/lib/hooks/use-debounce";
import cn from "@/lib/utils/cn";
import { wrap } from "@/lib/utils/wrap";
import React from "react";

const DRAG_TRESHOLD = 50 as const;
const SLIDE_COUNT = 5 as const;
const SLIDES = Array.from({ length: SLIDE_COUNT });

export function CarouselExample1() {
  // state
  const [page, setPage] = React.useState<number>(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const carouselContentRef = React.useRef<HTMLDivElement>(null);
  // const { width: clientWidth } = useMeasure(carouselContentRef);
  const [clientWidth, setClientWidth] = React.useState<number>(0);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const [dragStartX, setDragStartX] = React.useState<number>(0);
  const [dragDistance, setDragDistance] = React.useState<number>(0);
  const [direction, setDirection] = React.useState<"previous" | "next">("next");

  // derived state
  const debouncedDragDistance = useDebounce(dragDistance, 100);

  // event handlers / actions
  const paginate = React.useCallback(
    (newDirection: number): void =>
      setPage(wrap(0, SLIDE_COUNT + 1, page + newDirection)),
    [page]
  );

  const handleNext = React.useCallback((): void => {
    setIsTransitioning(true);
    setDirection("next");
    paginate(1);
  }, [paginate]);

  const handlePrev = React.useCallback((): void => {
    setIsTransitioning(true);
    setDirection("previous");
    paginate(-1);
  }, [paginate]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      console.log("key pressed");
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrev();
      }
    },
    [handleNext, handlePrev]
  );

  const handlePointerDown = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>): void => {
      setIsDragging(true);
      setDragStartX(event.clientX);

      event.currentTarget.setPointerCapture(event.pointerId);
      event.preventDefault();
    },
    []
  );

  const handlePointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>): void => {
      if (!isDragging) return;

      const newDistance = event.clientX - dragStartX;
      setDragDistance(newDistance);

      event.preventDefault();
    },
    [dragStartX, isDragging]
  );

  const handlePointerUp = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>): void => {
      setIsDragging(false);

      if (dragDistance < -DRAG_TRESHOLD) {
        handleNext();
      } else if (dragDistance > DRAG_TRESHOLD) {
        handlePrev();
      }

      setDragDistance(0);

      event.currentTarget.releasePointerCapture(event.pointerId);
      event.preventDefault();
    },
    [dragDistance, handleNext, handlePrev]
  );

  // useEffect
  React.useEffect(() => {
    const carouselContent = carouselContentRef.current;

    if (!carouselContent) return;

    setClientWidth(carouselContent.clientWidth);
  }, []);

  React.useEffect(() => {
    const carouselContent = carouselContentRef.current;

    if (!carouselContent) return;

    const firstPage = carouselContent.children[0] as HTMLDivElement;

    if (page === SLIDE_COUNT - 1 && dragDistance < -DRAG_TRESHOLD) {
      firstPage.style.transform = `translate3d(${
        SLIDE_COUNT * clientWidth
      }px, 0px, 0px)`;
    }

    if (page === 0 && dragDistance > DRAG_TRESHOLD) {
      setPage(SLIDE_COUNT);

      firstPage.style.transform = `translate3d(${
        SLIDE_COUNT * clientWidth
      }px, 0px, 0px)`;
    }

    setTimeout(() => {
      if (page === SLIDE_COUNT) {
        setIsTransitioning(false);

        if (dragDistance === 0) {
          setPage(0);
        }
        firstPage.style.transform = `translate3d(${0}px, 0px, 0px)`;
      }
    }, 400);
  }, [clientWidth, direction, dragDistance, page]);

  return (
    <div
      className="relative w-full max-w-xs mx-auto"
      role="region"
      aria-roledescription="carousel"
    >
      <div className="overflow-clip">
        <div
          ref={carouselContentRef}
          className={cn(
            "backface-hidden flex touch-pan-y -ml-4 transition-transform duration-500 ease-in-out",
            {
              "transition-none duration-0 ease-[none]":
                isDragging || !isTransitioning,
            }
          )}
          style={{
            transform: `translate3d(${
              -page * clientWidth + dragDistance
            }px, 0px, 0px)`,
          }}
          tabIndex={-1}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onKeyDown={handleKeyDown}
        >
          {SLIDES.map((_, index) => (
            <div
              key={index}
              className="min-w-0 flex-shrink-0 flex-grow-0 basis-full pl-4"
              role="group"
              aria-roledescription="slide"
            >
              <div className="pl-1">
                <div className="rounded-xl border shadow">
                  <div className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={handlePrev}>{"<"}</Button>
      <Button onClick={handleNext}>{">"}</Button>
    </div>
  );
}

// custom hooks
export type TSize = {
  width: number | undefined;
  height: number | undefined;
};

const initialSize: TSize = {
  width: undefined,
  height: undefined,
};

function useMeasure(ref: React.RefObject<HTMLElement>) {
  const [{ width, height }, setSize] = React.useState<TSize>(initialSize);

  React.useEffect(() => {
    const refx = ref.current;

    if (!refx) return;

    setSize({ width: refx.clientWidth, height: refx.clientHeight });
  }, [ref]);

  return { width, height };
}

// type CarouselControlProps = ButtonProps;

// function CarouselControl({
//   variant = "ghost",
//   className,
//   ...props
// }: CarouselControlProps) {
//   return (
//     <Button
//       variant={variant}
//       className={cn(
//         "absolute inset-y-0 my-auto z-10 text-gray-950/50 hover:bg-transparent",
//         className
//       )}
//       {...props}
//     />
//   );
// }

// React.useEffect(() => {
//   const carouselContent = carouselContentRef.current;

//   if (!carouselContent) return;

//   const firstChild = carouselContent.children[0] as HTMLDivElement;
//   const lastChild = carouselContent.children[
//     carouselContent.children.length - 1
//   ] as HTMLDivElement;

//   if (page === 0 && dragDistance) {
//     lastChild.style.transform = `translate3d(${
//       -SLIDE_COUNT * clientWidth
//     }px, 0px, 0px)`;
//   } else {
//     lastChild.style.transform = `translate3d(${0}px, 0px, 0px)`;
//   }

//   if (page === SLIDE_COUNT - 1 && dragDistance) {
//     firstChild.style.transform = `translate3d(${
//       SLIDE_COUNT * clientWidth
//     }px, 0px, 0px)`;
//   } else {
//     firstChild.style.transform = `translate3d(${0}px, 0px, 0px)`;
//   }
// }, [clientWidth, dragDistance, page]);
