"use client";

import SliderContext from "@/context/slider-context-provider";
import { useContext } from "react";

export default function useSliderContext() {
  const context = useContext(SliderContext);

  if (!context) {
    throw new Error(
      "useSliderContext must be used within a SliderContextProvider."
    );
  }

  return context;
}
