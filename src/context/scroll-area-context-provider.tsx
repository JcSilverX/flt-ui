"use client";

import { createContext } from "react";

type TScrollAreaContext = {
	isMounted: boolean;
	isVisible: boolean;
	scrollbarX: number | null;
	scrollbarY: number | null;
	scrollAreaViewportRef: React.RefObject<HTMLDivElement>;
};

const ScrollAreaContext = createContext<TScrollAreaContext | null>(null);

export default ScrollAreaContext;
