"use client";

import React from "react";
import Carousel from "../carousel";
import { CarouselContent } from "../carousel-content";
import { CarouselItem } from "../carousel-item";
import { CarouselIndicator } from "../carousel-indicator";
import { CarouselIndicators } from "../carousel-indicators";

export function CarouselExample1() {
  return (
    <Carousel>
      {/* indicators */}
      <CarouselIndicators>
        <CarouselIndicator to={1} />
        <CarouselIndicator to={2} />
        <CarouselIndicator to={3} />
      </CarouselIndicators>

      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="bg-gray-500/30">
            <div
              draggable={false}
              className="shadow-md rounded-3xl text-7xl font-semibold flex items-center justify-center h-80 touch-none select-none"
            >
              {index + 1}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
