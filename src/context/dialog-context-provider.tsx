"use client";

import { Variants } from "framer-motion";
import { createContext } from "react";

type TDialogContext = {
  backdrop?: "static" | boolean;
  blur?: boolean;
  backdropClassName?: string;
  dialogClassName?: string;
  backdropAnimation?: {};
  scrollable?: boolean;
  animation?: false | "fade" | "zoom" | Variants;
  size?: "default" | "sm" | "lg" | "xl";
  fullscreen?: boolean | "sm" | "md" | "lg" | "xl";
  centered?: boolean;
  animateStaticDialog: boolean;
  onClickOutside: () => void;
  onStopPropagation: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const DialogContext = createContext<TDialogContext | null>(null);

export default DialogContext;
