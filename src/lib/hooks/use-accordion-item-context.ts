"use client";

import AccordionItemContext from "@/context/accordion-item-context-provider";
import { useContext } from "react";

export default function useAccordionItemContext() {
  const context = useContext(AccordionItemContext);

  if (!context) {
    throw new Error(
      "useAccordionItemContext must be used within a AccordionItemContextProvider."
    );
  }

  return context;
}
