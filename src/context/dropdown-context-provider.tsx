"use client";

import { createContext } from "react";

type TDropdownContext = {
  isMounted: boolean;
  isOpen: boolean;
  dropdownTriggerRef: React.RefObject<HTMLButtonElement>;
  dropdownMenuRef: React.RefObject<HTMLDivElement>;
  position: {
    top: number;
    left: number;
  };
  handleClick: () => void;
};

const DropdownContext = createContext<TDropdownContext | null>(null);

export default DropdownContext;
