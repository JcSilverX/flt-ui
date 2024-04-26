"use client";

import { createContext } from "react";

type TCheckboxContext = {
  isChecked: boolean;
};

const CheckboxContext = createContext<TCheckboxContext | null>(null);

export default CheckboxContext;
