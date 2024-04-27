"use client";

import { createContext } from "react";

type TToggleGroupContext = {
  isPressed: boolean;
  handleClick: (evt: React.MouseEvent<HTMLButtonElement>) => void;
};

const ToggleGroupContext = createContext<TToggleGroupContext | null>(null);

export default ToggleGroupContext;
