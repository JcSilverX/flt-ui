"use client";

import { MotionValue, PanInfo } from "framer-motion";
import { createContext } from "react";

type TCarouselContext = {
  page: number;
  direction: number;
  childCount: number;
  carouselContentRef: React.RefObject<HTMLDivElement>;
  dragX: MotionValue<number>;
  handleDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
};

const CarouselContext = createContext<TCarouselContext | null>(null);

export default CarouselContext;
