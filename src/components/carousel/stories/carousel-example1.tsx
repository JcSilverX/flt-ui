"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import React from "react";
import { CarouselContent } from "../carousel-content";
import {
  CarouselControlNext,
  CarouselControlPrevious,
} from "../carousel-control";
import { CarouselIndicator } from "../carousel-indicator";
import { CarouselItem } from "../carousel-item";
import Carousel from "../carousel";

const SLIDE_COUNT = 5 as const;
const SLIDES = Array.from({ length: SLIDE_COUNT });

export function CarouselExample1() {
  return (
    <Carousel className="w-full max-w-md mx-auto" autoPlay>
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
