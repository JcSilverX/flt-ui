"use client";

import Button, { ButtonProps } from "@/components/button/button";
import cn from "@/lib/utils/cn";
import { wrap } from "@/lib/utils/wrap";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import React from "react";

export function CarouselExample1() {
  // state
  const [page, setPage] = React.useState(0);
  const [direction, setDirection] = React.useState<"left" | "right">("left");

  // event handlers / actions
  const paginate = React.useCallback(
    (newDirection: number) => setPage(wrap(0, 3, page + newDirection)),
    [page]
  );

  const handleNext = React.useCallback((): void => paginate(1), [paginate]);
  const handlePrev = React.useCallback((): void => paginate(-1), [paginate]);

  return (
    <Carousel className="h-[200px]">
      <CarouselContent
        className="transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${page * 100}%)`,
        }}
      >
        <CarouselItem className="bg-gray-500/30">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
        </CarouselItem>
        <CarouselItem className="bg-gray-500/40">
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
        </CarouselItem>
        <CarouselItem className="bg-gray-500/50">
          <p>13</p>
          <p>14</p>
          <p>15</p>
          <p>16</p>
          <p>17</p>
          <p>18</p>
        </CarouselItem>
      </CarouselContent>

      {/* controls */}
      <CarouselControl
        onClick={handlePrev}
        className="left-0"
        aria-controls=""
        aria-label=""
      >
        <ChevronLeftIcon width={32} height={32} />
      </CarouselControl>
      <CarouselControl
        onClick={handleNext}
        className="right-0"
        aria-controls=""
        aria-label=""
      >
        <ChevronRightIcon width={32} height={32} />
      </CarouselControl>
    </Carousel>
  );
}

// components
type CarouselProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
};

function Carousel({
  children,
  className,
  reference: ref,
  ...props
}: CarouselProps) {
  return (
    <div
      ref={ref}
      className={cn("relative overflow-cli", className)}
      {...props}
    >
      {children}
    </div>
  );
}

type CarouselContentProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
};

function CarouselContent({
  children,
  className,
  ...props
}: CarouselContentProps) {
  return (
    <div className={cn("flex", className)} {...props}>
      {children}
    </div>
  );
}

type CarouselItemProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
};

function CarouselItem({ children, className, ...props }: CarouselItemProps) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-0 flex-shrink-0 flex-grow-0 basis-full", className)}
      {...props}
    >
      {children}
    </div>
  );
}

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

// utils / hooks

// "use client";

// import Carousel from "../carousel";
// import { CarouselCaption } from "../carousel-caption";
// import { CarouselContent } from "../carousel-content";
// import { CarouselItem } from "../carousel-item";

// export function CarouselExample1() {
//   return (
//     <Carousel className="grid grid-rows-[300px]">
//       <CarouselContent>
//         <CarouselItem className="bg-gray-400">
//           image here #1

//           {/* <CarouselCaption>
//             <h3>First slide label</h3>

//             <p>Some representative placeholder content for the first slide.</p>
//           </CarouselCaption> */}
//         </CarouselItem>
//         <CarouselItem className="bg-gray-400">
//           image here #2

//           {/* <CarouselCaption>
//             <h3>Second slide label</h3>

//             <p>Some representative placeholder content for the second slide.</p>
//           </CarouselCaption> */}
//         </CarouselItem>
//         <CarouselItem className="bg-gray-400">
//           image here #3

//           {/* <CarouselCaption>
//             <h3>Third slide label</h3>

//             <p>Some representative placeholder content for the third slide.</p>
//           </CarouselCaption> */}
//         </CarouselItem>
//       </CarouselContent>
//     </Carousel>
//   );
// }
