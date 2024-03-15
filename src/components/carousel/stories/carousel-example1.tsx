"use client";

import React from "react";
import Carousel from "../carousel";
import { CarouselCaption } from "../carousel-caption";
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
        <CarouselItem className="bg-gray-500/30 select-none">
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
        <CarouselItem className="bg-gray-500/40">
          {
            // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
            <img
              src="https://placehold.co/600x400/red/FFFFFF/png"
              alt="second slide"
              className="w-full"
            />
          }

          <CarouselCaption>
            <h3>Second slide label</h3>

            <p>Some representative placeholder content for the second slide.</p>
          </CarouselCaption>
        </CarouselItem>
        <CarouselItem className="bg-gray-500/50">
          {
            // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
            <img
              src="https://placehold.co/600x400/blue/FFFFFF/png"
              alt="third slide"
              className="w-full"
            />
          }

          <CarouselCaption>
            <h3>Third slide label</h3>

            <p>Some representative placeholder content for the third slide.</p>
          </CarouselCaption>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
