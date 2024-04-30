"use client";

import { createContext } from "react";

type TTabsContext = {
  baseId: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const TabsContext = createContext<TTabsContext | null>(null);

export default TabsContext;
