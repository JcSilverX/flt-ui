"use client";

import Button, { ButtonProps } from "@/components/button/button";
import cn from "@/lib/utils/cn";
import { wrap } from "@/lib/utils/wrap";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import React from "react";

export function CarouselExample1() {
  // state
  const [page, setPage] = React.useState(1);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const carouselContentRef = React.useRef<HTMLDivElement>(null);
  const isClonedRef = React.useRef(false);
  const childCount = useChildCount(carouselContentRef);

  // event handlers / actions
  const paginate = React.useCallback(
    (newDirection: number) => setPage(wrap(0, childCount, page + newDirection)),
    [childCount, page]
  );

  const handleClick = React.useCallback((newDirection: number): void => {
    setIsTransitioning(true);

    setPage(newDirection);
  }, []);

  const handleNext = React.useCallback((): void => {
    setIsTransitioning(true);

    paginate(1);
  }, [paginate]);

  const handlePrev = React.useCallback((): void => {
    setIsTransitioning(true);

    paginate(-1);
  }, [paginate]);

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

  return (
    <Carousel>
      {/* indicators */}
      <CarouselIndicators>
        <CarouselIndicator onClick={() => handleClick(1)} />
        <CarouselIndicator onClick={() => handleClick(2)} />
        <CarouselIndicator onClick={() => handleClick(3)} />
      </CarouselIndicators>

      <CarouselContent
        reference={carouselContentRef}
        className={cn("transition-none duration-0", {
          "transition-transform duration-700 ease-in-out": isTransitioning,
        })}
        style={{
          transform: `translateX(-${page * 100}%)`,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        <CarouselItem data-jsx-slide="1" className="bg-gray-500/30 select-none">
          {
            // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
            <img
              src="https://placehold.co/600x400/gray/FFFFFF/png"
              alt="first slide"
              className="w-full"
            />
          }

          <CarouselCaption>
            <h3>First slide label</h3>

            <p>Some representative placeholder content for the first slide.</p>
          </CarouselCaption>
        </CarouselItem>
        <CarouselItem data-jsx-slide="2" className="bg-gray-500/40">
          {
            // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
            <img
              src="https://placehold.co/600x400/red/FFFFFF/png"
              alt="first slide"
              className="w-full"
            />
          }

          <CarouselCaption>
            <h3>Second slide label</h3>

            <p>Some representative placeholder content for the second slide.</p>
          </CarouselCaption>
        </CarouselItem>
        <CarouselItem data-jsx-slide="3" className="bg-gray-500/50">
          {
            // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
            <img
              src="https://placehold.co/600x400/blue/FFFFFF/png"
              alt="first slide"
              className="w-full"
            />
          }

          <CarouselCaption>
            <h3>Third slide label</h3>

            <p>Some representative placeholder content for the third slide.</p>
          </CarouselCaption>
        </CarouselItem>
      </CarouselContent>

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
      aria-live="off"
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
      aria-label="1 of 3"
      className={cn(
        "relative min-w-0 flex-shrink-0 flex-grow-0 basis-full backface-hidden",
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

type CarouselCaptionProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
};

function CarouselCaption({
  children,
  className,
  reference: ref,
  ...props
}: CarouselCaptionProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-10 max-w-[70%] text-center bottom-0 inset-x-0 mx-auto mb-14",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type CarouselIndicatorsProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
};

function CarouselIndicators({
  children,
  className,
  reference: ref,
  ...props
}: CarouselIndicatorsProps) {
  return (
    <div
      ref={ref}
      role="tablist"
      aria-label="slides"
      className={cn(
        "absolute max-w-[70%] grid grid-flow-col-dense place-content-center space-x-2 bottom-0 inset-x-0 mx-auto mb-8 z-10 pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type CarouselIndicatorProps = ButtonProps;

function CarouselIndicator({
  children,
  reference: ref,
  className,
  ...props
}: CarouselIndicatorProps) {
  return (
    <Button
      reference={ref}
      role="tab"
      aria-label="page 1"
      aria-selected={false}
      aria-controls="carousel-item-1"
      tabIndex={-1}
      size={"sm"}
      className={cn(
        "bg-gray-50 h-[.2175rem] w-[1.875rem] border-0 rounded-none pointer-events-auto",
        className
      )}
      {...props}
    />
  );
}

// utils / hooks
function useChildCount(ref: React.RefObject<HTMLElement>) {
  const [numberOfCols, setNumberOfCols] = React.useState<number>(0);

  React.useEffect(() => {
    const parentElement = ref.current!;

    // guard against `ref.current` being null.
    if (!parentElement) return;

    if (parentElement.childElementCount === 0) return;

    setNumberOfCols(parentElement.childElementCount);
  }, [ref]);

  return numberOfCols;
}
