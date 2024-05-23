"use client";

import HoverCardContext from "@/context/hover-card-context-provider";
import { useContext } from "react";

export default function useHoverCardContext() {
	const context = useContext(HoverCardContext);

	if (!context) {
		throw new Error(
			"useHoverCardContext must be used within a HoverCardContextProvider."
		);
	}

	return context;
}
