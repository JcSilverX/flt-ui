"use client";

import TooltipContext from "@/context/tooltip-context-provider";
import { useContext } from "react";

export default function useTooltipContext() {
  const context = useContext(TooltipContext);

  if (!context) {
    throw new Error(
      "useTooltipContext must be used within a TooltipContextProvider."
    );
  }

  return context;
}
