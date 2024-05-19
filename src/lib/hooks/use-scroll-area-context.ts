"use client";

import ScrollAreaContext from "@/context/scroll-area-context-provider";
import { useContext } from "react";

export default function useScrollAreaContext() {
	const context = useContext(ScrollAreaContext);

	if (!context) {
		throw new Error(
			"useScrollAreaContext must be used within a ScrollAreaContextProvider."
		);
	}

	return context;
}
