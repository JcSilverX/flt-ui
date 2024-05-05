"use client";

import { createContext } from "react";

type TSliderContext = {
  name?: string | undefined;
  disabled?: boolean | undefined;
  min: number;
  max: number;
  value: number;
  orientation: "horizontal" | "vertical";
  handlePointerDown: (evt: React.PointerEvent<HTMLSpanElement>) => void;
  handlePointerMove: (evt: React.PointerEvent<HTMLSpanElement>) => void;
  handlePointerUp: (evt: React.PointerEvent<HTMLSpanElement>) => void;
  handlePointerCancel: (evt: React.PointerEvent<HTMLSpanElement>) => void;
};

const SliderContext = createContext<TSliderContext | null>(null);

export default SliderContext;
