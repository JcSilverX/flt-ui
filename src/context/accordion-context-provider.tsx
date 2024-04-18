"use client";

import { createContext } from "react";

type TAccordionContext = {
  activeIndex: string;
  // defaultValue: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const AccordionContext = createContext<TAccordionContext | null>(null);

export default AccordionContext;
