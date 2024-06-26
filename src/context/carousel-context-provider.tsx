"use client";

import { createContext } from "react";

export type TKeyboardEvent = React.KeyboardEvent<HTMLDivElement>;
export type TPointerEvent = React.PointerEvent<HTMLDivElement>;

type TCarouselContext = {
  page: number;
  carouselRef: React.RefObject<HTMLDivElement>;
  dimension: number;
  slide?: boolean;
  fade?: boolean;
  dragDistance: number;
  isDragging: boolean;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  orientation?: "horizontal" | "vertical";
  handlePrev: () => void;
  handleNext: () => void;
  handleClick: (newDirection: number) => void;
  handlePointerEnter: (evt: TPointerEvent) => void;
  handlePointerLeave: (evt: TPointerEvent) => void;
  handlePointerDown: (evt: TPointerEvent) => void;
  handlePointerMove: (evt: TPointerEvent) => void;
  handlePointerUp: (evt: TPointerEvent) => void;
  handlePointerCancel: (evt: TPointerEvent) => void;
};

const CarouselContext = createContext<TCarouselContext | null>(null);

export default CarouselContext;
