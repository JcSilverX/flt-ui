"use client";

import cn from "@/lib/utils/cn";
import { wrap } from "@/lib/utils/wrap";
import React from "react";

const SLIDE_COUNT = 5 as const;
const SLIDES = Array.from({ length: SLIDE_COUNT });

export function CarouselExample1() {
  // state
  const [page, setPage] = React.useState<number>(0);
  const carouselContentRef = React.useRef<HTMLDivElement>(null);
  const { width: clientWidth } = useMeasure(carouselContentRef);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const [dragStartX, setDragStartX] = React.useState<number>(0);
  const [dragDistance, setDragDistance] = React.useState<number>(0);

  // derived state

  // event handlers/actions
  const paginate = React.useCallback(
    (newDirection: number): void =>
      setPage(wrap(0, SLIDES.length as number, page + newDirection)),
    [page]
  );

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ): void => {
    setIsDragging(true);
    setDragStartX(event.clientX);
    setDragDistance(0);
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ): void => {
    if (!isDragging) return;

    event.persist();

    const newDistance = event.clientX - dragStartX;
    setDragDistance(newDistance);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>): void => {
    if (dragDistance > 50) {
      paginate(-1);
    } else if (dragDistance < -50) {
      paginate(1);
    }

    setIsDragging(false);
    setDragDistance(0);
  };

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
            "backface-hidden touch-pan-y flex -ml-4 transition-transform duration-500 ease-in-out",
            {
              "transition-none duration-0 ease-[none]": isDragging,
            }
          )}
          style={{
            transform: `translate3d(${
              -page * clientWidth! + dragDistance
            }px, 0px, 0px)`,
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
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
    const carouselContent = ref.current;

    if (!carouselContent) return;

    setSize({
      width: carouselContent.clientWidth,
      height: carouselContent.clientHeight,
    });
  }, [ref]);

  return { width, height };
}
// import Button, { ButtonProps } from "@/components/button/button";
// import cn from "@/lib/utils/cn";
// import { wrap } from "@/lib/utils/wrap";
// import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
// import React from "react";

// export function CarouselExample1() {
//   // state
//   const [page, setPage] = React.useState<number>(0);
//   const [clientWidth, setClientWidth] = React.useState<number>(0);
//   const [isDragging, setIsDragging] = React.useState<boolean>(false);
//   const [dragStartX, setDragStartX] = React.useState<number>(0);
//   const [dragDistance, setDragDistance] = React.useState<number>(0);
//   const carouselContentRef = React.useRef<HTMLDivElement>(null);
//   const childCount = 5;

//   // derived state

//   // event handlers / actions
// const paginate = React.useCallback(
//   (newDirection: number): void =>
//     setPage(wrap(0, childCount, page + newDirection)),
//   [page]
// );

//   const handlePrev = React.useCallback((): void => {
//     paginate(-1);
//   }, [paginate]);

//   const handleNext = React.useCallback((): void => {
//     paginate(1);
//   }, [paginate]);

//   React.useEffect(() => {
//     const carouselContent = carouselContentRef.current;

//     if (!carouselContent) return;

//     setClientWidth(carouselContent.clientWidth);

//     const firstChild = carouselContent.children[0] as HTMLDivElement;

//     if (page === childCount - 1) {
//       firstChild.style.transform = `translate3d(${
//         childCount * clientWidth
//       }px, 0px, 0px)`;
//     } else {
//       firstChild.style.transform = `translate3d(0px, 0px, 0px)`;
//     }
//   }, [clientWidth, page]);

//   return (
//     <div className="w-full max-w-xs mx-auto">
//       <div className="relative overflow-hidden">
//         <div
//           ref={carouselContentRef}
//           className={cn(
//             "backface-hidden touch-pan-y flex -ml-4 transition-transform duration-500 ease-in-out",
// {
//   "transition-none duration-0 ease-[none]": isDragging,
// }
//           )}
//           style={{
//             transform: `translate3d(${
//               -page * clientWidth + dragDistance
//             }px, 0px, 0px)`,
//           }}
//           onMouseDown={(event) => {
//             setIsDragging(true);
//             setDragStartX(event.clientX);
//             setDragDistance(0);
//           }}
//           onMouseMove={(event) => {
//             if (!isDragging) return;

//             console.log("dragging");

//             setDragDistance(event.clientX - dragStartX);
//           }}
//           onMouseUp={(event) => {
//             setIsDragging(false);
//           }}
//         >
//           {Array.from({ length: childCount }).map((_, index) => (
//             <div
//               key={index}
//               className={cn(
//                 "min-w-0 flex-shrink-0 flex-grow-0 basis-full pl-4",
//                 {
//                   active: page === index,
//                 }
//               )}
//               role="group"
//               aria-roledescription="slide"
//             >
// <div className="pl-1">
//   <div className="rounded-xl border shadow">
//     <div className="flex aspect-square items-center justify-center p-6">
//       <span className="text-4xl font-semibold">{index + 1}</span>
//     </div>
//   </div>
// </div>
//             </div>
//           ))}
//         </div>

//         <CarouselControl
//           onClick={handlePrev}
//           className="left-0"
//           aria-label="carousel items"
//           aria-controls="previous page"
//         >
//           <ChevronLeftIcon width={32} height={32} />
//         </CarouselControl>
//         <CarouselControl
//           onClick={handleNext}
//           className="right-0"
//           aria-label="carousel items"
//           aria-controls="next page"
//         >
//           <ChevronRightIcon width={32} height={32} />
//         </CarouselControl>
//       </div>
//     </div>
//   );
// }

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
