"use client";

import Button, { ButtonProps } from "@/components/button/button";
import cn from "@/lib/utils/cn";
import { wrap } from "@/lib/utils/wrap";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import React from "react";

export function CarouselExample1() {
  // state
  const [page, setPage] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const carouselContentRef = React.useRef<HTMLDivElement>(null);

  // event handlers / actions
  const paginate = React.useCallback(
    (newDirection: number) => setPage(wrap(0, 3, page + newDirection)),
    [page]
  );

  const handleNext = React.useCallback((): void => {
    setIsTransitioning(true);

    paginate(1);
  }, [paginate]);

  const handlePrev = React.useCallback((): void => {
    setIsTransitioning(true);

    paginate(-1);
  }, [paginate]);

  const handleTransitionEnd = React.useCallback((): void => {
    setIsTransitioning(false);

    const carouselContent = carouselContentRef.current;

    if (!carouselContent) return;

    if (page === 0) {
      const lastPage =
        carouselContent.children[carouselContent.children.length - 1];
      carouselContent.insertBefore(
        lastPage.cloneNode(true),
        carouselContent.firstChild
      );
      carouselContent.removeChild(lastPage);
      setPage(1);
    } else if (page === carouselContent.children.length - 1) {
      const firstPage = carouselContent.children[0];
      carouselContent.appendChild(firstPage.cloneNode(true));
      carouselContent.removeChild(firstPage);
      setPage(page - 1);
    }
  }, [page]);

  return (
    <Carousel>
      <CarouselContent
        reference={carouselContentRef}
        className={cn("transition-transform duration-0 ease-in-out", {
          "duration-700": isTransitioning,
        })}
        style={{
          transform: `translateX(-${page * 100}%)`,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        <CarouselItem data-jsx-slide="1" className="bg-gray-500/30">
          {
            // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
            <img
              src="https://placehold.co/600x400/gray/FFFFFF/png"
              alt="first slide"
            />
          }
        </CarouselItem>
        <CarouselItem data-jsx-slide="2" className="bg-gray-500/40">
          {
            // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
            <img
              src="https://placehold.co/600x400/red/FFFFFF/png"
              alt="first slide"
            />
          }
        </CarouselItem>
        <CarouselItem data-jsx-slide="3" className="bg-gray-500/50">
          {
            // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
            <img
              src="https://placehold.co/600x400/blue/FFFFFF/png"
              alt="first slide"
            />
          }
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
      className={cn("relative overflow-clip", className)}
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
  reference: ref,
  ...props
}: CarouselContentProps) {
  return (
    <div ref={ref} className={cn("flex", className)} {...props}>
      {children}
    </div>
  );
}

type CarouselItemProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
};

function CarouselItem({
  children,
  className,
  reference: ref,
  ...props
}: CarouselItemProps) {
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 flex-shrink-0 flex-grow-0 basis-full backface-hidden",
        className
      )}
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
