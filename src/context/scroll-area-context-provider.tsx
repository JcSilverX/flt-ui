"use client";

import {
	TOrientation,
	TPointerEvent,
} from "@/components/scroll-area/scroll-area";
import { createContext } from "react";

type TScrollAreaContext = {
	isMounted: boolean;
	isVisible: boolean;
	type: "auto" | "always" | "scroll" | "hover";
	orientation: TOrientation;
	thumbHeight: number;
	thumbTop: number;
	thumbWidth: number;
	thumbLeft: number;
	scrollbarXEnabled: boolean;
	setScrollbarXEnabled: React.Dispatch<React.SetStateAction<boolean>>;
	scrollbarYEnabled: boolean;
	setScrollbarYEnabled: React.Dispatch<React.SetStateAction<boolean>>;
	scrollAreaViewportRef: React.RefObject<HTMLDivElement>;
	scrollAreaScrollbarRef: React.RefObject<HTMLDivElement>;
	handlePointerDown: (evt: TPointerEvent) => void;
	handlePointerMove: (evt: TPointerEvent) => void;
	handlePointerUp: (evt: TPointerEvent) => void;
	handlePointerCancel: (evt: TPointerEvent) => void;
};

const ScrollAreaContext = createContext<TScrollAreaContext | null>(null);

export default ScrollAreaContext;
