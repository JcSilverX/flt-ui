"use client";

import DialogContext from "@/context/dialog-context-provider";
import { useContext } from "react";

export default function useDialogContext() {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error(
      "useDialogContext must be used within a DialogContextProvider."
    );
  }

  return context;
}
