"use client";

import { TPointerEvent } from "@/components/hover-card/hover-card";
import { createContext } from "react";

type THoverCardContext = {
	isMounted: boolean;
	isOpen: boolean;
	x: number;
	y: number;
	hoverCardTriggerRef: React.RefObject<HTMLButtonElement>;
	hoverCardContentRef: React.RefObject<HTMLDivElement>;
	handleOpen: () => void;
	handleClose: () => void;
	handleDismiss: () => void;
};

const HoverCardContext = createContext<THoverCardContext | null>(null);

export default HoverCardContext;
