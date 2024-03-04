"use client";

import { createContext } from "react";

type TCarouselContext = {
  page: number;
  carouselContentRef: React.RefObject<HTMLDivElement>;
};

const CarouselContext = createContext<TCarouselContext | null>(null);

export default CarouselContext;
