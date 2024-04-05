"use client";

import { createContext } from "react";

type TDropdownContext = {};

const DropdownContext = createContext<TDropdownContext | null>(null);

export default DropdownContext;
