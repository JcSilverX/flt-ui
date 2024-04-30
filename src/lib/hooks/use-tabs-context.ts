"use client";

import TabsContext from "@/context/tabs-context-provider";
import { useContext } from "react";

export default function useTabsContext() {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error(
      "useTabsContext must be used within a TabsContextProvider."
    );
  }

  return context;
}
