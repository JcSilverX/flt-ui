"use client";

import CheckboxContext from "@/context/checkbox-context-provider";
import { useContext } from "react";

export default function useCheckboxContext() {
  const context = useContext(CheckboxContext);

  if (!context) {
    throw new Error(
      "useCheckboxContext must be used within a CheckboxContextProvider."
    );
  }

  return context;
}
