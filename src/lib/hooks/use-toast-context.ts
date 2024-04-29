"use client";

import ToastContext from "@/context/toast-context-provider";
import { useContext } from "react";

export default function useToastContext() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToastContext must be used within a ToastContextProvider."
    );
  }

  return context;
}
