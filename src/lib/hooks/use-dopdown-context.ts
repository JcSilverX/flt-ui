"use client";

import DropdownContext from "@/context/dropdown-context-provider";
import { useContext } from "react";

export default function useDropdownContext() {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error(
      "useDropdownContext must be used within a DropdownContextProvider."
    );
  }

  return context;
}
