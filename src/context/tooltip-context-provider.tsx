"use client";

import { createContext } from "react";

type TTooltipContext = {
  isMounted: boolean;
  id: string;
  isOpen: boolean;
  tooltipTriggerRef: React.RefObject<HTMLButtonElement>;
  tooltipContentRef: React.RefObject<HTMLDivElement>;
  x: number;
  y: number;
  handleMouseEnter: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  handleMouseLeave: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  handleFocus: (evt: React.FocusEvent<HTMLButtonElement>) => void;
  handleBlur: (evt: React.FocusEvent<HTMLButtonElement>) => void;
  handleKeyDown: (evt: React.KeyboardEvent<HTMLButtonElement>) => void;
};

const TooltipContext = createContext<TTooltipContext | null>(null);

export default TooltipContext;
