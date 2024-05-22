"use client";

import InputOTPContext from "@/context/input-otp-context-provider";
import { useContext } from "react";

export default function useInputOTPContext() {
	const context = useContext(InputOTPContext);

	if (!context) {
		throw new Error(
			"useInputOTPContext must be used within a InputOTPContextProvider."
		);
	}

	return context;
}
