"use client";

import { createContext } from "react";

type TAccordionItemContext = {
  id: string;
  // handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const AccordionItemContext = createContext<TAccordionItemContext | null>(null);

export default AccordionItemContext;
