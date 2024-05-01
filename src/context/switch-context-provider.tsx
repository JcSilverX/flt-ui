"use client";

import { createContext } from "react";

type TSwitchContext = {
  isChecked: boolean;
  disabled?: boolean | undefined;
};

const SwitchContext = createContext<TSwitchContext | null>(null);

export default SwitchContext;
