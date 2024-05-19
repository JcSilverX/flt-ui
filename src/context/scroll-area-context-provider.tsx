"use client";

import { createContext } from "react";

type TScrollAreaContext = {
	isVisible: boolean;
	handlePointerEnter: () => void;
	handlePointerLeave: () => void;
};

const ScrollAreaContext = createContext<TScrollAreaContext | null>(null);

export default ScrollAreaContext;
