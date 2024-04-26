"use client";

import { createContext } from "react";

type TCollapsibleContext = {
  id: string;
  open: boolean;
  handleToggle: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const CollapsibleContext = createContext<TCollapsibleContext | null>(null);

export default CollapsibleContext;
