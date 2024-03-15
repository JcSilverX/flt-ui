"use client";

import { createContext } from "react";

type TCarouselContext = {
  page: number;
  isTransitioning: boolean;
  carouselContentRef: React.RefObject<HTMLDivElement>;
  handleClick: (newDirection: number) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleTransitionEnd: () => void;
};

const CarouselContext = createContext<TCarouselContext | null>(null);

export default CarouselContext;
