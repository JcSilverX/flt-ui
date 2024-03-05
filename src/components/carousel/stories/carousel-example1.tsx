"use client";

import Carousel from "../carousel";
import { CarouselCaption } from "../carousel-caption";
import { CarouselContent } from "../carousel-content";
import { CarouselItem } from "../carousel-item";

export function CarouselExample1() {
  return (
    <Carousel className="grid grid-rows-[300px]">
      <CarouselContent>
        <CarouselItem className="bg-gray-400">
          image here #1

          {/* <CarouselCaption>
            <h3>First slide label</h3>

            <p>Some representative placeholder content for the first slide.</p>
          </CarouselCaption> */}
        </CarouselItem>
        <CarouselItem className="bg-gray-400">
          image here #2

          {/* <CarouselCaption>
            <h3>Second slide label</h3>

            <p>Some representative placeholder content for the second slide.</p>
          </CarouselCaption> */}
        </CarouselItem>
        <CarouselItem className="bg-gray-400">
          image here #3

          {/* <CarouselCaption>
            <h3>Third slide label</h3>

            <p>Some representative placeholder content for the third slide.</p>
          </CarouselCaption> */}
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}