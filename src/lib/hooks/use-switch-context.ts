"use client";

import SwitchContext from "@/context/switch-context-provider";
import { useContext } from "react";

export default function useSwitchContext() {
  const context = useContext(SwitchContext);

  if (!context) {
    throw new Error(
      "useSwitchContext must be used within a SwitchContextProvider."
    );
  }

  return context;
}
