"use client";
import React from "react";
import { Carousel } from "./carousel-example1";
import { CarouselContent } from "../carousel-content";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import {
  CarouselControlPrevious,
  CarouselControlNext,
} from "../carousel-control";
import { CarouselIndicator } from "../carousel-indicator";
import { CarouselItem } from "../carousel-item";

const SLIDE_COUNT = 5 as const;
const SLIDES = Array.from({ length: SLIDE_COUNT });

export default function CarouselExample2() {
  return (
    <Carousel className="w-full max-w-xs mx-auto" orientation="vertical">
      <div className="flex justify-center space-x-2">
        {SLIDES.map((_, index) => (
          <CarouselIndicator key={index} to={index} />
        ))}
      </div>

      <CarouselContent className="h-[350px]">
        {SLIDES.map((_, index) => (
          <CarouselItem key={index} id={`${index + 1}`}>
            <div className="pl-1">
              <div className="rounded-xl border shadow">
                <div className="flex aspect-square items-center justify-center p-6">
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
