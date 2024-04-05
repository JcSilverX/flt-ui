"use client";

import CarouselContext from "@/context/carousel-context-provider";
import { useContext } from "react";

export default function useCarouselContext() {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error(
      "useCarouselContext must be used within a CarouselContextProvider."
    );
  }

  return context;
}
