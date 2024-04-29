"use client";

import { TPosition, TSide } from "@/components/toast/toast";
import { createContext } from "react";

type TToastContext = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  position: TPosition;
  side: TSide;
  toastViewportRef: React.RefObject<HTMLOListElement>;
};

const ToastContext = createContext<TToastContext | null>(null);

export default ToastContext;
