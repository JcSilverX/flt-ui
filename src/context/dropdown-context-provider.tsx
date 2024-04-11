"use client";

import { createContext } from "react";

type TDropdownContext = {
  isMounted: boolean;
  isOpen: boolean;
  dropdownTriggerRef: React.RefObject<HTMLButtonElement>;
  dropdownMenuRef: React.RefObject<HTMLDivElement>;
  x: number;
  y: number;
  handleClick: () => void;
};

const DropdownContext = createContext<TDropdownContext | null>(null);

export default DropdownContext;
