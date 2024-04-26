"use client";

import CollapsibleContext from "@/context/collapsible-context-provider";
import { useContext } from "react";

export default function useCollapsibleContext() {
  const context = useContext(CollapsibleContext);

  if (!context) {
    throw new Error(
      "useCollapsibleContext must be used within a CollapsibleContextProvider."
    );
  }

  return context;
}
