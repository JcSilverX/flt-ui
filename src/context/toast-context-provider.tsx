"use client";

import { createContext } from "react";

type TToastContext = {};

const ToastContext = createContext<TToastContext | null>(null);

export default ToastContext;
