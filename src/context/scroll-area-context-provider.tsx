"use client";

import { createContext } from "react";

type TScrollAreaContext = {
  isMounted: boolean;
  isVisible: boolean;
  type: "auto" | "always" | "scroll" | "hover";
  thumbHeight: number;
  thumbTop: number;
  thumbWidth: number;
  thumbLeft: number;
  scrollbarXEnabled: boolean;
  setScrollbarXEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  scrollbarYEnabled: boolean;
  setScrollbarYEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  scrollAreaViewportRef: React.RefObject<HTMLDivElement>;
};

const ScrollAreaContext = createContext<TScrollAreaContext | null>(null);

export default ScrollAreaContext;
