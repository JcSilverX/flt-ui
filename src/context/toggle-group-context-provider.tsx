"use client";

import { createContext } from "react";

type TToggleGroupContext = {
  pressedItems: string[];
  handleClick: (value: string) => void;
};

const ToggleGroupContext = createContext<TToggleGroupContext | null>(null);

export default ToggleGroupContext;
