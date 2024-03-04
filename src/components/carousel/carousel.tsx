"use client";

import CarouselContext from "@/context/carousel-context-provider";
import useCarouselContext from "@/lib/hooks/use-carousel-context";
import cn from "@/lib/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Button, { ButtonProps } from "../button/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

export function CarouselExample1() {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem className="w-full h-full bg-gray-400">one</CarouselItem>
        <CarouselItem className="w-full h-full bg-gray-400">two</CarouselItem>
        <CarouselItem className="w-full h-full bg-gray-400">three</CarouselItem>
        <CarouselItem className="w-full h-full bg-gray-400">four</CarouselItem>
        <CarouselItem className="w-full h-full bg-gray-400">five</CarouselItem>
        <CarouselItem className="w-full h-full bg-gray-400">six</CarouselItem>
        <CarouselItem className="w-full h-full bg-gray-400">seven</CarouselItem>
        <CarouselItem className="w-full h-full bg-gray-400">eight</CarouselItem>
        <CarouselItem className="w-full h-full bg-gray-400">nine</CarouselItem>
        <CarouselItem className="w-full h-full bg-gray-400">ten</CarouselItem>
        <CarouselItem className="w-full h-full bg-gray-400">eleven</CarouselItem>
        <CarouselItem className="w-full h-full bg-gray-400">twelve</CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}

const TRESHOLD: number = 50 as const;

type CarouselProps = React.HTMLAttributes<HTMLDivElement> & {
};

export default function Carousel({
  children,
  className }: CarouselProps) {
  const [page, setPage] = React.useState<number>(0);
  const carouselContentRef = React.useRef<HTMLDivElement>(null);

  // event handlers / actions

  return (
    <CarouselContext.Provider
      value={{
        page,
        carouselContentRef,
      }}
    >
      <AnimatePresence>
        <motion.div key={"carousel"} className={cn("relative overflow-clip", className)}>
          {
            true && <>
              <CarouselControl onClick={() => setPage((prev) => prev - 1)} className="left-0"><ChevronLeftIcon width={32} height={32} /></CarouselControl>
              <CarouselControl onClick={() => setPage((prev) => prev + 1)} className="right-0"><ChevronRightIcon width={32} height={32} /></CarouselControl>
            </>
          }
          {children}
        </motion.div>
      </AnimatePresence>
    </CarouselContext.Provider >
  );
}

type CarouselContentProps = React.HTMLAttributes<HTMLDivElement> & {};

function CarouselContent({
  children,
  className }: CarouselContentProps) {
  const { page, carouselContentRef: ref } = useCarouselContext();

  return (
    <motion.div
      key={page}
      ref={ref}
      className={cn('grid grid-flow-col-dense grid-cols-[repeat(12,100%)] grid-rows-[300px]', className)}
    >
      {children}
    </motion.div>
  );
}

type CarouselItemProps = React.HTMLAttributes<HTMLDivElement> & {};

function CarouselItem({ children, className }: CarouselItemProps) {
  return (
    <motion.div key={"carousel-item"} className={cn("", className)}>
      {children}
    </motion.div>
  );
}


type CarouselControlProps = ButtonProps;

function CarouselControl({ variant = 'ghost', className, ...props }: CarouselControlProps) {
  return <Button variant={variant} className={cn("absolute inset-y-0 my-auto z-10 text-gray-950/50 hover:bg-transparent", className)} {...props} />;
}
