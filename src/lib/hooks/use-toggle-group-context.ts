"use client";

import ToggleGroupContext from "@/context/toggle-group-context-provider";
import { useContext } from "react";

export default function useToggleGroupContext() {
  const context = useContext(ToggleGroupContext);

  if (!context) {
    throw new Error(
      "useToggleGroupContext must be used within a ToggleGroupContextProvider."
    );
  }

  return context;
}
