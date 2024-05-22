"use client";

import { createContext } from "react";

type TInputOTPContext = {
	value: string;
	isActive: boolean;
	hasFakeCaret: boolean;
};

const InputOTPContext = createContext<TInputOTPContext | null>(null);

export default InputOTPContext;
