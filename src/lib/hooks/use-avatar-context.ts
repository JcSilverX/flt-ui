"use client";

import AvatarContext from "@/context/avatar-context-provider";
import { useContext } from "react";

export default function useAvatarContext() {
	const context = useContext(AvatarContext);

	if (!context) {
		throw new Error(
			"useAvatarContext must be used within a AvatarContextProvider."
		);
	}

	return context;
}
