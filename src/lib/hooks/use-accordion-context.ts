"use client";

import AccordionContext from "@/context/accordion-context-provider";
import { useContext } from "react";

export default function useAccordionContext() {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error(
      "useAccordionContext must be used within a AccordionContextProvider."
    );
  }

  return context;
}
