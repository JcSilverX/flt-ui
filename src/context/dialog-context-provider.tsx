"use client";

import { createContext } from "react";

type TDialogContext = {

};

const DialogContext = createContext<TDialogContext | null>(null);

export default DialogContext;
